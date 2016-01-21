<?php
header("Content-type:application/json;charset=utf-8");
require "./password.php";
// $con = mysql_connect("localhost","root","");//输入用户名密码
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
if (mysql_query("CREATE DATABASE `homework9` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci",$con))
  {
  echo "Database homework9 created!!";
  
  }
else
  {
  echo "Error creating database: " . mysql_error();
  }
	mysql_select_db("homework9", $con);
	mysql_query("set character set 'utf8'");
	mysql_query("set names 'utf8'");
	// 创建推荐页面的新闻表new1
	$sqlTable = "CREATE TABLE new1 (	
	newsid INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
	newstitle varchar(100),
	newsimg varchar(200),
	newsfrom varchar(100),
	newscontent varchar(200),
	tag INT,
	addtime varchar(100))";
	mysql_query($sqlTable,$con);
	$sqlnew1= "insert into new1 (tag, newstitle, newsimg, newsfrom, addtime) values ('1','习近平再次集体回见部分非洲国家领导人','./image/phone/xjp.jpg','新浪要闻','2015-10-4')";
	$sqlnew2= "insert into new1 (tag, newstitle, newsimg, newsfrom, addtime) values ('1','国际财经头条：三星内幕交易调查设计多名总裁级高管','./image/phone/sanxing.jpg','热点','2015-12-14')";
	$sqlnew3= "insert into new1 (tag, newstitle, newsimg, newsfrom, addtime) values ('1','科技大事件:Facebook悄然关闭Creative Labs','./image/phone/facebook.jpg','新热点','2015-12-14')";
	$sqlnew4= "insert into new1 (tag, newstitle, newsimg, newsfrom, addtime) values ('1','o2o创业的死亡率为何那么的高？','./image/phone/o2o.jpg','网易新闻','2015-12-14')";
	$sqlnew5= "insert into new1 (tag, newstitle, newsimg, newsfrom, addtime) values ('1','请在这里修改新闻标题newsid5','','修改修改','2015-12-14')";
	$sqlnew6= "insert into new1 (tag, newstitle, newsimg, newsfrom, addtime) values ('1','请在这里修改新闻标题newsid6','','修改修改','2015-12-14')";	
	// 创建百家页面的新闻表
	$sqlnew2_1= "insert into new1 (tag, newstitle, newsimg,  addtime) values ('2',' 野心郎平：希望能够给中国女排留下一点财富','./image/phone/langping.jpg','2015-12-14')";
	$sqlnew2_2= "insert into new1 (tag, newstitle, newsimg,  addtime) values ('2','绝代双骄演员现状 燕南天身家330亿 林志颖生双胞胎','./image/phone/linzhiyin.jpg','2015-12-14')";
	$sqlnew2_3= "insert into new1 (tag, newstitle, newsimg,  addtime) values ('2','印度28天女婴惨遭毒手 被男子强奸血流不止','./image/phone/yindu.jpg','2015-12-14')";
	$sqlnew2_4= "insert into new1 (tag, newstitle, newsimg,  addtime) values ('2','女子半裸登记入住酒店,社会都发展到这个节奏了','./image/phone/banluo.jpg','2015-12-14')";
	$sqlnew2_5= "insert into new1 (tag, newstitle, newsimg,  addtime) values ('2','特斯拉用汽车制造边角料做出了iPhone保护套','./image/phone/tesila.jpg','2015-12-14')";
	$sqlnew2_6= "insert into new1 (tag, newstitle, newsimg,  addtime) values ('2','请在这里修改新闻标题newsid6','',修改')";
	// 创建本地页面的新闻表
	$sqlnew3_1= "insert into new1 (tag, newstitle, newscontent, addtime) values ('3','习近平再次集体回见部分非洲国家领导人','习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人','2015-12-14')";
	$sqlnew3_2= "insert into new1 (tag, newstitle, newscontent, addtime) values ('3','国际财经头条：三星内幕交易调查设计多名总裁级高管','习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人','2015-12-14')";
	$sqlnew3_3= "insert into new1 (tag, newstitle, newscontent, addtime) values ('3','科技大事件:Facebook悄然关闭Creative Labs','习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人','2015-12-14')";
	$sqlnew3_4= "insert into new1 (tag, newstitle, newscontent, addtime) values ('3','o2o创业的死亡率为何那么的高？','习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人习近平再次集体回见部分非洲国家领导人','2015-12-14')";
	$sqlnew3_5= "insert into new1 (tag, newstitle, newscontent, addtime) values ('3','请在这里修改新闻标题newsid5','','修改')";
	$sqlnew3_6= "insert into new1 (tag, newstitle, newscontent, addtime) values ('3','请在这里修改新闻标题newsid6','','修改')";
	mysql_query($sqlnew1);
	mysql_query($sqlnew2);
	mysql_query($sqlnew3);
	mysql_query($sqlnew4);
	mysql_query($sqlnew5);
	mysql_query($sqlnew6);
	mysql_query($sqlnew2_1);
	mysql_query($sqlnew2_2);
	mysql_query($sqlnew2_3);
	mysql_query($sqlnew2_4);
	mysql_query($sqlnew2_5);
	mysql_query($sqlnew2_6);
	mysql_query($sqlnew3_1);
	mysql_query($sqlnew3_2);
	mysql_query($sqlnew3_3);
	mysql_query($sqlnew3_4);
	mysql_query($sqlnew3_5);
	mysql_query($sqlnew3_6);

 	mysql_close($con);
?>




