var restify = require('restify');
var orm = require("orm");

function respond(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    orm.connect("mysql://root:root@localhost/homework9", function(err, db) {
        if (err)
            throw err;
        var News = db.define("new1", {
            newsid: {
                type: 'serial',
                key: true
            },
            newstitle: String,
            newsimg: String,
            newsfrom: String,
            newscontent: String,
            addtime: Date,
            tag: Number,
        });
        // 查询数据库
        News.find({
            tag: req.params.newsid
        }, function(err, new1) {
            res.charSet('utf-8');
            res.json(new1);

        });





    });
}

var server = restify.createServer();
server.get('/:tag', respond);
server.listen(4000, function() {});
