var restify = require('restify');
var orm = require("orm");

function respond(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    orm.connect("mysql://root:password@localhost/homework9", function(err, db) {
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
            tag: req.params.tag
        }, function(err, new1) {
            res.charSet('utf-8');
            res.json(new1);
        });

        // 修改数据库
        if (req.params.open == 1) {
            News.find({}, function(err, new1) {
                new1[req.params.id].newstitle = req.params.title;
                new1[req.params.id].newsimg = req.params.img;
                new1[req.params.id].newscontent = req.params.content;
                new1[req.params.id].newsfrom = req.params.from;
                new1[req.params.id].addtime = req.params.time;
                new1[req.params.id].newsid = req.params.id;
                new1[req.params.id].save(function(err) {});
                // newstitle = req.params.title;
                // newsimg = req.params.img;
                // newscontent = req.params.content;
                // newsfrom = req.params.from;
                // addtime = req.params.time;
                // newsid = req.params.id;
                // save(function(err) {});
                // res.send(req.params.id + req.params.tag + req.params.title)

            });
        }

        // 添加字段
        if (req.params.open == 0) {
            News.create({
                newstitle: req.params.title,
                newsimg: req.params.img,
                newscontent: req.params.content,
                newsfrom: req.params.from,
                tag: req.params.tag,
                addtime: req.params.time
            }, function(err) {});
        };
    });
}

var server = restify.createServer();
server.get('/:tag', respond);
server.post('/:open/:id/:tag/:title/:img/:from/:content/:time', respond);
server.listen(3900, function() {});
