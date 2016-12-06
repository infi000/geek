// juhejiekou
var Dude = function() {
    this.url_data = "http://op.juhe.cn/onebox/basketball/nba";
    this.url_live1 = "https://infi000.wilddogio.com/jrstv/config.json";
    this.url_live = "https://infi000.wilddogio.com/jrstv/gamefile/data.json";
    this.url_slogan = "https://infi000.wilddogio.com/zhibodude.json";
    this.url_twitter = "https://infi000.wilddogio.com/zhibodude-twitter.json";
    this.url_ins = "https://infi000.wilddogio.com/zhibodude-ins.json";
    this.url_line = "https://infi000.wilddogio.com/zhibodude-line.json";
    this.url_channel = "https://infi000.wilddogio.com/zhibodude-channel.json";
    this.invoke_data = function(_url, _data, _callback) {
        $.ajax({
                url: _url,
                type: 'GET',
                data: _data,
                dataType: "jsonp",
                success: _callback
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
//收藏本站
    this.AddFavorite = function(title, url) {
        try {
            window.external.addFavorite(url, title);
        } catch (e) {
            try {
                window.sidebar.addPanel(title, url, "");
            } catch (e) {
                alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
    }

};
