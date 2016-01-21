
<?php 
header("Content-type:text/html;charset=utf-8");
      // $name=$_GET['name'];
      // $password=$_GET['password'];
      $con = mysql_connect('127.0.0.1','root','root');
       if(!$con){
       	die('Could not connect: ' . mysql_error());
       }
       else{
       	mysql_select_db('login');
          $name=$_GET['name'];
          $password=$_GET['password'];
          $sql="select password from login where username='$name'";
          $reslut=mysql_query($sql);
          $sucess= mysql_fetch_array($reslut)[0];
          echo $sucess;
          echo $password;
          if($sucess==$password){
          	// echo '用户验证成功';
          	// local.relad();
          	echo '<script> alert("用户验证成功");location.href="test2.html"</script>';
          }else{
          	echo '用户验证失败';
          }
          // echo mysql_fetch_array($reslut)[1];

       }
  
      // echo $name;
      // // echo <br>;
      // echo $password;

     
 ?>