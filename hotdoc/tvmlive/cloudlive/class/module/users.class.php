<?php
class Users extends bUsers{
	
	/**
	 * 对像静态变量
	 *
	 * @var object
	 */
	static private $_class;
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
        
       
        
        /**
         * 功能号: 5003
         * 获取验证吗
         */
        public function get_validate(){
            COMFilter::$_jump = false;
            
            
        }
        
        /**
	 * 获取组代码
	 * */
        private function get_groupcode($userid){
            $livegroup = bLiveGroup::getOne("userid=?", $userid);
            if($livegroup){
                $groupcode = $livegroup->code;
            }
            return $groupcode;
        }
        
	/**
	 * 功能号：5001
	 * 用户注册
	 * */
	public function user_register(){
            COMFilter::$_jump = false;
            $timeout = 2;
            $requestime = $_SERVER['REQUEST_TIME'];
            $cookiename = md5(__CLASS__ . __FUNCTION__.  session_id());
           if(empty($_SESSION[$cookiename])){
                $_SESSION[$cookiename] =  $requestime;
            }else{
                if($_SESSION[$cookiename]+$timeout > $requestime && $_SESSION[$cookiename] <= $requestime){
                    $mess = "系统繁忙";
                    Core::json_error($mess);
                }else{
                     $_SESSION[$cookiename] =  $requestime;
                }
            }
            $teacher_name = Core::$_dataFilter->valueCheck( Core::get("name") , "Require,Limit", "需要姓名,姓名最多4到20个字符", false,4 ,20 );
            $phone = Core::$_dataFilter->valueCheck( Core::get("phone") , "Require,Limit,Phone", "需要手机号,手机号最多11个字符,手机格式错误", false, 11 );
            $password = Core::$_dataFilter->valueCheck( Core::get("passwd") , "Require,Limit", "需要密码,密码8到20个字符", false, 8,20 );
            $utype = Core::$_dataFilter->valueCheck( Core::get("utype") , "Require,Integer", "需要类型,类型为整数" ); 
            $email = Core::$_dataFilter->valueCheck( Core::get("cemail") , "Limit,Email", "邮箱最多50个字符,邮箱格式错误", false, 50 );
            
            $cname = Core::$_dataFilter->valueCheck( Core::get("cname") , "Require,Limit", "需要单位名称,单位名称最多50个字符", false, 50 );
            $caddr = Core::$_dataFilter->valueCheck( Core::get("caddr") , "Limit", "单位地址最多60个字符", false, 60 );
            $cphone = Core::$_dataFilter->valueCheck( Core::get("cphone") , "Limit", "联系电话最多20个字符", false, 20 );
            $uphone = Core::$_dataFilter->valueCheck( Core::get("uphone") , "Limit", "联系电话最多20个字符", false, 20 );
            $oicq = Core::$_dataFilter->valueCheck( Core::get("oicq") , "Limit", "联系电话最多20个字符", false, 20 );
            
            if(empty($email))$email = $phone."@tvm.cn";
            $ip = Core::get_client_ip();
           // Core::json_error('系统错误,请检查');	
           // Core::json_result($data,$msg);
            $uahost = Core::$_config->uaserver['uahost'];
            $systvmid = Core::$_config->uaserver['tvmid'];
            $sysvcode = Core::$_config->uaserver['vcode'];
            $sysapp = Core::$_config->uaserver['app'];
            $systid = Core::$_config->uaserver['tid'];
            
            //管理员登录
            $urlcloud = 'http://'.$uahost.'/login?tvmid='.$systvmid.'&validateCode='.$sysvcode.'&app='.$sysapp.'&license=true&format=json';
            $apidata = Core::request_url($urlcloud);
            if($apidata){
                    $password = strtolower($password);
                    $userid = 0;
                    $admin=json_decode($apidata);
                    $token = $admin->access_token;
                    $secret = urlencode(base64_encode(gzcompress("$systvmid|$systid|$token")));
                    $urlcloud = 'http://'.$uahost.'/addgroupuser?tvmid='.$systvmid.'&tid='.$systid.'&token='.$token.'&secret='.$secret.'&format=json';
                    $postdata = array("tvmid"=>$phone,
                                    "isAdmin"=>0,
                                       "name"=>$teacher_name,
                                   "password"=>$password,
                                      "email"=>$email
                            );
                    $data[]=$postdata;
                    $header = array('Content-Type: application/json');
                    $apidata = Core::request_url($urlcloud,json_encode($data),1,1,$header);
                    if($apidata){
                            $code = 0;
                            $json_obj=json_decode($apidata);
                            switch ($json_obj->status) {
                                case 0:
                                    $date = COMCommon::sysTime();
                                    if($json_obj->data[0]->password){
                                        $msg='注册成功';
                                        $code = 1;
                                        $userid = bUsers::add($phone,md5($password),$teacher_name,$phone,$utype,$ip,$date);
                                        if($userid > 0){
                                            $flag = bUsersExt::add($userid,$cname,$caddr,$cphone,$email,$uphone,$oicq);
                                        }
                                    }else{
                                        $user = bUsers::getOne("tvmid=?", $phone);
                                        if($user){
                                            $msg='用户已存在';
                                        }else{
                                            $msg='注册成功';
                                            $code = 1;
                                            $userid = bUsers::add($phone,md5($password),$teacher_name,$phone,$utype,$ip,$date);
                                            if($userid > 0){
                                                $flag = bUsersExt::add($userid,$cname,$caddr,$cphone,$email,$uphone,$oicq);
                                            }
                                        }
                                    }
                                    break;
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                case 5:
                                    $msg='接口参数出错,请检查'.$urlcloud;
                                    break;
                                case 6:
                                    $msg='email已使用,请换一个再试';
                                    break;
                                default:
                                    $msg='未知错误';
                                    break;
                            }
                            if($code){
                                $_SESSION['USERID'] = $userid;
                                $_SESSION['USERTVMID'] = $phone;
                                $_SESSION['USERNAME'] = $teacher_name;
                                Core::json_result("","ok");
                            }else{
                                Core::json_error($msg);	
                            }
                    }else{
                        Core::json_error('网络错误,请检查');
                    }            
            }else{
		Core::json_error('系统错误,请检查');	
            }
	}
	
        /**
	 * 功能号：5002
	 * 用户注册显示
	 * */
	public function view_register() {
            //实例化模板
            $tp = PHP_Templates::factory();
            //设置模板文件
            $tp->setFiles('useregsiter');
            //输出页面
            $tp->execute();

            //释放模板变量
            unset($tp);
        }
        
    /**
     * 功能号：5025
     * 修改密码
     * */
    public function userpass() {
        COMFilter::$_jump = false;
        $userid = $_SESSION['USERID'];
        $opass = Core::$_dataFilter->valueCheck(Core::get("opasswd"), "Limit", "需要旧密码,密码8到20个字符", false, 8, 20);
        $pass = Core::$_dataFilter->valueCheck(Core::get("passwd"), "Limit", "需要新密码,密码8到20个字符", false, 8, 20);
        if ($opass && $pass) {
            $pass = strtolower($pass);
            $user = bUsers::i($userid);
            if($user){
                if($user->password == md5($opass)){
                     $uahost = Core::$_config->uaserver['uahost'];
                     $tvmid = $user->tvmid;
                     $opass = $user->password;
                     $npass = urlencode(base64_encode($pass));
                     //管理员修改密码
                    $urlcloud = 'http://'.$uahost.'/modifypwd?tvmid='.$tvmid.'&old='.$opass.'&new='.$npass.'&format=json';
                    $apidata = Core::request_url($urlcloud);
                    if($apidata){
                           $data=json_decode($apidata);
                           if($data->modify){
                               $user->password = md5($pass);
                               if($user->save()){
                                    Core::json_result('', 'ok');
                               }else{
                                   $mess = "修改密码失败";
                               }
                           }else{
                               $mess = $data->msg;
                           }
                    }else{
                       $mess = "修改密码失败,请重试";
                    }
                    	
                }else{
                    $mess = "旧密码不正确";
                }
            }else{
                $mess = "用户不存在";
            }
            Core::json_error($mess);
        } else {
            //实例化模板
            $tp = PHP_Templates::factory();
            //设置模板文件
            $tp->setFiles('userpass');
            //输出页面
            $tp->execute();

            //释放模板变量
            unset($tp);
        }
    }
        
        /**
	 * 功能号：5020
	 * 用户登录
	 * */
	public function user_login(){
            COMFilter::$_jump = false;
            $timeout = 2;
            $requestime = $_SERVER['REQUEST_TIME'];
            $cookiename = md5(__CLASS__ . __FUNCTION__.  session_id());
           if(empty($_SESSION[$cookiename])){
                $_SESSION[$cookiename] =  $requestime;
            }else{
                if($_SESSION[$cookiename]+$timeout > $requestime && $_SESSION[$cookiename] <= $requestime){
                    $mess = "系统繁忙";
                    Core::json_error($mess);
                }else{
                     $_SESSION[$cookiename] =  $requestime;
                }
            }
            $phone = Core::$_dataFilter->valueCheck( Core::get("tel") , "Require,Limit", "需要手机号,帐号最多11个字符", false, 11 );
            $password = Core::$_dataFilter->valueCheck( Core::get("passwd") , "Require,Limit", "需要密码,密码最多20个字符", false, 20 );
            $ip = Core::get_client_ip();
            $user = bUsers::getOne("tvmid=?", $phone);
            if($user){
                if($user->password == md5($password)){
                    $date = COMCommon::sysTime();
                    $_SESSION['USERID'] = $user->id;
                    $_SESSION['USERTVMID'] = $phone;
                    $_SESSION['USERNAME'] = $user->realname;
                    $user->last_ip = $ip;
                    $user->last_time = $date;
                    $user->login_max = intval($user->login_max) + 1;
                    $flag = $user->save();
                    Core::json_result('',"ok");
                }else{
                     $mess = "用户名或密码错误";
                }
            }else{
                $mess = "用户不存在";
            }
            Core::json_error($mess);	
            
        }
        
        /**
	 * 功能号：5022
	 * 用户登录
	 * */
	public function user_logout(){
            COMFilter::$_jump = false;
            if(is_array($_SESSION)){
                foreach ($_SESSION as $key=>$item){
                    unset($_SESSION[$key]);
                }
            }
            Core::jump('', '?m=5021', 3);
        }
        
        /**
	 * 功能号：5023
	 * 页面头部信息
	 * */
	public function user_header(){
            $userinfo = '<span class="solgan">欢迎，'. $_SESSION['USERNAME'] .'</span>
                  <nav>
                      <ul>
                           <li><a href="?m=5025">修改密码</a></li>
                            <li>|</li>
                          <li><a href="?m=5022" class="out">退出</a></li>
                    </ul>
                    </nav>';
            Core::json_result($userinfo,"ok");
        }
        /**
	 * 功能号：5024
	 * 页面左侧信息
	 * */
	public function user_leftinfo(){
            $type = $_SESSION['NAVAGATION']; 
            $userid = $_SESSION['USERID'];
             $noread = bMessages::getTotal("userid=? and status=0",$userid); 
             $_SESSION['NOREADMESSAGE'] =  $noread;
             $userhome = ' <div class="bar">
                        <ul>
                            <li>
                                <a href="?m=5101"><img src="images/bf/home'.($type==1?2:'').'.png" alt=""><span class="headerInfo">主页</span></a>
                            </li>
                            <li>
                                <a href="?m=4001"><img src="images/bf/project'.($type==4?2:'').'.png" alt=""><span class="headerInfo">消息</span><span class="msgNum" style="background: red">'.intval($_SESSION['NOREADMESSAGE']).'</span></a>
                            </li>
                            <li><span class="line"></span></li>
                        </ul>
                    </div>
                    <span class="solgan">欢迎，'.$_SESSION['USERNAME'].'</span>
                    <nav>
                        <ul>
                            <li><a href="?m=5120">添加新直播设备</a></li>
                            <li>|</li>
                            <li><a href="?m=5025">修改密码</a></li>
                            <li>|</li>
                            <li><a href="?m=5022" class="out">退出</a></li>
                        </ul>
                    </nav>';
             
            Core::json_result(array('home'=>$userhome),"ok");
        
        }
        /**
	 * 功能号：5021
	 * 用户登录显示
	 * */
	public function view_login() {
            $login = Login::frontlogincheck();
            if($login){
                Core::jump('', '?m=5101', 3);
            }
            //实例化模板
            $tp = PHP_Templates::factory();
            //设置模板文件
            $tp->setFiles('userlongin');
            $tp->pager = $this->_showpage;
            //输出页面
            $tp->execute();

            //释放模板变量
            unset($tp);
        }
        
        
        
}













