<?php
header("Content-type:application/json;charset=utf-8");
require "../password.php";
// $con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }else{
  	mysql_select_db("homework8", $con);
  
  	$sql = "SELECT * FROM new3";
	mysql_query("set names 'utf8'");
	
	$result=mysql_query($sql,$con);

	$arr=array();
	while($row = mysql_fetch_array($result))
 	 {
 	
 	 array_push($arr,array("newstitle"=>$row['newstitle'],"newscontent"=>$row["newscontent"],"newsid"=>$row["newsid"],"addtime"=>$row["addtime"]));
 	 }
 	 // json_encode($str, JSON_UNESCAPED_UNICODE);
 	 $result=array("errcode"=>0,"result"=>$arr);
 	 echo json_encode($result,JSON_UNESCAPED_UNICODE);
  }
  mysql_close($con);
?>
