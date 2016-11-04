<?php
/**
 * @description 检查变量是否合法类文件
 * @author 景云山 To contact the author write to {@link jingyunshan@myce.net.cn}
 * @version 2008-10-10
 */

class COMFilter {
	/**
	 * var boolean
	 * 
	 * 返回状态,false验证不成功
	 */
	private $_state = false;
	
	/**
	 * @var array 存放唯一实例
	 * @access private
	 */
	private static $_filter;
	
	//出错是否跳转
	public static $_jump = true;
	/**
	 * 字过滤实例
	 * 
	 * @return void description
	 */
	public static function factory()
	{
		if (!isset(self::$_filter ) ) {
			$className = __CLASS__;
			self::$_filter = new $className;
		}
		return self::$_filter;	
	}
	
	/**
	 * @description valueCheck( $varValue , $varType = '' , $errMsg = '' , $isFilter = false , $min = 0 , $max = 0 ) 检查变量是否合法方法
	 * @author 景云山
	 * @version 2008-10-10
	 * @param mixed 	$varValue 	变量值
	 * @param string 	$varType 	值类型 值为 'Email','Chinese','Group','Require','Limit','Integer','DateTime','Date','MultiId','sMultiId'
	 * 								Limit 最大最小值以字节为单位计算, Phone
	 * @param string 	$errMsg  	需要返回的错误信息
	 * @param bool 		$isFilter  	是否过滤特殊字符
	 * @param integer 	$min    	最小值或最大长度
	 * @param integer 	$max    	最大值
	 * @return mixed 	返回变量值
	 */
	public function valueCheck( $varValue , $varType = '' , $errMsg = '' , $isFilter = false , $min = 0 , $max = 0 ) {
		$regEmail =  "/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/";
		$regChinese = "/^[".chr(0xa1)."-".chr(0xff)."]+$/";
		$regInteger = "/^[+-]?\d+$/";
		$regDateTime = "/^[0-9]{4}\-[0-9]{2}\-[0-9]{2} [0-9]{2}\:[0-9]{2}\:[0-9]{2}$/";
		$regDate = "/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/";
		$regMultiId = "/^[0-9,]+$/";
		$regsMultiId = "/^[0-9a-z|,]+$/";
		$regPhone = "/^1[34578]{1}[0-9]{9}\$/";

		$varTemp = explode(',',$varType);
		$varMsg  = explode(',',$errMsg);
		foreach ( $varTemp as $key => $type ) {
			switch ( $type ){
				case 'Email':
					$this->_state = $this->checkReg( $varValue , $regEmail );
					break;
				case 'Integer':
					$this->_state = $this->checkReg( $varValue , $regInteger );
					break;
				case 'Chinese':
					$this->_state = $this->checkReg( iconv( "utf-8" , "gbk" , $varValue ) , $regChinese );
					break;
				case 'Group':
					$varValue = implode( ',' , $varValue );
					if( $min > 0 || $max > 0 ) {
						$this->_state = $this->minTomax( $varValue , $min , $max );
					}
					break;
				case 'Require':
					$this->_state = $this->checkNull( $varValue );
					break;
				case 'Limit':
					$this->_state = $this->maxLength( $varValue , $min , $max );
					break;
				case 'DateTime':
					$this->_state = $this->checkReg( $varValue , $regDateTime );
					break;
				case 'Date':
					$this->_state = $this->checkReg( $varValue , $regDate );
					break;
				case 'MultiId':
					$this->_state = $this->checkReg( $varValue , $regMultiId );
					break;
				case 'sMultiId':
					$this->_state = $this->checkReg( $varValue , $regsMultiId );
					break;
				case 'Phone':
					$this->_state = $this->checkReg( $varValue , $regPhone );
					break;
				default:
					$this->_state = true;
					break;
			}
			if( !$this->_state ) $msg .= $varMsg[ $key ] . ',';
		}
		
		if ($this->return) return $this->_state;
		
		if( $msg ) {
			$msg = rtrim($msg,',');
			$this->gotoError( $msg );
		}
		if( $isFilter ) {
			$varValue = $this->sqlReplace( $varValue );
		}
		return $varValue;
	}
	
	/**
	 * @description checkReg( $varValue , $reg ) 应用正则表达式检查变量是否合法方法
	 * @author 景云山
	 * @version 2008-10-10
	 * @param mixed 	$varValue 	变量值
	 * @param string	$reg 		正则表达式字符串
	 * @return bool
	 */
	
	private static function checkReg( $varValue , $reg ) {
		if( $varValue ) {
			return preg_match( $reg , $varValue );
		} else {
			return true;
		}
	}
	
	/**
	 * @description minTomax( $varValue , $min , $max ) 判断最大值最小值
	 * @author 景云山
	 * @version 2008-10-10
	 * @param mixed 	$varValue 	变量值
	 * @param integer 	$min    	最小值
	 * @param integer 	$max    	最大值
	 * @return bool
	 */
	
	private static function minTomax( $varValue , $min , $max ){
		if(empty($varValue))return true;
		$total = count( explode( ',' , $varValue ));
		if( $total > 0 ) {
			if( $min > 0 && $max == 0 && $total <= $min ) {
				return true;
			} elseif ( $min >= 0 && $max > $min && $min <= $total && $total <= $max ) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	/**
	 * @description maxLength( $varValue , $lengthMax ) 判断最大长度
	 * @author 景云山
	 * @version 2008-10-10
	 * @param mixed 	$varValue 		变量值
	 * @param integer 	$min    	最小字节长度
	 * @param integer 	$max    	最大字节长度
	 * @return bool
	 */
	
	private static function maxLength( $varValue , $min , $max ) {
		if(empty($varValue))return true;
		$varValue = iconv( "utf-8" , "gbk" , $varValue );
		$length = strlen( $varValue );
		if( $min > 0 && $max == 0 && $length <= $min ) {
			return true;
		} elseif ( $min >= 0 && $max > $min && $min <= $length && $length <= $max ) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * @description checkNull( $varValue ) 检查是否为 空 或 ''
	 * @author 景云山
	 * @version 2008-10-10
	 * @param mixed 	$varValue 		变量值
	 * @return bool
	 */
	
	private static function checkNull( $varValue ) {
		if( $varValue || $varValue === '0' ) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * @description sqlReplace( $string ) 解决SQL查询字符串中的通配符以及 ' 问题
	 * @author 景云山
	 * @version 2008-10-10
	 * @param  string 	$string 		被过滤字符串
	 * @return string 					返回过滤后的字符串
	 */
	
	private static function sqlReplace( $string ) {
		$search = array ( "'%'" , "'_'" );
		$replace = array ( '\%' , '\_' );
		return preg_replace( $search , $replace , $string );
	}

	/**
	 * @description gotoError( $msg ) 返回错误信息，并跳转到错误页面
	 * @author 景云山
	 * @version 2008-10-10
	 * @param  string 	$msg			消息内容
	 * @return void
	 */
	
	private static function gotoError( $msg ) {
		$format = Core::get('format');
                ob_end_clean();
		if( $msg ) {
			if(self::$_jump){
				Core::jump($msg,'',2);
			}else{
				$data = array('data'=>'','msg'=>$msg,'status'=>0);
				$json = json_encode($data,256);//php <5.4 256,php>=5.4 JSON_UNESCAPED_UNICODE = 256
				if ($format == 'xml') {
                                    header("Content-type: application/xml; charset=utf-8");
                                    $xml = self::json_to_xml($json);
                                    print $xml;
                                } else {
                                    header("Content-type: application/json; charset=utf-8");
                                    $json = isset($_GET['callback']) ? "{$_GET['callback']}($json)" : $json;
                                    print $json;
                                }                                
                                Core::log($msg,"error/logs");
				exit();
			}
		} else {
			$msg = '数据类型错误，请检查';
			if(self::$_jump){
				Core::jump($msg,'',2);
			}else{
				$data = array('data'=>'','msg'=>$msg,'status'=>0);
				$json = json_encode($data,256);//php <5.4 256,php>=5.4 JSON_UNESCAPED_UNICODE = 256
				if ($format == 'xml') {
                                    header("Content-type: application/xml; charset=utf-8");
                                    $xml = self::json_to_xml($json);
                                    print $xml;
                                } else {
                                    header("Content-type: application/json; charset=utf-8");
                                    $json = isset($_GET['callback']) ? "{$_GET['callback']}($json)" : $json;
                                    print $json;
                                }
                                Core::log($msg,"error/logs");
				exit();
			}
		}
		
	}
	
	
}

?>
