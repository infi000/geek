<?php
header("Content-type:application/json;charset=utf-8");
require "../password.php";
// $con = mysql_connect("localhost","root","");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }else{
  	mysql_select_db("homework8", $con);
  	mysql_query("set names 'utf8'");
	 	$newstitle=$_REQUEST['newstitle'];
  	$newsimg=$_REQUEST['newsimg'];
  	$newsfrom=$_REQUEST['newsfrom'];
  	$addtime=$_REQUEST['addtime'];
  	$newsid=$_REQUEST['newsid'];

	
	$sql="UPDATE `new1` SET `newstitle`='".$newstitle."',`newsfrom`='".$newsfrom."',`newsimg`='".$newsimg."',`addtime`='".$addtime."' WHERE `newsid`='".$newsid."'";

	$result=mysql_query($sql,$con);
	if(!$result){
		die('Error:'.mysql_error());

	}else{
		echo "修改内容成功";
	}
	
  }
  mysql_close($con);
?>
