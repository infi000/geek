<?php
class COMFile{
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
	 * 删除文件
	 * 
	 * @param string $path 文件地址
	 * @return void
	 */
	static function deleteFile($path){
		$fileDir = parse_url($path);
		if(is_file('..'.$fileDir['path'])){
			unlink('..'.$fileDir['path']);
		}
		unset($path,$fileDir);
	}

	/**
	 * 获取文件扩展名
	 * 
	 * @param string $fileName 文件名
	 * @return string 文件扩展名
	 */
	static function getNameSuffix($fileName){
		$pos = strrpos($fileName,'.');
		if($pos > 0){
			$suffix = substr($fileName,$pos+1);
		}
		unset($fileName,$pos);
		return $suffix;
	}

	/**
	 * 生成文件
	 * 
	 * @param string $filePath 文件名
	 * @param string content 文件内容
	 */
	static function createFile($filePath,$content){
		$fp = fopen($filePath, 'wb');
		fwrite($fp, $content);
		fclose($fp);
		unset($fp);
	}
	/**
	 * 生成文件
	 * 
	 * @param string $path 文件生成路径
	 * @param string txt 文件内容
	 */
	function writeFile($path,$txt){
		try{
			$fp = fopen($path,'wb');
			fwrite($fp, $txt);
			fclose($fp);
			return true;
		}catch(Exception $e){
			return false;
		}
		unset($fp,$txt);
	}

	/**
	* 生成目录
	* @return 
	*/
	function createFolder( $dir ){
		//$dir = dirname($dir);
		$cdir = explode('/',$dir);
		$temp = array_shift($cdir);
		if (!file_exists($temp)){
			mkdir($cdir[0],0600);
			//chmod($cdir[0],0600);
		}
		for($i = 0;$i<count($cdir);$i++){
			if(!empty($cdir[$i])){
				$temp .= '/'.$cdir[$i];
				if (!file_exists($temp)){
					mkdir($temp,0600);
				}
			}
		}
		return $temp;
	}
}
?>