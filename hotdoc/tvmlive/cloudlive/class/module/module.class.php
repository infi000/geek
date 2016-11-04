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
			$login = Login::frontlogincheck();
            if($login){
                Core::jump('', '?m=5101', 3);
            }
			//实例化模板
			$tp = PHP_Templates::factory();
			
			//设置模板文件
			$tp->setFiles('userlongin');
			
			//输出页面
			$tp->execute();
			
			//释放模板变量
			unset($tp);
	}
	
    /**
     * 功能号：1001
     * 登录
     * */
    function login() {
        COMFilter::$_jump = false;
        $max_number = 5; //最多允许输错密码次数
        $lock_user_file = "logs/lock_user_";
        $user = Core::$_dataFilter->valueCheck(Core::get("user"), "Limit", "用户名最多20个字符", false, 20);
        if ($user) { 
            $url = "?m=5";
            $file = $lock_user_file . $user;
            if($this->check_lock($file)){//检查锁定状态
                Core::json_error('帐号已被锁定,请过'.$this->_max_time.'分钟再试', $url, 3);
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
                        Core::json_result('','ok');
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
                        Core::json_error('用户或密码错误,登录次数剩余' . ($max_number - $err_number));
                    }
                } else {
                    Core::json_error('帐号已被锁定,请过10分钟再试');
                }
            } else {
                Core::json_error('用户或密码错误');
            }
        } else {
            $login = Login::logincheck( );
            if($login){
                Core::jump('', '?m=1200', 3);
            }
            //实例化模板
            $tp = PHP_Templates::factory();

            //设置模板文件
            $tp->setFiles('houtailogin');

            //输出页面
            $tp->execute();
        }
        //释放模板变量
        unset($tp);
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
    
      /**
	 * 功能号：1100
	 * 管理页面头部信息
	 * */
	public function user_header(){
            $name = Core::$userInfo->userName;
            $userinfo = '<span class="solgan">欢迎，'. $name .'</span>
                  <nav>
                      <ul>
                           <li><a href="?m=1250">添加直播地址</a></li>
                           <li><a>修改密码</a></li>
                            <li>|</li>
                          <li><a href="?m=1002" class="out">退出</a></li>
                    </ul>
                    </nav>';
            Core::json_result($userinfo,"ok");
        }
        /**
	 * 功能号：1101
	 * 管理页面左侧信息
	 * */
	public function user_leftinfo(){
            $type = $_SESSION['NAVAGATION']; 
            $name = Core::$userInfo->userName;
            $userinfo = ' <div class="managerBar bar">
                        <ul>
                            <li>
                                <a href="?m=1200" '.($type==100?'class="managerChoose"':'').' ><img src="images/bf/zbjg'.($type==100?2:'').'.png" alt="">直播监管</a>
                            </li>
                            <li>
                                <a href="?m=1203"  '.($type==101?'class="managerChoose"':'').'><img src="images/bf/jcbd'.($type==101?2:'').'.png" alt="">违规直播</a>
                            </li>
                            <li><span class="line"></span></li>
                        </ul>
                    </div>
                    <span class="solgan">欢迎，'. $name .'</span>
                    <nav>
                        <ul>
                        <li><a href="?m=1210">直播地址列表</a></li>
                        <li><a href="?m=1250">添加直播地址</a></li>
                            <li><a href="">修改密码</a></li>
                            <li>|</li>
                            <li><a href="?m=1002" class="out">退出</a></li>
                        </ul>
                    </nav>';
            Core::json_result(array('home'=>$userinfo),"ok");
        
        }
    
    
}
