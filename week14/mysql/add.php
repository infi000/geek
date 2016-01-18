<?php
header("Content-type:application/json;charset=utf-8");
// $con = mysql_connect("localhost","root","");
require "../password.php";
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }else{
    mysql_select_db("homework8", $con);
    if($_POST['news']==1){
    $newstitle=$_REQUEST['newstitle'];
    $newsimg=$_REQUEST['newsimg'];
    $newsfrom=$_REQUEST['newsfrom'];
    $addtime=$_REQUEST['addtime'];
    $sql ="INSERT INTO `new1`( `newstitle`, `newsimg`, `newsfrom`, `addtime`) VALUES ('".$newstitle."','".$newsimg."','".$newsfrom."','".$addtime."')";
  mysql_query("set names 'utf8'");
  $result=mysql_query($sql,$con);
  if(!$result){
    die('Error:'.mysql_error());
  }else{
    echo "数据上传成功";
  }
    };
   if($_POST['news']==2){
    $newstitle=$_REQUEST['newstitle'];
    $newsimg=$_REQUEST['newsimg'];
    $addtime=$_REQUEST['addtime'];
    $sql ="INSERT INTO `new2`( `newstitle`, `newsimg`, `addtime`) VALUES ('".$newstitle."','".$newsimg."','".$addtime."')";
  mysql_query("set names 'utf8'");
  $result=mysql_query($sql,$con);
  if(!$result){
    die('Error:'.mysql_error());

  }else{
    echo "数据上传成功";
  }
   };

if($_POST['news']==3){
    $newstitle=$_REQUEST['newstitle'];
    $newscontent=$_REQUEST['newscontent'];
    $addtime=$_REQUEST['addtime'];
    $sql ="INSERT INTO `new3`( `newstitle`, `newscontent`, `addtime`) VALUES ('".$newstitle."','".$newscontent."','".$addtime."')";
  mysql_query("set names 'utf8'");
  $result=mysql_query($sql,$con);
  if(!$result){
    die('Error:'.mysql_error());

  }else{
    echo "数据上传成功";
  }
};
  	}
	mysql_close($con);

?>