/*
 * @Author: 张驰阳
 * @Date:   2016-12-01 17:01:50
 * @Last Modified by:   张驰阳
 * @Last Modified time: 2016-12-05 17:02:21
 */

'use strict';

function Dude() {
    this.domain = "https://infi000.wilddogio.com";
    this.url_bs = 'https://infi000.wilddogio.com/zhibodude.json';
    this.url_twitter = 'https://infi000.wilddogio.com/zhibodude-twitter.json';
    this.url_ins = 'https://infi000.wilddogio.com/zhibodude-ins.json';
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
            var num = 1;
            var index = data[keys];
            var name = (index.name) ? index.name : "无";
            var msg = index.msg;
            var img = 'http://zhibodude.com/' + index.img;
            var weight = index.weight;
            // obj += "<tr><td>" + keys + "</td>";
            obj += "<tr data-Key='" + keys + "' data-type='bs'><td>" + num + "</td>";
            obj += "<td>" + name + "</td>";
            obj += "<td>" + weight + "</td>";
            obj += "<td>" + msg + "</td>";
            obj += "<td><a href='" + img + "'>" + img + "</a></td>";
            obj += '<td><div class="btn-group"><a class="btn btn-sm btn-default fix">修改</><a class="btn btn-sm btn-default delete">删除</a></div></tr>';
            num++;
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
    };
    this.callback_twitter = function(msg) {
        var data = msg;
        var obj = "";
        var Num = 1;
        for (var keys in data) {
            var index = data[keys];
            var name = (index.name) ? index.name : "无";
            var msg = index.msg;
            var head = index.head;
            var img = index.img;
            var time = index.time;
            var weight = index.weight;
            // obj += "<tr><td>" + keys + "</td>";
            obj += "<tr data-Key='" + keys + "' data-type='twitter'><td>" + Num + "</td>";
            obj += "<td>" + name + "</td>";
            obj += "<td><img src='http://www.zhibodude.com/" + head + "' width='70'></td>";
            obj += "<td>" + weight + "</td>";
            obj += "<td>" + msg + "</td>";
            obj += "<td>" + time + "</td>";
            obj += "<td><a href='http://www.zhibodude.com/static/twitterImg/" + img + "'><img src='http://www.zhibodude.com/static/twitterImg/" + img + "' width='100' ></a></td>";
            obj += '<td><div class="btn-group"><a class="btn btn-sm btn-default fix">修改</><a class="btn btn-sm btn-default delete">删除</a></div></tr>';
            Num++;
        };
        $("#twitterList").find("tbody").html(obj);
    };
    this.callback_ins = function(msg) {
        var data = msg;
        var obj = "";
        var Num = 1;
        for (var keys in data) {
            var index = data[keys];
            var name = (index.name) ? index.name : "无";
            var msg = index.msg;
            var img = index.img;
            var weight = index.weight;
            // obj += "<tr><td>" + keys + "</td>";
            obj += "<tr data-Key='" + keys + "' data-type='ins'><td>" + Num + "</td>";
            obj += "<td>" + name + "</td>";
            obj += "<td>" + weight + "</td>";
            obj += "<td>" + msg + "</td>";
            obj += "<td><a href='http://www.zhibodude.com/static/insImg/" + img + "'><img src='http://www.zhibodude.com/static/insImg/" + img + "' width='100' ></a></td>";
            obj += '<td><div class="btn-group"><a class="btn btn-sm btn-default fix">修改</><a class="btn btn-sm btn-default delete">删除</a></div></tr>';
            Num++;
        };
        $("#insList").find("tbody").html(obj);
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
wdog.ref_twitter = wilddog.sync().ref("/zhibodude-twitter/");
wdog.ref_ins = wilddog.sync().ref("/zhibodude-ins/");

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
    // 提交twitter数据
    $("#twitter-submit").on("click", function() {
        var data = {
            name: $("#twitter-name").val(),
            weight: $("#twitter-weight").val(),
            img: $("#twitter-img").val(),
            head: $("#twitter-head").val(),
            time: $("#twitter-time").val(),
            msg: $("#twitter-msg").val(),
        };
        for (var key in data) {
            var index = data[key];
            if (index == "") {
                console.log(key)
                alert("填写完整内容");
                return;
            }
        };
        wdog.ref_twitter.push(data, function(err) {
            if (err == null) {
                alert("提交成功");
                myDude.invoke(myDude.url_twitter + '?orderBy="weight"&limitToLast=1000', myDude.callback_twitter)
            }
        });
    });
    // 提交ins数据
    $("#ins-submit").on("click", function() {
        var data = {
            name: $("#ins-name").val(),
            weight: $("#ins-weight").val(),
            img: $("#ins-img").val(),
            msg: $("#ins-msg").val(),
        };
        for (var key in data) {
            var index = data[key];
            if (index == "") {
                alert("填写完整内容");
                return;
            }
        };
        wdog.ref_ins.push(data, function(err) {
            if (err == null) {
                alert("提交成功");
                myDude.invoke(myDude.url_ins + '?orderBy="weight"&limitToLast=1000', myDude.callback_ins)
            }
        });
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
    $("#getTwitter").on("click", function() {
        $(".mainBox").hide();
        $("#twitter-main").show();
        $(this).closest('ul').find("li").removeClass();
        $(this).closest('li').addClass('active');
        myDude.invoke(myDude.url_twitter + '?orderBy="weight"&limitToLast=1000', myDude.callback_twitter)
    });
    $("#getIns").on("click",function(){
           $(".mainBox").hide();
        $("#ins-main").show();
        $(this).closest('ul').find("li").removeClass();
        $(this).closest('li').addClass('active');
                myDude.invoke(myDude.url_ins + '?orderBy="weight"&limitToLast=1000', myDude.callback_ins)

    })
    //删除数据
    $(document).on("click", ".delete", function() {
        var type = $(this).closest('tr').attr("data-type");
        var node = $(this).closest('tr').attr("data-Key");
        var cf = confirm("确认删除？");
        if (cf == true) {
            if (type == "bs") {
                wdog.ref_bs.child("/" + node).set(null, function(err) {
                    if (err == null) {
                        alert("删除成功");
                        myDude.invoke(myDude.url_bs + '?orderBy="weight"&limitToLast=1000', myDude.callback_bs)
                    }
                })
            } else if (type == "twitter") {
                wdog.ref_twitter.child("/" + node).set(null, function(err) {
                    if (err == null) {
                        alert("删除成功");
                        myDude.invoke(myDude.url_twitter + '?orderBy="weight"&limitToLast=1000', myDude.callback_twitter)
                    }
                })
            } else if (type == "ins") {
                wdog.ref_ins.child("/" + node).set(null, function(err) {
                    if (err == null) {
                        alert("删除成功");
                        myDude.invoke(myDude.url_ins + '?orderBy="weight"&limitToLast=1000', myDude.callback_ins)
                    }
                })
            }
        } else {
            return;
        }

    });
    //修改数据
    $(document).on("click", ".fix", function() {
        var type = $(this).closest('tr').attr("data-type");
        var node = $(this).closest('tr').attr("data-Key");
        var cf = confirm("确认修改？");
        if (cf == true) {
            if (type == "bs") {
                var data = {
                    name: $("#bs-name").val(),
                    weight: $("#bs-weight").val(),
                    img: $("#bs-img").val(),
                    msg: $("#bs-msg").val(),
                };
                wdog.ref_bs.child("/" + node).set(data, function(err) {
                    if (err == null) {
                        alert("修改成功");
                        myDude.invoke(myDude.url_bs + '?orderBy="weight"&limitToLast=1000', myDude.callback_bs)
                    }
                });
            } else if (type == "twitter") {
                var data = {
                    name: $("#twitter-name").val(),
                    weight: $("#twitter-weight").val(),
                    img: $("#twitter-img").val(),
                    head: $("#twitter-head").val(),
                    time: $("#twitter-time").val(),
                    msg: $("#twitter-msg").val(),
                };
                for (var key in data) {
                    var index = data[key];
                    if (index == "") {
                        console.log(key)
                        alert("填写完整内容");
                        return;
                    }
                };
                wdog.ref_twitter.child("/" + node).set(data, function(err) {
                    if (err == null) {
                        alert("修改成功");
                        myDude.invoke(myDude.url_twitter + '?orderBy="weight"&limitToLast=1000', myDude.callback_twitter)
                    }
                });
            } else if (type == "ins") {
                var data = {
                    name: $("#ins-name").val(),
                    weight: $("#ins-weight").val(),
                    img: $("#ins-img").val(),
                    msg: $("#ins-msg").val(),
                };
                for (var key in data) {
                    var index = data[key];
                    if (index == "") {
                        console.log(key)
                        alert("填写完整内容");
                        return;
                    }
                };
                wdog.ref_ins.child("/" + node).set(data, function(err) {
                    if (err == null) {
                        alert("修改成功");
                        myDude.invoke(myDude.url_ins + '?orderBy="weight"&limitToLast=1000', myDude.callback_ins)
                    }
                });
            }
        } else {
            return;
        }
    });

});
