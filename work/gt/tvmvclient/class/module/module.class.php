<?php
class Module {
	
	/**
	 * 对像静态变量
	 *
	 * @var object
	 */
	static private $_class;
	
        //锁定时间
        private $_max_time = 10;
        
        //private $_host = 'http://115.28.92.216';
        private $_host = SERVERHOST;
        
	/**
	 * 实例化对像
	 * 
	 * @return class
	 */
	public static function factory(){
            if (!isset(self::$_class ) ) {
		$className = __CLASS__;
		self::$_class = new $className;
            }
            return self::$_class;	
	}
	
	function view(){
            COMFilter::$_jump = false;
            $clientmac = $_COOKIE['CLIENTMAC'];
            if (!$clientmac) {
                $boxmac = new COMGetmac();
                // print 'getmac';
                $clientmac = 'M' . $boxmac->getmac();
                setcookie("CLIENTMAC", $clientmac);
            }
            // print $clientmac;
            $clientboxid = intval($_COOKIE['CLIENTBOXID']);
            if (!$clientboxid) {
                $clientbox = new Boxs();
                $one = $clientbox->getOne("mac=?", $clientmac);
                if ($one) {
                    $clientboxid = $one->id;
                    setcookie("CLIENTMAC", $clientmac);
                }
            }
            // print 'id:'.$clientboxid;
            
                //实例化模板
                $tp = PHP_Templates::factory();
                $LOGGEDUSER = $_COOKIE['LOGGEDUSER'];
                if ($LOGGEDUSER) {
                    $tp->title = "后台";
                    //设置模板文件
                    $tp->setFiles('default_back');
                } else {
                    $tp->title = "测试";
                    //设置模板文件
                    $tp->setFiles('default');
                    //统计
                    Statistics::hitscounter(intval($clientboxid), "login", "login");
                }
                //输出页面
                $tp->execute();
                //释放模板变量
                unset($tp, $dataFilter);
	}
	
        
    
    /**
     * 功能号：1001
     * 登录
     * */
    function login() {
        $max_number = 5; //最多允许输错密码次数
        $lock_user_file = "logs/lock_user_";
        $user = Core::$_dataFilter->valueCheck(Core::get("user"), "Limit", "用户名最多20个字符", false, 20);
        if ($user) { 
            $url = "?m=5";
            $file = $lock_user_file . $user;
            if($this->check_lock($file)){//检查锁定状态
                Core::jump('帐号已被锁定,请过'.$this->_max_time.'分钟再试', $url, 3);
            }
            $pass = Core::$_dataFilter->valueCheck(Core::get("pass"), "Require,Limit", "密码不能为空,密码最多20个字符", false, 20);
            //$data = Core::$_mdb->search( "select * from cms_user where " ,array());
            $data = bCmsuser::getOne("name=?", $user);
            if ($data) {
                $err_number = $data->err_times;
                if($err_number >= $max_number){//解除锁定
                    $err_number = 0;
                    $data->err_times = 0;
                    $data->save();
                }
                if ($err_number < $max_number) {
                    $v_pass = sha1($user . sha1($pass) . $data->ID);
                    if ($v_pass == $data->PASS) {
                        $LOGGEDUSER["ID"] = $data->ID;
                        $LOGGEDUSER["USERNAME"] = $data->NAME;
                        $LOGGEDUSER["ADMIN"] = $data->ADMIN;
                        if($err_number > 0){//重置错误记数
                            $err_number = 0;
                            $data->err_times = 0;
                            $data->save();
                        }
                        $json = json_encode($LOGGEDUSER);
                        //$emcry = COMEmcrypt::factory();
                        //$json = $emcry->urlsafe_b64encode($json);
                        $json = Core::urlsafe_b64encode($json);
                        setcookie('LOGGEDUSER', $json, 0, '/', null, null);
                        Header('Location:' . $url);
                    } else {
                        ++$err_number;
                        $data->err_times = $err_number;
                        $data->save();
                        if ($err_number >= $max_number) {//记录锁定时间
                            $fh = fopen($file, 'w');
                            if ($fh) {
                                fwrite($fh, time());
                                fclose($fh);
                            }
                        }
                        Core::jump('用户或密码错误,登录次数剩余' . ($max_number - $err_number), $url, 3);
                    }
                } else {
                    Core::jump('帐号已被锁定,请过10分钟再试', $url, 3);
                }
            } else {
                Core::jump('用户或密码错误', $url, 3);
            }
        } else {

            //实例化模板
            $tp = PHP_Templates::factory();

            //设置模板文件
            $tp->setFiles('login');

            //输出页面
            $tp->execute();
        }
        //释放模板变量
        unset($tp, $dataFilter);
    }
        
    /**
     * 检查用户锁定状态
     * 返回: true 为锁定状态 false 为正常状态
     * */
    function check_lock($file) {
        $flag = false;
        if(file_exists($file)){
            $fh = fopen($file, 'r');
            if ($fh){
                $time = trim(fgets($fh));
                if(($time + $this->_max_time * 60) > time()){
                    $flag = true;
                }
                fclose($fh);
            }
        }
        return $flag;
    }
}
