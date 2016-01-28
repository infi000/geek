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
            tag: req.params.tag
        }, function(err, new1) {
            res.charSet('utf-8');
            res.json(new1);
        });

        // 修改数据库  data格式[tag0,id1,title2,from3,img4,content5,time6]
        if (req.params.open == 1) {
            res.send(req.params.data);
            console.log(req.params.data);
            var changeMsg = req.params.data;
            changeMsg = changeMsg.split(",:,");
            console.log(changeMsg);
            console.log(changeMsg[0]);
            console.log(changeMsg[1]);
            console.log(changeMsg[2]);
            console.log(changeMsg[3]);
            console.log(changeMsg[4]);
            console.log(changeMsg[5]);
            console.log(changeMsg[6]);
            News.find({newsid:changeMsg[1]}, function(err, new1) {
                new1[0].newstitle =changeMsg[2];
                new1[0].newsimg = changeMsg[4];
                new1[0].newscontent = changeMsg[5];
                new1[0].newsfrom = changeMsg[3];
                new1[0].addtime = changeMsg[6];
                new1[0].save(function(err) {});

            });
        }

        // 添加字段  data格式[tag0,id1,title2,from3,img4,content5,time6]
        if (req.params.open == 0) {
            res.send(req.params.data);
            console.log(req.params.data);
            var changeMsg = req.params.data;
            changeMsg = changeMsg.split(",:,");
            console.log(changeMsg);
            console.log("tag"+changeMsg[0]);
            console.log("id"+changeMsg[1]);
            console.log("title"+changeMsg[2]);
            console.log("from"+changeMsg[3]);
            console.log("img"+changeMsg[4]);
            console.log("content"+changeMsg[5]);
            console.log("time"+changeMsg[6]);
            News.create({
                newstitle: changeMsg[2],
                newsimg: changeMsg[4],
                newscontent: changeMsg[5],
                newsfrom:changeMsg[3],
                tag: changeMsg[0],
                addtime: changeMsg[6]
            }, function(err) {});
        };
    });
}

var server = restify.createServer();
server.get('/:tag', respond);
server.post('/:open/:data', respond);
server.listen(3900, function() {});
