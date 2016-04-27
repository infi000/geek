function isLocal() {
	var href = window.location.href;
//	var dbRunUrls = [ "file://", "http://localhost", "http://127.0.0.1" ];
	var dbRunUrls = [ "file://"];
	if (localInitDomain) {
		var domain = localInitDomain.split(",");
		dbRunUrls = dbRunUrls.concat(domain);
	}
	for ( var i = 0; i < dbRunUrls.length; i++) {
		if (href.indexOf(dbRunUrls[i]) > -1) {
			return true;
		}
	}
	return false;
}
var localDb;

var dbinfo = {
	"dbName" : "",
	"dbVersion" : "1.0",
	"dbDesc" : "A ediscovery Database",
	"dbSize" : 1 * 1024 * 1024
}
var LocalDb = function(dbInfo) {
	this.dbInfo = dbInfo;
	this.conn = null;
};
LocalDb.prototype = {
	constructor : LocalDb,
	createConn : function() {
		this.conn = window.openDatabase(this.dbInfo.dbName,
				this.dbInfo.dbVersion, this.dbInfo.dbDesc, this.dbInfo.dbSize);
	},
	exec : function(sql, fun) {
		this.conn.transaction(function(tx) {
			tx.executeSql(sql, [], function(tx) {
				if (fun) {
					fun();
				}
			});
		});
	},
	createTable : function(obj, tableName) {
		var courseCmd_ = 'CREATE TABLE IF NOT EXISTS courseCmd (' + 'id,'
				+ 'timestamp,' + 'key,' + 'msgbody' + ')';
		var courseNote_ = 'CREATE TABLE IF NOT EXISTS courseNote (' + 'id,'
				+ 'courseid,' + 'cmdtimestamp,' + 'pptguid,' + 'notetype,'
				+ 'notemime,' + 'adddatetime,' + 'content' + ')';
		this.conn.transaction(function(tx) {
			try {
				tx.executeSql('drop table courseCmd', [], function(tx) {
				});
				tx.executeSql('drop table courseNote', [], function(tx) {
				});
			} catch (e) {
				console.log(e.message);
			}
			tx.executeSql(courseCmd_, [], function(tx) {
			}, function(trans, error) {
				console.log(trans + "createTable-Error----" + error);
				// throw error.message;
			});
			tx.executeSql(courseNote_, [], function(tx) {
			}, function(trans, error) {
				console.log(trans + "createTable-Error----" + error);
				// throw error.message;
			});
		});
	},
	insertBatch : function(tableName, objs, fun) {
		var params = [];
		var fields = [];
		var param = [];
		for ( var s in objs) {
			fields.push(s);
			var obj = objs[s];
			param.push("?");
			if (typeof (obj) == "object") {
				params.push(JSON.stringify(obj));
			} else {
				params.push(obj);
			}
		}
		var sql = 'insert into ' + tableName + '(' + fields.join(",")
				+ ') values (' + param.join(",") + ")";
		this.conn.transaction(function(tx) {
			tx.executeSql(sql, params, function(tx) {
				// if(fun){
				// fun();
				// }
			}, function(trans, error) {
				console.log(trans + "insertError----" + error);
				// throw error.message;
			});
		});
	},
	getDatas : function(whereStr, table, fun, limit, orderStr) {
		limit = limit || " ";
		var sql = "select * from " + table + " where 1=1 " + whereStr
				+ orderStr + limit;
		console.log(sql);
		this.conn.transaction(function(tx) {
			tx.executeSql(sql, [], function(tx, results) {
				if (fun) {
					fun(results.rows);
				}
			}, function(trans, error) {
				console.log(trans + "----" + error);
				// throw error.message;
			})
		});
	},
	initDatas : function(datas, tableName) {
		if (datas && datas.length) {
			for ( var i = 0; i < datas.length; i++) {
				var data = datas[i];
				this.insertBatch(tableName, data);
			}
		}
	}
}

function showDbInfo(objs) {
	var msgs = [];
	for ( var i = 0; i < objs.length; i++) {
		var row = [];
		var items = objs.item(i);
		for ( var a in items) {
			row.push(items[a]);
		}
		msgs.push("<p>Found rows: " + i + row.join(",") + "</p>");
	}
	document.body.innerHTML = msgs.join("");
}

function groupData(localDb, datas, tableName) {

}
function createDb() {
	localDb = new LocalDb(dbinfo);
	localDb.createConn();
	localDb.createTable();
	localDb.initDatas(courseCmd, "courseCmd");
	localDb.initDatas(courseNote, "courseNote");
}
function groupDbData(objs) {
	var msgs = [];
	for ( var i = 0; i < objs.length; i++) {
		var row = {};
		var items = objs.item(i);
		for ( var a in items) {
			if (a == "msgbody" || a == "content") {
				try {
					row[a] = JSON.parse(items[a]);
				} catch (e) {
					row[a] = items[a];
				}

			} else {
				row[a] = items[a];
			}
		}
		msgs.push(row);
	}
	return msgs;
}
function groupLimit(params) {
	params.offset = params.offset || 1;
	params.limit = params.limit || 20;
	return " limit " + (parseInt(params.offset) - 1) + "," + params.limit;
}
// 数据重组，主要完成数据中的图片路径重绘。
function dataReGroup(datas, path) {
	var own = arguments.callee;
	for ( var d in datas) {
		var obj = datas[d];
		if (typeof (obj) == "object") {
			own(obj, path);
		} else if (typeof (obj) == "array") {
			for ( var i = 0; i < obj.length; i++) {
				own(obj, path);
			}
		} else if (typeof (obj) == "string") {
			if (d == "source" || d == "image" || d == "video") {
				datas[d] = path + datas[d];
			}
		} else {
			if (d == "source" || d == "image" || d == "video") {
				datas[d] = path + datas[d];
			}
		}
	}
	return datas;
}
function localDbOp(url, params, fun, path) {
	path = path || "..\/..\/";
	if (url.indexOf("eq.checkCourseStatus") > -1) {
		if (courseVideo && courseVideo.length > 0) {
			var videoList = [];
			for ( var i = 0; i < courseVideo.length; i++) {
				var c = courseVideo[i].content;
				videoList.push(c)
			}
			fun(dataReGroup({
				"status" : "OK",
				"type" : "2",
				"data" : videoList,
				"title" : courseVideo[0].title
			}, path));
		}
	} else if (url.indexOf("eq.coursePPT") > -1) {
		localDb.getDatas(" and key='go'", "courseCmd", function(objs) {
			fun(dataReGroup({
				"status" : "OK",
				"list" : groupDbData(objs)
			}, path));
		}, groupLimit(params), " order by timestamp asc ");
	} else if (url.indexOf("eq.getcmd") > -1) {
		var whereArray = [];
		if (params.stimestamp > 0) {
			whereArray.push(" and timestamp>='" + params.stimestamp + "'");
		}
		if (params.etimestamp > 0) {
			whereArray.push(" and timestamp<='" + params.etimestamp + "'");
		}
		localDb.getDatas(whereArray.join(""), "courseCmd", function(objs) {
			if (fun) {
				fun(dataReGroup({
					"status" : "OK",
					"list" : groupDbData(objs)
				}, path));
			}
		}, groupLimit(params), " order by timestamp asc ");
	} else if (url.indexOf("eq.getNoteList") > -1) {
		var whereArray = [];
		localDb.getDatas(whereArray.join(""), "courseNote", function(objs) {
			if (fun) {
				fun(dataReGroup({
					"status" : "OK",
					"list" : groupDbData(objs)
				}, path));
			}
		}, groupLimit(params), " order by cmdtimestamp asc ");
	} else if (url.indexOf("eq.loginUserInfo") > -1) {
		var userInfo = {
			"status" : "OK",
			"data" : {
				"myArgs" : {
					"activityId" : offLineCourseId + ""
				},
				"sex" : "1",
				"appId" : "wx8b270281ff25aaa0",
				"mpUser" : "blade.big@gmail.com",
				"city" : "大兴",
				"country" : "中国",
				"dealCount" : "1",
				"headImg" : "http://hudong.tvmining.com/headImg/1524258512.jpg",
				"_id" : "1524258512",
				"nickName" : "宋三",
				"myArgs" : {},
				"fakeId" : "1524258512",
				"qrcode" : "http://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQEa8ToAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL19VTUpqMHZsMXlxdURwcENYMjAtAAIE9rq8UwMECAcAAA%3D%3D",
				"province" : "北京",
				"openid" : "o-32tuByhE-ZS9SL635aQHxIh9A0",
				"dealType" : "logintvm",
				"updateFlag" : "true",
				"appSecret" : "178526087b8d9cce58f87df13518832e",
				"dealDesc" : "学生课堂",
				"browserId" : "176689459",
				"logindate" : "2014-07-09 11:46"
			}
		};
		userInfo["data"].myArgs.activityId = offLineCourseId + "";
		// console.log(userInfo,offLineCourseId);
		fun(userInfo);
	} else if (url.indexOf(".getActivityList") > -1) {
		fun({
			"status" : "OK",
			"list" : [ {
				"activityid" : offLineCourseId,
				"desc" : ""
			} ]
		});
	} else if (url.indexOf(".join2Activity") > -1) {
		fun({
			"status" : "OK"
		});
	} else if (url.indexOf(".activepacklist") > -1) {
		fun({
			"packlist" : [ {
				"id" : "18",
				"packtype" : "weixin",
				"title" : "现场互动",
				"packmime" : "MIX",
				"img" : ""
			} ],
			"status" : "OK"
		});
	} else {
		console.log("未实现url=" + url);
	}
}
function initDb(path) {
	document.write('<script type="application/javascript" src="' + path
			+ 'offLineData/courseNote.js"><\/script>');
	document.write('<script type="application/javascript" src="' + path
			+ 'offLineData/courseCmd.js"><\/script>');
	document.write('<script type="application/javascript" src="' + path
			+ 'offLineData/courseVideo.js"><\/script>');
	setTimeout(function() {
		createDb();
	}, 200);
}
