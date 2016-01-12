<?php
header("Content-type:application/json;charset=utf-8");
// $con = mysql_connect("localhost","root","");
require "../password.php";
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }else{
  	mysql_select_db("homework8", $con);
  	$newstitle=$_REQUEST['newstitle'];
  	$newsimg=$_REQUEST['newsimg'];
  	$addtime=$_REQUEST['addtime'];
  	$sql ="INSERT INTO `new2`( `newstitle`, `newsimg`, `addtime`) VALUES ('".$newstitle."','".$newsimg."','".$addtime."')";
	mysql_query("set names 'utf8'");
	$result=mysql_query($sql,$con);
	if(!$result){
		die('Error:'.mysql_error());

	}else{
		echo "usuccess";
	}}
	mysql_close($con);

?>