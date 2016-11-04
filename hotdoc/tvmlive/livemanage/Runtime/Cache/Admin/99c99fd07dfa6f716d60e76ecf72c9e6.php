<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Editor</title>
		

		<link rel="stylesheet" href="/livemanage/Public/css/lib/qunit/qunit.css" />
		<link rel="stylesheet" href="/livemanage/Public/css/themes/default/default.css" />
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
		动态页面：
		<textarea id="editercontent" name="editercontent" style="width:90%;height:250px;visibility:hidden;"></textarea>
		<br />
		<!-- include test files -->
		<script src="/livemanage/Public/js/editer/editer.js"></script>
	</body>
</html>