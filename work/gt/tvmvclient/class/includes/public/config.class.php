<?php
class Config{
	/**
	 * 对像静态变量
	 *
	 * @var object
	 */
	static private $_class;
	
	private function __construct(){
		include_once 'config.inc.php';
	}
	
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
}