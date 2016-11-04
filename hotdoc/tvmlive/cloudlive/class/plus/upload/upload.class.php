<?php
/**
* 文件上传类文件
* 
* 
* @author 景云山<jingyunshan@ceopen.cn>
* @version 1.0
*/ 
class Upload {

	private $type;
	private $size;
	private $maxSize;
	private $path;
	private $saveFileName;
	private $errorMessage;
	private $name;
	private $randVal;
	private $sizetxt;
	//图片信息数组
	private $imgInfo;

	//小图路径
	private $newName;

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
	* 上传文件
	* @param  Object $file 文件域对象
	* @param  string $fileName 保存为的文件名(参数为空系统会自动生成默认文件名)
	* @return boolean true表示上传成功 , false表示上传失败
	*/
	private function uploadFile( $file , $fileName='' ) {

		if(empty($file['tmp_name'])){
			$this->errorMessage = '没有文件上传或系统无法生成临时文件，不能上传文件。';
			return false;
		}
		//获取文件扩展名
		$extArray = explode( "." , $file[ 'name' ] );

		//判断文件名是否正确
		if ( $fileName ) {
			//设置保存文件名
			$this->saveFileName = $fileName . '.' . strtolower( $extArray[ count( $extArray ) - 1 ] );
		} else {
			//设置系统生成的保存文件名
			$this->saveFileName = $this->createFileName() . '.' . strtolower( $extArray[ count( $extArray ) - 1 ] );
		}

		//获取文件大小
		$this->size = $file[ 'size' ];
		switch ( $file[ 'error' ] ) {
			case UPLOAD_ERR_OK:
				if( $file[ 'size' ] > $this->maxSize ) {
					$this->errorMessage = '文件大小不能超过'. $this->sizetext( $this->maxSize ) .'。';
					unset($file,$fileName,$extArray);
					return false;
				}
				if( !in_array( $file[ 'type' ] , $this->type ) && $this->type != 'alltype' ) {
					$this->errorMessage = '上传文件的类型错误。';
					unset($file,$fileName,$extArray);
					return false;
				}
				
				//屏蔽错误输出
				error_reporting(0);
				if( !move_uploaded_file( $file[ 'tmp_name' ] , $this->path . $this->saveFileName ) ) {
					$this->errorMessage = '文件上传失败。可能原因目录没有写入权限。';
					unset($file,$fileName,$extArray);
					return false;
				}
				unset($file,$fileName,$extArray);
				return true;
			case UPLOAD_ERR_INI_SIZE:
				$this->errorMessage = '文件大小超过系统允许上传' . get_cfg_var( 'upload_max_filesize' ) . '的最大值。';
			case UPLOAD_ERR_PARTIAL:
				$this->errorMessage = '文件只有部分被上传。';
			case UPLOAD_ERR_NO_FILE:
				$this->errorMessage = '没有文件被上传。';
			case UPLOAD_ERR_FORM_SIZE:
				$this->errorMessage = '上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值。';
			case UPLOAD_ERR_NO_TMP_DIR:
				$this->errorMessage = '找不到临时文件夹。';
			case UPLOAD_ERR_CANT_WRITE:
				$this->errorMessage = '文件写入失败。';
			default:
				$this->errorMessage = '未知错误，请重试。';
		}
		unset($file,$fileName,$extArray);
		return false;
	}

	/**
	* 获取上传文件大小
	* 说明：执行uploadFile函数后调用此方法
	* @return number 返回上传文件大小
	*/
	public function getFileSize( ) {
		return $this->size;
	}

	/**
	 * 文件上传
	 * 
	 * @param object $file 文件域对像
	 * @param array $fileType 允许上传文件类型
	 * @param integer $fileSize 文件的最大字节数
	 * @return array 返回上传文件的信息
	 */
	function fileUpLoad( $file , $savePath , $fileType , $filename = '' , $fileSize = 204800 ){

		//设置文件类型大小限制
		$this->type = $fileType;
		$this->maxSize = $fileSize;

		//判断保存路径是否正确
		if( !is_dir( $savePath ) ) {
			$this->errorMessage = '保存路径不存在！';
		} elseif ( $savePath{ strlen( $savePath ) - 1 } === '/' ) {
			$this->path = $savePath;
		} else {
			$this->errorMessage = '保存路径尾部需要带 / ';
		}
		if( !empty($file) ) {
			//上传文件
			$flag = $this->uploadFile( $file , $filename );
			if( $flag ) {
				//获取文件名与大小
				$picture[] = $this->getFileName( );
				$picture[] = $this->getFileSize( );
			}
		}else{
			//显示错误信息
			$this->errorMessage = '没有文件被上传！';
		}
		return $picture;
	}

	/**
	 * 生成图片缩略图
	 * 
	 * @param string $filename 图片地址
	 * @return array 返回上传文件的信息
	 */
	static function createSmallPic($filename){
		$file = $this->miniatureImage($filename,$sfolder,$width,$height);
		unset($small,$filename,$sfolder,$width,$height);
		return $file;
	}

	/**
	* 获取上传文件保存到服务器端的名字
	* 说明：执行uploadFile函数后调用此方法
	* @return string 返回上传文件名字
	*/
	public function getFileName( ) {
		return $this->saveFileName;
	}

	/**
	* 获取错误信息
	* 说明：执行uploadFile函数后调用此方法
	* @return string 返回上传失败的错误信息
	*/
	public function getErrorMessage( ) {
		return $this->errorMessage;
	}

	/**
	* 生成文件名字符串
	* @return string 返回生成的文件名字符串
	*/
	private function createFileName( ) {
		$time = gettimeofday();
		$this->name = 'u' . $time[ 'sec'] . $time[ 'usec' ] . $this->getRand( 6 );
		unset( $time );
		return $this->name;
	}

	/**
	* 获取随机数字符串
	* @param  numbwr $length 生成随机数的长度
	* @return string 返回随机数字符串
	*/
	private function getRand( $length ) {
		$radix = '123456789';
		$this->randVal = '';
		$max = strlen( $radix )-1;
		for( $times = 0 ; $times < $length ; $times++ ) {
			$index = mt_rand( 0 , $max );
			$this->randVal .= $radix[ $index ];
		}
		unset($length,$radix,$max,$times,$index);
		return $this->randVal;
	}

	/**
	* 格式化文件大小
	* @param number $size 文件大小 说明：以字节为单位
	* @return string 返回格式化后的文件大小
	*/
	private function sizetext( $size ) {
		if( $size > 0 ) {
			$s = $size/1024/1024;
			if( $s > 1){
				$this->sizetxt = round( $s , 2 ).'M';
			}elseif( $s * 1024 > 1 ) {
				$this->sizetxt = round( $s * 1024 , 2 ).'k';
			}
		}else{
			$this->sizetxt = '0k';
		}
		unset( $size , $s );
		return $this->sizetxt;
	}
	/**
	 * 获取图片信息
	 * 
	 * @param string $photo 图片路径
	 * @return array 返回图片信息数组
	 */
	private function getInfo($photo) {
		$imageInfo = getimagesize($photo);
		$this->imgInfo['width'] = $imageInfo[0];
		$this->imgInfo['height'] = $imageInfo[1];
		$this->imgInfo['type'] = $imageInfo[2];
		$this->imgInfo['name'] = basename($photo);
		unset( $imageInfo,$photo );
		return $this->imgInfo;
	}

	/**
	 * 获取图片信息
	 * 
	 * @param string $photo 图片路径
	 * @param string $sfolder 保存小图文件夹
	 * @param integer $width  小图宽度
	 * @param integer $height 小图高度
	 * @return string 返回小图路径
	 */
	private function miniatureImage($photo,$sfolder,$width=128,$height=128) {
		if(!is_file($photo))return false;
		$imgInfo = $this->getInfo($photo);
		$newName = 's'.substr($imgInfo['name'],0,strrpos($imgInfo['name'], '.')).'.jpg';//新图片名称
		if($imgInfo['type'] == 1) {
			$img = imagecreatefromgif($photo);
		} elseif($imgInfo['type'] == 2) {
			$img = imagecreatefromjpeg($photo);
		} elseif($imgInfo['type'] == 3) {
			$img = imagecreatefrompng($photo);
		} else {
			$img = '';
		}
		if(empty($img)) return False;
		$width = ($width > $imgInfo['width']) ? $imgInfo['width'] : $width;
		$height = ($height > $imgInfo['height']) ? $imgInfo['height'] : $height;
		$srcW = $imgInfo['width'];
		$srcH = $imgInfo['height'];
		if ($srcW * $width > $srcH * $height) {
			$height = round($srcH * $width / $srcW);
		} else {
			$width = round($srcW * $height / $srcH);
		}
		if (function_exists('imagecreatetruecolor')) {
			$newImg = imagecreatetruecolor($width, $height);
			$back = imagecolorallocate($newImg, 255, 255, 255);
			imagefilledrectangle($newImg, 0, 0,$width, $height, $back);
			ImageCopyResampled($newImg, $img, 0, 0, 0, 0, $width, $height, $imgInfo['width'], $imgInfo['height']);
		} else {
			$newImg = imagecreate($width, $height);
			$back = imagecolorallocate($newImg, 255, 255, 255);
			imagefilledrectangle($newImg, 0, 0,$width, $height, $back);
			ImageCopyResized($newImg, $img, 0, 0, 0, 0, $width, $height, $imgInfo['width'], $imgInfo['height']);
		}

		if ($this->toFile) {
			$path = trim(dirname( $photo ),'/').'/'.$sfolder;
			if (file_exists($path.'/'.$newName)) @unlink($path.'/'.$newName);
			ImageJPEG($newImg,$path.'/'.$newName);
			return $path.'/'.$newName;
		} else {
			ImageJPEG($newImg);
		}
		ImageDestroy($newImg);
		ImageDestroy($img);
		unset($photo,$sfolder,$width,$height,$path,$back,$srcW,$srcH,$imgInfo);
		return $this->newName;
	}
	
}


