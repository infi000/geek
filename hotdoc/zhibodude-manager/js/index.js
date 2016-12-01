/*
 * @Author: 张驰阳
 * @Date:   2016-12-01 17:01:50
 * @Last Modified by:   张驰阳
 * @Last Modified time: 2016-12-01 18:33:03
 */

'use strict';
var test;

function Dude() {
    this.url_bs = "http://infi000.wilddogio.com/zhibodude.json";
    this.url_live = "";
    this.invoke = function(_url, _callback) {
        $.ajax({
            url: _url,
            success: _callback
        })
    };
    this.callback_bs = function(msg) {
        console.log(msg);
        test = msg;
        var obj;
        for (key in test) {
            console.log(key)
        }


        // for (keys in test){
        // 	var index=msg[keys];
        // 	var name=index.name;
        // 	var msg=index.msg;
        // 	var img=index.img;
        // 	var weight=index.weight;
        // 	obj+="<tr><td>"+keys+"</td>";
        // 	obj+="<td>"+name+"</td>";
        // 	obj+="<td>"+weight+"</td>";
        // 	obj+="<td>"+msg+"</td>";
        // 	obj+="<td>"+img+"</td></tr>";
        // };
        $("#bsList").find("tbody").html(obj);
    };

};

    $.ajax({
        url: "http://infi000.wilddogio.com/jrstv/config.json",
        // dataType:"jsonp",
        // async:false,
        success: function(msg) {
            test = msg
        }
    })
var myDude = new Dude();
// myDude.invoke(myDude.url_bs, function(msg) {
//     console.log(msg);
//     test = msg;
//     for (key in msg) {
//         console.log(key)
//     }
// })
var wdog = {
    config: {
        authDomain: "infi000.wilddog.com",
        syncURL: "https://infi000.wilddogio.com"
    }
};

wilddog.initializeApp(wdog.config);
wdog.ref = wilddog.sync().ref("/jrstv/");

$(document).ready(function($) {



    console.log(test)
    for (key in test) {
        console.log(key)
    }

});
