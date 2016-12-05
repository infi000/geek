var index = new Dude();
var title = decodeURIComponent(document.URL.split("?&=")[1]);
var liveURL;
var today = function() {
    var oDate = new Date();
    var year = oDate.getFullYear(); //获取系统的年；
    var month = oDate.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
    var day = oDate.getDate(); // 获取系统日，
    return year + "-" + month + "-" + day
};
index.playChannels = {};
index.callback_play = function(msg) {
    for (key in msg.today) {
        var data = msg.today[key];
        // console.log(data);
        if (title == data.title) {
            liveURL = data.url[0];
            liveURL = liveURL.replace(" ", "");
            // console.log(liveURL);
            // index.playChannels={
            //     "默认":liveURL
            // };
            index.playChannels['默认'] = liveURL;
            var obj = '<li class="list-group-item"><a class="btn btn-default active" dataUrl="' + liveURL + '" >默认</a></li>';;
            $(".chooseLine").find("ul").append(obj);
            // console.log(1);
            var flashvars = {
                f: '../lib/m3u8/m3u8.swf',
                a: liveURL,
                s: 4,
                c: 0,
                p: 1
            };
            var params = {
                bgcolor: '#FFF',
                allowFullScreen: true,
                allowScriptAccess: 'always',
                wmode: 'transparent'
            };
            var video = [liveURL];
            CKobject.embed('../lib/ckplayer/ckplayer.swf', 'a1', 'ckplayer_a1', '100%', '100%', false, flashvars, video, params);
            // console.log(flashvars);
            return;
        }
    };

};
var test;
index.callback_line = function(msg) {
    test = msg;
    console.log(msg);
    // console.log(index.date())
    var data = msg[today()];
    for (var key in data) {
        if (key == title) {
            var obj = '<ul class="list-group">';
            for (var keys in data[key]) {
                var _index = data[key][keys];
                var _name = _index.name;
                var _url = _index.url;
                index.playChannels[_name] = _url;
                obj += '<li class="list-group-item"><a class="btn btn-default" dataUrl="' + _url + '" >' + _name + '</a></li>';
            };
            obj += "</ul>";
            $(".chooseLine").html(obj);
            // console.log(index.playChannels);
            return
        }
    }
};

// live
index.invoke_data(index.url_live, index.data, index.callback_play);
//加载线路
index.invoke_data(index.url_line, index.data, index.callback_line);
$(document).ready(function() {
    $(".chooseLine").on("click", "a", function() {
        $(this).closest('ul').find("a").removeClass('active');
        $(this).addClass('active');
        var name = $(this).html();
        for (var key in index.playChannels) {
            if (name = key) {
                var liveURL = index.playChannels[key];
                $("#a1Box").html("<div id='a1'></div>");
                var flashvars = {
                    f: '../lib/m3u8/m3u8.swf',
                    a: liveURL,
                    s: 4,
                    c: 0,
                    p: 1
                };
                var params = {
                    bgcolor: '#FFF',
                    allowFullScreen: true,
                    allowScriptAccess: 'always',
                    wmode: 'transparent'
                };
                var video = [liveURL];
                CKobject.embed('../lib/ckplayer/ckplayer.swf', 'a1', 'ckplayer_a1', '100%', '100%', false, flashvars, video, params);
                // console.log(flashvars);
                return;
            }
        }
    })

});
