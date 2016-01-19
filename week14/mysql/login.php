<?php
  header("Content-type:application/text;charset=utf-8");
   require "../password.php";
   if(!$con){
     die('Could not connect: ' . mysql_error());
   }else{
    mysql_select_db("homework8",$con);
    mysql_query ("mysql names 'utf8'");
    $name=$_POST['username'];
    $password=$_POST['password'];
    $sql = "SELECT * FROM login where username='$name' and password='$password'";
    $result = mysql_query($sql);
    if(mysql_result($result,0,'keywords')=='geek'){
            echo '成功';
    }
    }
mysql_close($con);

?>
