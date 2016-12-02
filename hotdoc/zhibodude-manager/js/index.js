/*
 * @Author: 张驰阳
 * @Date:   2016-12-01 17:01:50
 * @Last Modified by:   张驰阳
 * @Last Modified time: 2016-12-02 11:49:03
 */

'use strict';
var test;

function Dude() {
    this.domain = "https://infi000.wilddogio.com";
    this.url_bs = 'https://infi000.wilddogio.com/zhibodude.json';
    this.url_live = "";
    this.url_config = "http://jrstv.net/getSource/app/getjson.php";
    this.url_gamefile = "http://jrstv.net/getSource/app/getfile.php";
    this.invoke = function(_url, _callback) {
        $.ajax({
            url: _url,
            // dataType:"jsonp",
            success: _callback
        })
    };
    this.callback_bs = function(msg) {
        var data = msg;
        var obj = "";
        for (var keys in data) {
            var index = data[keys];
            var name = (index.name) ? index.name : "无";
            var msg = index.msg;
            var img = 'http://zhibodude.com/' + index.img;
            var weight = index.weight;
            // obj += "<tr><td>" + keys + "</td>";
            obj += "<tr><td>" + name + "</td>";
            obj += "<td>" + weight + "</td>";
            obj += "<td>" + msg + "</td>";
            obj += "<td><a href='" + img + "'>" + img + "</a></td></tr>";
        };
        $("#bsList").find("tbody").html(obj);
    };
    this.callback_config = function(msg) {
        var channelsOjb = "";
        var channelsNum = 1;
        for (var key in msg.channels) {
            var index = msg.channels[key];
            var title = index.title;
            var url = index.url;
            var pc_url = index.pc_url;
            channelsOjb += "<tr><td>" + channelsNum + "</td>";
            channelsOjb += "<td>" + title + "</td>";
            channelsOjb += "<td>" + url + "</td>";
            channelsOjb += "<td>" + pc_url + "</td></tr>";
            channelsNum++;
        };
        $("#data-channel").find("tbody").html(channelsOjb);
        var liveObj = "";
        var liveNum = 1;
        for (var key in msg.today) {
            var index = msg.today[key];
            var title = index.title;
            var url = index.url[0];
            var pc_url = index.pc_url;
            liveObj += "<tr><td>" + liveNum + "</td>";
            liveObj += "<td>" + title + "</td>";
            liveObj += "<td>" + url + "</td>";
            liveObj += "<td>" + pc_url + "</td></tr>";
            liveNum++;
        };
        $("#data-config").find("tbody").html(liveObj);
    }
};

var wdog = {
    config: {
        authDomain: "infi000.wilddog.com",
        syncURL: "https://infi000.wilddogio.com"
    }
};

wilddog.initializeApp(wdog.config);
wdog.ref = wilddog.sync().ref("/jrstv/");
wdog.ref_bs = wilddog.sync().ref("/zhibodude/");

$(document).ready(function($) {
    //实例化
    var myDude = new Dude();
    // 获取bs数据
    myDude.invoke(myDude.url_bs + '?orderBy="weight"&limitToLast=1000', myDude.callback_bs)

    // 提交bs数据
    $("#bs-submit").on("click", function() {
        var data = {
            name: $("#bs-name").val(),
            weight: $("#bs-weight").val(),
            img: $("#bs-img").val(),
            msg: $("#bs-msg").val(),
        };
        wdog.ref_bs.push(data, function(err) {
            if (err == null) {
                alert("提交成功");
                myDude.invoke(myDude.url_bs + '?orderBy="weight"&limitToLast=1000', myDude.callback_bs)
            }
        });
    });
    //更新直播数据至野狗后台
    $("#update-config").on("click", function() {
        myDude.invoke(myDude.url_config, function(msg) {
            wdog.ref.child("config").set(msg, function(err) {
                if (err == null) {
                    alert("伤传成功")
                }
            })
        });
        myDude.invoke(myDude.domain + "/jrstv/config.json", myDude.callback_config);
    });
    $("#update-gamefile").on("click", function() {
        myDude.invoke(myDude.url_gamefile, function(msg) {
            wdog.ref.child("gamefile").set(msg, function(err) {
                if (err == null) {
                    alert("伤传成功")
                }
            })
        });
        myDude.invoke(myDude.domain + "/jrstv/gamefile/data.json", myDude.callback_config);
    });
    // 切换展示界面
    $("#getData").on("click", function() {
        $(".mainBox").hide();
        $("#data-main").show();
       $(this).closest('ul').find("li").removeClass();
       $(this).closest('li').addClass('active');
        myDude.invoke(myDude.domain + "/jrstv/gamefile/data.json", myDude.callback_config);
    });
    $("#getBs").on("click", function() {
       $(".mainBox").hide();
       $("#bs-main").show();
       $(this).closest('ul').find("li").removeClass();
       $(this).closest('li').addClass('active');
        myDude.invoke(myDude.url_bs + '?orderBy="weight"&limitToLast=1000', myDude.callback_bs)
    });

});
