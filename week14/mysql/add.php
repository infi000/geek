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
    $newstitle=$_POST['newstitle'];
    $newsimg=$_POST['newsimg'];
    $newsfrom=$_POST['newsfrom'];
    $addtime=$_POST['addtime'];
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
    $newstitle=$_POST['newstitle'];
    $newsimg=$_POST['newsimg'];
    $addtime=$_POST['addtime'];
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
    $newstitle=$_POST['newstitle'];
    $newscontent=$_POST['newscontent'];
    $addtime=$_POST['addtime'];
    $sql ="INSERT INTO `new3`( `newstitle`, `newscontent`, `addtime`) VALUES ('".$newstitle."','".$newscontent."','".$addtime."')";
  mysql_query("set names 'utf8'");
  $result=mysql_query($sql,$con);
  if(!$result){
    die('Error:'.mysql_error());

  }else{
    echo "数据上传成功";
  }
};
  	};

	mysql_close($con);

?>