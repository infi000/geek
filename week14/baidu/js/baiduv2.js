//光标聚焦
var con_txt = document.getElementById("con_txt");
con_txt.focus();

//广告轮播
var more_tips = document.getElementById("more_tips");
var headerlist_more = document.getElementById('headerlist_more');
var set = document.getElementById("set");
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    loop: true,
    autoplay: 2000,
});

// 新闻加载更多
var yc = $(".yincang1");
var ref = $(".news-refresh");
ref.click(
    function() {
        yc.slideToggle("fast", function() {
            if (yc.css("display") == "block") {
                ref.html("点击收回");
            } else {
                ref.html("点击加载更多");
            }
        });

    }
)

// 更多产品

function tips() {
    more_tips.style.display = "block";
    headerlist_more.style.background = "rgba(238, 238, 238, 0.44)";
    headerlist_more.style.color = "black";

}

function tipsOut() {
    more_tips.style.display = "none";
    headerlist_more.style.background = "#38f";
    headerlist_more.style.color = "white";
}

function setshow() {
    set.style.display = "block";
}

function setout() {
    set.style.display = "none"
}

//百度个人设置
function show() {
    var content = document.getElementById("page-content");
    var control = document.getElementById("page-control");
    var control2 = document.getElementById("page-control-2");
    content.style.display = "block"
    control.style.display = "none"
    control2.style.display = "block"
}

function dis() {
    var content = document.getElementById("page-content");
    var control = document.getElementById("page-control");
    var control2 = document.getElementById("page-control-2");
    content.style.display = "none"
    control.style.display = "block"
    control2.style.display = "none"
}
//热点新闻
function liup() {
    var li = $(".ui-hotword-content li");
    $(li[0]).slideUp("slow", function() {
        $(li[0]).insertAfter($(li[li.length - 1]));
        $(li[0]).css({
            "display": "block"
        })
    })
};
setInterval("liup()", 2000);
//显示更多

var navdown = $(".navdown");
var navup = $(".navup")
var navdis = $(".navdis");
navdown.click(
    function() {
        for (var i = 0; i < navdis.length; i++) {
            navdis.eq(i).slideDown("fast")
        }
    }
);
navup.click(
    function() {
        for (var i = 0; i < navdis.length; i++) {
            navdis.eq(i).slideUp("fast")
        }
    }
);

//页面切换
var tuijian = $("#tuijian");
var baijia = $("#baijia");
var bendi = $("#bendi");
var tuijianclick = $(".tuijian");
var baijiaclick = $(".baijia");
var bendiclick = $(".bendi");
// $("#tuijian").fadeOut("fast");
// $("#tuijian").fadeIn("fast");


tuijianclick.click(
    function() {

        baijia.fadeOut("fast");
        bendi.fadeOut("fast");
        tuijian.fadeIn("fast");
    })



baijiaclick.click(
    function() {

        tuijian.fadeOut("fast");
        bendi.fadeOut("fast");
        baijia.fadeIn("fast");
    })



bendiclick.click(
    function() {

        baijia.fadeOut("fast");
        tuijian.fadeOut("fast");
        bendi.fadeIn("fast");
    })

// tuijianshow();
// baijiashow();
// bendishow();
