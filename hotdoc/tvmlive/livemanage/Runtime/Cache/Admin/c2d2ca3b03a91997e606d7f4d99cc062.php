<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Editor</title>
		

		<link href="/livemanage/Public/css/dialog-my.css" rel="stylesheet">
		<link rel="stylesheet" href="/livemanage/Public/css/lib/qunit/qunit.css" />
		<link rel="stylesheet" href="/livemanage/Public/css/themes/default/default.css" />
		<script language="JavaScript" src="/livemanage/Public/js/dialog-my.js"> </script>
		<script src="/livemanage/Public/js/lib/qunit/qunit.js"></script>
		<!-- include src files -->
		<script src="/livemanage/Public/js/src/core.js"></script>
		<script src="/livemanage/Public/js/src/config.js"></script>
		<script src="/livemanage/Public/js/src/ajax.js"></script>
		<script src="/livemanage/Public/js/src/event.js"></script>
		<script src="/livemanage/Public/js/src/html.js"></script>
		<script src="/livemanage/Public/js/src/selector.js"></script>
		<script src="/livemanage/Public/js/src/node.js"></script>
		<script src="/livemanage/Public/js/src/range.js"></script>
		<script src="/livemanage/Public/js/src/cmd.js"></script>
		<script src="/livemanage/Public/js/src/widget.js"></script>
		<script src="/livemanage/Public/js/src/edit.js"></script>
		<script src="/livemanage/Public/js/src/toolbar.js"></script>
		<script src="/livemanage/Public/js/src/menu.js"></script>
		<script src="/livemanage/Public/js/src/colorpicker.js"></script>
		<script src="/livemanage/Public/js/src/uploadbutton.js"></script>
		<script src="/livemanage/Public/js/src/dialog.js"></script>
		<script src="/livemanage/Public/js/src/tabs.js"></script>
		<script src="/livemanage/Public/js/src/main.js"></script>
		<script src="/livemanage/Public/js/lang/zh-CN.js"></script>
		<script src="/livemanage/Public/js/lang/en.js"></script>
		<script src="/livemanage/Public/js/plugins/emoticons/emoticons.js"></script>
		<script src="/livemanage/Public/js/plugins/flash/flash.js"></script>
		<script src="/livemanage/Public/js/plugins/image/image.js"></script>
		<script src="/livemanage/Public/js/plugins/link/link.js"></script>
		<script src="/livemanage/Public/js/plugins/media/media.js"></script>
		<script src="/livemanage/Public/js/plugins/plainpaste/plainpaste.js"></script>
		<script src="/livemanage/Public/js/plugins/table/table.js"></script>
		<script src="/livemanage/Public/js/plugins/wordpaste/wordpaste.js"></script>
		<script src="/livemanage/Public/js/plugins/filemanager/filemanager.js"></script>
		<script src="/livemanage/Public/js/plugins/preview/preview.js"></script>
		<script src="/livemanage/Public/js/plugins/code/code.js"></script>
		<script src="/livemanage/Public/js/plugins/map/map.js"></script>
		<script src="/livemanage/Public/js/plugins/lineheight/lineheight.js"></script>	
		
	</head>
	<body>
		<textarea id="editercontent" name="editercontent" style="width:100%;height:540px;visibility:hidden;"></textarea>
		<br />
		<!-- include test files -->
		<script src="/livemanage/Public/js/editor/editor.js"></script>
		<div id="msgMask" style="display: none;position: absolute; opacity: 0.4; top: 0px; left: 0px; width: 1920px; height: 975px; z-index: 911212; background: black;"></div>
		<div id="msgdialog" style="display: none; width: 450px; height: 200px; position: fixed; z-index: 911213; left: 0px; right: 0px;top:100px;" class="my-dialog-default my-dialog">
			<div class="my-dialog-content">
				<div id="msgTitle" class="my-dialog-header"><span id="titleContent">提示</span><span class="my-dialog-icon-close" onClick="msgbox_Close()" title="关闭"></span></div>
				<div class="my-dialog-body" style="height: 137px; visibility: visible;">
					<div style="padding:20px;">
						<div class="tab1" style="display: block;">
							<div class="my-dialog-row" id="msgContent">
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