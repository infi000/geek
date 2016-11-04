<?php
/**
 * @Description :公共方法类文件（社区系统）
 * To contact the author write to {@link jingyunshan@myce.net.cn}
 * @author 景云山
 */
class COMCommon{
	/**
	 * @Description :getMD5($pws,$user) 获取MD5加密字符串
	 * @param $pws 密码字符串
	 * @param $user 用户帐号字符串
	 * @return string 加密密码
	 */
	static function getMD5($user,$pws){
       // md5(md5(密码明文)+用户名)
       $m = md5(strtolower($user).md5($pws)); 
       return $m; 
	}
	/**
	 * @Description :DateCheck 检查日期时间类型
	 * @param $d 需要检查的字符串
	 * @return boolean
	 */
	static function DateTimeCheck($d){
		$reg = "/^[0-9]{4}\-[0-9]{2}\-[0-9]{2} [0-9]{2}\:[0-9]{2}\:[0-9]{2}$/";
		return preg_match($reg, $d);
	}
	/**
	 *@Description :checkInteger 判断是否为整数
	 * @param $str 需要检查的字符串
	 * @return boolean
	 */
	static function checkInteger($str){
		$reg = "/^[0-9]+$/";
		return preg_match($reg, $str);
	}
	/**
	 * @Description :maskHtmlCode 去除HTML标记
	 * @param $str 需要过滤的字符串
	 * @return 返回过滤后的字符串
	 */
	static function maskHtmlCode($str)
	{
		return preg_replace("'(<[^<]*[^>]>)+'","",$str);
	}
	/**
	 * @Description :checkLength 检查参数长度
	 * @param $str 需要过滤的字符串
	 * @return 返回过滤后的字符串
	 */
	static function checkLength($str,$len=0)
	{
		if(strlen($str) > $len)exit('参数非法！');
		return $str;
	}
	/**
	 * 获取中文字符串长度
	 *
	 * @param unknown_type $txt
	 * @return unknown
	 */
	public static function textlen($txt){
		$txt = iconv( "utf-8" , "gbk" , $txt );
		$len = strlen($txt);
		return $len;
	}
	/**
	* @Description :cutSubstr 截取字符串
	* @param $string　(字符串　字符串类型)
	* @param $start　(开始截取位置　整型)
	* @param $length　(截取长度　整型)
	* @return String (返回字符串)
	*/
	static function  cutSubstr($string,$start=0,$length=0,$tail=''){
		$string = iconv('utf-8','gbk',$string);
		$l = $length;
                if(strlen($string) <= $length) {
			return iconv('gbk','utf-8',$string);
		}
		if($l == 0)$l = strlen($string);
		if($start< 0 || $l < 0){
			$value = $string;
		}
		if(($start+$l) >= strlen($string)){
			$value = substr($string,$start,$l);
		}else{
			$j=0;
			$num=$l;
			for($i=$start; $i< $num;$i++){
				if(ord(substr($string,$i,1))>0xa0) $j++;
			}
			if($j%2!=0){
				$num=$num+1;
			}
			$value = substr($string,$start,$num).$tail;
		}
		return iconv('gbk','utf-8',$value);
	}
	//替换内容
	static function ContentReplace($string){
		$search = array ("'\"'","'/'","'\r\n'","'—'","'·'");
		$replace = array ('\"','\/','<br>','-','.');
		return preg_replace($search,$replace,$string);
	}
	//解决SQL查询字符串中的通配符问题
	static function SqlReplace($string){
		$search = array ("'%'","'_'","'\\\'","'\''");
		$replace = array ('\%','\_','\\\\\\','');
		return preg_replace($search,$replace,$string);
	}
	//返回随机数
	static function getCode($length = 32){
		$str = '0123456789';
		$result='';
		$l=strlen($str)-1;
		for($i=0;$i<$length;$i++){
			$num = mt_rand(0, $l);
			$result .= $str[$num];
		}
		return $result;
	}
	//返回UNIX时间戳
	static function microtime_float(){
		list($usec, $sec) = explode(" ", microtime());
		return (float)$sec;
	}
	//获得Hash唯一值
	static function getHash(){
		$time = dechex(self::microtime_float());
		$rand = dechex(intval(self::getCode(8)));
		return $time.$rand;
	}
	//替换逗号
	static function Blog_ReplaceComma($str){
		$sear = array("，","；",";"," ");
		return str_ireplace($sear,",",$str);
	}
	/**
	 * @Description :DateCheck 检查日期时间类型
	 * @param $d 需要检查的字符串
	 * @return boolean
	 */
	static function DateCheck($d){
		$reg = "/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/";
		return preg_match($reg, $d);
	}
	/**
	 * @Description :mask_HTMLCODE($str)去除HTML标记
	 * @param $str 需要去除HTML标记的字符串
	 * @return string
	 */
	static function mask_HTMLCODE($str){
		return preg_replace("'(<[^<]*[^>]>)+'","",$str);
	}
	/**
	 * @Description :checkNumber 判断是否为数字
	 * @param $str 需要检查的字符串
	 * @return boolean
	 */
	static function checkNumber($str){
		$reg = "/^\d+(\.\d+)?$/";
		return preg_match($reg, $str);
	}
	/**
	 * @Description :immitCheckNumber SQL注入判断是否为数字
	 * @param $str 需要检查的字符串
	 * @param $flag 检查为空标识
	 * @return 
	 */
	static function immitCheckNumber($str,$flag=0){
		if($flag === 0){
			if(self::checkNumber($str))return $str;
			else exit('非法输入！');
		}elseif($str){
			if(self::checkNumber($str))return $str;
			else exit('非法输入！');
		}
	}
	/**
	 * @Description :SqlfilterText 过滤SQL命令，防SQL注入
	 *
	 * @param $string  需要过渡的字符串
	 * @return string
	 */
	static function SqlfilterText($string="")
	{
		$search = array ("'<script[^>]*?>.*?</script>'si",  // 去掉 javascript
		"'&(lt|#60);'i","'javascript'i","'\''","'\\\'","'\"'",
		"'&(gt|#62);'i","'localgroup'i","'chr'i",
		"'truncate'i","'sysobjects'i","'syscolumns'i","'master'i","'/add'i","'cmdshell'i"
		,"'drop'i");
		$replace = array ("");
		return preg_replace($search, $replace,$string);
	}

	/**
	 * @Description :scriptFilter 过滤js脚本，防脚本注入
	 *
	 * @param $string  需要过渡的字符串
	 * @return string
	 */
	static function scriptFilter( $string ){
		$search = array ( "'<script[^>]*?>.*?</script>'si" );
		$replace = array ( "" );
		return preg_replace( $search , $replace , $string );
	}

	/**
	 * @Description :SqlfilterTitle($CheckString='')过滤SQL命令，防SQL注入
	 *
	 * @param $CheckString  需要过渡的字符串
	 * @return string
	 */
	static function SqlfilterTitle($CheckString=''){
	  $search = array ("'<script[^>]*?>.*?</script>'si",  // 去掉 javascript
					 "'[\r\n]|[\s]+'", "'　'",            // 去掉空白字符
					 "'&(lt|#60);'i","'\''","'\\\'","'\"'",
					 "'&(gt|#62);'i","'[<]|[>]'","'delete'i","'update'i","'sele'i","'insert'i",
					 "'into'i","'where'i","'set'i"
					 ,"'from'i","'script'i","'value'i","'exe'i","'localgroup'i","'chr'i",
					 "'truncate'i","'sysobjects'i","'syscolumns'i","'master'i","'/add'i","'cmdshell'i"
					 ,"'drop'i");
	  $replace = '';
	  return preg_replace($search, $replace,$CheckString);
	 }
	 /**
	 * @Description :Blog_GetString($field,$arr) 获取字段可能的值
	 * @param $field 字段名称
	 * @param $arr 字段值数组
	 * @return string
	 */
	static function Blog_GetString($field,$arr){
		if(!empty($arr)){
			foreach ($arr as $c){
				$w .= $field.' = '.$c.' or ';
			}
			$w = ' and ('.substr($w,0,strlen($w)-3).')';
		}
		return $w;
	}
	/**
	 * @Description :Blog_GetTimeZero($time,$step=1) 获取时间零点值
	 * @param $time  字符串日期时间值
	 * @param $step  标识当天还是第二天零点
	 * @return string
	 */
	static function Blog_GetTimeZero($time,$step=1){
		if(!empty($time)){
			$hour = strtotime($time);
			$date = getdate($hour);
			if($step >0) $mode = $date['mday']+1;
			else $mode = $date['mday'];
			$cdate = $date['year'].'-'.$date['mon'].'-'.$mode.' 00:00:00';
		}else return false;
		return $cdate;
	}
	/**
	 * @Description :Blog_GetTimeZero($time,$step=1) 获取时间零点值
	 * @param $time  字符串日期时间值
	 * @param $step  标识当天还是第二天零点
	 * @return string
	 */
	static function sysTime($time=0 ) {
		$now = date('Y-m-d H:i:s',$time?$time:time());
		return $now;
	}
	/**
	 * @Description :Blog_GetTString($field,$val,$val2) 获取字段两个可能的值
	 * @param $field 字段名称
	 * @param $val 字段值一
	 * @param $val2 字段值二
	 * @return string
	 */
	static function Blog_GetTString($field,$val,$val2){
		if(self::DateCheck($val))$val = "UNIX_TIMESTAMP('".self::Blog_GetTimeZero($val,-1)."')";
		if(self::DateCheck($val2))$val2 = "UNIX_TIMESTAMP('".self::Blog_GetTimeZero($val2)."')";
		if($val && $val2)$w = ' and ('.$field.' >= '.$val.' and '.$field.' <= '.$val2.')';
		elseif ($val){
			$w = ' and '.$field.' >= '.$val;
		}elseif ($val2){
			$w = ' and '.$field.' <= '.$val2;
		}
		return $w;
	}
	/**
	 * @Description :GetFstring 获取日期字段两个可能值的组合条件字串
	 * @param $field 字段名称
	 * @param $vval 字段值一
	 * @param $vval2 字段值二
	 * @return string
	 */
	static function GetFstring($field,$vval,$vval2){
		if(self::DateCheck($vval))$val = $vval;
		if(self::DateCheck($vval2))$val2 = $vval2;
		if($val && $val2)$w = " and FROM_UNIXTIME($field,'%Y-%m-%d') >= '$val' and FROM_UNIXTIME($field,'%Y-%m-%d') <= '$val2'";
		elseif ($val){
			$w = " and FROM_UNIXTIME($field,'%Y-%m-%d') >= '$val'";
		}elseif ($val2){
			$w = " and FROM_UNIXTIME($field,'%Y-%m-%d') <= '$val2'";
		}
		return $w;
	}
	/**
	 * @Description :GetWstring 获取字符型字段条件字符串
	 * @param $field 字段名称
	 * @param $val 字段值
	 * @param $type 字段类型
	 * @param $sign 比较运算符
	 * @return string
	 */
	static function GetWstring($field,$val,$type='s',$sign='='){
		if (isset($val)){
			if($type === 's' && $val !== ''){
				if($sign === 'like')$w = " and $field $sign '%$val%'";
				else $w = " and $field $sign '$val'";
			}elseif($type === 'i')$w = " and $field $sign ".(int)$val;
		}
		return $w;
	}
	/**
	 * @Description :checkSelect($int,$search,$value) 检查select值
	 * @param $int 需要检查的值
	 * @param $search 需要比较的值
	 * @param $value 默认值
	 * @return integer
	 */
	static function checkSelect($int,$search,$value){
		if(self::checkInteger($int)){
			if($int === $search)unset($int);
		}else unset($int);
		return $int;
	}
	/**
	 * @Description :cutString($str,$length,$replace) 截取字符串
	 * @param $str 需要截取的字符串
	 * @param $length 长度
	 * @param $replace 替换为的值
	 * @return string
	 */
	static function cutString($str,$length,$replace = '...'){
		$str= stripslashes($str);
		if(strlen($str)>$length){
			$str = substr($str,0,$length).chr(0).$replace;
		}
		return $str;
	}
	/**
	 * @Description :titleString($str,$length) title值
	 * @param $str 字符串
	 * @param $length 长度
	 * @return string
	 */
	static function titleString($str,$length){
		if(!empty($str)){
			$str= stripslashes($str);
			$str = self::replaceQuotationMarks(self::replaceQuotationMarks($str,"'",array('‘','’')),"\"",array('“','”'));
	    	if(strlen($str)>$length)$title = "title=\"$str\"";
		}
		return $title;
	}
	/**
	 * @Description :boolString($value,$yes)Boolean值替换
	 * @param $value 值
	 * @param $yes 显示为Y的值
	 * @return string
	 */
	static function boolString($value,$yes){
		if($value === $yes)$t = 'Y';
		else $t = 'N';
		return $t;
	}
	/**
	 * @Description :clearSame($value,$separator)清除相同值
	 * @param $value 值
	 * @param $separator 分隔符
	 * @return string
	 */
	static function clearSame($value,$separator){
		if($value){
			$value = implode($separator,array_unique(explode($separator,$value)));
		}
		return $value;
	}
	/**
	 * 替换英文标点苻号为中文成对出现的标点苻号
	 *
	 * @param string $haystack
	 * @param string $needle (',")
	 * @param array $replacement (array(‘,’),array(“,”))
	 * @return string
	 */
	static function replaceQuotationMarks( $haystack , $needle , $replacement ){
		$i = 0;
		while(($pos = strpos($haystack,$needle))!==false){
			if($i%2 === 0){
				$haystack = substr_replace($haystack, $replacement[0], $pos, 1);
			}else{
				$haystack = substr_replace($haystack, $replacement[1], $pos, 1);
			}
			$i++;
		}
		return $haystack;
	}
	/**
	 * 替换英文标点苻号为中文成对出现的标点苻号
	 *
	 * @param string $haystack
	 * @param string $needle (',")
	 * @param array $replacement (array(‘,’),array(“,”))
	 * @return string
	 */
	static function replaceQuotationMarkss( $haystack , $needle , $replacement ){
		
		if(!empty($needle)){
			$separator = explode(',',$needle);
			foreach($separator as $key=>$cell){
				$i = 0;
				while(($pos = strpos($haystack,$cell))!==false){
					if($i%2 === 0){
						$haystack = substr_replace($haystack, $replacement[$key][0], $pos, 1);
					}else{
						$haystack = substr_replace($haystack, $replacement[$key][1], $pos, 1);
					}
					$i++;
				}
			}
		}
		return $haystack;
	}

	//utf-8字符串截取
	static function cutStringUTF8($string, $length, $dot = '') {
		if(strlen($string) <= $length) {
			return $string;
		}
		$strcut = '';
		$n = $tn = $noc = 0;
		while($n < strlen($string)) {
			$t = ord($string[$n]);
			if($t == 9 || $t == 10 || (32 <= $t && $t <= 126)) {
				$tn = 1; $n++; $noc++;
			} elseif(194 <= $t && $t <= 223) {
				$tn = 2; $n += 2; $noc += 2;
			} elseif(224 <= $t && $t <= 239) {
				$tn = 3; $n += 3; $noc += 2;
			} elseif(240 <= $t && $t <= 247) {
				$tn = 4; $n += 4; $noc += 2;
			} elseif(248 <= $t && $t <= 251) {
				$tn = 5; $n += 5; $noc += 2;
			} elseif($t == 252 || $t == 253) {
				$tn = 6; $n += 6; $noc += 2;
			} else {
				$n++;
			}

			if($noc >= $length) {
				break;
			}

		}
		if($noc > $length) {
			$n -= $tn;
		}
		$strcut = substr($string, 0, $n);
		return $strcut.$dot;
	}

	//GBK字符串截取
	static function cutStringGBK($string, $length, $dot = '') {
		if(strlen($string) <= $length) {
			return $string;
		}
		$strcut = '';
		for($i = 0; $i < $length; $i++) {
			$strcut .= ord($string[$i]) > 127 ? $string[$i].$string[++$i] : $string[$i];
		}
		return $strcut.$dot;
	}
        
        /**
         * 获取token
         */
         static public function get_token($phone='',$password=''){
            $uahost = Core::$_config->uaserver['uahost'];
            //$systvmid = Core::$_config->uaserver['tvmid'];
            //$sysvcode = Core::$_config->uaserver['vcode'];
            $sysapp = Core::$_config->uaserver['app'];
            $systid = Core::$_config->uaserver['tid'];
            $systvmid = $phone;
            $sysvcode = md5($password);
            //管理员登录
            $urlcloud = 'http://'.$uahost.'/login?tvmid='.$systvmid.'&validateCode='.$sysvcode.'&app='.$sysapp.'&license=true&format=json';
            $apidata = Core::request_url($urlcloud);
            if($apidata){
                    $admin=json_decode($apidata);
                    $token = $admin->access_token;
                return $token;
            }else{
                return '';
            }
            
        }
        /**
         * 获取频道信息
         */
         static public function get_channel($token){
            $livehost = Core::$_config->liveserver['host'];
            //管理员登录
            $urlcloud = 'http://'.$livehost.'/approve/getchannel?format=json&access_token='.$token;
            $apidata = Core::request_url($urlcloud);
            if($apidata){
                    $channel=json_decode(gzdecode($apidata));
                return $channel;
            }else{
                return '';
            }
            
        }
        
        
        /**
         * 获取token验证
         */
         static public function get_tokenverify($phone,$groupcode){
            $livehost = Core::$_config->liveserver['host'];
            $systvmid = $phone;
            $security = urlencode(base64_encode(gzcompress("$systvmid|$groupcode||f04c8da0fa8b4088bc712350a0696532")));
           // $security = urlencode(base64_encode(gzcompress("$systvmid|c7kb40||f04c8da0fa8b4088bc712350a0696532")));
            //管理员登录
            $urlcloud = 'http://'.$livehost.'/token/uatoken?app=js&string='.$security.'&format=json';
            $apidata = Core::request_url($urlcloud);
            if($apidata){
                    $admin=json_decode(gzdecode($apidata));
                    $token = $admin->access->token;
                return $token;
            }else{
                return '';
            }
            
        }
        
         /**
         * 获取token验证
         */
         static public function get_SecurityVerify($phone,$groupcode){
            $livehost = Core::$_config->liveserver['host'];
            $systvmid = $phone;
            $security = urlencode(base64_encode(gzcompress("$systvmid|$groupcode||f04c8da0fa8b4088bc712350a0696532")));
            $urlcloud = 'http://'.$livehost.'/token/uatoken?app=js&format=json';
            return array('url'=>$urlcloud,'security'=>$security);            
        }
        
        /**
         * 获取云token
         */
         static public function get_tokenyun(){
            //管理员登录
            $urlcloud = 'http://api.tvmcloud.com/passport/login.php?grant_type=username&username=13521831891&password=tvminingyj&client_id=1976&client_secret=ae0d7c986d72de71';
            $apidata = Core::request_url($urlcloud);
            if($apidata){
                    $json=json_decode(gzdecode($apidata));
                    $token = $json->access_token;
                return $token;
            }else{
                return '';
            }
            
        }
        
        /**
	 * 获取组代码
	 * */
        static public function get_groupcode($userid){
            $livegroup = bLiveGroup::getOne("userid=?", $userid);
            if($livegroup){
                $groupcode = $livegroup->code;
            }
            return $groupcode;
        }
        
         /**
         * 通过用户名密码获取云token
         */
         static public function get_tokenyun2($tvmid,$pass){
            //管理员登录
            $urlcloud = 'http://api.tvmcloud.com/passport/login.php?grant_type=username&username='.$tvmid.'&password='.$pass.'&client_id=1976&client_secret=ae0d7c986d72de71';
            $apidata = Core::request_url($urlcloud);
            if($apidata){
                    $json=json_decode(gzdecode($apidata));
                    $token = $json->access_token;
                return $token;
            }else{
                return '';
            }
            
        }
        
         /**
         * 通过用户名密码获取云token
         */
         static public function verify_tokenyun($token){
            //管理员登录
            $urlcloud = 'http://api.tvmcloud.com/passport/get_permission.php?access_token='.$token;
            $apidata = Core::request_url($urlcloud);
            if($apidata){
                    $json=json_decode(gzdecode($apidata));print_r($json);
                    $token = $json->token;
                return $token;
            }else{
                return '';
            }
            
        }
        
        /**
         * 向云添加盒子
         */
         static public function add_boxyun($userid,$sn,$name,$groupid='',$grouptitle=''){
            $flag = false;
            //管理员登录
            $token = self::get_tokenyun();
            $urladd = 'http://api.saas.tvm.cn/live/addbox.php?access_token='.$token.'&sn='.$sn.'&title='.urlencode($name);
            $apidata = Core::request_url($urladd);
            if($apidata){
                $json=json_decode($apidata);
                $id = $json->data->id;
                if($id && ($groupid || $grouptitle)){
                    $urlgroup = 'http://api.saas.tvm.cn/live/addgroup.php?access_token='.$token.'&boxid='.$id.'&groupid='.$groupid.'&grouptitle='.urlencode($grouptitle);
                    $apidata = Core::request_url($urlgroup);
                    if($apidata){
                        $json=json_decode($apidata);
                        $groupid = $json->data->groupid;
                        $title = $json->data->grouptitle;
                        $code = $json->data->code;
                        if($groupid && $title && $code){
                            $lgroup = new bLiveGroup();
                            $flag = $lgroup->add($groupid,$userid,$title,$code);
                        }
                    }
                }
            }
            return $flag;
        }
        
        static public function uploadYun($filepath,$md5file=""){
        Ts3_Client::$ServiceURL = "http://ts3.tvm.cn/api/v1";
        Ts3_Client::$AccessKey  = "ji2c8frdffh4";
        Ts3_Client::$SecretKey  = "3gjlzoUN7DuHEU+w+ttHI9vvYWm1YctUHKMN";
        $_pichost = 'http://bcdns.ts3.stcdn.wifiplus.com';
        if($md5file){
            $urluuid = self::createUuid($md5file);
        }else{
            $urluuid = self::createUuid($filepath);
        }
        $filext = COMFile::getNameSuffix($filepath);
        $object = '/'.substr($urluuid,0,2).'/'.substr($urluuid,2,2).'/'.$urluuid.'.'.$filext;
        $bucket = "nqeqkr";
        $rs = Ts3_Client::ObjectPut($bucket, $object, array("file" =>$filepath));
        $url = '';
        if (!isset($rs->error)||$rs->error->message =='Object Already Exists') {
             $url = $_pichost.'/'.$bucket.$object;
        }
        return $url;
    }
    
    /**
     * Create a new uuid
     *
     * @param string $prefix
     * @return string
     */
    static function createUuid($string)
    {
        $chars = md5($string);
        $uuid  = substr($chars,0,8).'-'
                . substr($chars,8,4).'-'
                . substr($chars,12,4).'-'
                . substr($chars,16,4).'-'
                . substr($chars,20,12);
        return $uuid;

    }
    
    /**
     * 返回列表序号
     */
    public static function order() {
        return  Core::$object->number;
    }
}