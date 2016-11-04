<?php
/*
 * 模板处理类 	
 * Created on 2008-11-12 by <lichunguo@ceopen.cn>
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */
class PHP_Templates {
	
	/**
	 * @var string 模板默认路径
	 * @access private
	 */
	private $_tmpDir = "";
	
	/**
	 * @var string 模板文件路径
	 * @access private
	 */
	private $_file;
	
	/**
	 * @var string 模板名称后缀
	 * @access private
	 */
	private $_prex = '.html';
	
	/**
	 * @var array 存放语言包
	 * @access public
	 */
	public $lang = array();
	
	/**
	 * @var array 存放唯一实例
	 * @access private
	 */
	private static $_tps;
	
	/**
	 * @var array 存放tempates
	 * @access private
	 */
	private $_files = array();
	
	/**
	 * @var array 存放相关赋值变量
	 * @access private
	 */
	private $_varvals = array();
	
	/**
	 * @var string description
	 * @access private
	 */
	private $_target = 'default';
	
	/**
	 * 取模板实例
	 * 
	 * @return void description
	 */
	public static function factory(){
		if (!isset(self::$_tps ) ) {
			$className = __CLASS__;
			self::$_tps = new $className;
		}
		return self::$_tps;	
	}
	
	/**
	 * 模板构造
	 * 
	 * @return void description
	 */
	private function __construct()
	{
		$this->_tmpDir = ROOT."template/";
	}

	/**
	 * 析构函数
	 * 
	 * @return void
	 */
	public function __destruct(){
		unset( $this->_tmpDir,$this->_file,$this->_prex,$this->lang,$this->_files,$this->_varvals,$this->_target );
	}

	/**
	 * 设置模板文件
	 * 
	 * @param string $file 文件路径
	 * @param string $langs 语言包，默认使用目录/template.lang.php
	 * 可指定语言包路径，如:member.template使用member/template.lang.php
	 * @param string $target 存储模板变量,默认为default
	 * @return void description
	 */
	public function setFiles($file, $langs = '', $target = '')
	{
		$this->_file = $this->_tmpDir."{$file}{$this->_prex}";

		if (!file_exists($this->_file) ) {
			throw new Exception("templates:{$this->_file} not found!");
		}

		empty($target) && $target = $this->_target;
		$this->_files[$target] = $this->_file;
		$this->lang = $this->getLanguage($file, $langs);
		unset($file,$langs,$target);
	}
	
	/**
	 * 加载模板对应语言包
	 * 
	 * @param string $file description
	 * @param string $langugage description
	 * @return array description
	 */
	private function getLanguage(& $file, & $language)
	{
		static $_slangs = array();
		if (!empty($language) && is_array($language) ) return $language;
		
		$tmpLang = '';
		if (empty($language) ) {
			$pos = strpos($file, '/');
			$tmpLang = $pos !== false? substr($file, 0, $pos).'.template': 'public.template';			
		} else if (is_string($language) ) {
			$tmpLang = $language;
		} else {
			throw new Exception("Invalid Lang:{$language}");
		}

		if (!empty($_slangs[$tmpLang]) ) return $_slangs[$tmpLang];
		$_slangs[$tmpLang] = Core::lang($tmpLang);
		return $_slangs[$tmpLang];
	}
	
	/**
	 * 模板中引入其它文件
	 * 引用包含外的语言包使用$this->lang[变量]
	 * 内部语言包使用 $lang[变量]
	 * 
	 * @return void description
	 */
	public function includes($file, $langs = '')
	{
		!empty($langs) && ($lang = $this->getLanguage($file, $langs) );
		
		$file = $this->_tmpDir."{$file}{$this->_prex}";
		if (!file_exists($file) ) {
			throw new Exception("templates:{$file} not found!");
		}		
		include_once $file;
	}
	
	/**
	 * 检测是否存在此文件
	 * 
	 * @return boolean description
	 */
	public function existsTpls($file)
	{
		$file = $this->_tmpDir."{$file}{$this->_prex}";
		if (file_exists($file) ) return true;
		return false;
	}
	
	/**
	 * 给模板赋值
	 * 
	 * @param array $vars description
	 * @return void description
	 */
	public function setVar($vars)
	{
		if (!empty($vars) && is_array($vars) ) {
			foreach($vars as $k => $v) {
				$this->$k = trim($v);
			}
		}
		unset($vars,$k,$v);
	}
	
	/**
	 * include模板文件
	 * 模板内语言包使用 $lang[变量]
	 * 
	 * @param string $target 模板存储变量
	 * @param boolean $outPut true则返回内容
	 * @return void|string description
	 */
	public function execute($target = '', $outPut = false)
	{	
		empty($target) && $target = $this->_target;
		$file = $this->_files[$target];
		
		$lang = & $this->lang;
		if (!$outPut) {
			include_once $file;
		} else {
			ob_start();
			include_once $file;
			$content = ob_get_contents();
			ob_end_clean();
			return $content;
		}
	}
	
}
 
?>
