<?php
header("Content-type:application/json;charset=utf-8");
require "../password.php";
// $con = mysql_connect("localhost","root","");//输入用户名密码
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
if (mysql_query("CREATE DATABASE `homework8` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci",$con))
  {
  echo "Database homework8 created!!";
  
  }
else
  {
  echo "Error creating database: " . mysql_error();
  }
	mysql_select_db("homework8", $con);
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");
	// 创建推荐页面的新闻表new1
	$sqlTable = "CREATE TABLE new1 (	
	newsid INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	newstitle varchar(100),
	newsimg varchar(200),
	newsfrom varchar(100),
	addtime varchar(100))";
	mysql_query($sqlTable,$con);
	$sqlnew1= "insert into new1 (newstitle, newsimg, newsfrom, addtime) values ('习近平再次集体回见部分非洲国家领导人','./image/phone/xjp.jpg','新浪要闻','一天前')";
	$sqlnew2= "insert into new1 (newstitle, newsimg, newsfrom, addtime) values ('国际财经头条：三星内幕交易调查设计多名总裁级高管','./image/phone/sanxing.jpg','热点','2分钟前')";
	$sqlnew3= "insert into new1 (newstitle, newsimg, newsfrom, addtime) values ('科技大事件:Facebook悄然关闭Creative Labs','./image/phone/facebook.jpg','新热点','26分钟前')";
	$sqlnew4= "insert into new1 (newstitle, newsimg, newsfrom, addtime) values ('o2o创业的死亡率为何那么的高？','./image/phone/o2o.jpg','网易新闻','一天前')";
	$sqlnew5= "insert into new1 (newstitle, newsimg, newsfrom, addtime) values ('请在这里修改新闻标题newsid5','','修改修改','修改')";
	$sqlnew6= "insert into new1 (newstitle, newsimg, newsfrom, addtime) values ('请在这里修改新闻标题newsid6','','修改修改','修改')";	
	mysql_query($sqlnew1);
	mysql_query($sqlnew2);
	mysql_query($sqlnew3);
	mysql_query($sqlnew4);
	mysql_query($sqlnew5);
	mysql_query($sqlnew6);

	// 创建百家页面的新闻表new2
	$sqlTable2 = "CREATE TABLE new2 (	
	newsid INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	newstitle varchar(100),
	newsimg varchar(200),
	addtime varchar(100))";
	mysql_query($sqlTable2,$con);
	$sqlnew2_1= "insert into new2 (newstitle, newsimg,  addtime) values (' 野心郎平：希望能够给中国女排留下一点财富','./image/phone/langping.jpg','一天前')";
	$sqlnew2_2= "insert into new2 (newstitle, newsimg,  addtime) values ('绝代双骄演员现状 燕南天身家330亿 林志颖生双胞胎','./image/phone/linzhiyin.jpg','2分钟前')";
	$sqlnew2_3= "insert into new2 (newstitle, newsimg,  addtime) values ('印度28天女婴惨遭毒手 被男子强奸血流不止','./image/phone/yindu.jpg','26分钟前')";
	$sqlnew2_4= "insert into new2 (newstitle, newsimg,  addtime) values ('女子半裸登记入住酒店,社会都发展到这个节奏了','./image/phone/banluo.jpg','一天前')";
	$sqlnew2_5= "insert into new2 (newstitle, newsimg,  addtime) values ('特斯拉用汽车制造边角料做出了iPhone保护套','./image/phone/tesila.jpg','一分钟前')";
	$sqlnew2_6= "insert into new2 (newstitle, newsimg,  addtime) values ('请在这里修改新闻标题newsid6','',修改')";

	mysql_query($sqlnew2_1);
	mysql_query($sqlnew2_2);
	mysql_query($sqlnew2_3);
	mysql_query($sqlnew2_4);
	mysql_query($sqlnew2_5);
	mysql_query($sqlnew2_6);

	// 创建本地页面的新闻表new3
	$sqlTable3 = "CREATE TABLE new3 (	
	newsid INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	newstitle varchar(100),
	newscontent varchar(200),
	addtime varchar(100))";
	mysql_query($sqlTable3,$con);
	$sqlnew3_1= "insert into new3 (newstitle, newscontent, addtime) values ('习近平再次集体回见部分非洲国家领导人','习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人','一天前')";
	$sqlnew3_2= "insert into new3 (newstitle, newscontent, addtime) values ('国际财经头条：三星内幕交易调查设计多名总裁级高管','习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人','2分钟前')";
	$sqlnew3_3= "insert into new3 (newstitle, newscontent, addtime) values ('科技大事件:Facebook悄然关闭Creative Labs','习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人','26分钟前')";
	$sqlnew3_4= "insert into new3 (newstitle, newscontent, addtime) values ('o2o创业的死亡率为何那么的高？','习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人','一天前')";
	$sqlnew3_5= "insert into new3 (newstitle, newscontent, addtime) values ('请在这里修改新闻标题newsid5','','修改')";
	$sqlnew3_6= "insert into new3 (newstitle, newscontent, addtime) values ('请在这里修改新闻标题newsid6','','修改')";

	mysql_query($sqlnew3_1);
	mysql_query($sqlnew3_2);
	mysql_query($sqlnew3_3);
	mysql_query($sqlnew3_4);
	mysql_query($sqlnew3_5);
	mysql_query($sqlnew3_6);
 	
 	//创建用户名密码
 	$sqlTable4 = "CREATE TABLE login (	
	userid INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	username varchar(100),
	password varchar(200),
	keywords varchar(100))";
	mysql_query($sqlTable4,$con);
    $login_1="insert into login (username,password,keywords) values ('root','root','geek')";
    mysql_query($login_1);

	mysql_close($con);
?>




