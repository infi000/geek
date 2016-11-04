<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
<script type="text/javascript">
        var PUBLIC= "/livemanage/Public";
        var APP = "/livemanage/admin.php";
        var ROOT = "/livemanage";
        var CURURL="/livemanage/admin.php/";
</script>

    <!-- Bootstrap core CSS -->
    <link href="/livemanage/Public/js/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="/livemanage/Public/css/manager.css" rel="stylesheet">
    <script type="text/javascript" src="/livemanage/Public/js/jquery.min.js"></script>
    <script src="/livemanage/Public/js/bootstrap.min.js"></script>
    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <!--<script src="/livemanage/Public/js/ie-emulation-modes-warning.js"></script>-->
<!--<script src="/livemanage/Public/js/jquery-1.8.3.min.js"></script>-->

<!-- Uploadify 上传插件-->

<!--<script src="/livemanage/Public/js/uploadify/jquery.uploadify.js"></script>-->

<!-- msgBox 信息弹出插件-->

<!--<script src="/livemanage/Public/js/msgbox/jquery.msgbox.min.js"></script>-->

<!-- Url 获取URL地址参数的插件-->

<!--<script src="/livemanage/Public/js/url/url.min.js"></script>-->
<script language="JavaScript" src="/livemanage/Public/js/dialog-my.js"> </script>
<!--<script type="text/javascript" src="/livemanage/Public/js/jquery.min.js" ></script>-->
<!--<script type="text/javascript" src="/livemanage/Public/js/jquery.js" ></script>-->
<script language="JavaScript" src="/livemanage/Public/js/filepath-reg-my.js"> </script>
<script language="JavaScript" src="/livemanage/Public/js/manage-my.js"> </script>
<link href="/livemanage/Public/css/manage-my.css" rel="stylesheet">
<link href="/livemanage/Public/css/dialog-my.css" rel="stylesheet">
<title>小脉直播后台管理</title>
</head>
<body>
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">小脉直播</a>
            </div>
        </div>
    </nav>
    
    <div class="container-fluid">
        <div class="row">
            <div class="sidebar" style="z-index: 5;">
                <ul class="nav nav-sidebar">
                    <li id="caseinfo_p_li" class="active"><a class="caseinfo_p" href="javascript:void(0)">查看合作案例</a></li>
                    <li id="caseinfo_insert_li"><a class="caseinfo_insert" href="javascript:void(0)">添加合作案例</a></li>
                </ul>
                <ul class="nav nav-sidebar">
                    <li id="newsinfo_p_li"><a class="newsinfo_p" href="javascript:void(0)">查看最新动态</a></li>
                    <li id="newsinfo_insert_li"><a class="newsinfo_insert" href="javascript:void(0)">添加最新动态</a></li>
                </ul>
                <ul class="nav nav-sidebar">
                    <li id="bannerinfo_p_li"><a class="bannerinfo_p" href="javascript:void(0)">查看banner图</a></li>
                    <li id="bannerinfo_insert_li"><a class="bannerinfo_insert" href="javascript:void(0)">添加banner图</a></li>
                </ul>
                <ul class="nav nav-sidebar">
                    <li id="userinfo_p_li"><a class="userinfo_p" href="javascript:void(0)">查看申请人信息</a></li>                    
                </ul>
                <ul class="nav nav-sidebar">
                    <li id="mailinfo_p_li"><a class="mailinfo_p" href="javascript:void(0)">查看邮件地址</a></li>
                    <li id="mailinfo_insert_li"><a class="mailinfo_insert" href="javascript:void(0)">添加邮件地址</a></li>
                </ul>
            </div>
            <div class="main"  id="user_data_td">              
            </div>
        </div>
    </div>
	<!-- <div id="modifyFade" class="modal-backdrop fade" style="display:none;">
	</div>
	-->
    <div class="modal fade " id="modifyCase" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    </div>
    <div class="modal fade " id="modifyNews" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    </div>
    <div class="modal fade " id="modifyBanner" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    </div>
    <div class="modal fade " id="modifyUser" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    </div>
    <div class="modal fade " id="modifyMail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    </div>
        
    <div class="modal fade" id="delCase" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                    警告
                    </h4>
                </div>
                <div class="modal-body" style="text-align: center">
                    删除所选案例？
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" onClick="undeletedata()">取消
                    </button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick="deletedata('case')">
                        确认
                    </button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
    </div>
    <div class="modal fade" id="delNews" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                    警告
                    </h4>
                </div>
                <div class="modal-body" style="text-align: center">
                    删除所选动态？
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" onClick="undeletedata()">取消
                    </button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick="deletedata('news')">
                        确认
                    </button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
    </div>
    <div class="modal fade" id="delBanner" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                    警告
                    </h4>
                </div>
                <div class="modal-body" style="text-align: center">
                    删除所选Banner图？
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" onClick="undeletedata()">取消
                    </button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick="deletedata('banner')">
                        确认
                    </button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
    </div>
    <div class="modal fade" id="delUser" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                    警告
                    </h4>
                </div>
                <div class="modal-body" style="text-align: center">
                    删除所选申请人？
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" onClick="undeletedata()">取消
                    </button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick="deletedata('apply')">
                        确认
                    </button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
    </div>
    
    <div class="modal fade" id="delMail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                    警告
                    </h4>
                </div>
                <div class="modal-body" style="text-align: center">
                    删除所选邮件地址？
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" onClick="undeletedata()">取消
                    </button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick="deletedata('mail')">
                        确认
                    </button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
    </div>
	<div id="msgMask" style="display: none;position: absolute; opacity: 0.4; top: 0px; left: 0px; width: 1920px; height: 975px; z-index: 911212; background: black;">
		</div>
	<div id="msgdialog" style="display: none; width: 450px; height: 200px; position: fixed; z-index: 911213; left: 0px; right: 0px;top:100px;" class="my-dialog-default my-dialog">
			<div class="my-dialog-content">
				<div id="msgTitle" class="my-dialog-header"><span id="titleContent">提示</span><span class="my-dialog-icon-close" onClick="msgbox_Close()" title="关闭"></span></div>
				<div class="my-dialog-body" style="height: 137px; visibility: visible;">
					<div style="padding:20px;">
						<div class="tab1" style="display: block;">
							<div class="my-dialog-row" id="msgContent"  style="position:absolute;width:420px; height:130px; overflow:auto">
							</div>
						</div>
				</div>
			</div>
			<div class="my-dialog-footer">
				<span class="my-button-common my-button-outer my-dialog-yes" onClick="msgbox_OK()" title="确定"><input class="my-button-common my-button" type="button" value="确定"></span>
				<span style="display:none;" class="my-button-common my-button-outer my-dialog-no" title="取消"><input class="my-button-common my-button" type="button" value="取消"></span>
			</div>
		</div>
		<div class="my-dialog-shadow"></div>
	</div>	
	
<script type='text/javascript'>
			var box = document.getElementById('msgdialog');
			var bar=document.getElementById('msgTitle');			
			startDrag(bar,box);
</script>
</body>
</html>