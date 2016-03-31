<?php
/*
 * 系统共用文件,所有文件应都包含该文件
 *
 */
( isset($_REQUEST['GLOBALS']) || isset($_FILES['GLOBALS']) ) && exit('can\'t use variable: globals!');

header("Content-type: text/html; charset=utf-8");
header( 'Expires: Fri, 08 Aug 2008 08:08:08 GMT' ); 
header( 'Last-Modified: ' . gmdate( 'D, d M Y H:i:s' ) . ' GMT' ); 
header( 'Cache-Control: no-store, no-cache, must-revalidate' ); 
header( 'Cache-Control: post-check=0, pre-check=0', false ); 
header( 'Pragma: no-cache' );
/**
 * 系统错误屏蔽配置
 */
//error_reporting(8191 ^ E_NOTICE);
//error_reporting(0);

/**
 * 引用系统核心类
 * 
 */ 
require_once 'public/core.class.php';

/**
 * 引用系统配置类
 * 
 */ 
require_once 'public/config.class.php';

if(EXECUTIONTIME){
    $time_start = Core::microtime_float();
}

Core::$_config = Config::factory();

Core::$_mdb = Core::setMDatabase();

foreach (array('_POST','_GET','_COOKIE') as $vars){
	if(!empty($$vars)){
		Core::setSlashes($$vars);
	}
}
unset($req, $key, $val); 

Core::$_dataFilter = COMFilter::factory();

/**
 *  引入模板类库
 *
 */
require_once 'public/templates.class.php';

/**
 * 
 * 引入登录检查类
 */
require_once 'login.class.php';

/**
 * 异常处理类
 *
 */
 if( ERRORPROJECT ){
	require_once 'exception.class.php';
	Core::$_myError = BlogException::factory();
}


/**
 * 自动加载
 */
function __autoload($classname){
	Core::loadClass($classname);
}
/**
 * 解析Url地址
 */
Core::getRoute();

if(EXECUTIONTIME){
    $m = memory_get_peak_usage(true);

    $u = 'b';
    if($m > 1024*1024){
            $m = $m/(1024*1024);
            $u = 'M';
    }elseif( $m > 1024){
            $m = $m /1024;
            $u = 'k';
    }

    echo "memory (byte): ", $m . $u, "</br>";
    
    $time_end = Core::microtime_float();
    $time = $time_end - $time_start;

    echo "Did nothing in $time seconds</br>";
}
