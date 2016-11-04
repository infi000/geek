/**
   拖拽div
   关键事件:mouseDown, mouseMove,mouseUp
**/

var params={
	top:0,
	left:0,
	currentX:0,
	currentY:0,
	flag:false
};

/**
obj.currentStyle[attr]
getComputedStyle(obj,false)[attr] 获取DOM非行间样式
**/
var getCss=function(o,key){
	return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
};

var startDrag=function(bar,target,callback){
	
	if(getCss(target,'left')!='auto'){
		params.left=getCss(target,'left');
	}
	if(getCss(target,'top')!='auto'){
		params.top=getCss(target,'top');
	}
	bar.onmousedown=function(event){
		params.flag=true;
		if(!event){
			event=window.even;
			bar.onselectstart=function(){ //IE和Chrome适用，防止内容被选中默认是true
				return false;
			}
		}
		var e=event;
		params.currentX=e.clientX;
		params.currentY=e.clientY;
	}
	
	document.onmouseup=function(){
		params.flag=false;
		if(getCss(target,"left") !='auto'){
			params.left=getCss(target,'left');
		}
		if(getCss(target,'top') !='auto'){
			params.top=getCss(target,'top');
		}
	}
	document.onmousemove=function(event){
		var e=event?event:window.event;
		if(params.flag){
			var nowX=e.clientX,nowY=e.clientY;
			var disX=nowX-params.currentX, disY=nowY-params.currentY;
			target.style.left=parseInt(params.left)+disX+'px';
			target.style.top=parseInt(params.top)+disY+'px';
		}
		
		if(callback=='function'){
			callback(parseInt(params.left)+disX,parseInt(params.top)+disY);
		}
	}
};

function get_width(){
	return (document.body.clientWidth+document.body.scrollLeft);
}
function get_height(){
	if(document.documentElement.clientHeight >(document.body.clientHeight+document.body.scrollTop)){
		return document.documentElement.clientHeight
	}
	else{
		return (document.body.clientHeight+document.body.scrollTop);		
	}
}
function get_left(w){
	var bw=document.body.clientWidth;
	var bh=document.body.clientHeight;
	w=parseFloat(w);
	return (bw/2-w/2+document.body.scrollLeft);
}
function get_top(h){
	var bw=document.body.clientWidth;
	var bh=document.body.clientHeight;
	h=parseFloat(h);
	//return (bh/2-h/2+document.body.scrollTop);
	if((bh/2-h/2)>100){
		return (100+document.body.scrollTop);
	}
	else if((bh/2-h/2+document.body.scrollTop)<0){
		return 100;
	}
	else{
		return (bh/2-h/2+document.body.scrollTop);
	}
}
function show_mask(){//创建遮罩层的函数
	var mask=document.getElementById("msgMask");
	mask.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=4,opacity=25)";//IE的不透明设置
	mask.style.opacity=0.4;//Mozilla的不透明设置
	mask.style.width=get_width()+"px";
	mask.style.height=get_height()+"px";
	mask.style.display="block";
}
function alert(msg,title,top){
	var top=arguments[2] ? arguments[2] : -1;
	show_mask();
	var msgTitle=document.getElementById("titleContent");
	msgTitle.innerHTML=title;
	var msgSpan=document.getElementById("msgContent");
	msgSpan.innerHTML=msg;
	var msgBox=document.getElementById("msgdialog");
	if(msgBox){
		msgBox.style.display="block";
		var w=msgBox.style.width;
		var h=msgBox.style.height;
		msgBox.style.left=get_left(w)+"px";
		if(top>0){
			msgBox.style.top=top+"px";
			}
		else{
			//msgBox.style.top=get_top(h)+"px";
			msgBox.style.top="100px";	
		}
		if(getCss(msgBox,'left')!='auto'){
			params.left=getCss(msgBox,'left');
		}
		if(getCss(msgBox,'top')!='auto'){
			params.top=getCss(msgBox,'top');
		}
	}
}
function hiddlen_msgbox(){
	var mask=document.getElementById("msgMask");
	mask.style.display="none";
	var msgBox=document.getElementById("msgdialog");
	msgBox.style.display="none";
}
function msgbox_OK(){
	hiddlen_msgbox();
}
function msgbox_Close(){
	hiddlen_msgbox();
}