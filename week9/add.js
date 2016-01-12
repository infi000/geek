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
        News.find({}, function(err, new1) {
            res.charSet('utf-8');
            res.json(new1);
            $newstitle = $_REQUEST['newstitle'];
            $addtime = $_REQUEST['addtime'];
            $news = $_REQUEST['news'];
            News.create({
                newstitle: "1",
                newscontent: "John",
                newsimg: "Doe"
            }, function(err) {});
            new1[0].newstitle = "16";
            new1[0].save(function(err) {});

        });
    });
}
var server = restify.createServer();
server.get('/:name', respond);
server.listen(3900, function() {});

// """""""""""""""""""""""""""""""""""""""""""'''''''''''''''''''''''''''''''''''''''''''''''''''
