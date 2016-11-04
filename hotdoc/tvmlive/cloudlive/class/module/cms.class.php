<?php
class Cms {
	
	/**
	 * 对像静态变量
	 *
	 * @var object
	 */
	static private $_class;
	static private $menu;
	private $_path = '/gfs/dwnews3/www/public/html';
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
		self::$menu = new Rms();
		return self::$_class;	
	}
	
	private function cmsModel( $m ){
		$model = array(
			'index'=>array('title'=>'TVM-直播云管理系统','lefturl'=>Core::get_url('/cms/menu'),'mainurl'=>'?m=10'),
			);
		if(array_key_exists($m,$model)){
			return $model[$m];
		}else{
			return $model['index'];
		}
	}
        
        /**
        * 功能号：10
        * 后台首页
        * */
        function view_default(){
            //实例化模板
			$tp = PHP_Templates::factory();
			
			//设置模板文件
			$tp->setFiles('default');
			
			//输出页面
			$tp->execute();
			
			//释放模板变量
			unset($tp);
        }
        
	function index(){
			
			//实例化模板
			$tp = PHP_Templates::factory();
			
			//设置模板文件
			$tp->setFiles('manager');
			
			//输出页面
			$tp->execute();
			
			//释放模板变量
			unset($tp);
	}
	/**
	 * 后台菜单显示
	 *
	 */
	function menu(){
			
			//实例化模板
			$tp = PHP_Templates::factory();
			
			//设置模板文件
			$tp->setFiles('menu');
			$tp->logouturl = $_GET['_wpnonce'];
			$tp->dataMenu = Core::$userInfo->userMenu;
			//输出页面
			$tp->execute();
			
			//释放模板变量
			unset($tp);
	}

	/**
	 * 颗粒添加
	 *
	 */
	function grainbin(){
			
			//实例化模板
			$tp = PHP_Templates::factory();
			
			//设置模板文件
			$tp->setFiles('grainbin');
			
			//输出页面
			$tp->execute();
			
			//释放模板变量
			unset($tp);
	}

	/**
	 * 退出
	 *
	 */
	function logout(){
			header("Content-Type:text/html; charset=utf-8");
			if(!empty($_COOKIE)){
				foreach ($_COOKIE as $key => $var){
					setcookie($key,'',time()-60*60*24,'/',null,null);
				}
			}
			//unset($_SESSION['LOGGEDUSER']);
			header("Location:?m=5");
	}
}
