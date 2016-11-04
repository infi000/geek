<?php

/**
* 加密解密类
* $Author: JingYunShan $
*
* 加密方法 encrypt_string( $string );
* 解密方法 decrypt_string( $string );
*/

class COMEmcrypt{

	//密钥向量iv
	private $_mcrypt_iv_key = 'g9MRgcaoCFlRgagU6SSBvafRDNd/NKO0dTpS1RvKW7g=';

	//密码字符串
	private $_secret_key = 'somebodyspersonalwebsiteontheInternetoftencontainingpersonaldataphotographsorcontactinformation';

	//算法
	private $_algorithm = MCRYPT_RIJNDAEL_256;

	//加密模式
	private $_encryp_mode = MCRYPT_MODE_CBC;

	//模式对像
	private $_object_mode;

	//加密密钥
	private $_key_algorithm;

	//密钥长度
	private $_key_size;

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
	 * 构造函数
	 *
	*/
	private function __construct(){

		//生成对象
		$this->_object_mode = mcrypt_module_open( $this->_algorithm , '',  $this->_encryp_mode, '');
		//密钥长度
		$this->_key_size = mcrypt_enc_get_key_size($this->_object_mode);
		//加密密钥
		$this->_key_algorithm = substr(md5($this->_secret_key), 0, $this->_key_size );
	}
	
	/**
	 * 生成用户密钥
	 *
	*/
	function create_key_algorithm($user_key = ''){
		if(!empty($user_key)){
			//加密密钥
			$this->_key_algorithm = substr(md5($this->_secret_key . $user_key), 0, $this->_key_size );
		}else{
			//加密密钥
			$this->_key_algorithm = substr(md5($this->_secret_key), 0, $this->_key_size );
		}
	}

	/**
	 * 加密字符串
	 *
	*/
	function encrypt_string( $string ){
		
		//解析密钥向量
		$iv_key = base64_decode($this->_mcrypt_iv_key);

		//初始化
		mcrypt_generic_init($this->_object_mode, $this->_key_algorithm, $iv_key );

		//加密数据
		$encrypted = mcrypt_generic($this->_object_mode, $string );

		//终止加密
		mcrypt_generic_deinit($this->_object_mode);

		return $this->urlsafe_b64encode( $encrypted );

	}

	/**
	 * 解密字符串
	 *
	*/
	function decrypt_string( $string ){

		//解析密钥向量
		$iv_key = base64_decode($this->_mcrypt_iv_key);

		//初始化
		mcrypt_generic_init($this->_object_mode, $this->_key_algorithm, $iv_key );

		//解密数据
		$mdec = @mdecrypt_generic( $this->_object_mode, $this->urlsafe_b64decode( $string ) );
		if(!empty($mdec)){
			$decrypted = str_replace( "\0",'', $mdec);
		}else{
			$decrypted = $string;
		}

		//终止加密
		mcrypt_generic_deinit( $this->_object_mode );

		return $decrypted;

	}

	/**
	 * 析构函数
	 *
	*/
	public function __destruct (){
		//关闭加密模块
		mcrypt_module_close( $this->_object_mode );
	}

	/**
	 * 防止被克隆
	 *
	 */
	public function __clone() {
		throw new Exception('can not clone.' , 503 );
	}

	/**
	 * 安全的base64加密
	 *
	*/
	function urlsafe_b64encode($string) {
	   $data = base64_encode($string);
	   $data = str_replace(array('+','/','='),array('-','_',''),$data);
	   return $data;
	}

	/**
	 * 解析安全的base64加密串
	 *
	*/
	function urlsafe_b64decode($string) {
	   $data = str_replace(array('-','_'),array('+','/'),$string);
	   $mod4 = strlen($data) % 4;
	   if ($mod4) {
		   $data .= substr('====', $mod4);
	   }
	   return base64_decode($data);
	}

}