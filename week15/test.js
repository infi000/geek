var restify = require('restify');
var orm = require('orm');

function respond(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // orm.connet("mysql://root:password@118.26.23.85/shiyenet",function(err,db){
    orm.connet("mysql://root:root@localhost/homework8", function(err, db) {
        if (err)
            throw err;

        // var company=db.define("companyinfo");
        // company.find({uniqueid:req.params.num},function (err,company) {
        // 	  res.charSet('utf-8');
        //          res.json(companyinfo);
        // })


        // var news = db.define("new1", {
        //     newsid: {
        //         type: 'serial',
        //         key: true
        //     },
        //     newstitle: String,
        //     newsimg: String,
        //     newsfrom: String,
        //     newscontent: String,
        //     addtime: Date,
        //     tag: Number,
        // });
        // news.find({
        //     tag: req.params.num
        // }, function(err, new1) {
        //     res.charSet('utf-8');
        //     res.json(new1);
        // })


        // var News = db.define("new1",{
        // 	newsid:Number,
        // 	newstitle:String,
        // 	newsimg:String,
        // 	newsfrom:String,
        // 	addtime:String,

        // });
        // res.json(News);
        res.send(req.params.tag+"hello");
        // 查询数据库
        // News.find({
        //     newsid: req.params.tag
        // }, function(err, new1) {
        //     res.charSet('utf-8');
        //     res.json(new1);
        //     res.new1;
        // });


    })
}

var server = restify.createServer();
server.get(':/tag', respond);
server.listen(4000, function() {});
