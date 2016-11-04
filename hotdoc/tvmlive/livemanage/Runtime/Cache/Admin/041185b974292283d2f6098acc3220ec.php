<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
<script type="text/javascript">
        var APP = "/livemanage/admin.php";
</script>
    <link href="/livemanage/Public/js/bootstrap.min.css" rel="stylesheet">
    <link href="/livemanage/Public/css/signin.css" rel="stylesheet">
	<script type="text/javascript" src="/livemanage/Public/js/jquery.min.js" ></script>
    <script src="/livemanage/Public/js/bootstrap.min.js"></script>
	<script language="JavaScript" src="/livemanage/Public/js/login-my.js"> </script>
<title>小脉直播后台登陆</title>
</head>
<body style="hegiht:100%">

 	<div class="container">
        <!-- 表单提交时的验证提示框 -->
        <form class="form-signin" role="form" action="javascript:void(0)" method="post">
            <h2 class="form-signin-heading">小脉直播后台管理</h2>
            <input type="text" id="uname" class="form-control" placeholder="用户名" required autofocus>
            <input type="password" id="pwd" class="form-control" placeholder="密码" required>
            <button class="btn btn-lg btn-primary btn-block"  onclick="login(this.form)" type="submit">登陆</button>
        </form>
    </div>
</body>
</html>