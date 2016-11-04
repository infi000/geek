//加载直播点列表
function lives(container, sort, online, type)
{
    $("#"+container).html('<img src="/manage/static/images/loading.gif" style="margin:30px"/>');
    if (!type) {
        var activeTab = $("#activetab li.active a").attr("id");
        if (activeTab == 'box') {
            type = 1;
        } else if (activeTab == 'tv') {
            type = 2;
        } else if (activeTab == 'virtual') {
            type = 3;
        } else if (activeTab == 'audio') {
            type = 4;
        }
    }
    var url = "/manage/ajax/lives?sort="+sort+"&online="+online+"&type="+type;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function(response) {
            if (response["code"]==0) {
                var xhtml = "";
                for (i in response.lives) {
                    var live = response.lives[i];
                    var imgThumb = type == 4 ? live.iconUrl : live.thumb
                    if (imgThumb == '') imgThumb = '/manage/static/images/eg02.png';
                    xhtml += '<dl id="live_'+live.id+'"><dt><a href="/manage/live/hls-play?live='+live.id+'">';
                    xhtml += '<img src="'+imgThumb+'" border="0" onerror="defimg(this)"/></a></dt>';
                    xhtml += '<dd><div class="tool" onclick="hlsplay('+live.id+')"></div>';
                    var liveType = live.type;
                    if (liveType == '1') {
                        xhtml += '<div class="edit" onclick="showEdit('+live.id+')"></div>';
                        xhtml += '<div class="del" live="'+live.id+'"></div>';
                    } else {
                        //xhtml += '<div class="edit" live="'+live.id+'"></div>';
                        xhtml += '<div class="edit" onclick="showEdit('+live.id+')"></div>';
                    }
                    xhtml += '<input type="hidden" id="iconurl" name="iconurl" value="'+live.iconUrl+'">';
                    xhtml += '<h3><a href="/manage/live/hls-play?live='+live.id+'">'+live.title+'</a></h3>';
                    xhtml += '<p>SN: '+live.sn+'</p><p>'+live.created+'</p></dd></dl>';
                }
                $("#"+container).html(xhtml);
                $("#"+container+" .del").click(function(){
                    var live = $(this).attr("live");
                    var that = $(this);
                    show_confirm("您确认要删除该直播点吗？");
                    $("#ts_box_btn_ok").click(function(){
                        del_live(live, that);
                    });
                    $("#ts_box_btn_cancel").click(function(){
                        $(".ts_box").hide();
                        $(".bgbox").hide();
                    });
                });
            }
        }
    });
}
//加载直播点列表(li)用于创建及修改分组时
function livesForGroup(container, type)
{
    $("#"+container).html('<img src="/manage/static/images/loading.gif"/>');
    var activeTab = $("#activeli li.active a").attr("id");
    if (type) {
        var url = "/manage/ajax/lives?online=0&type="+type;
    } else {
        if (activeTab == 'gbox') {
            var url = "/manage/ajax/lives?online=0&type=1";
        } else if (activeTab == 'gtv'){
            var url = "/manage/ajax/lives?online=0&type=2";
        } else if (activeTab == 'gvirtual') {
            var url = "/manage/ajax/lives?online=0&type=3";
        } else if (activeTab == 'gaudio') {
            var url = "/manage/ajax/lives?online=0&type=4";
        }
    }
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function(response) {
            if (response["code"]==0) {
                var xhtml = "";
                for (i in response.lives) {
                    var live = response.lives[i];
                    var checkFlag = false;
                    var liveIdValue = live["id"];
                    for(var i in boxArray) {
                        if (boxArray[i] == liveIdValue) {
                            checkFlag = true;
                            break;
                        }
                    }
                    if (checkFlag) {
                        xhtml += '<li class="on"><input name="lives[]" type="checkbox" value="'+live["id"]+'"';
                        xhtml += ' checked/><div class="info">拖动可排序</div><div class="del" style="display:block"></div>';
                    } else {
                        xhtml += '<li><input name="lives[]" type="checkbox" value="'+live["id"]+'" />';
                        xhtml += '<div class="info">拖动可排序</div><div class="del"></div>';
                    }
                    xhtml += '<div class="c"><img src="'+live["thumb"]+'" width="100" height="76" onerror="defimg(this)"/>'+live["title"]+'</div></li>';
                }
                $("#"+container).html(xhtml);
                $('#fz_list').sortable().bind('sortupdate', function() {
                    //$('#msg').html('position changed').fadeIn(200).delay(1000).fadeOut(200);
                    //alert("123");
                });
                $('#fz_list li .c').click(function(){
                    $(this).parents("li").addClass("on").find("input").attr("checked","checked")
                    $(this).parents("li").find(".del").show()
                    var liveId = $(this).parents("li").find("input").attr("value");
                    var indexValue = getIndexByValue(boxArray, liveId);
                    if (indexValue == -1) {
                        boxArray.push(liveId);
                    }
                });
                $('#fz_list li .del').click(function(){
                    $(this).parents("li").removeClass("on")
                    $(this).parents("li").removeClass("on").find("input").removeAttr("checked") 
                    $(this).parents("li").find(".del").hide()
                    var liveId = $(this).parents("li").find("input").attr("value");
                    var dx = getIndexByValue(boxArray, liveId);
                    arrayRemove(boxArray, dx);
                });             
            }
        }
    });
}
//加载直播记录
/*function records(container, date, q, p)
{
    $("#"+container).html('<img src="/manage/static/images/loading.gif"/>');
    var url = "/manage/ajax/records?date="+date+"&q="+q+"&p="p;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function(response) {
            if (response["code"]==0) {
                var xhtml = "";
                for (i in response.records) {
                    var live = response.lives[i];
                    xhtml += '<dl><dt><a href="/manage/live/hls-play?live='+live.id+'"><img src="'+live.thumb+'" border="0" /></a></dt>';
                    xhtml += '<dd><div class="tool"></div><div class="del"></div><h3><a href="/manage/live/hls-play?live='+live.id+'">'+live.title+'</a></h3>';
                    xhtml += '<p>SN: '+live.sn+'</p><p>'+live.created+'</p></dd></dl>';
                }
                $("#"+container).html(xhtml);
            }
        }
    });
}*/
//删除直播记录
function del_record(container, guid)
{   
    var url = "/manage/ajax/del-record?guid="+guid;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function(response) {
            if (response["code"]==0) {              
                $(container).parents("dl").remove();
                close_confirm();
            } else {
                $(".ts_box .cont span").text(response["msg"]);
            }
        }
    }); 
}
//加载直播记录
function load_record(guid)
{
    var url = "/manage/ajax/play?guid="+guid;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function(response) {
            if (response["code"]==0) {
                var record = response["record"];
                $("#record_play h3").text(record["title"]);
                $("#play_guid").val(record["url"]);
                $("#play_live").text(record["live"]);
                $("#play_published").text(record["published"]);
            }
        }
    });
}
//加载默认图片
function defimg(obj)
{
    $(obj).attr("rel", $(obj).attr("src"));
    $(obj).attr("src", "/manage/static/images/eg02.png");
}
//删除直播点
function del_live(id, obj)
{   
    var url = "/manage/ajax/del-live?id="+id;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function(response) {
            if (response["code"]==0) {
                $(obj).parents("dl").remove();
                close_confirm();
            } else {
                $(".ts_box .cont span").text(response["msg"]);
            }
        }
    }); 
}
//删除直播组
function del_group(id, obj)
{
    var url = "/manage/ajax/del-group?id="+id;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function(response) {
            if (response["code"]==0) {
                $(obj).parents("dl").remove();
                close_confirm();
            } else {
                $(".ts_box .cont span").text(response["msg"]);
            }
        }
    });
}
//跳转到直播打点
function hlsplay(id, date)
{
    var url = "/manage/live/hls-play?live="+id;
    if (date != undefined) {
        url += "&date="+date;
    } 
    location.href=url;
}
//加载直播组信息
function loadGroup(container, id, type)
{
    $("#fz_list").empty();
    var url = "/manage/ajax/group?id="+id;
    var init = false;
    if (!type) {
        var activeTab = $("#activeli li.active a").attr("id");
        if (activeTab == 'gbox') {
            type = 1;
        } else if (activeTab == 'gtv') {
            type = 2;
        } else if (activeTab == 'gvirtual') {
            type = 3;
        } else if (activeTab == 'gaudio') {
            type = 4;
        }
        boxArray = new Array();
        init = true;
    }
    //url += "&type="+type;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
        success: function(response) {
            if (response["code"]==0) {
                $("#fz_secret").parents("p").show();
                $("#"+container).find("h3").text("请设置 "+response["group"]["title"]+" 组可收看的频道");
                //$("#fz_title").parents("p").hide();
                $("#fz_title").val(response["group"]["title"]);
                $("#fz_secret").val(response["group"]["code"]);
                $("#gid").val(response["group"]["id"]);
                var lives = response["lives"];
                if (init) {
                    for (i=0;i<lives.length;i++) {
                        var live = lives[i];
                        if (live["checked"] != undefined && live["checked"] == true) {
                            var indexValue = getIndexByValue(boxArray, live['id']);
                            if (indexValue == -1) {
                                boxArray.push(live['id']);
                            }
                        }
                    }
                }
                //alert(boxArray);return;
                for(i=0;i<lives.length;i++){
                    var live = lives[i];
                    var liveType = live['type'];
                    if (liveType != type) {
                        continue;
                    }
                    var xhtml = "";
                    var checkFlag = false;
                    var liveIdValue = live["id"];
                    for(var bi in boxArray) {
                        if (boxArray[bi] == liveIdValue) {
                            checkFlag = true;
                            break;
                        }
                    }                 
                    if (checkFlag) {
                        xhtml += '<li class="on"><input name="lives[]" type="checkbox" value="'+live["id"]+'"';
                        xhtml += ' checked/><div class="info">拖动可排序</div><div class="del" style="display:block"></div>';
                        //boxArray.push(live['id']); 
                    } else {
                        xhtml += '<li><input name="lives[]" type="checkbox" value="'+live["id"]+'"';
                        xhtml += '/><div class="info">拖动可排序</div><div class="del"></div>';
                    }
                    xhtml += '<div class="c"><img src="'+live["thumb"]+'" width="100" height="76" onerror="defimg(this)"/>'+live["title"]+'</span></li>';
                    $("#fz_list").append(xhtml);                 
                }
                $('#fz_list').sortable().bind('sortupdate', function() {
                    //$('#msg').html('position changed').fadeIn(200).delay(1000).fadeOut(200);
                    //alert("123");
                });
                $('#fz_list li .c').click(function(){
                    $(this).parents("li").addClass("on").find("input").attr("checked","checked")
                    $(this).parents("li").find(".del").show()
                    var liveId = $(this).parents("li").find("input").attr("value");
                    var indexValue = getIndexByValue(boxArray, liveId);
                    if (indexValue == -1) {
                        boxArray.push(liveId);
                    }
                });
                $('#fz_list li .del').click(function(){
                    $(this).parents("li").removeClass("on")
                    $(this).parents("li").removeClass("on").find("input").removeAttr("checked") 
                    $(this).parents("li").find(".del").hide()
                    var liveId = $(this).parents("li").find("input").attr("value");
                    var dx = getIndexByValue(boxArray, liveId);
                    arrayRemove(boxArray, dx);
                }); 
            } else {
                show_alert(response["msg"]);
            }
        }
    });
}
//判断某个值是否存在于某数组里
function in_array(needle, haystack)
{
    for (k in haystack) {
        if (haystack[k] == needle) {
            return k;
        }
    }
    return false;
}
//初始化分组界面
function fzboxClear()
{
    $("#fz_box h3").text("创建新的分组");
    $("#gid").val("");
    if ($("#fz_title").parents("p").css("display") == "block") {
        $("#fz_title").val("");
    } else {
        $("#fz_title").parents("p").show();
    }
    
    $("#fz_secret").val("");
    $("#fz_list").html("");
}
//初始化注册直播设备
function registerClear()
{
    $("#reg_title").val("");
    $("#reg_sn").val("");
    $("#reg_info").hide();
}
//将秒数转化为时间字符串
function sec_to_time(seconds)
{
    if (isNaN(seconds)) {
        return false;
    }
    var hour_tmp = (seconds/3600).toString();
    if (hour_tmp.toString().indexOf(".")>=0) {
        var hour = hour_tmp.substring(0, hour_tmp.indexOf("."));
        var min_tmp = ((seconds-hour*3600)/60).toString();
        if (min_tmp.toString().indexOf(".")>=0) {
            var min = min_tmp.substring(0, min_tmp.indexOf("."));
            if (min.length == 1) {
                min = "0"+min;
            }
            var sec_tmp = parseFloat(min_tmp)-min;
            var sec = parseInt(sec_tmp*60);
            if (sec < 10) {
                sec = "0"+sec;
            }
        } else {
            var min = min_tmp;
            if (min.length == 1) {
                min = "0"+min;
            }
            var sec = "00";
        }
    } else {
        var hour = hour_tmp;
        var min = "00";
        var sec = "00";
    }
    return hour+":"+min+":"+sec;
}
//将分钟数转化为时间字符串
function min_to_time(minutes)
{
    if (isNaN(minutes)) {
        return false;
    }
    var min = parseInt(minutes%60);
    if (min < 10) {
        min = "0"+min;
    }
    var hour = parseInt((minutes-min)/60);
    if (hour < 10) {
        hour = "0"+hour;
    }
    return hour+":"+min;
}

//将秒数转化为时间字符串
function min_to_secTime(seconds)
{
    if (isNaN(seconds)) {
        return false;
    }
   // var seconds=minutes*60;
    var s=seconds%86400;
    var h=parseInt(s/3600);
    s%=3600;
    var m=parseInt(s/60);
    s%=60;
    if(h<10){
        h="0"+h;
    }
    if(m<10){
        m="0"+m;
    }
    if(s<10){
        s="0"+s;
    }
    return h+""+m+""+s;
}
//获取分秒 13:44
function get_min_sec(str){
        var arr=[str.substring(0,2),str.substring(2,4)];
        arr.splice(1,0,":");
        str=arr.join("");
        return str;
    }

//补零
function addzero(n){
    if(n<10){
        n="0"+n;
    }
    return n;
}
//将时间转换为秒
function strTime_to_sec(str){
    var h=parseInt(str.substring(0,2));
    var m=parseInt(str.substring(2,4));
    var s=parseInt(str.substring(4,6));
    var sec=h*3600+m*60+s;
    return sec;
}




//将时间字符串转化为分钟数
function time_to_min(str)
{
    if (str.indexOf(":")==-1) {
        return false;
    }
    var value = parseInt(str.substring(0, str.indexOf(":")))*60+parseInt(str.substring(str.indexOf(":")+1));
    return value;
}
//弹出确认对话框
function show_confirm(text)
{
    $(".bgbox").show();
    $(".ts_confirm .cont span").html(text);
    $(".ts_confirm").show();
}
//关闭确认对话框
function close_confirm()
{
    $(".bgbox, .ts_confirm, .ts_live_confirm").hide();
}
//弹出确认对话框
function show_alert(msg)
{
    $(".bgbox").show();
    $(".ts_alert .cont span").text(msg);
    $(".ts_alert").show();
    $(".ts_alert .on").click(function(){
        close_alert();
    });
}
//关闭确认对话框
function close_alert()
{
    $(".bgbox, .ts_alert").hide();
}
//编辑直播点
function showEdit(id)
{
    var liveTitle = $('#live_'+id+' dd h3').text();
    var liveImg = $('#live_'+id+' dd input').val();
    if (!liveImg) {
        liveImg = '/manage/static/images/eg021.png';
    } else {
        liveImg += '?'+Math.random();
    }
    $("#edit-form #liveid").val(id);
    $("#edit-form #title").val(liveTitle);
    $("#edit-form #fileInput").val('');
    $("#edit-form img").attr('src', liveImg);
    $('#edit-form').show();
    $('#edit-form .result-msg').hide();
}

function preview4()
{ 
    var x = document.getElementById("fileInput"); 
    var y = document.getElementById("picviwe"); 
    var patn = /\.jpg$|\.jpeg$|\.png$|\.gif$/i; 
    var patn = /\.png$/i;
    if(patn.test(x.value)){ 
        y.src=window.URL.createObjectURL(x.files[0])
    }
    else{ 
        alert("必须是png格式图片。");
    }
}

function hideEdit()
{
    $('#edit-form').hide();
}
//process live edit form
$(document).ready(function() {
    $("#form-edit").submit(function(event) {
        event.preventDefault();
        /*
        var edit_title = $("#edit-form #title").val();
        if (edit_title == '') {
            alert('标题不能为空！');
            return false;
        }*/
        var formData = new FormData(this);
        files = document.getElementById('fileInput').files;            
        for (var i = 0, file; file = files[i]; ++i) {
            formData.append(file.name, file);
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", $(this).attr('action'), true);
        xhr.onreadystatechange=function()
        {
            if(xhr.readyState == 4)
            {
                var post_status = xhr.responseText;
                post_status = eval('('+post_status+')');
                if (post_status['msg'] == "success") {
                    //topicList()
                    $('#edit-form .result-msg').show();
                    $('#edit-form .result-msg').html('<b style="color:#0b2">修改成功</b>');
                    setTimeout('$("#edit-form").hide()', 2000);
                    lives("livelist", sort, online);
                } else {
                    $('#edit-form .result-msg').show();
                    $('#edit-form .result-msg').html('<b style="color:#c00">出错了:'+post_status['msg']+'</b>');
                }
            }
        }
        xhr.send(formData);
    })
})


//创建直播云碎片
var secTime=null;
function getTs(startT,endT,sn){
     clearInterval(secTime);
     var stime,etime,curtime,channel;
     if(startT !="" && endT !="" && sn !=""){
          stime=startT;
          etime=min_to_secTime(strTime_to_sec(startT)+2270);
          channel=sn;
     }else{
           var unSec=$("#amount").val()*60-360;
             //检查是否有前一天的时间 比如在00:03的时候 有三分钟是昨天的
            if(unSec<0){
                var disnum=Math.ceil(Math.abs(unSec)/10);
                stime=min_to_secTime(0);
                etime=min_to_secTime($("#amount").val()*60+1910);
                curtime=min_to_secTime($("#amount").val()*60);
            }else{
                stime=min_to_secTime($("#amount").val()*60-360);
                etime=min_to_secTime($("#amount").val()*60+1910);
                curtime=min_to_secTime($("#amount").val()*60);
            }
            if(strTime_to_sec(etime)<strTime_to_sec(stime)){
                etime='235959';
            }
            channel=$("#m3u8").val().substring($("#m3u8").val().indexOf("?")+1).split("&")[1].split("=")[1];
     }
    $(".loadImg").show();
    $.ajax({
        url:"/manage/live/ts",
        data:{
             channel:channel,
             day:$("#date").val().replace(/\-+/g,''),
             stime:stime,
             etime:etime
        },
        dataType:"JSON",
        type:"GET",
        success:function(res){
        
            $(".loadImg").hide();
            if(res.errcode==1){
               $(".showText").show();
            }else{
               var li="";
               //如果有前一天的时间的情况
               if(disnum){
                    for(var i=0;i<disnum;i++){
                        var disLi="";
                        disLi="<li class='dis' start='' end='' status ><span class='scal'></span></li>";
                        $("#pie_ul").append(disLi);
                          if($("#pie_ul li").length==1){
                             var prev_time='23'+(60-Math.abs(unSec/60))+'00';
                             oStart=min_to_secTime(strTime_to_sec(prev_time));
                             oEnd=min_to_secTime(strTime_to_sec(prev_time)+10);
                          }else{
                             var prev_time=$("#pie_ul li").eq($("#pie_ul li").length-2).attr("end");
                             oStart=min_to_secTime(strTime_to_sec(prev_time));
                             oEnd=min_to_secTime(strTime_to_sec(prev_time)+10);
                          }
                          $("#pie_ul li:last").attr({"start":oStart,"end":oEnd});
                    }
               }
                //正常时间读数据的情况
                if(res.data.length>=228){
                    var newtime=min_to_secTime(strTime_to_sec(curtime)-360);
                    $.each(res.data,function(i,data){
                           if(newtime <=data.start){
                                if(data.status=="1"){
                                    li+="<li class='ed' start='"+data.start+"' end='"+data.end+"' status='"+data.status+"'><span class='scal'></span></li>";
                                }else{
                                    li+="<li class='none' start='"+data.start+"' end='"+data.end+"' status='"+data.status+"' ><span class='scal'></span></li>";
                                }
                           }
                    });
                }else{
                    $.each(res.data,function(i,data){
                        if(data.status=="1"){
                            li+="<li class='ed' start='"+data.start+"' end='"+data.end+"' status='"+data.status+"'><span class='scal'></span></li>";
                        }else{
                             li+="<li class='none' start='"+data.start+"' end='"+data.end+"' status='"+data.status+"' ><span class='scal'></span></li>";
                        }
                    });
                }
          
                $("#pie_ul").append(li);
                //没有的碎片 补齐没有到时间的碎片
                var prev_end_time=$("#pie_ul li:last").attr("end"); //读出来的数据的最后的时间点
                var surS=strTime_to_sec(etime)-strTime_to_sec(prev_end_time);//计算有多少时间没有创建碎片
                var blockNum=Math.ceil(surS/10)-6;
                var oStart="";
                var oEnd=""; 
                //给读出来的数据之后再多加60秒 
                for(var i=0;i<6;i++){
                    var otherLi="";
                    otherLi="<li class='ed' start='' end='' status ><span class='scal'></span></li>";
                    $("#pie_ul").append(otherLi);
                    var prev_time=$("#pie_ul li").eq($("#pie_ul li").length-2).attr("end");
                    oStart=min_to_secTime(strTime_to_sec(prev_time));//142545格式
                    oEnd=min_to_secTime(strTime_to_sec(prev_time)+10);
                    
                    $("#pie_ul li:last").attr({"start":oStart,"end":oEnd});
                }
                //补齐当前时间到结束时间的碎片
                if(etime!="235959"){
                    for(var i=0;i<=blockNum;i++){
                        var otherLi="";
                        otherLi="<li class='none' start='' end='' status ><span class='scal'></span></li>";
                        $("#pie_ul").append(otherLi);
                          var prev_time=$("#pie_ul li").eq($("#pie_ul li").length-2).attr("end");
                          oStart=min_to_secTime(strTime_to_sec(prev_time));//142545格式
                          oEnd=min_to_secTime(strTime_to_sec(prev_time)+10);
                       
                         $("#pie_ul li:last").attr({"start":oStart,"end":oEnd})
                    }
                }
             

            
                var aPos=[];
                $("#pie_ul li").each(function(i,li){
                    aPos[i]={left:$(this).offset().left, top:$(this).offset().top};
                });
                $("#pie_ul li").each(function(i,li){
                   $(this).css({left:aPos[i].left,top:aPos[i].top});
                });

                if(startT !="" && endT !="" && sn !=""){
                    $("#pie_ul li").eq(0).addClass("ing");
                    $("#pie_ul li").eq(0).removeClass("ed");
                    $("#pie_ul li").eq(0).removeClass("none");
                    $(".current").css({"display":"block","left":parseInt($("#pie_ul li").eq(0).get(0).offsetLeft)-7+"px","top":$("#pie_ul li").eq(0).get(0).offsetTop-20+"px"});
                    clearInterval(secTime);
                    var w=0;
                    var l=parseInt( $("#pie_ul").find(".ing").get(0).offsetLeft)-7;
                     //当前位置进行定位
                    once(w,l, $('#pie_ul').find('.ing'));
        

                }else{
                      $("#pie_ul li").each(function(i,li){
                        if(curtime>=$(this).attr("start") && curtime<$(this).attr("end")){
                            var _this=$(this);
                            $(this).addClass("ing");
                            $(this).removeClass("ed");
                            $(this).removeClass("none");
                            $(".current").css({"display":"block","left":parseInt($(this).get(0).offsetLeft)-7+"px","top":$(this).get(0).offsetTop-20+"px"});
                            clearInterval(secTime);
                            var w=0;
                            var l=parseInt( $("#pie_ul").find(".ing").get(0).offsetLeft)-7;
                             //当前位置进行定位
                            once(w,l, $('#pie_ul').find('.ing'));
                        }
                     
                    });
                }
         
                $("#pie_ul li").live("mouseover",function(event){
                    if(event.type="mouseover"){
                      $(".showtime").html($(this).attr("start").replace(/(.{2})/g,"$1:").substring(0,8));
                      $(".showtime").css({"left":parseInt($(this).get(0).offsetLeft)+"px","top":$(this).get(0).offsetTop-13+"px"});
                      $(".showtime").show();
                    }
                    
                });
                $("#pie_ul").live("mouseout",function(event){
                  $(".showtime").hide();
                })

            }

           
        },
        error:function(error){
            console.log(error);
        }
    });
}

function interval(w,l,status){
    //如果是从原始播放进来的默认0  从暂停后播放进来的传一个1
    status=status || 0;
    clearInterval(secTime);
    //根据状态判断 需要留在当前元素 还是获取下一个元素
    if(status==0){
       var next=$("#pie_ul").find(".ing").next();    
    }else{
        var next=$("#pie_ul").find(".ing");
    }
    var arrNone=[];
    //得到所有状态是无视频的ts
    $("#pie_ul li").each(function(i,li){
       if($(this).attr("status") =="0"){
          arrNone.push($(this).index());     
       }
    });
    if(arrNone.length !=0){
      var arr= arrange(arrNone);
      //连续没有视频碎片的情况
      if(arr.length==1){
        if(next.index()==$("#pie_ul li").eq(arrNone[0]).index()){
           next=$("#pie_ul li").eq(arrNone[arrNone.length-1]).next();    
        }
      }else{
       //分散没有视频碎片的情况
        for(var i=0;i<arr.length;i++){
            if(arr[i].length==1){
                //单独无视频碎片的情况
                if(next.index()==$("#pie_ul li").eq(arr[i][0]).index()){
                    next=$("#pie_ul li").eq(arr[i][0]).next();
                }
            }else{
                //连续几段没有视频的情况
                if($("#pie_ul li").eq(arr[i][0]).index()==next.index()){
                    next=$("#pie_ul li").eq(arr[i][arr[i].length-1]).next();
                }
            }
        }
      }
    }

    $("#pie_ul").find(".ing").addClass("ed");
    $("#pie_ul").find(".ing").removeClass("ing");
    next.removeClass("ed");
    next.removeClass("none");
    next.addClass("ing");
    //$(".current").css({"top": next.get(0).offsetTop-20+"px"});
    l=l || parseInt($("#pie_ul").find(".ing").get(0).offsetLeft)-7;
    //当前位置进行定位
    once(w,l,next);
    if($("#pie_ul li").eq(227).hasClass("ing")){
       $(".current").hide();
       $("#pie_ul").html("");
        getTs();
    }
}
//当前位置定位及运动函数
function once(w,l,obj){
    var t=$("#pie_ul").find(".ing").get(0).offsetTop-20;
    secTime=setInterval(function(){
        w+=2.8;
        l+=2.8;
        obj.find('span').stop().animate({width:w});
        $('.current').stop().animate({left:l,top:t});
        if(Math.floor(w)>=28){
            clearInterval(secTime);
        }
    },900);
}
//判断ts是否是连续的
function arrange(source) {
    var t;
    var ta;
    var r = [];
    source.forEach(function(v) {
        if (t === v) {
            ta.push(t);
            t++;
            return;
        }
        ta = [v];
        t = v + 1;
        r.push(ta);
    });
    return r;
}





