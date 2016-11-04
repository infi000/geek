/*
 * @Author: USER
 * @Date:   2016-08-25 13:54:58
 * @Last Modified by:   USER
 * @Last Modified time: 2016-08-25 14:45:48
 */

'use strict';

//头部信息
/*var url = '?m=5023';
 $.post(url,function(data){		
	if(data.status){
	//	$(".header").html(data.data)
	}
},'json');*/
//左侧信息
var url = '?m=5024';
 $.post(url,function(data){		
	if(data.status){
		$(".header").html(data.data.home)
	}
},'json');



$(".preview").on("mouseover", function() {
    var status = $(this).closest('.box2').attr("data-status");
    if (status == "in" || status == "none" || status == "out") {
        $(this).find(".clickInfo").fadeIn();
        if (status == "in" || status == "out") {
            $(this).find(".clickInfo").find('span').html("获取直播路径")
        } else {
            $(this).find(".clickInfo").find('span').html("添加直播设备")
        }
    }
});
$(".preview").on("mouseleave", function() {
	$(".clickInfo").finish();
    $(".clickInfo").fadeOut()
})


$(".tc-close").on("click", function() {
    $(".tc-uploadFile").hide();
    $(".successTo").hide();
    $('.TC').fadeOut();
})

$(".boxSet-upload").on("click", function() {
    $(".TC").fadeIn();
    $(".tc-uploadFile").show();
})




$(".tc-uploadFile-yes").on("click", function() {
	var file = $('#uploadfile');
	var name = file.val();
	var pos = name.lastIndexOf('.');
	if(pos > 0){
		var ext = name.substring(pos+1).toLowerCase();
		if(ext != 'jpg' && ext != 'png' && ext != 'jpeg'){
			alert('不是正确的文件格式');
		}
	}else{
		alert('不是正确的文件格式');
	}

	var f = $('#exeForm');
	f.attr('action',"?m=5128");
	f.submit();
    
});
var upIntid = 0;
var upcounter = 2;
function uploadseccss(){
	upIntid = setInterval("uploadInter()",1000);
	$(".tc-uploadFile").hide();
    $(".successTo").show();
}

function uploadInter(){
	$(".successTo").find('p').text(upcounter+'S后跳转至您的云直播');
	if(upcounter <=0){
		clearInterval(upIntid);
		upIntid = 0;
		$(".tc-uploadFile").hide();
		$(".successTo").hide();
		$('.TC').fadeOut();
	}
	upcounter--;
}

function messageNumber(){
			var reg = new RegExp( /(\d+)/ );
			var uv = $(".msgNum-unread").text();
			var v = $(".msgNum-readed").text();
			var lv = $(".bar").find('.msgNum').text();
			var um = uv.match( reg );
			var m = v.match( reg );
			$(".msgNum-unread").text('未读'+((parseInt(um[1])-1)>0?(parseInt(um[1])-1):0));
			$(".msgNum-readed").text('已读'+(parseInt(m[1])+1));
			$(".bar").find('.msgNum').text(((parseInt(lv)-1)>0?(parseInt(lv)-1):0));
			
	}
// 显示消息内容

$(".msg-intro").on("click", function() {
    var that = $(this);
    
    if (that.closest(".list-group-item").find(".msg-line").css("display") == "none") {
		if(that.parent().find('.msg-temp-2').text() != "" && that.parent().find('.msg-temp-2').css("display") != "none"){
			var id= that.attr('data-msgid');
			url = '?m=4002';
			 $.get(url,{'id':id},function(data){
				if(data.status){
					that.parent().find('.msg-temp-2').hide();
					messageNumber();
				}
			 },'json');
		}
        $(".msg-line").slideUp("fast",function(){
           $(".msg-arrow").removeClass("glyphicon-menu-up").addClass('glyphicon-menu-down')
        });
        that.closest(".list-group-item").find(".msg-line").slideDown("fast", function() {
       
            that.closest(".list-group-item").find(".msg-arrow").removeClass("glyphicon-menu-down").addClass('glyphicon-menu-up');
        });

    } else {
        that.closest(".list-group-item").find(".msg-line").slideUp("fast", function() {

             that.closest(".list-group-item").find(".msg-arrow").removeClass("glyphicon-menu-up").addClass('glyphicon-menu-down');
        });
    }
})

$(".glyphicon-trash").click(function(){
	var that = $(this);
	var id= that.attr('data-msgid');
			url = '?m=4003';
			 $.get(url,{'id':id},function(data){
				if(data.status){
					that.closest(".list-group-item").hide();
				}
			 },'json');
})

//点击修改盒子名称

$(".glyphicon-pencil").on("click", function(){
	if($("#BoxName").closest('dt').find('.input-group').css('display') == 'none'){
		var name = $("#BoxName").html();
		$("#BoxName").hide().closest('dt').find('.input-group').show();
		$("#codename").val(name);
	}else{
		$("#BoxName").show().closest('dt').find('.input-group').hide();
	}
})







