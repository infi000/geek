//隐藏rightcont
function rcont() {
    $(".rightcont").fadeToggle();
}

function changeSytle() {
    //1.添加设置按钮
    $("<div class='hideLeftcont' style='color:white;font-size:14pt;float:right;margin-right:20px;cursor:pointer'>操作</div>").appendTo($("#pagenumdiv"));
    //2.绑定点击事件，隐藏rightcont
    $(".hideLeftcont").on("click", rcont);
    //3.改变switchdiv、leftcont和rightcont样式i
    $(".leftcont").css({ "right": "0" });
    $(".rightcont").css({ "height": "50%" });
    $("#switchdiv").css({ "height": "35px" });
}
changeSytle();




window.fullplayvideowin = function() {

    var previewdivobj = document.getElementById("previewdiv");
    var videoiframetempobj = document.getElementById("videoiframetemp");
    var myConainerDivsmallzoomdivobj = document.getElementById("myConainerDivsmallzoomdiv");

    if (myConainerDivsmallzoomdivobj != null) {
        // 看视屏就在全屏状态好不好
        console.log("看视屏就在全屏状态好不好");
        return;
    }
    var wv = 700; // previewdivobj.parentNode.clientWidth;
    var hv = previewdivobj.parentNode.clientHeight;
    var maxwv2 = 265;
    var maxhv2 = 170;
    if (mainnew) {
        $("#switchtext").text("PPT");
        $("#switchtext").attr("data-type", "1");
        //var predisplay=previewdivobj.style.display=='none'?'display:none;':'';
        previewdivobj.style.cssText = 'width:100%;height:100%;';
    } else {
        previewdivobj.style.cssText = 'width:' + wv + 'px;height:' + hv + 'px;';
        videoiframetempobj.style.zoom = 1;
        videoiframetempobj.style.MozTransform = "scale(1)";
        videoiframetempobj.style.MozTransformOrigin = "center center"
    }
    var pptpreviewdivobj = document.getElementById("pptpreviewdiv");
    var contentbodybodytabobj = document.getElementById("contentbodybodytab");
    var myConainerDivobj = document.getElementById("myConainerDiv");
    if (myConainerDivobj.firstChild && myConainerDivobj.firstChild.tagName) {
        wv = myConainerDivobj.firstChild.clientWidth || myConainerDivobj.clientWidth;
        hv = myConainerDivobj.firstChild.clientHeight || myConainerDivobj.clientHeight;
    } else {
        hv = 1024;
        wv = 580;
    }
    if (mainnew) {
        pptpreviewdivobj.style.cssText = "margin:0;position:absolute;z-index:1;width:" + (maxwv2 - 20) + "px;height:" + maxhv2 +
            "px;top:0;left:0;overflow:hidden;";
        //修改了margin:0;top:0;left:0使得小窗口在父元素的左上角固定
        //
        //
        $(myConainerDivobj).parent().append('<div onclick="smallzoomplayvodeowin()" id="myConainerDivsmallzoomdiv" style="background-color:black;opacity:0.1;left:0px;top:0px;position:absolute;z-index:2;width:100%;height:100%">&nbsp;</div>');
        var zoomhash = maxWHHash2(wv, hv, maxwv2 - 20, maxhv2);
        if (myConainerDivobj.firstChild && myConainerDivobj.firstChild.tagName) { //避免myConainerDivobj标签内的文字被当成标签处理
            if (myConainerDivobj.firstChild.tagName.toLowerCase() == "img") {
                myConainerDivobj.firstChild.style.cssText = "height:" + zoomhash.height + "px;width:" + zoomhash.width + "px";
            } else { //svg,带有svg的，采用重置方式
                showresource(itemscrolldivobj.children(".itemsourceon")[0], 1);
            }
        }
    } else {
        var bodywidth = contentbodybodytabobj.clientWidth;
        var bodyheight = contentbodybodytabobj.clientHeight;
        pptpreviewdivobj.style.cssText = "position:absolute;width:" + maxwv2 + "px;height:" + maxhv2 + "px;margin:0px 0px 0px -270px;left:271px;top:6px;overflow:hidden;";
        $(myConainerDivobj).parent().append('<div onclick="smallzoomplayvodeowin()" id="myConainerDivsmallzoomdiv" style="background-color:black;opacity:0.1;left:0px;top:0px;position:absolute;z-index:2;width:100%;height:100%">&nbsp;</div>');
        var zoomhash = maxWidthHeightHash(wv, hv, maxwv2, maxhv2);
        // console.log(JSON.stringify(zoomhash),wv,hv,maxwv2,maxhv2)
        // "width:100%;height:100%;zoom:"+zoomhash.zoom;;//margin1-left:-"+((bodywidth-wv)/4)+"px
        contentbodybodytabobj.style.cssText = "width:" + bodywidth + "px;height:" + bodyheight + "px;";
        myConainerDivobj.parentNode.setAttribute("align", "left");
        myConainerDivobj.parentNode.setAttribute("valign", "top");
        myConainerDivobj.style.margin = "0px";
        myConainerDivobj.parentNode.style.cssText = "width:" + bodywidth + "px;height:" + bodyheight + "px;zoom:" + zoomhash.zoom + ";-moz-transform:scale(" + zoomhash.zoom + ");-moz-transform-origin:top left;";
    }
}
window.smallzoomplayvodeowin = function() {
    var videoiframetempobj = document.getElementById("videoiframetemp");
    var previewdivobj = document.getElementById("previewdiv");
    var pptpreviewdivobj = document.getElementById("pptpreviewdiv");
    var contentbodybodytabobj = document
        .getElementById("contentbodybodytab");
    var myConainerDivobj = document.getElementById("myConainerDiv");

    var wv = 700; // previewdivobj.parentNode.clientWidth;
    var hv = previewdivobj.parentNode.clientHeight;
    var maxwv2 = 265;
    var maxhv2 = 170;
    var zoomhash = maxWidthHeightHash(wv, hv, maxwv2, maxhv2);

    var notelistdivobj = document.getElementById("notelistdiv");
    if (mainnew) {
        $("#switchtext").text("视频");
        $("#switchtext").attr("data-type", "0");
        //var predisplay=previewdivobj.style.display=='none'?'display:none;':'';
        previewdivobj.style.cssText = "position:absolute;z-index:1;width:" + (maxwv2 - 20) + "px;height:" + maxhv2 + "px;top:0;left:0;background-color:white";
        //修改了margin:0;top:0;left:0使得小窗口在父元素的左上角固定
        //
        //
        if (myConainerDivobj.firstChild && myConainerDivobj.firstChild.tagName) {
            if (myConainerDivobj.firstChild.tagName.toLowerCase() == "img") {
                myConainerDivobj.firstChild.style.cssText = "";
            } else { //svg
                showresource(itemscrolldivobj.children(".itemsourceon")[0], 1);
            }
        }
    } else {
        previewdivobj.style.cssText = "border:1px solid #595959;padding:2px;position:absolute;width:" + maxwv2 + "px;height:" + maxhv2 + "px;margin:0px 0px 0px -275px;left:276px;top:6px;overflow:hidden;background-color:white";
        contentbodybodytabobj.style.cssText = "width:100%;height:100%";
        myConainerDivobj.parentNode.setAttribute("align", "center");
        myConainerDivobj.parentNode.setAttribute("valign", "middle");
        myConainerDivobj.parentNode.style.zoom = 1;
        myConainerDivobj.style.margin = "0px auto";
        myConainerDivobj.style.MozTransform = "scale(1)";
        myConainerDivobj.style.MozTransformOrigin = "center center";
        videoiframetempobj.style.zoom = zoomhash.zoom;
        videoiframetempobj.style.MozTransform = "scale(" + zoomhash.zoom + ")";
        videoiframetempobj.style.MozTransformOrigin = "top left";
    }
    pptpreviewdivobj.style.cssText = "width:100%;height:100%";
    $("#myConainerDivsmallzoomdiv").remove();
}
window.playvideo = function() {
    var previewdivobj = document.getElementById("previewdiv");
    // if(previewdivobj.style.display=="none"){
    var wv = 700; // previewdivobj.parentNode.clientWidth;
    var hv = previewdivobj.parentNode.clientHeight;
    var maxwv2 = 265;
    var maxhv2 = 170;
    var zoomhash = maxWidthHeightHash(wv, hv, maxwv2, maxhv2);

    var notelistdivobj = document.getElementById("notelistdiv");
    var html = ''
    if (mainnew) {
        
        previewdivobj.style.cssText = "padding:0 10px;position:absolute;z-index:1;width:" + (maxwv2 - 20) + "px;height:" + maxhv2 + "px;top:0;right:0;overflow:hidden;background-color:white";
          //修改了margin:0;top:0;left:0使得小窗口在父元素的左上角固定
        //
        //
        html = '' + '<iframe id="videoiframetemp" name="videoiframetemp" style="width:100%;height:100%;-moz-transform-origin:top left;"  src="about:blank"  frameborder="0" allowfullscreen="true"></iframe>';
    } else {
        previewdivobj.style.cssText = "display:none;border:1px solid #595959;padding:2px;position:absolute;width:" + maxwv2 + "px;height:" + maxhv2 + "px;margin:0px 0px 0px -275px;left:276px;top:6px;overflow:hidden;background-color:white";

        html = '' + '<iframe id="videoiframetemp" name="videoiframetemp" style="width:' + wv + 'px;height:' + hv + 'px;zoom:' + zoomhash.zoom + ';-moz-transform:scale(' + zoomhash.zoom + ');-moz-transform-origin:top left;"  src="about:blank"  frameborder="0"></iframe>';
    }
    previewdivobj.innerHTML = html;
    // }
    loadplayhtmlpage();

}


//含有previewdiv和pptpreviewdiv的方法:
//clsplayvideowin;fullplayvideowin;smallzoomplayvodeowin;playvideo;setCourseStatus;
