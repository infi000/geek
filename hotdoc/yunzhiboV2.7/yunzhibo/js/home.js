/*
 * @Author: USER
 * @Date:   2016-08-25 13:54:58
 * @Last Modified by:   张驰阳
 * @Last Modified time: 2016-10-12 11:22:47
 */

'use strict';


$(".preview").on("mouseover", function() {
    var status = $(this).closest('.box2').attr("data-status");
    if (status == "in" || status == "none") {
        $(this).find(".clickInfo").fadeIn();
        if (status == "in") {
            $(this).find(".clickInfo").find('span').html("点击获取直播路径")
        } else {
            $(this).find(".clickInfo").find('span').html("点击添加直播设备")
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

$(".unBind").on("click", function() {
    confirm("确定删除直播设备？")
});

$(".tc-uploadFile-yes").on("click", function() {
    $(".tc-uploadFile").hide();
    $(".successTo").show();
});

// 显示消息内容

$(".msg-intro").on("click", function() {
    var that = $(this);

    if (that.closest(".list-group-item").find(".msg-line").css("display") == "none") {
        $(".msg-line").slideUp("fast", function() {
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

//点击复制链接

var clipboard = new Clipboard(".boxSet-copy");
clipboard.on('success', function(e) {

    alert("复制成功")
});

clipboard.on('error', function(e) {
    console.log(e);
});

//点击修改盒子名称

$("#setBoxName").on("click", function() {
    $("#BoxName").hide().closest('dt').find('.input-group').show();
})
$("#editbut").on("click", function() {
        var codename = $("#codename").val();
        $(this).closest('.input-group').hide().closest('dt').find("h3").html(codename).show();
    })
    // 切换直播路径模块


$(".boxSet-down").find("nav li a").on("click", function() {
    $(".boxSet-down").find("nav li").removeClass('active');
    $(this).closest('li').addClass('active');
    var msg = $(this).attr("dataInfo");
    console.log(msg);
    for (var i = 0; i < $(".link-info").length; i++) {
        if ($(".link-info").eq(i).attr("id") == msg) {
            $(".link-info").eq(i).show();
        } else {
            $(".link-info").eq(i).hide();
        }
    }
})

//指针移动
function move() {
    $(".current").animate({ "left": "+=29" }, 'slow', function() {
        if (parseInt($(".current").css("left")) > 348) {
            var top = parseInt($(".current").css("top")) + 23;
            $(".current").css({ "left": "0", "top": top + "px" })
        }
    });
    setTimeout('move()', 1000);
}

move();



