<?PHP
class COMConvgbtobig{
   private static $gbString =  "万与丑专业丛东丝丢两严丧个丬丰";
   private static $bigString = "萬與醜專業叢東絲丟兩嚴喪個爿";

   private static $gbCode;
   private static $bigCode;
   public function __construct(){
	   	if(is_file('/data/dwnews3/siword/word.txt')) {
	   	    $words = file('/data/dwnews3/siword/word.txt');
	   	    self::$gbString = $words[1];
	   	    self::$bigString = $words[0];
	   	}  
   		self::convCode();
   }
   private static function convCode(){
   		self::$gbString = iconv('utf-8','gbk',self::$gbString);
   		self::$bigString = iconv('utf-8','gbk',self::$bigString);
    	$gbLength = strlen(self::$gbString);
    	for($i = 0;$i < $gbLength;$i = $i+2){
    		$hbyte = ord(self::$gbString{$i});
    		$lbyte = ord(self::$gbString{$i+1});
    		self::$gbCode["$hbyte|$lbyte"] = substr(self::$bigString,$i,2);
    	}
    }
    
	function gbToBig($string=''){
   		$string = iconv('utf-8','gbk',$string);
   		$result = '';
   		$strLength = strlen($string);
		for($i=0;$i<$strLength;$i++){
			$byteH = substr($string,$i,1);
			if(ord($byteH)>=129){
				$char = substr($string,$i,2);
				$big = self::$gbCode[ord($char{0}).'|'.ord($char{1})];
				if(empty($big)){
					$result .= $char;
				}else{
					$result .= $big;
				}
				$i++;
			}else{
				$result .= $byteH;
			}
		}
		return iconv('gbk','utf-8',$result);
	}
}