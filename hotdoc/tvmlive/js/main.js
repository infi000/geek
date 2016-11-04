/*
 * @Author: 张驰阳
 * @Date:   2016-10-21 11:43:56
 * @Last Modified by:   张驰阳
 * @Last Modified time: 2016-11-01 11:07:59
 */

'use strict';

var Maibo = function() {
    this.domain = "http://"+document.location.hostname+"/";
    this.newsUrl = "livemanage/admin.php?m=Admin&c=Index&a=getnews";
    this.articleUrl = "livemanage/admin.php?m=Admin&c=Index&a=getNewsById";
    this.caseUrl = "livemanage/admin.php?m=Admin&c=Index&a=getcase";
    this.bannerUrl = "livemanage/admin.php?m=Admin&c=Index&a=getbanner";
    this.addUserUrl = "livemanage/admin.php?m=Admin&c=Index&a=addapplyuser";
    this.invoke = function(_url, _value, callback) {
        $.ajax({
                url: _url,
                type: 'POST',
                dataType: 'json',
                data: _value,
                async: false,
                success: callback,
                error: function() {

                }
            })
            .done(function() {
                console.log("success");
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

    };
    this.page = function(msg) {
        var data = JSON.parse(msg);
        var page = data.page;
        var page_totale_num = data.page_total_num;
        var obj = '<ul class="dis-mark">';
        for (var i = 1; i <= page_totale_num; i++) {
            if (i == page) {
                obj = obj + "<li class='s-page'><span>" + i + "</span></li>";
            } else {
                obj = obj + "<li><span>" + i + "</span></li>";
            }
        };
        obj += "</ul>";
        $(".g-page").css({ width: page_totale_num * 28 + 5 + "px" });
        console.log("page:" + "////////////" + page + "///////" + "page_totale_num:" + "///////" + page_totale_num)
        return obj;
    };
    //警告框
    this.alertInfo = function(msg) {
        var alertObj = '<div id="m-alert"><span>' + msg + '</span></div>';
        alertObj = $(alertObj);
        alertObj.appendTo("body").css({
                display: "none",
                position: 'fixed',
                top: 0,
                width: '100%',
                height: '40 x',
                background: '#f39800',
                'line-height': '40px',
                'text-align': 'center',
                'font-size': '16px',
                'color': '#fff',
                'font-family': "微软雅黑",
                'box-shadow': '0 1px 1px #ccc'
            }).slideDown("fast", function() {
                setTimeout('$("#m-alert").fadeOut("slow",function(){this.remove()})', 1000);
            })
    }

};
// 合作案例对象
var casePage = new Maibo;

// 回调函数 加载结构
casePage.callback = function(msg) {
    if (msg != "") {
        var data = JSON.parse(msg).data;
        var element = "";
        //遍历翻译json，放入数组
        data.map(function(key, i) {
            var case_qrcode = "/../livemanage/" + key.case_qrcode;
            var case_title = key.case_title;
            var case_thumbinal = "/../livemanage/" + key.case_thumbinal;
            var case_weight = key.case_weight;
            var case_id = key.id;
            var obj = '<td><div class="g-box1"><div class="m-pic m-pic-3"><div class="m-mb a-flipin"><dl><dt>';
            obj += '<img src="' + case_qrcode + '" alt="二维码">';
            obj += '</dt><dd>' + case_title + '</dd></dl></div><p>';
            obj += '<img src="' + case_thumbinal + '" alt="" class="hidden"><img src="' + case_thumbinal + '" alt="">';
            obj += '</p></div></div></td>';
            if (i == 0 || i % 4 == 0) {
                element += "<tr class='dis-mark'>" + obj
            } else if (i % 4 == 3 || i == data.length) {
                element += obj + "</tr>";
            } else {
                element += obj;
            }
        });
        $("table").find('caption').after(element);
        //加载翻页控件
        var page = casePage.page(msg);
        $(".g-page").find('.f-mrt30').after(page);
        $(".g-page").find("li").on("click", function() {
            var num = parseInt($(this).find("span").html());
            casePage.getDate(num);
        })
    } else {
        $("table").after("<h1 style='text-align:center;font-size:20px;'>没有数据</h1>")
    }


};
//获取数据
casePage.getDate = function(num) {
    var _url = this.domain + this.caseUrl;
    var _value = {
        page: num,
        pagecount: 20
    };
    $(".dis-mark").remove();
    this.invoke(_url, _value, this.callback);
};




//最新动态对象
var actionPage = new Maibo;

//最新动态页面回调
actionPage.callback = function(msg) {
    if (msg != "") {
        var data = JSON.parse(msg).data;
        var element = "";
        data.map(function(key, i) {
            var news_id = key.id;
            var news_title = key.news_title;
            var news_time = key.news_time.split(" ")[0];
            var news_thumbinal = "/../livemanage/" + key.news_thumbinal;
            var news_des = key.news_des;
            var news_html = key.news_html;
            var news_weight = key.news_weight;
            var news_url = "action/news.html?id=" + news_id;
            var obj = ' <li class="s-zxdt dis-mark"><div class="g-mn"><div class="g-mnc"><dl><dt><h4>';
            obj += '<a href="' + news_url + '">' + news_title + '</a></h4></dt>';
            obj += '<dd><i>' + news_time + '</i></dd>';
            obj += '<dd><p><a href="' + news_url + '">' + news_des + '</a></p></dd>';
            obj += '<dd><a href="' + news_url + '">查看详情>></a></dd></dl></div></div>';
            obj += '<div class="g-sd"><img src="' + news_thumbinal + '" alt=""></div><div class="f-cb"></div></li>';
            $("#newsList").append(obj);

        });
        //加载翻页控件
        var page = casePage.page(msg);
        $(".g-page").find('.f-mrt30').after(page);
        $(".g-page").find("li").on("click", function() {
            var num = parseInt($(this).find("span").html());
            actionPage.getDate(num);
        })
    } else {
        $("#newsList").append("<h1 style='text-align:center;font-size:20px;margin-top:50px;'>没有数据</h1>");
    }

}

//新闻详情回调
actionPage.callbackArt = function(msg) {
    var data = JSON.parse(msg).data[0];
    var element = "";
    var news_id = data.id;
    var news_title = data.news_title;
    var news_time = data.news_time.split(" ")[0];
    var news_thumbinal = "/livemanage" + data.news_thumbinal;
    var news_html = "/../livemanage/" + data.news_html;
    var news_weight = data.news_weight;
    var news_url = "action/news.html?id=" + news_id;
    $("#newsArt .newsArt-title").html(news_title);
    $("#newsArt .newsArt-time").html(news_time);
    $("#newsBox").load(news_html);
    console.log(news_thumbinal);
}

//新闻详情页新闻列表回调
actionPage.callabckList = function(msg) {
    var data = JSON.parse(msg).data;
    data.map(function(key, i) {
        var id = document.URL.split("?")[1].split("=")[1];
        var news_id = key.id;
        var news_title = key.news_title.slice(0, 14) + "...";
        var news_time = key.news_time;
        var news_thumbinal = "/../livemanage/" + key.news_thumbinal;
        var news_desc = key.news_desc;
        var news_html = key.news_html;
        var news_weight = key.news_weight;
        var news_url = "news.html?id=" + news_id;
        if (news_id == id) {
            var obj = '<li class="s-sel"><a href="' + news_url + '">' + news_title + '</a></li>';
        } else {
            var obj = '<li><a href="' + news_url + '">' + news_title + '</a></li>';
        }

        $("#hot-newsList ul").append(obj);
    })
}

//获取最新动态页面信息
actionPage.getDate = function(num) {
    var _url = this.domain + this.newsUrl;
    var _value = {
        page: num,
        pagecount: 5
    };
    $(".dis-mark").remove();
    this.invoke(_url, _value, this.callback);
};

//获取新闻详情页面信息
actionPage.getNews = function(num) {
    var id = document.URL.split("?")[1].split("=")[1];
    var _url = this.domain + this.articleUrl;
    var _url2 = this.domain + this.newsUrl;
    var _value = {
        did: id,
    };
    var _value2 = {
        page: num,
        pagecount: 10
    };
    $(".dis-mark").remove();
    this.invoke(_url, _value, this.callbackArt);
    this.invoke(_url2, _value2, this.callabckList);
}

//banner图对象
var banner = new Maibo;

banner.getDate = function(num) {
    var _url = this.domain + this.bannerUrl;
    var _value = {
        page: num,
        pagecount: 4
    };
    this.invoke(_url, _value, this.callback)
};
banner.callback = function(msg) {
    if (msg != "") {
        var data = JSON.parse(msg).data;
        //遍历翻译json，放入数组
        data.map(function(key, i) {
            var banner_thumbinal = "/livemanage" + key.banner_thumbinal;
            var banner_url = key.banner_url;
            var obj = '<a class="swiper-slide" href="';
            obj += banner_url + '" style="background:url(';
            obj += banner_thumbinal + ') center" >'
            $("#banner-swiper").append(obj);
        });

    } else {
        console.log("没有数据")
    }
}


//在线申请
var addUser = new Maibo;

addUser.getDate = function(value) {
    var _url = this.domain + this.addUserUrl;
    var _value = value;
    this.invoke(_url, _value, this.callback)
};
addUser.callback = function(msg) {
    if (msg == "success") {
        alert("提交申请成功！");
        $("#apply-form").fadeOut('fast');
    } else {
        this.alertInfo("请填写正确信息！")
    }
};
addUser.invoke = function(_url, _value, callback) {
    $.ajax({
            url: _url,
            type: 'POST',
            dataType: 'json',
            data: _value,
            async: false,
            success: callback,
            error: function() {
                addUser.alertInfo("提交失败！");
            }
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

};
