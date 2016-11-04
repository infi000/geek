module("editor");
var newseditor;
KindEditor.ready(function (K) {
		newseditor = K.create('#editercontent', {
		urlType:'relative',
		basePath : '/livemanage/Public/js/',
		themesPath :  '/livemanage/Public/css/themes/',
		langPath :  '/livemanage/Public/js/lang/',
		pluginsPath : '/livemanage/Public/js/plugins/',
		imageUploadJson:'/livemanage/Public/js/php/upload_json.php',
		langType:'zh-CN',
		filterMode : false,
		wellFormatMode : false,
		pasteType: 2,
		items : [
         'undo','redo','cut','copy','paste','plainpaste',
			'|','formatblock','fontname', 'fontsize', 
			'|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline','strikethrough','lineheight','removeformat', 
			'/',
			'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist', 'insertunorderedlist','indent','outdent', ,  'subscript','superscript',
			'|','emoticons', 'image','table','hr','pagebreak','anchor', 'link','Unlink',
			'|','selectall','preview'],
		resizeType:0,
		autoHeightMode : true,
		minHeight:'458px',
		height:'458px',
	});
});
