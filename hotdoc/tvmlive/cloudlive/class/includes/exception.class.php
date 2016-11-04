<?php
class BlogException{
	
	private function __construct(){
		set_error_handler(array( __CLASS__ ,'error_handler'));
		set_exception_handler(array( __CLASS__ , 'exception_handler')); 
	}
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
	 * 返回异常信息方法
	 * @author 景云山
	 * @version 2009-8-15
	 * @return void 无返回值
	 */
	function exception_handler( Exception $exception ){
		/* 用户测试，上线后注释 */
		$trace = $exception->getTrace();
		if(is_array($trace[0]['args'][0])){
			foreach ($trace[0]['args'][0] as $key => $item){
				$sql .= $key.' : '.$item."<br />\n";
			}
		}else{
			$sql = "SQL 语句:{$trace[0]['args'][0]}<br />\n";
		}
		$logs = date("Y-m-d H:i:s")." <b>My ERROR</b> [{$exception->getCode()}] {$exception->getMessage()}<br />\n";
		$logs .= "  Fatal error on line {$exception->getLine()} in file {$exception->getFile()}<br />\n";
		$logs .= "{$exception->getTraceAsString()}<br />\n";
		$logs .= $sql;
		$logs .= "PHP " . PHP_VERSION . " (" . PHP_OS . ")<br />\n";
		Core::log($logs,"error/logs");
		/* 用户测试，上线后注释 */
	}
	
	/**
	 * 返回错误信息方法
	 * @author 景云山
	 * @version 2008-9-15
	 * @return void 无返回值
	 */
	public static function error_handler($errno, $errstr, $errfile, $errline){
		switch ($errno) {
			case E_USER_ERROR:
				$logs .=  date("Y-m-d H:i:s")."<b>My ERROR</b> [$errno] $errstr<br />\n";
				$logs .=  "  Fatal error on line $errline in file $errfile";
				$logs .=  ", PHP " . PHP_VERSION . " (" . PHP_OS . ")<br />\n";
				$logs .=  "Aborting...<br />\n";
				break;

			case E_USER_WARNING:
				$logs .= date("Y-m-d H:i:s")."<b>My WARNING</b> [$errno] $errstr<br />\n";
				break;

			case E_USER_NOTICE:
				$logs .= date("Y-m-d H:i:s")."<b>My NOTICE</b> [$errno] $errstr<br />\n";
				break;
		}
		if($logs){
			Core::log($logs,"error/logs");
		}
		/* Don't execute PHP internal error handler */
		return true;
	}
	
	function __destruct(){
		restore_error_handler();
		restore_exception_handler();
	}
}