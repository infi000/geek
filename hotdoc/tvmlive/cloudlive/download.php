<?php
header("Content-type: text/html; charset=utf-8");
$filename = $_GET['name'];
if(empty($filename))exit();
$filename = iconv('utf-8','gbk',$filename);
define("ROOT", dirname(__FILE__) . "/" );
$path = 'download/'.$filename;
if(!file_exists($path))exit();
/*$h = @fopen($path,'r');
	if($h){
		$html = '';
		while($byte = fread($h,2048)){
			$html .= $byte;
		}
		fclose($h);
		unset($byte);
		unset($h);
	}*/
	$data = file_get_contents($path);
//$data = $html;
$len = strlen($data);print $len;
ob_end_clean();
//header('Content-Type: application/x-mpegURL');                    // This should work for the rest
//header("Content-type: application/x-msexcel"); 
//header('Content-Type: application/vnd.ms-excel;'); 
header('Content-Type: application/ms-word');
header("Content-Length: $len");
header("Vary:Accept-Encoding");
header('Content-Disposition: attachment; filename="' . $filename . '"');
print $data;



