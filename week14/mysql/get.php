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
    //连接数据库1
    if($_POST['news']=='1'){
  $sql1 = "SELECT * FROM new1";
  $result1=mysql_query($sql1,$con);
  $arr1=array();
  while($row = mysql_fetch_array($result1))
   {
   array_push($arr1,array("newstitle"=>$row['newstitle'],"newsimg"=>$row["newsimg"],"newsfrom"=>$row["newsfrom"],"newsid"=>$row["newsid"],"addtime"=>$row["addtime"]));
   }
   $result1=array("errcode"=>0,"result"=>$arr1);
   echo json_encode($result1,JSON_UNESCAPED_UNICODE);
    }

//连接数据库2
    if($_POST['news']==2){

        $sql2 = "SELECT * FROM new2";
  $result2=mysql_query($sql2,$con);
  $arr2=array();
  while($row = mysql_fetch_array($result2))
   {
   array_push($arr2,array("newstitle"=>$row['newstitle'],"newsimg"=>$row["newsimg"],"newsid"=>$row["newsid"],"addtime"=>$row["addtime"]));
   }
   $result2=array("errcode"=>0,"result"=>$arr2);
   echo json_encode($result2,JSON_UNESCAPED_UNICODE);
    }

  //连接数据库3

    if($_POST['news']==3){
        $sql3 = "SELECT * FROM new3";
  $result3=mysql_query($sql3,$con);
  $arr3=array();
  while($row = mysql_fetch_array($result3))
   {
  
   array_push($arr3,array("newstitle"=>$row['newstitle'],"newscontent"=>$row["newscontent"],"newsid"=>$row["newsid"],"addtime"=>$row["addtime"]));
   }
   // json_encode($str, JSON_UNESCAPED_UNICODE);
   $result3=array("errcode"=>0,"result"=>$arr3);
   echo json_encode($result3,JSON_UNESCAPED_UNICODE);};
    }


  mysql_close($con);
?>


