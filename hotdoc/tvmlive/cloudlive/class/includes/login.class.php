<?php
/**
 * 登录检查模块文件(CMS系统)
 * To contact the author write to {@link jingyunshan@myce.net.cn}
 * @author 景云山
 */
class Login{
	/**
	* 判断是否登录
	* @param  $memberid 用户ID
	* return bool true 已登录 false 未登录
	*/
	static function isLogin( ){
		return Core::$userInfo->userID;
	}
	
        /**
	* 检查前台用户是否登录
	* @param  $memberid 用户ID
	* return bool true 已登录 false 未登录
	*/
       static function frontlogincheck() {
            $userid = $_SESSION['USERID'];
            if ($userid) {
                return true;
            } else {
                return false;
            }
        }
        
	/**
	* 检查是否登录
	* @param  $memberid 用户ID
	* return bool true 已登录 false 未登录
	*/
	static function logincheck( ){
		$LOGGEDUSER =  $_COOKIE['LOGGEDUSER'];
		//$emcry = COMEmcrypt::factory();
		//$json = $emcry->urlsafe_b64decode($LOGGEDUSER);
		$json = Core::urlsafe_b64decode($LOGGEDUSER);
		//$json = stripslashes($LOGGEDUSER);
		$LOGGEDUSER = json_decode($json,true);
		Core::$userInfo = (object)array();
		if($LOGGEDUSER){
			Core::$userInfo->userID = $LOGGEDUSER["ID"];
			Core::$userInfo->admin = $LOGGEDUSER["ADMIN"];
			Core::$userInfo->userName = $LOGGEDUSER["USERNAME"];
		}else{
			return false;
		}
		
		$mRms = new Rms();
		$menu = $mRms->userRoleModule(Core::$userInfo->userName);
		if(!empty($menu)){
			Core::$userInfo->userMenu = '';
			foreach ($menu as $row){
				Core::$userInfo->userRights[] = $row['URL'];
				if(strpos($row['URL'],'prms')){
					Core::$userInfo->userMenu .='<li><a href="'.Core::get_url($row['URL']).'" target="mainFrame">'.$row['NAME'].'</a></li>';
				}elseif(strpos($row['URL'],'flash')){
					Core::$userInfo->userMenu .='<li><a href="/houtai/index'.$row['URL'].'" target="_blank">'.$row['NAME'].'</a></li>';
				}else{
					Core::$userInfo->userMenu .='<li><a href="'.Core::get_url($row['URL']).'" target="mainFrame">'.$row['NAME'].'</a></li>';
				}
			}
		}elseif(Core::$userInfo->admin){
			$menu = Array(0=>Array(
		            'ID' => 5,
		            'NAME' => '角色管理',
		            'PID' => 0,
		            'URL' => '/prms/role',
		            'SORT' => 99
		        ),1 => Array(
		            'ID' => 6,
		            'NAME' => '部门管理',
		            'PID' => 0,
		            'URL' => '/prms/depart',
		            'SORT' => 99
		        ),2 => Array(
		            'ID' => 7,
		            'NAME' => '用户管理',
		            'PID' => 0,
		            'URL' => '/prms/user',
		            'SORT' => 99
		        )
			);
			Core::$userInfo->userMenu = '';
			foreach ($menu as $row){
				if(strpos($row['URL'],'prms')){
					Core::$userInfo->userRights[] = $row['URL'];
					Core::$userInfo->userMenu .='<li><a href="'.Core::get_url($row['URL']).'" target="mainFrame">'.$row['NAME'].'</a></li>';
				}
			}
		}
		return true;
	}
}
?>