var index = new Dude();
var title = decodeURIComponent(document.URL.split("?&=")[1]);
var liveURL;
index.callback = function(msg) {
    for (key in msg.today) {
        var data = msg.today[key];
        // console.log(data);
        if (title == data.title) {
            liveURL = data.url[0];
            liveURL = liveURL.replace(" ", "");
            console.log(liveURL);
            console.log(1);
            var flashvars = {
                f: '../lib/m3u8/m3u8.swf',
                a: liveURL,
                s: 4,
                c: 0,
                p:1
            };
            var params = {
                bgcolor: '#FFF',
                allowFullScreen: true,
                allowScriptAccess: 'always',
                wmode: 'transparent'
            };
            var video = [liveURL];
            CKobject.embed('../lib/ckplayer/ckplayer.swf', 'a1', 'ckplayer_a1', '100%', '100%', false, flashvars, video, params);
            console.log(flashvars);
            return;
        }
    };

};
// live
index.invoke_data(index.url_live, index.data, index.callback);
$(document).ready(function() {

});
