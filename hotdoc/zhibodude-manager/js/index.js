/*
 * @Author: 张驰阳
 * @Date:   2016-12-01 17:01:50
 * @Last Modified by:   张驰阳
 * @Last Modified time: 2016-12-01 18:33:03
 */

'use strict';
var test;

function Dude() {
    this.url_bs = 'https://infi000.wilddogio.com/zhibodude.json';
    this.url_live = "";
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
    $("#getBs").on("click", function() {
        console.log("dus");
        myDude.invoke(myDude.url_bs + '?orderBy="weight"&limitToLast=1000', myDude.callback_bs)
    });
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

});
