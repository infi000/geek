var ua = navigator.userAgent.toLowerCase();
var zuxiangviewtype = 1; // (ua.match(/iPad/i) || ua.match(/android/i)) ? 2 : 1;// 1:顶部显示
// 2:右边显示
var itemscrolldivobj = null;
var loadObj = null;
var winwidth;
var mainnew = false; //新版pc课程界面与旧界面的区分标识 

function getbodyheight() {
    var bodyh = document.body.clientHeight; //表示内容区域的高度和宽度，包括padding大小，但是不包括边框和滚动条
    try {
        if (ua.match(/iPad/i)) { // ie 
            //	alert("versionval="+ua.match(/version\/([\d.]+)/));
            var versionval = parseInt(ua.match(/version\/([\d.]+)/)[1]);
            //alert("versionval="+versionval)
            if (versionval > 6) {
                bodyh -= 20;
                document.body.style.height = bodyh + "px"
            }
        }
    } catch (Ex) {
        //alert(Ex)
    }

    return bodyh;
}


function init() {
    if (document.getElementById("mainnew")) { mainnew = true; }
    var leftzhuxiandivobj = document.getElementById("leftzhuxiandiv");
    getbodyheight();
    /*
    	测试阶段，跳过loading()
        loadObj = loadObj || new loading();
        loadObj.show();
    */
    var initparms = url2Hash();
    if (initparms["resetbg"]) { //若是teacher.html页点击‘进入课程’进入main.htm,则main.htm页不显示#maindiv内容
        $("#maindiv").hide();
    }

    invokeMethod("loginUserInfo.json", function call1(ref) {

        if (ref.status == "OK") {
            // console.log(ref.data);
            var loginuserinfo = ref.data;

            if (initparms["showcourseid"]) {
                loginuserinfo.myArgs = { "activityId": initparms["showcourseid"] }
            }

            init2(loginuserinfo);
        } else {
            alert(ref.status);
            // loadObj.hidd();
            LOGOUT();
        }
    });
    if (ua.match(/android/i)) {
        var tempdiv = $('<div style="height:60px">&nbsp;</div>');
        $(document.body).append(tempdiv);
        window.scrollTo(0, 1);
        setTimeout(function() {
            tempdiv.remove();
        }, 3000)
    }
    $("#msgcontent").keydown(function(e) { //键盘按下
        if (e.ctrlKey || e.metaKey) { //事件属性可返回一个布尔值，指示当事件发生时，"meta""ctrl" 键是否被按下并保持住。
            if (e.keyCode == 13) { //获取按下的键盘按键Unicode值：13=回车

            } else if (e.keyCode == 83) { //83=s
                e.preventDefault();
            }
        }
    });
    $("#msgcontent").keyup(function(e) { //信息上墙
        // metaKey
        if (e.ctrlKey || e.metaKey) {
            if (e.keyCode == 13) {
                sendmessage2wall(2)
            } else if (e.keyCode == 83) {
                sendmessage2wall(1)
            }
        }
    })

    /*
     * jwplayer("videodiv").setup({ primary:"flash", image:"", file:
     * "http://58.215.39.87/approve/live?type=ipad&channel=T50E54949C8CB", //
     * flashplayer: "./jwplayer6.1/player.swf", autostart : true, width:"96%",
     * height:"96%" });
     */
}


function init2(userinfo) {
    // ?boxId=40-61-86-E6-C5-96&mpUser=lipengtao@tvmining.com&activityId=192313&openid=osvCnjiG3MlKCN4UIjDAQ2fcwsbY
    var mpuserval = userinfo["mpUser"];
    var loginuser = userinfo["nickName"] || userinfo["nickname"];
    var beforelogindate = userinfo["beforelogindate"];
    var logindate = userinfo["logindate"];
    var loginfakeid = userinfo["fakeId"];
    var loginopenid = userinfo["openid"];
    var loginuserheadimg = userinfo["headImg"] || userinfo["headimg"];
    var login2course = 0;
    if (userinfo.myArgs) {
        login2course = parseInt(userinfo.myArgs["activityId"]) || 0; // ||171927;
    }

    var loginuserheadimgdivobj = document.getElementById("loginuserheadimgdiv");
    var loginuserdivobj = document.getElementById("loginuserdiv");
    var beforelogindatedivobj = document.getElementById("beforelogindatediv");

    loginuserheadimgdivobj.src = loginuserheadimg;
    loginuserdivobj.innerHTML = "欢迎，" + loginuser;
    if (beforelogindate != null) {
        beforelogindatedivobj.innerHTML = " 上次登录 " + beforelogindate;
    } else {
        beforelogindatedivobj.innerHTML = " 登录时间 " + logindate;
    }

    // alert("中国");
    winwidth = $(window).width();

    var itempanelobjjq = $("#itempanel2");
    itemscrolldivobj = $("#itemscrolldiv");

    if (zuxiangviewtype == 1) { // 主线在顶部
        if (!mainnew) {
            itempanelobjjq.width(winwidth);
        }
    } else if (zuxiangviewtype == 2) { // 主线在右
        itempanelobjjq.css({
            "width": "228px",
            "overflow-x": "hidden",
            "overflow-y": "auto",
            "-webkit-overflow-scrolling": "touch"
        });
        itempanelobjjq.children()[0].style.cssText = "position: relative;top: 0px;left: 0px;";
        var topzhuxiangtrobj = document.getElementById("topzhuxiangtr");
        var contetntrobj = $(document.getElementById("contetntr"));
        contetntrobj
            .append('<td colspan="1" id="leftzhuxiandiv" align="right" style="background-color:#cccccc"></td>');
        contetntrobj.children().first().attr("colspan", "2");
        topzhuxiangtrobj.style.display = "none";
        $("#leftzhuxiandiv").append(itempanelobjjq);

        itempanelobjjq.scroll(function() {
            zldivscroll(this, 2);
            var itempanelobj = $("#itempanel2");
            var reftype = itempanelobj.attr("reftype");
            // console.log("reftype="+reftype,this.scrollTop,itemscrolldivobj.height(),this.clientHeight);
            if (reftype == "refwithbottom") { // 在快到底部刷新
                if (itemscrolldivobj.height() - this.scrollTop < this.clientHeight + 300) {
                    XianChangHuDongFiles(false, itempanelobjjq
                        .attr("packid"),
                        function() {});
                };
            } else {
                if (this.scrollTop <= 0) {
                    XianChangHuDongFiles(false, itempanelobjjq
                        .attr("packid"),
                        function() {});
                }
            }

        })

    }

    window.scroll2left = function(moveTo) {
        var itempanelobj = $("#itempanel2");
        var reftype = itempanelobj.attr("reftype");
        var scrollleft = itempanelobj.scrollLeft(); //匹配元素的水平滚动条位置
        var newleft = moveTo ? moveTo : scrollleft - winwidth;
        if (newleft < 0)
            newleft = 0;
        itempanelobj.stop();
        itempanelobj.animate({
            "scrollLeft": newleft
        }, "normal", function() {

            if (reftype == "refwithbottom") { // 在快到底部刷新
                /*
                 * 往左翻不用考虑加载数据 var scrollwidth=itempanelobj.width(); var
                 * bodywidth=itempanelobj[0].firstChild.clientWidth;
                 * if(bodywidth-(newleft+scrollwidth)<200){
                 * XianChangHuDongFiles(false,itempanelobj.attr("packid"),function(){checkitemscrollarrow();});
                 * }else{ checkitemscrollarrow(); }
                 */
                checkitemscrollarrow();
            } else {
                if (newleft == 0) {
                    XianChangHuDongFiles(false, itempanelobj.attr("packid"),
                        function() {
                            checkitemscrollarrow();
                        });
                } else {
                    checkitemscrollarrow();
                }
            }
        })
    }
    $("#leftarrow1").click(function() {
        scroll2left()
    });

    window.scroll2right = function(moveTo) {
        var itempanelobj = $("#itempanel2");
        var reftype = itempanelobj.attr("reftype");
        var scrollleft = itempanelobj.scrollLeft();
        var newleft = moveTo ? moveTo : scrollleft + winwidth;
        itempanelobj.stop();
        itempanelobj.animate({
            "scrollLeft": newleft
        }, "normal", function() {

            if (reftype == "refwithbottom") { // 在快到底部刷新

                var scrollwidth = itempanelobj.width();
                var bodywidth = itempanelobj[0].firstElementChild.clientWidth;
                if (bodywidth - (newleft + scrollwidth) < 200) {
                    XianChangHuDongFiles(false, itempanelobj.attr("packid"),
                        function() {
                            checkitemscrollarrow();
                        });
                } else {
                    checkitemscrollarrow();
                }

            } else {
                checkitemscrollarrow();
            }
        })

    }
    $("#rightarrow1").click(function() {
        scroll2right()
    });

    $("#leftarrow2").click(function() {
        var itemsourceonobj = itemscrolldivobj.children(".itemsourceon");
        if (itemsourceonobj.prev().length > 0) {
            showresource(itemsourceonobj.prev()[0]);
        }
    });

    $("#rightarrow2").click(function() {
        var itemsourceonobj = itemscrolldivobj.children(".itemsourceon");
        if (itemsourceonobj.next().length > 0) {
            showresource(itemsourceonobj.next()[0]);
        }
    });

    // 查询活动，后选择加入
    window.searchactivityjoin = function() {
        try {
            var searchactivitynameobj = $("#searchactivityname");
            var searchactivitynameval = $.trim(searchactivitynameobj.val());
            if (searchactivitynameval == "") {
                alert("请您输入课程ID！");
                return;
            }

            function join2Activity(coreobj) {
                invokeMethod("hdyun.join2Activity", function call1(ref) {
                    if (ref.status == "OK") {
                        searchactivitynameobj.attr("join2core", "1");
                        joincoursewithJSON(coreobj);
                    } else {
                        alert(ref.status);
                        loadObj.hidd();
                    }
                }, {
                    mpuser: mpuserval,
                    fakeid: loginfakeid,
                    activityid: coreobj["activityid"]
                });
            }

            invokeMethod("hdyun.getActivityList", function call1(ref) {

                if (ref.status == "OK") {
                    var corelist = ref.list;
                    var corelistlen = corelist == null ? 0 : corelist.length;
                    if (corelistlen > 0) {
                        loadObj.show({
                            "text": "正在加入课程“" + corelist[0]["desc"] + "”"
                        });
                        join2Activity(corelist[0]);
                    } else {
                        alert("您输入的课程号“" + searchactivitynameval + "”不存在！")
                    }
                } else {
                    alert(ref.status);

                }
            }, {
                searchvalue: searchactivitynameval,
                mpuser: mpuserval
            });

        } catch (ex) {
            console.log(ex);
        }
    }

    // 删除课程
    window.delcourse = function(sourseobj) {
            var activityobj = JSON.parse($(sourseobj).prev().children("textarea")
                .text());
            if (confirm("您确定要删除“" + activityobj["desc"] + "”吗？ ")) {
                loadObj.show({
                    "text": "正在提交数据！"
                });
                invokeMethod("hdyun.join2Activity", function call1(ref) {
                    if (ref.status == "OK") {
                        var coreobj = $(sourseobj).parent();
                        coreobj.fadeOut("slow", function() {
                            coreobj.remove();
                        });
                    } else {
                        alert(ref.status);

                    }
                    loadObj.hidd();
                }, {
                    action: "remove",
                    mpuser: mpuserval,
                    fakeid: loginfakeid,
                    activityid: activityobj.activityid
                });
            }
        }
        //加入课程
    window.joincourse = function(sourseobj) {
        /*
		测试取消LOADOBJ
		 loadObj.show();
    	*/
        var activityobj = JSON.parse($(sourseobj).children("textarea").text());
        joincoursewithJSON(activityobj);
    }

    window.join2yxcourse = function(sourseobj) {
        // console.log("sourseobj",sourseobj);
        var maindivobj = $("#maindiv");
        var coursedivobj = $("#coursediv");
        maindivobj.hide();
        coursedivobj.show();
        if (mainnew) {
            $("#tabtrcont").hide();
        } else {
            $("#topzhuxiangtr").hide();
            $("#contetntr").hide();
            $("#bottomtr").hide();
        }
        $("#yxcontenttr").show();
        var activityobj = JSON.parse($(sourseobj).children("textarea").text());
        var courseid = activityobj.courseid;
        yxcontentifr.location.replace("student.html?cid=" + courseid);
    }





    function buildCourseListHtml(activitys) {
        var courselistdivobj = $("#courselistdiv");
        var listwidth = courselistdivobj.width() - 20;
        var curseitemcountrow = parseInt(listwidth / 252);
        var modval = listwidth % 252 - 22;
        var widthval = 230;

        if (modval > 150) {
            widthval = (curseitemcountrow * widthval + modval) / (curseitemcountrow + 1);
        } else if (modval > 50) {
            widthval = (curseitemcountrow * widthval + modval) / (curseitemcountrow);
        }

        var len = activitys == null ? 0 : activitys.length;
        var html = ''
        for (var i = 0; i < len; i++) {
            var activityobj = activitys[i];
            var id = activityobj["activityid"] || activityobj["courseid"];
            var addtime = activityobj["startTime"] || activityobj["addtime"];
            var imgurl = activityobj["cover"] || './images/defaultactivity.png'; //
            //替换imgurl地址，原来的cdn不能用了
            if (imgurl) {
                var tempStr = imgurl.substring(7, 11);
                if (tempStr === "img1") {
                    imgurl = imgurl.replace("img1.s3.tvm.cn/s3irs/g2r2/", "ts3.tvm.cn/sn1xso/");
                } else if (tempStr === "ts3.") {
                    imgurl = imgurl.replace("ts3.tvm.cn", "ts3.stcdn.wifiplus.com");
                }
            }
            var desc = activityobj["desc"] || activityobj["title"];
            var coursestatus = activityobj["coursestatus"];
            var coursetype = activityobj["coursetype"] || 1;
            var coverurl = null;
            if (imgurl.indexOf(".tvmcloud.") != -1) {
                coverurl = imgurl + "_300_300.jpg";
            } else {
                coverurl = imgurl;
            }

            if (coverurl.indexOf("http://") == -1) {
                coverurl = './images/defaultactivity.png';
            }
            if (coursetype == 2) { // 预习
                html += '<a class="courseitem" style="width:' + widthval + 'px" href="javascript:void(0)">' + '<div class="content" onclick="join2yxcourse(this)">' + '	<div class="title">课程名称：' + desc + '</div>' + '	<div class="img" style="background-image:url(' + coverurl + ')"></div>' + '	<div class="date">时间：' + addtime + '</div>' + '	<div class="courseno">预习课程</div>' + '<textarea style="display:none">' + JSON.stringify(activityobj) + '</textarea>' + '</div>' + '	<img class="del" src="./images/yx.png" >' + '</a>';
            } else {
                html += '<a class="courseitem" style="width:' + widthval + 'px" href="javascript:void(0)">' + '<div class="content" onclick="joincourse(this)">' + '	<div class="title">课程名称：' + desc + '</div>' + '	<div class="img" style="background-image:url(' + coverurl + ')"></div>' + '	<div class="date">时间：' + addtime + '</div>' + '	<div class="courseno">课程ID：' + id + "&nbsp;&nbsp;&nbsp;&nbsp;" + (coursestatus == "2" ? "<font color='black'>已结束</font>" : "<font color='blue'>进行中</font>") + '</div>'

                + '<textarea style="display:none">' + JSON.stringify(activityobj) + '</textarea>' + '</div>' + '	<img class="del" src="./images/del.png" onclick="delcourse(this)">' + '</a>';
            }

        }

        var ua = navigator.userAgent.toLowerCase();
        if (!ua.match(/webkit/i)) { // ie
            var coretabobj = document.getElementById("coretab");
            var hv1 = coretabobj.parentNode.clientHeight - coretabobj.parentNode.offsetTop;
            courselistdivobj.css("height", hv1);
        }

        courselistdivobj.html(html);
    }

    window.getActivityList = function() {
        $("#searchkeyworddiv").html(' &nbsp;');

        invokeMethod("courseList.json", function call1(ref) {
            if (true || ref.status == "OK") {
                /*
                 * activityid: "388624" addtime: "2014-05-05 15:06:57" boxalias:
                 * "wifi+雍和1" boxid: "AC-22-0B-79-C4-97" coursestatus: "2"
                 * cover: "" desc: "ghfggff" endTime: "2014-05-05 16:36:57"
                 * mpuser: "blade.big@gmail.com" qrcode: "" startTime:
                 * "2014-05-05 15:06:57" title: "ghfggff" uuid:
                 * "09d80a36-ce5d-3608-a4ac-534df95eaeeb"
                 * 
                 * {"id":"68","title":"courseTitle", "content":"courseContent",
                 * "tvmid":"courseTvmid", "create_date_time":"2014-08-01
                 * 15:17:33"
                 * 
                 */
                var newlist = [];
                var courselist = ref.courselist;
                var courselistlen = courselist == null ? 0 : courselist.length;
                for (var i = 0; i < courselistlen; i++) {
                    var courseobj1 = courselist[i];
                    newlist.push({
                        "courseid": courseobj1["id"],
                        title: courseobj1["title"],
                        cover: courseobj1["thumbnail"],
                        addtime: courseobj1["create_date_time"],
                        "coursetype": 2
                    });
                }

                callcourselist2(newlist);
            } else {
                alert(ref.status);
            }
        });

        function callcourselist2(yuxiarray) {
            invokeMethod("myCourseList.json", function call1(ref) {
                /*
				测试不要loadObj.hidd();
            		*/
                if (ref.status == "OK") {
                    buildCourseListHtml(yuxiarray.concat(ref.list)); //连接数组
                } else {
                    alert(ref.status);
                }
            });
        }
    }

    if (login2course > 0) {

        $("#searchactivityname").val(login2course);
        searchactivityjoin();
        $("#searchactivityname").val("");
    } else {
        getActivityList();
    }





    // -------------joincoursewithJSON start---------------

    function joincoursewithJSON(activityobj) {
        goMainBtnShow && goMainBtnShow(true);
        if (mainnew) {
            $("#tabtrcont").show();
            $("#switchtext").text("视频");
            $("#switchtext").attr("data-type", "0");
        } else {
            $("#topzhuxiangtr").show();
            $("#contetntr").show();
            $("#bottomtr").show();
        }
        $("#yxcontenttr").hide();

        var coursetitledivobj = document.getElementById("coursetitlediv");
        $(coursetitledivobj).attr("statusflag", "");
        //		coursetitledivobj.innerHTML = '课程名称：' + activityobj["desc"];
        coursetitledivobj.innerHTML = '' + activityobj["title"];
        var maindivobj = $("#maindiv");
        var coursedivobj = $("#coursediv");
        maindivobj.hide();
        coursedivobj.show();
        if (!mainnew) {
            var contentbodydivobj = $("#contentbodydiv");
            var h = contentbodydivobj.parent().height();
            contentbodydivobj.height(h);
        }
        window.playcourse = function() {
            try {
                socketiframe.checkMute(2); // 静音，为了防止切换的时候还有上次的余音，因为网络延时。
            } catch (Exc) {

            }
            // clscoursehtml();
            var stimestamp = -1;
            var etimestamp = -1;

            var itemsourceonobj = itemscrolldivobj.children(".itemsourceon");
            if (itemsourceonobj.length > 0) {
                var selectitemobj = itemsourceonobj[0];

                if (selectitemobj.previousSibling != null) { // 如果是第一个则不设置开始时间
                    stimestamp = selectitemobj.getAttribute("data-timestamp");
                }
                var selectitemobjNextObj = selectitemobj.nextSibling;
                if (selectitemobjNextObj != null) {
                    etimestamp = selectitemobjNextObj
                        .getAttribute("data-timestamp");
                }

            } else {
                alert("没有数据！ ");
                return;
            }

            var urlstr = 'playcourse.htm?activityId=' + activityobj["activityid"] + '&stimestamp=' + stimestamp + '&etimestamp=' + etimestamp + '&t=' + (new Date().getTime());
            //document.getElementById("socketiframe").style.cssText="position: absolute;width: 400px;height: 400px;left: 0px;top: 0px;z-index: 999999999;"
            var playyjaudioobj = document.getElementById("playyjaudio");
            if (playyjaudioobj) {
                playyjaudioobj.play();
            }
            gotolocation(socketiframe, urlstr);
            // console.log(urlstr);

            var playprocessmainobj = $("#playprocessmain");
            if (playprocessmainobj.length == 0) {
                var playmainhtml;
                if (!mainnew) {
                    playmainhtml = '<div id="playprocessmain" style="position:absolute;left:0px;top:70px;width:100%;height:100%;z-index:1000">' + '<div id="playprocessvardiv" style="text-align:center;position:absolute;width:100%;height:70px;background-color:#dedede;left:0px;bottom:0px">'
                        // +'<input type="button" class="imgbut"
                        // onclick="stopplaycourse()" style="margin-top:20px"
                        // value="暂 停" >'
                        + '<input type="button" class="newimgbut" onclick="exitplaycourse(1)" style="margin-top:20px" value="退 出" >'
                        /*
                         * +'<div style="height:38px;margin:20px 20px 0px
                         * 20px;width:160px;background-color:white;float:left"><img
                         * onclick="exitplaycourse()" src="img/stop.png"
                         * style="margin-top:3px;cursor:pointer"
                         * class="stopimg"></div>' +'<div
                         * style="padding-top:1px;margin-top:33px;height:11px;width:70%;background-color:white;text-align:left;float:left;">' +'<div
                         * id="playprocessdiv"
                         * style="height:10px;width:1%;background-color:blue"></div>' +'</div>' +'<div
                         * id="playprocessdivtext"
                         * style="height:38px;margin:20px 20px 0px
                         * 6px;float:left;width:60px;overflow:hidden;line-height:38px;">1%</div>'
                         */
                        + '</div>' + '</div>';
                } else {
                    var top = $(".imgbartab").height() + 10;
                    playmainhtml = '<div id="playprocessmain" style="position:absolute;left:0px;top:' + top + 'px;width:100%;height:100%;z-index:1000">' + '<div id="playprocessvardiv" style="text-align:center;position:absolute;width:100%;height:' + top + 'px;background-color:#FFFFFF;left:0px;bottom:0px">' + '<table style="width:100%;height:70%;margin-top:15%;"><tr><td><img class="imgbar" id="checkmuteimgbut" title="是否静音" onclick="checkMute(this)" src="./images/voicestart.png" data-mute="1"></td></tr>' + '<tr><td><input type="button" class="newimgbut" onclick="exitplaycourse(1)"  value="退 出" ></td></tr></table>' + '</div>' + '</div>';
                }
                $("#bottombardiv").append(playmainhtml);
                $("#playprocessmain").animate({
                    "top": "0px"
                }, "fast");
                $("#contentbodydiv")
                    .append(
                        '<div id="playprocessmain2" style="position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:1000"></div>');
            }
        }
        window.clsplayvideowin = function() {
            var videoiframetempobj = document.getElementById("videoiframetemp");
            var previewdivobj = document.getElementById("previewdiv");
            var pptpreviewdivobj = document.getElementById("pptpreviewdiv");
            var contentbodybodytabobj = document
                .getElementById("contentbodybodytab");
            var myConainerDivobj = document.getElementById("myConainerDiv");
            if (videoiframetempobj != null) {
                gotolocation(videoiframetemp, "about:blank");
            }
            previewdivobj.style.cssText = "display:none"
            previewdivobj.innerHTML = "";
            pptpreviewdivobj.style.cssText = "width:100%;height:100%"
            contentbodybodytabobj.style.cssText = "width:100%;height:100%"

            myConainerDivobj.parentNode.setAttribute("align", "center");
            myConainerDivobj.parentNode.setAttribute("valign", "middle");

            $("#itemdesc").remove();

            $("#myConainerDivsmallzoomdiv").remove();

        }
        window.fullplayvideowin = function() {

            var previewdivobj = document.getElementById("previewdiv");
            var videoiframetempobj = document.getElementById("videoiframetemp");
            var myConainerDivsmallzoomdivobj = document.getElementById("myConainerDivsmallzoomdiv");

            if (myConainerDivsmallzoomdivobj != null) {
                // 看视屏就在全屏状态好不好
                console.log("看视屏就在全屏状态好不好");
                return;
            }
            var wv = 700; // previewdivobj.parentNode.clientWidth;
            var hv = previewdivobj.parentNode.clientHeight;
            var maxwv2 = 265;
            var maxhv2 = 170;
            if (mainnew) {
                $("#switchtext").text("PPT");
                $("#switchtext").attr("data-type", "1");
                //var predisplay=previewdivobj.style.display=='none'?'display:none;':'';
                previewdivobj.style.cssText = 'width:100%;height:100%;';
            } else {
                previewdivobj.style.cssText = 'width:' + wv + 'px;height:' + hv + 'px;';
                videoiframetempobj.style.zoom = 1;
                videoiframetempobj.style.MozTransform = "scale(1)";
                videoiframetempobj.style.MozTransformOrigin = "center center"
            }
            var pptpreviewdivobj = document.getElementById("pptpreviewdiv");
            var contentbodybodytabobj = document.getElementById("contentbodybodytab");
            var myConainerDivobj = document.getElementById("myConainerDiv");
            if (myConainerDivobj.firstChild && myConainerDivobj.firstChild.tagName) {
                wv = myConainerDivobj.firstChild.clientWidth || myConainerDivobj.clientWidth;
                hv = myConainerDivobj.firstChild.clientHeight || myConainerDivobj.clientHeight;
            } else {
                hv = 1024;
                wv = 580;
            }
            if (mainnew) {
                pptpreviewdivobj.style.cssText = "margin:0 10px;position:absolute;z-index:1;width:" + (maxwv2 - 20) + "px;height:" + maxhv2 +
                    "px;top:45px;right:-" + maxwv2 + "px;overflow:hidden;";
                $(myConainerDivobj).parent().append('<div onclick="smallzoomplayvodeowin()" id="myConainerDivsmallzoomdiv" style="background-color:black;opacity:0.1;left:0px;top:0px;position:absolute;z-index:2;width:100%;height:100%">&nbsp;</div>');
                var zoomhash = maxWHHash2(wv, hv, maxwv2 - 20, maxhv2);
                if (myConainerDivobj.firstChild && myConainerDivobj.firstChild.tagName) { //避免myConainerDivobj标签内的文字被当成标签处理
                    if (myConainerDivobj.firstChild.tagName.toLowerCase() == "img") {
                        myConainerDivobj.firstChild.style.cssText = "height:" + zoomhash.height + "px;width:" + zoomhash.width + "px";
                    } else { //svg,带有svg的，采用重置方式
                        showresource(itemscrolldivobj.children(".itemsourceon")[0], 1);
                    }
                }
            } else {
                var bodywidth = contentbodybodytabobj.clientWidth;
                var bodyheight = contentbodybodytabobj.clientHeight;
                pptpreviewdivobj.style.cssText = "position:absolute;width:" + maxwv2 + "px;height:" + maxhv2 + "px;margin:0px 0px 0px -270px;left:271px;top:6px;overflow:hidden;";
                $(myConainerDivobj).parent().append('<div onclick="smallzoomplayvodeowin()" id="myConainerDivsmallzoomdiv" style="background-color:black;opacity:0.1;left:0px;top:0px;position:absolute;z-index:2;width:100%;height:100%">&nbsp;</div>');
                var zoomhash = maxWidthHeightHash(wv, hv, maxwv2, maxhv2);
                // console.log(JSON.stringify(zoomhash),wv,hv,maxwv2,maxhv2)
                // "width:100%;height:100%;zoom:"+zoomhash.zoom;;//margin1-left:-"+((bodywidth-wv)/4)+"px
                contentbodybodytabobj.style.cssText = "width:" + bodywidth + "px;height:" + bodyheight + "px;";
                myConainerDivobj.parentNode.setAttribute("align", "left");
                myConainerDivobj.parentNode.setAttribute("valign", "top");
                myConainerDivobj.style.margin = "0px";
                myConainerDivobj.parentNode.style.cssText = "width:" + bodywidth + "px;height:" + bodyheight + "px;zoom:" + zoomhash.zoom + ";-moz-transform:scale(" + zoomhash.zoom + ");-moz-transform-origin:top left;";
            }
        }
        window.smallzoomplayvodeowin = function() {
            var videoiframetempobj = document.getElementById("videoiframetemp");
            var previewdivobj = document.getElementById("previewdiv");
            var pptpreviewdivobj = document.getElementById("pptpreviewdiv");
            var contentbodybodytabobj = document
                .getElementById("contentbodybodytab");
            var myConainerDivobj = document.getElementById("myConainerDiv");

            var wv = 700; // previewdivobj.parentNode.clientWidth;
            var hv = previewdivobj.parentNode.clientHeight;
            var maxwv2 = 265;
            var maxhv2 = 170;
            var zoomhash = maxWidthHeightHash(wv, hv, maxwv2, maxhv2);

            var notelistdivobj = document.getElementById("notelistdiv");
            if (mainnew) {
                $("#switchtext").text("视频");
                $("#switchtext").attr("data-type", "0");
                //var predisplay=previewdivobj.style.display=='none'?'display:none;':'';
                previewdivobj.style.cssText = "position:absolute;z-index:1;width:" + (maxwv2 - 20) + "px;height:" + maxhv2 + "px;top:45px;right:-255px;background-color:white";
                if (myConainerDivobj.firstChild && myConainerDivobj.firstChild.tagName) {
                    if (myConainerDivobj.firstChild.tagName.toLowerCase() == "img") {
                        myConainerDivobj.firstChild.style.cssText = "";
                    } else { //svg
                        showresource(itemscrolldivobj.children(".itemsourceon")[0], 1);
                    }
                }
            } else {
                previewdivobj.style.cssText = "border:1px solid #595959;padding:2px;position:absolute;width:" + maxwv2 + "px;height:" + maxhv2 + "px;margin:0px 0px 0px -275px;left:276px;top:6px;overflow:hidden;background-color:white";
                contentbodybodytabobj.style.cssText = "width:100%;height:100%";
                myConainerDivobj.parentNode.setAttribute("align", "center");
                myConainerDivobj.parentNode.setAttribute("valign", "middle");
                myConainerDivobj.parentNode.style.zoom = 1;
                myConainerDivobj.style.margin = "0px auto";
                myConainerDivobj.style.MozTransform = "scale(1)";
                myConainerDivobj.style.MozTransformOrigin = "center center";
                videoiframetempobj.style.zoom = zoomhash.zoom;
                videoiframetempobj.style.MozTransform = "scale(" + zoomhash.zoom + ")";
                videoiframetempobj.style.MozTransformOrigin = "top left";
            }
            pptpreviewdivobj.style.cssText = "width:100%;height:100%";
            $("#myConainerDivsmallzoomdiv").remove();
        }
        window.loadplayhtmlpage = function() {
            var url = 'http://eq.tvm.cn/jwplayer/play.html?boxId=' + activityobj["boxid"] + '&mpUser=' + activityobj["mpuser"] + '&activityId=' + activityobj["activityid"] + '&openid=' + loginopenid + "&t=" + (new Date().getTime());
            console.log(url);
            gotolocation(videoiframetemp, url);
        }
        window.playvideo = function() {
            var previewdivobj = document.getElementById("previewdiv");
            // if(previewdivobj.style.display=="none"){
            var wv = 700; // previewdivobj.parentNode.clientWidth;
            var hv = previewdivobj.parentNode.clientHeight;
            var maxwv2 = 265;
            var maxhv2 = 170;
            var zoomhash = maxWidthHeightHash(wv, hv, maxwv2, maxhv2);

            var notelistdivobj = document.getElementById("notelistdiv");
            var html = ''
            if (mainnew) {
                previewdivobj.style.cssText = "padding:0 10px;position:absolute;z-index:1;width:" + (maxwv2 - 20) + "px;height:" + maxhv2 + "px;top:45px;right:-265px;overflow:hidden;background-color:white";
                html = '' + '<iframe id="videoiframetemp" name="videoiframetemp" style="width:100%;height:100%;-moz-transform-origin:top left;"  src="about:blank"  frameborder="0" allowfullscreen="true"></iframe>';
            } else {
                previewdivobj.style.cssText = "display:none;border:1px solid #595959;padding:2px;position:absolute;width:" + maxwv2 + "px;height:" + maxhv2 + "px;margin:0px 0px 0px -275px;left:276px;top:6px;overflow:hidden;background-color:white";

                html = '' + '<iframe id="videoiframetemp" name="videoiframetemp" style="width:' + wv + 'px;height:' + hv + 'px;zoom:' + zoomhash.zoom + ';-moz-transform:scale(' + zoomhash.zoom + ');-moz-transform-origin:top left;"  src="about:blank"  frameborder="0"></iframe>';
            }
            previewdivobj.innerHTML = html;
            // }
            loadplayhtmlpage();

        }
        window.beginflowwebsocket = function() {
            // ?boxId=40-61-86-E6-C5-96&mpUser=lipengtao@tvmining.com&activityId=192313&openid=osvCnjiG3MlKCN4UIjDAQ2fcwsbY
            var url = "about:blank";
            // statusflag :1进行中有直播 2:进行中无直播 3:结束有回放视频 4:结束没有回放视频
            if (activityobj["statusflag"] == "2") {
                url = 'flow.htm?boxId=' + activityobj["boxid"] + '&mpUser=' + activityobj["mpuser"] + '&activityId=' + activityobj["activityid"] + '&openid=' + loginopenid + "&t=" + (new Date().getTime());
                // url="InkStream.htm"+"?t="+(new Date().getTime());

            }
            gotolocation(socketiframe, url);
        }
        window.uploadlocalok = function(ref) {
            /*
             * loadObj.hidd(); showflow({source:ref.shift().value});
             * modifyimage();
             */
        }
        window.chancelmodifyimage2 = function(actionname, parm1) {
            var modifyuploadfiledivobj = $("#modifyuploadfilediv");

            chancelmodifyimage1(actionname, parm1, modifyuploadfiledivobj,
                null,
                function() {
                    modifyuploadfiledivobj.remove();
                });
        }
        window.chancelmodifyimage1 = function(actionname, parm1, conainerobj,
            noteJSON, uploadokcallback) {

            var myConainerDivobj = null;
            var iframeobj = null; //	
            if (conainerobj == null) {
                myConainerDivobj = $("#myConainerDiv");
                // iframeobj=myConainerDivobj.parent().children("iframe"); //

                iframeobj = $("#modifyimage1ifr");

            } else {
                myConainerDivobj = conainerobj;
                iframeobj = myConainerDivobj.children("iframe"); //	
            }

            function modifyimageend() {

                iframeobj.remove();
                $("#modifyimgdiv1").hide();
                document.getElementById("upf1").style.display = "";

            }

            if (actionname == "sendto" || actionname == "saveto" || actionname == "savenote") { // 生成图片发送
                var notetype = actionname == "sendto" ? 2 : actionname == "savenote" ? 3 : 1;
                var sizeobj = parm1.sizeobj || myConainerDivobj[0].firstChild;
                var sizeobjjq = $(sizeobj);
                var csspro = sizeobjjq.offset();
                var imgwidth = sizeobj.clientWidth;
                var imgheight = sizeobj.clientHeight;
                csspro["width"] = imgwidth;
                csspro["height"] = imgheight;

                function animatefunc(base64data) {
                    var sendmsgbutobj = null;
                    if (notetype == 3) {
                        sendmsgbutobj = $("#note_" + noteJSON.id);
                    } else {
                        sendmsgbutobj = notetype == 1 ? $("#savenotemsgbut") : $("#sendmsgbut");
                    }
                    var sendmsgbutcss = sendmsgbutobj.offset();
                    sendmsgbutcss.width = 0; // sendmsgbutobj.width();
                    sendmsgbutcss.height = 0; // sendmsgbutobj.height();
                    sendmsgbutcss.left += 25;
                    var newimg = new Image()
                    newimg.src = base64data.indexOf("http://") != -1 ? base64data : "data:image/png;base64," + base64data;
                    $("body").append(newimg);
                    var animateobj = $(newimg);

                    csspro["position"] = "absolute";
                    csspro["zIndex"] = 8888;

                    animateobj.css(csspro);
                    $("body").append(animateobj);

                    animateobj.animate({
                        top: csspro.top - 60
                    }, "normal").animate(sendmsgbutcss, "normal", function() {
                        if (notetype == 3) { // 保存修改
                            noteJSON.content.source = this.src;
                            sendmsgbutobj.replaceWith(note2html(noteJSON));
                        }
                        $(this).remove();
                    })

                }
                // alert(actionname+":"+notetype)

                loadObj.show({
                    "text": "正在上传文件..."
                });
                var urlstr1 = iframeobj.attr("src");

                function privatebase642img(base64data) {
                    // console.log(actionname,parm1,base64data);
                    sendImage2Wall(
                        url2Hash(urlstr1),
                        base64data,
                        function(serverimgurl) {
                            if (serverimgurl != null && serverimgurl != "") {
                                var noteparm1 = null;

                                if (notetype == 3) {
                                    noteparm1 = {
                                        noteid: noteJSON.id,
                                        courseId: noteJSON.courseid,
                                        notecontent: serverimgurl
                                    };
                                } else {
                                    noteparm1 = serverimgurl;
                                }

                                sendnote(
                                    notetype,
                                    "image",
                                    noteparm1,
                                    function(noteobj) {
                                        var notelistdivobj = document
                                            .getElementById("notelistdiv");
                                        if (noteobj != null && notelistdivobj != null) {
                                            var notecontentlistdivobj = $("#notecontentlistdiv");
                                            var notedivobj = $(note2html(noteobj));
                                            notedivobj.hide();
                                            notecontentlistdivobj
                                                .prepend(notedivobj);
                                            notecontentlistdivobj
                                                .scrollTop(0);
                                            notedivobj.show("normal");
                                        }
                                    });

                            }
                            loadObj.hidd();
                            if (uploadokcallback != null) {
                                uploadokcallback();
                            }
                            modifyimageend();
                            animatefunc(serverimgurl || base64data);

                        })

                }
                if (parm1.base64data) {
                    privatebase642img(parm1.base64data);
                } else {
                    convert2png(parm1, privatebase642img);
                }
            } else {
                modifyimageend();
            }
        }
        window.modifyimage1 = function(conainerObj) {
            var myConainerDivobj = conainerObj || $("#myConainerDiv");
            var imgobj = myConainerDivobj.children("img"); //	
            var cssTextVal = imgobj.attr("cssTextVal") || "";
            if (cssTextVal != "") {
                alert("图片在放大情况下不能编辑!");
                return false;
            }
            var edimgobj = myConainerDivobj[0].firstChild;
            if (edimgobj == null) {
                return false;
            }
            var imgwidth = edimgobj.clientWidth;
            var imgheight = edimgobj.clientHeight;
            var imgabswidth = imgobj.attr("abswidth");
            var imgabsheight = imgobj.attr("absheight");
            var dataUrl = imgobj.attr("data-url");
            var dataGuid = myConainerDivobj.attr("data-guid");
            if (mainnew) {
                var contentbodydivobj = $("#contentbodydiv");
                var imgZWH = maxWHHash2(imgabswidth, imgabsheight, contentbodydivobj.width(), contentbodydivobj.height());
                imgwidth = imgZWH.width;
                imgheight = imgZWH.height;
            }
            if (imgabswidth == null || imgabsheight == null || dataUrl == null || dataGuid == null) {
                alert("请等待图片加载完毕后重试!");
                return false;
            }

            var urlstr = './jSignature-master/examples/sign2.html?boxId=' + activityobj["boxid"] + '&mpUser=' + activityobj["mpuser"] + '&activityId=' + activityobj["activityid"] + "&fakeId=" + loginfakeid + '&openid=' + loginopenid + "&t=" + (new Date().getTime());

            var iframehtml = '<iframe id="modifyimage1ifr" name="modifyimage1ifr" allowTransparency="true" src="' + urlstr + '" frameborder="0" style="position:absolute;left:0px;top:' + imgheight + 'px;width:100%;height:100%;z-index:8889"></iframe>'
            if (conainerObj == null) {
                $("#contentbodydiv").append(iframehtml);
                // myConainerDivobj.parent().append(iframehtml);
            } else {
                conainerObj.append(iframehtml);
            } // console.log(imgobj.offset(),imgobj.position()); relative
            // document.getElementById("upf1").style.display="none";
            window.modifyimage1iframeok = function() {
                document.getElementById("modifyimage1ifr").style.top = '0px'; // '-'+(imgheight)+'px';
                var modifyimgdiv1obj = $("#modifyimgdiv1");
                modifyimgdiv1obj.show();
                var toolsbardivobj = document.getElementById("toolsbardiv");

                if (modifyimgdiv1obj.attr("addevent") == null) {
                    modifyimgdiv1obj.attr("addevent", 1);
                    var coloritemobjs = $(toolsbardivobj)
                        .children(".coloritem");
                    coloritemobjs.click(function() {
                        coloritemobjs.each(function() {
                            $(this).removeClass("coloritemon");
                        });
                        var thisobj = $(this);
                        thisobj.addClass("coloritemon");
                        modifyimage1ifr.setconfigyj({
                            strokeStyle: (thisobj.attr("value"))
                        });
                    })
                    var penitemobjs = $(toolsbardivobj).children(".penitem");
                    penitemobjs.click(function() {
                        penitemobjs.each(function() {
                            $(this).removeClass("penitemon");
                        });

                        var thisobj = $(this);
                        thisobj.addClass("penitemon");
                        // lineWidth strokeStyle
                        modifyimage1ifr.setconfigyj({
                            lineWidth: parseInt(thisobj.attr("value"))
                        });

                    })
                } else {
                    setTimeout(function() {
                        var strokeStyle = $(toolsbardivobj).children(
                            ".coloritemon").attr("value");
                        modifyimage1ifr.setconfigyj({
                            strokeStyle: strokeStyle
                        });

                        var linwwidth = $(toolsbardivobj)
                            .children(".penitemon").attr("value");
                        modifyimage1ifr.setconfigyj({
                            lineWidth: parseInt(linwwidth)
                        });
                    }, 500);
                }

                var pointer = {
                    "inkstreamdata": getInkStreamData(),
                    "data-guid": dataGuid,
                    "width": imgwidth,
                    "height": imgheight,
                    "abswidth": imgabswidth,
                    "absheight": imgabsheight,
                    "data-url": dataUrl
                };
                // console.log(pointer);
                return pointer;
            }
        }
        window.modifyimage = function() {

            var bwidth = document.body.clientWidth;
            var bheight = document.body.clientHeight;

            var coursedivobj = parent.document.getElementById("coursediv");
            var heightval = (ua.match(/iPad/i) || ua.match(/android/i)) ? "height:" + (coursedivobj.clientHeight) + "px" : "height:100%";

            var urlstr = './jSignature-master/examples/sign.html?boxId=' + activityobj["boxid"] + '&mpUser=' + activityobj["mpuser"] + '&activityId=' + activityobj["activityid"] + "&fakeId=" + loginfakeid + '&openid=' + loginopenid + "&t=" + (new Date().getTime());

            var modifyuploadfiledivhtml = '<div id="modifyuploadfilediv" style="width:100%;' + heightval + ';position:absolute;left:0px;top:100%;z-index:1000">' + '<iframe style="width:100%;height:100%" frameborder=0 src="' + urlstr + '"></iframe>' + '</div>';
            $("body").append(modifyuploadfiledivhtml);

            var modifyuploadfiledivobj = $("#modifyuploadfilediv");
            if (ua.match(/iPad/i)) {
                modifyuploadfiledivobj.css("top", "0");
            } else {
                modifyuploadfiledivobj.animate({
                    top: 0
                }, "fast", function() {

                });
            }
        }

        window.onselectactivityfile = function(fileobj) {

            var upfilename = $("#files").val();
            if (upfilename != "") {
                upfilename = upfilename.toLowerCase();
                var offset1 = upfilename.indexOf(".");
                if (offset1 != -1) {
                    var hzname = upfilename.substring(offset1 + 1);
                    if (hzname != "jpg" && hzname != "png") {
                        setTimeout(function() {
                            alert("不支持该数据格式！");
                        }, 500);
                    } else {
                        if (fileobj.files && window.FileReader) {
                            loadObj.show({
                                "text": "正在加载图片！"
                            });
                            window.signimgobj = new Image();
                            signimgobj.onload = function() {
                                    loadObj.hidd();
                                    modifyimage();
                                }
                                // document.all.myConainerDiv.firstChild
                            viewlocalfile(fileobj.files[0], signimgobj);
                        } else {
                            alert("不支持AJAX上传文件....");
                            // loadObj.show({"text":"正在上传数据！"});
                            // var
                            // url='uploadfile?callback=parent.uploadlocalok'
                            // upf1.action=url;
                            // upf1.submit();
                        }
                    }
                    // upf1.action="null.htm";
                    // upf1.reset();
                }
                upf.reset();
            }
        }

        // 图片推送
        window.sendImage2Wall = function(postparms, base64data, callback,
            notetype) {
            var urlstr = './uploadfile';
            $
                .ajax({
                    type: "POST",
                    url: urlstr,
                    data: base64data,
                    dataType: 'json',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Content-Type",
                            "application/octet-stream");
                        xhr
                            .setRequestHeader("Content-Disposition",
                                'attachment; format="base64"; name="file"; filename="sign.png"');
                    },
                    success: function(ref) {
                        callback(ref.shift().value);

                        // var postparms=url2Hash();
                        /*
                         * postparms["imgurl"]=ref.shift().value;
                         * postparms["imageEdit"]="1"; //
                         * console.log(postparms);
                         * 
                         * invokeMethod("hdyun.sendImage2Wall",function
                         * call1(ref) {
                         * 
                         * if(ref.status=="OK"){ callback() }else{
                         * alert(ref.status); } },postparms);
                         * 
                         */
                    },
                    error: function(ref) {
                        alert("上传文件失败！")
                        callback();
                        console.log(ref);
                    }
                });

        }

        function sendnote(notetype, notemime, notecontent, callback) {
            if (notetype == 3) {
                // console.log(notetype+","+notemime+","+notecontent)
                notecontent.notemime = notemime;
                invokeMethod("eq.modifynote", function call1(ref) {
                    if (ref.status == "OK") {
                        callback();
                    } else {
                        alert(ref.status);
                    }
                }, notecontent);
                // alert("notetype="+notetype);
            } else {
                var reqcontent = {
                    notetype: notetype || 2,
                    notemime: notemime
                };
                reqcontent["mpUser"] = activityobj["mpuser"];
                reqcontent["activityId"] = activityobj["activityid"];
                reqcontent["iceId"] = activityobj["boxid"];
                reqcontent["activityName"] = activityobj["desc"];
                reqcontent["pptguid"] = "";
                reqcontent["cmdtimestamp"] = "";
                reqcontent["content"] = notecontent;
                reqcontent["coursestatus"] = activityobj["coursestatus"];
                var itemsourceonobj = itemscrolldivobj
                    .children(".itemsourceon");
                if (itemsourceonobj.length > 0) {
                    var selectitemobj = itemsourceonobj[0];
                    reqcontent["cmdtimestamp"] = selectitemobj
                        .getAttribute("data-timestamp");
                    reqcontent["pptguid"] = selectitemobj
                        .getAttribute("data-guid");
                }
                invokeMethod("eq.say", function call1(ref) {
                    if (ref.status == "OK") {
                        callback(ref.notedata);
                    } else {
                        alert(ref.status);
                    }
                }, JSON.stringify(reqcontent));
            }
        }

        function loadNoteList(loadflag, callback) {
            var notelistdivobj = $("#notelistdiv");
            var offsetval = 1;
            if (loadflag != 1) {
                if (notelistdivobj.attr("isloading") == "1") {
                    // console.log("正在加载数据，防止重复提交！");
                    return;
                }
                if (notelistdivobj.attr("isloadall") == "1") {
                    return;
                }
                offsetval = parseInt(notelistdivobj.attr("offset")) || 1;
            } else {
                offsetval = 1;
                notelistdivobj.removeAttr("offset");
                notelistdivobj.removeAttr("isloading");
                notelistdivobj.removeAttr("isloadall");
            }

            notelistdivobj.attr("isloading", 1)
            var limit = 50;
            var reqparms = {
                courseId: activityobj["activityid"],
                "offset": offsetval,
                "limit": limit,
                "sort": "ASC"
            };

            var itemsourceonobj = itemscrolldivobj.children(".itemsourceon");
            if (itemsourceonobj.length > 0) {
                // reqparms["pptguid"]=itemsourceonobj.attr("data-guid")||"";
            }

            invokeMethod("eq.getNoteList", function call1(ref) {
                if (ref.status == "OK") {
                    var arrayobj = [];
                    var filelist = ref.list;
                    var filelistlen = filelist == null ? 0 : filelist.length;

                    var newstartIndex = offsetval + limit;
                    var totalResults = parseInt(ref.totalResults || (newstartIndex + 1));

                    if (filelistlen == 0 || newstartIndex >= totalResults) {
                        notelistdivobj.attr("isloadall", 1);
                    }
                    notelistdivobj.attr("offset", newstartIndex);
                    // console.log(ref);
                    var notehtml = '';
                    var notecontentlistdivobj = $("#notecontentlistdiv");
                    if (loadflag == 1) {
                        notecontentlistdivobj.empty();
                    }

                    for (var k = 0; k < filelistlen; k++) {
                        addnote(filelist[k], notecontentlistdivobj);
                    }

                } else {
                    alert(ref.status);
                }

                notelistdivobj.attr("isloading", 0);
                if (callback != null) {
                    callback();
                }
                // packid:packid,
            }, reqparms);
        }

        function addnote(noteobj, notecontentlistdivobj) {
            var pptguid = noteobj.pptguid;
            var notemime = noteobj.notemime;
            var pptnodeobjs = document.getElementsByName("pptnode_" + pptguid);
            var pptnodeobjslen = pptnodeobjs.length;
            if (pptnodeobjslen > 0) {
                var itemobj1 = pptnodeobjs[pptnodeobjslen - 1].parentNode;
                var bgcolor1 = itemobj1.getAttribute("data-background");
                $(itemobj1).after(note2html(noteobj, bgcolor1));
            } else {
                var itemobj2 = notecontentlistdivobj[0].lastChild;
                var bgcolor2 = null;
                if (itemobj2 != null) {
                    bgcolor2 = itemobj2.getAttribute("data-background");
                }
                if (bgcolor2 == "#FFFFFF") {
                    bgcolor2 = "#e4eef6";
                } else {
                    bgcolor2 = "#FFFFFF";
                }
                notecontentlistdivobj.append('<a id="maodian_' + pptguid + '" name="maodian_' + pptguid + '"></a>' + note2html(noteobj, bgcolor2))
            }
        }

        function note2html(noteobj, beforebgcolor) {

            beforebgcolor = beforebgcolor || "#FFFFFF";
            var adddatetime = noteobj.adddatetime;
            var notetype = noteobj.notetype;
            var notemime = noteobj.notemime;
            var pptguid = noteobj.pptguid;
            var cmdtimestamp = noteobj.cmdtimestamp;
            var notecontent = noteobj.content;
            var noteid = noteobj.id;

            var notetypename = (notetype == 1 ? "笔记" : "发言");
            var notecontentstr = null;
            if (notemime == "text") {
                notecontentstr = notecontent;
            } else if (notemime == "image") {
                var imgurl = notecontent.source;
                var coverurl = null;
                if (imgurl.indexOf(".tvmcloud.") != -1) {
                    coverurl = imgurl + "_300_300.jpg";
                } else {
                    coverurl = imgurl;
                }
                notecontentstr = '<img style="max-height:155px" onclick="showbigimgwithnote(\'' + noteid + '\')" src="' + coverurl + '" data-url="' + imgurl + '">';
            } else {
                notecontentstr = "未处理类型：" + notemime;
            }

            var html = '<div data-background="' + beforebgcolor + '" data-ppttimestamp="' + cmdtimestamp + '" data-pptguid="' + pptguid + '" data-id="' + noteid + '" id="note_' + noteid + '" style="width:230px;min-height:60px;border-bottom:1px solid #dedede;padding:8px;background-color:' + beforebgcolor + '">' + '	<div style="line-height:23px;color:#0a397f;float:left" id="pptnode_' + pptguid + '" name="pptnode_' + pptguid + '">' + notetypename + '</div>' + '	<div style="line-height:23px;color:#0a397f;float:right" id="pptnode_' + cmdtimestamp + '" name="pptnode_' + cmdtimestamp + '">' + adddatetime + '</div>' + '	<div style="clear:both;height:0px;"></div>' + '	<div class="notecontent" style="color:#505050;max-height:160px;overflow-x:hidden;overflow-y:auto;padding-left:6px">' + notecontentstr + '</div>' + '	<div align="right" style="margin-top: 6px;">' + '    <img onclick="notetoppt(\'' + pptguid + '\',' + cmdtimestamp + ')" title="转到PPT" alt="转到PPT" style="cursor:pointer;max-height:18px;margin-right:8px" src="./images/toppt1.png">' + '    <img onclick="modifynote(\'' + noteid + '\')" style="cursor:pointer;max-height:18px;margin-right:8px" src="./images/edit1.png">' + '    <img onclick="deletenote(\'' + noteid + '\')" style="cursor:pointer;max-height:18px;margin-right:8px" src="./images/newicon3.png">' + '  </div>' + '<textarea style="display:none">' + JSON.stringify(noteobj) + '</textarea>' + '</div>';
            return html;
        }
        window.showbigimgwithnote = function(noteid, showtype) {
            var noteobj = $(document.getElementById("note_" + noteid));
            var noteJSON = JSON.parse(noteobj.children("textarea").text());
            var notecontentobj = noteobj.children(".notecontent").children(
                "img");

            var notemime = noteJSON.notemime;

            if (notemime != "image") {
                alert("不支持格式“" + notemime + "”！");
                return;
            }
            var animateobj = notecontentobj.clone();
            var csspro = notecontentobj.offset();
            csspro["position"] = "absolute";
            csspro["zIndex"] = 8888;
            animateobj.css(csspro);
            animateobj.css({
                "background-color": "#FFFFFF",
                "max-height": "600px"
            })
            $("body").append(animateobj);

            var imgcontent = noteJSON.content;
            var zoomhash = maxWidthHeightHash(imgcontent.width,
                imgcontent.height, 1024, 600);
            var marginstr = '-' + (zoomhash.height / 2 + 28) + 'px 0px 0px -' + (zoomhash.width / 2) + 'px';
            var html = '<div id="modifynotebg" style="z-index:8887;position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:black;opacity:0.8;"></div>' + '<div  id="modifynotewindiv" data-guid="' + imgcontent.guid + '" guid="' + imgcontent.guid + '"' + ' style="background-image:url(' + notecontentobj.attr("src") + ');background-size:100% 100%;' + 'margin:' + marginstr + ';display:none;z-index:8887;position:absolute;left:50%;top:50%;width:' + zoomhash.width + 'px;height:' + zoomhash.height + 'px;overflow: hidden;">' + '<img  abswidth="' + imgcontent.width + '" absheight="' + imgcontent.height + '"' + ' src="' + imgcontent.source + '" data-url="' + imgcontent.source + '" style="width:' + zoomhash.width + 'px;height:' + zoomhash.height + 'px;"></div>'

            $("body").append(html);

            animateobj
                .animate({
                        "width": zoomhash.width + "px",
                        "height": zoomhash.height + "px",
                        "left": "50%",
                        "top": "50%",
                        "margin": marginstr
                    },
                    "fast",
                    function() {
                        var modifynotewindivobj = $("#modifynotewindiv");
                        modifynotewindivobj.show();
                        $(this).remove();
                        if (showtype == 2) { // 修改笔记图
                            var buttonbardivobj = $(document
                                .getElementById("buttonbardiv"));
                            $("#okcanvasbut").hide();
                            $("#oksavecanvasbut").hide();
                            $("#cancelmodifyimgbut").hide();

                            var but0obj = $('<input type="button" class="imgbgsavebut" title="保 存" >')
                            buttonbardivobj.append(but0obj);
                            but0obj
                                .click(function() {
                                    modifyimage1ifr
                                        .okcanvasbutfunc(
                                            3,
                                            function(
                                                inkstreaminfo) {
                                                if (inkstreaminfo != null) {
                                                    chancelmodifyimage1(
                                                        "savenote",
                                                        inkstreaminfo,
                                                        modifynotewindivobj,
                                                        noteJSON,
                                                        function() {
                                                            cancelmodifynote();
                                                        });
                                                } else {
                                                    cancelmodifynote();
                                                }
                                            });
                                });
                            var but1obj = $('<input type="button" style="background-position:-192px 0px;width:28px;" class="imgbgbut" title="取 消" >')
                            buttonbardivobj.append(but1obj);
                            but1obj.click(cancelmodifynote)

                            function cancelmodifynote() {
                                $("#okcanvasbut").show();
                                $("#cancelmodifyimgbut").show();
                                $("#oksavecanvasbut").show();

                                but0obj.remove();
                                but1obj.remove();
                                $("#modifynotebg").remove();
                                $("#modifynotewindiv").remove();
                                chancelmodifyimage1();
                            }

                            modifyimage1(modifynotewindivobj);

                        } else {
                            modifynotewindivobj.click(function() {
                                $("#modifynotebg").remove();
                                $("#modifynotewindiv").remove();
                            });
                        }
                    })

        }
        window.notetoppt = function(pptid, cmdtimestamp) {
            var pptobj = document.getElementById("item_" + cmdtimestamp);
            if (pptobj == null) {
                var pptobjs = document.getElementsByName("item_" + pptid);
                if (pptobjs.length > 0) {
                    pptobj = pptobjs[0];
                }
            }
            if (pptobj != null) {

                var itempanel2obj1 = document.getElementById("itempanel2");
                var pptobjjq = $(pptobj);
                var scrollleft1 = itempanel2obj1.scrollLeft;
                var offsetval = scrollleft1 + pptobjjq.offset().left;

                var pptobjwidth = pptobjjq.width();
                if (offsetval > (pptobjwidth * 3)) {
                    offsetval -= pptobjwidth * 2;
                }
                itempanel2obj1.scrollLeft = offsetval;
                if (!$(pptobj).hasClass("itemsourceon")) {
                    pptobj.setAttribute("data-cmdfrom", "note2ppt");
                    showresource(pptobj);
                }
            }
        }
        window.modifynote = function(noteid) {
            var noteobj = $(document.getElementById("note_" + noteid));
            var noteJSON = JSON.parse(noteobj.children("textarea").text());

            var notemime = noteJSON.notemime;
            if (notemime != "image" && notemime != "text") {
                alert("当前格式“" + notemime + "”不支持修改！");
                return;
            } else if (notemime == "image") {
                showbigimgwithnote(noteid, 2);
                return;
            }

            var notecontentobj = noteobj.children(".notecontent");

            var animateobj = notecontentobj.clone();
            var csspro = notecontentobj.offset();
            csspro["position"] = "absolute";
            csspro["zIndex"] = 8888;
            animateobj.css(csspro);
            animateobj.css({
                "background-color": "#FFFFFF",
                "max-height": "600px"
            })
            $("body").append(animateobj);
            var html = '<div id="modifynotebg" style="z-index:8887;position:absolute;left:0px;top:0px;width:100%;height:100%;background-color:white;opacity:0.2;"></div>' + '<div id="modifynotewindiv" align="center" style="box-shadow:0px 0px 10px #000000;display:none;z-index:8887;position:absolute;left:50%;top:50%;width:320px;height:460px;background-color:white;margin:-230px 0px 0px -210px">' + '<div style="margin:8px;text-align:right" class="topbar"><img class="cancelbut" src="./images/close.png"></div>' + '<div style="margin:8px;line-height:30px;color:#0067b6;font-size:18px;padding-left: 20px;text-align:left">修改课堂笔记</div>' + '<textarea  style="box-shadow:inset 0px 1px 6px #9c9c9c;border-radius:6px;padding:3px;width:260px;height:280px;resize:none;margin:2px 10px 0px 10px;overflow:auto" id="modifynotecontent" onblur="return onbodyscroll()"></textarea>' + '<div class="controls" align="center">'
                // +'<input type="button" class="imgbut savebut" value="保 存"
                // >'
                // +'<input type="button" class="imgbut cancelbut" value="取
                // 消" >'
                + '<img src="./images/savebut2.png" class="savebut" style="margin:20px">' + '</div>' + '</div>';

            $("body").append(html);

            animateobj.animate({
                "width": "320px",
                "height": "460px",
                "left": "50%",
                "top": "50%",
                "margin": "-230px 0px 0px -210px"
            }, "fast", function() {
                var modifynotewindivobj = $("#modifynotewindiv");
                modifynotewindivobj.show();
                $("#modifynotecontent").text(noteJSON.content);
                $(this).remove();

                modifynotewindivobj.children(".controls").children(".savebut")
                    .click(
                        function() {
                            sendmessage2wall(3,
                                $("#modifynotecontent"), noteJSON);
                            $("#modifynotebg").remove();
                            $("#modifynotewindiv").remove();
                        });

                modifynotewindivobj.children(".topbar").children(".cancelbut")
                    .click(function() {
                        $("#modifynotebg").remove();
                        $("#modifynotewindiv").remove();
                    });

            })
        }
        window.deletenote = function(noteid) {
            if (confirm("您确定要删除吗？ ")) {
                var noteobj = $(document.getElementById("note_" + noteid));

                var noteJSON = JSON.parse(noteobj.children("textarea").text());
                invokeMethod("eq.delnote", function call1(ref) {
                    if (ref.status == "OK") {

                    } else {
                        alert(ref.status);
                    }
                }, {
                    courseId: noteJSON.courseid,
                    noteid: noteJSON.id
                });

                noteobj.fadeOut("fast", function() {
                    $(this).remove();
                });
            }
        }

        window.notecontentdivscroll = function() {

            loadNoteList(2);

        }
        window.gotonote = function(pptobj) {
            var pptid = pptobj.getAttribute("data-guid");
            var notelistdivobj = document.getElementById("notelistdiv");
            if (notelistdivobj != null && notelistdivobj.style.display != "none") {
                var pptnodeobj = document.getElementById("maodian_" + pptid);
                var noteloadwaitdivobj = document
                    .getElementById("noteloadwaitdiv");

                function tomaodian() {
                    window.location.hash = "maodian_" + pptid;
                    window.location.hash = "";
                }
                if (pptnodeobj == null) {
                    loadNoteList(2, tomaodian);
                } else {
                    tomaodian();
                }
            }
        }
        window.shownoteinfo = function() {
                var notelistdivobj = document.getElementById("notelistdiv");
                if (notelistdivobj == null) {
                    var contetntrobj = $("#contetntr");
                    var offsetv = contetntrobj.offset();
                    var tv = offsetv.top;
                    var hv = $("body").height() - tv;
                    // ./images/barbg.pngbox-shadow: -2px 0px 6px #070002;
                    var divhtml = '<div id="notelistdiv" ' + 'style="display:none;background:#FFFFFF url() repeat-x left top' + ';border-left:1px solid #cccccc;z-index:200;width:265px;height:' + hv + 'px' + ';position:absolute;top:' + tv + 'px;right:-260px;">' + '<div onclick="shownoteinfo(this)" style="cursor:pointer;font-weight:bold;background-color:#969696;color:#FFFFFF;height:86px;width:26px;margin-left:-26px;float:left;text-align:center;padding-top:8px">我<BR>的<BR>笔<BR>记</div>' + '<div id="notecontentlistdiv" onscroll="loadmoredataWithScrollY(this,notecontentdivscroll)" style="-webkit-overflow-scrolling:touch;height:' + hv + 'px;overflow:hidden;overflow-y:auto"><div id="noteloadwaitdiv" style="margin:20px">加载中...</div></div>' + '</div>';
                    $("body").append(divhtml);
                    loadNoteList(1);
                    notelistdivobj = document.getElementById("notelistdiv");

                }

                if (notelistdivobj.style.display == "none") {
                    notelistdivobj.style.display = "";
                    notelistdivobj.style.right = "0px";
                    /*
                     * $(notelistdivobj).animate({right:"0px"},"fast",function(){
                     * var
                     * itemsourceonobj=itemscrolldivobj.children(".itemsourceon");
                     * if(itemsourceonobj.length>0){ gotonote(itemsourceonobj[0]); }
                     *  })
                     */
                } else {
                    $(notelistdivobj).animate({
                        right: "-260px"
                    }, "fast", function() {
                        notelistdivobj.style.display = "none";
                    });
                }
            }
            // 信息上墙
        window.sendmessage2wall = function(notetype, arg1obj, noteJSON) {

            var msgcontentobj = arg1obj || $("#msgcontent");
            var msgcontentval = $.trim(msgcontentobj.val());
            if (msgcontentval == "") {
                try {
                    msgcontentobj[0].focus();
                } catch (ex) {}
            } else {
                var sendmsgbutobj = null;
                if (notetype == 3) {
                    sendmsgbutobj = $("#note_" + noteJSON.id);
                    noteJSON.content = msgcontentval;

                } else {
                    sendmsgbutobj = notetype == 1 ? $("#savenotemsgbut") : $("#sendmsgbut");
                }
                var sendmsgbutcss = sendmsgbutobj.offset();
                sendmsgbutcss.width = 0; // sendmsgbutobj.width();
                sendmsgbutcss.height = 0; // sendmsgbutobj.height();
                sendmsgbutcss.left += 15;
                var animateobj = msgcontentobj.clone();
                var csspro = msgcontentobj.offset();
                csspro["position"] = "absolute";
                csspro["zIndex"] = 8888;
                animateobj.css(csspro);
                $("body").append(animateobj);
                animateobj.animate({
                    top: csspro.top - 260
                }, "fast").animate(sendmsgbutcss, "fast", function() {
                    $(this).remove();
                    if (notetype == 3) { // 修改笔记
                        sendmsgbutobj.replaceWith(note2html(noteJSON));
                    }
                })

                var noteparm1 = null;
                if (notetype == 3) {
                    noteparm1 = {
                        noteid: noteJSON.id,
                        courseId: noteJSON.courseid,
                        notecontent: msgcontentval
                    };
                } else {
                    noteparm1 = msgcontentval;
                }
                sendnote(
                    notetype,
                    "text",
                    noteparm1,
                    function(noteobj) {
                        if (noteobj != null) {
                            var notelistdivobj = document
                                .getElementById("notelistdiv");
                            if (notelistdivobj != null) { // 新境笔记
                                var notecontentlistdivobj = $("#notecontentlistdiv");
                                var notedivobj = $(note2html(noteobj));
                                notedivobj.hide();
                                notecontentlistdivobj.prepend(notedivobj);
                                notecontentlistdivobj.scrollTop(0);
                                notedivobj.show("normal");
                            }
                        }
                        msgcontentobj.val("")
                    });

            }

            /*
             * 
             * var upfilename=$("#files").val(); if(upfilename!=""){ return
             * true; }else{ if(msgcontentval==""){ msgcontentobj[0].focus();
             * 
             * }else{ socketiframe.sendTest(msgcontentval); } }
             * 
             * upf1.reset();
             */

            setTimeout(function() {
                onbodyscroll();
            }, 500);

            return false;
        }

        // 跟随
        window.showflow = function(msgbody) {
            msgbody["cmdfrom"] = "websocket";
            additem2itemscrolldiv([msgbody], true, 1);
        }
        window.addgoitems = function(arrayobj) {
            additem2itemscrolldiv(arrayobj, true, 4);
            checkitemscrollarrow();
        }
        window.XianChangHuDongFiles = function(isfirstload, packid, callback) { // 现场互动图片
            var itempanel2obj = $("#itempanel2");

            var offsetval = 1;
            if (!isfirstload) {
                if (itempanel2obj.attr("isloading") == "1") {
                    // console.log("正在加载数据，防止重复提交！");
                    return;
                }
                if (itempanel2obj.attr("isloadall") == "1") {
                    if (callback != null) {
                        callback();
                    }
                    return;
                }
                offsetval = parseInt(itempanel2obj.attr("offset")) || 1;
            } else {
                offsetval = 1;
                itempanel2obj.removeAttr("packid");
                itempanel2obj.removeAttr("offset");
                itempanel2obj.removeAttr("isloading");
                itempanel2obj.removeAttr("isloadall");
            }
            itempanel2obj.attr("packid", packid);
            itempanel2obj.attr("isloading", 1)
            var limit = 50;
            // "hdyun.cloudpackfiles"

            var reqparms = {
                courseId: activityobj["activityid"],
                "offset": offsetval,
                "limit": limit
            };

            // statusflag :1进行中有直播 2:进行中无直播 3:结束有回放视频 4:结束没有回放视频
            var appendval = false;
            if (activityobj["statusflag"] == "1" || activityobj["statusflag"] == "2") { //
                reqparms["sort"] = "DESC";
                itempanel2obj.attr("reftype", "refwithtop"); // 到顶部加载
                appendval = false;
            } else if (activityobj["statusflag"] == "3" || activityobj["statusflag"] == "4") { //
                reqparms["sort"] = "ASC";
                itempanel2obj.attr("reftype", "refwithbottom"); // 到底部加载
                appendval = true;
            } else {
                alert('activityobj["statusflag"]=' + activityobj["statusflag"]);
            }
            invokeMethod("eq.coursePPT", function call1(ref) {
                loadObj.hidd();
                if (ref.status == "OK") {
                    var arrayobj = [];
                    var filelist = ref.list;
                    var filelistlen = filelist == null ? 0 : filelist.length;
                    // var startIndex=parseInt(ref.startIndex||1);
                    // var itemsPerPage=parseInt(ref.itemsPerPage||50);
                    var newstartIndex = offsetval + limit;
                    var totalResults = parseInt(ref.totalResults || (newstartIndex + 1));

                    if (filelistlen == 0 || newstartIndex >= totalResults) {
                        itempanel2obj.attr("isloadall", 1);
                    }
                    itempanel2obj.attr("offset", newstartIndex);

                    if (filelistlen > 0) {
                        for (var i = 0; i < filelistlen; i++) {
                            var fileobj = filelist[i];
                            /*
                             * var
                             * itemobj={guid:fileobj.id,source:fileobj.image};
                             */
                            var itemobj = fileobj.msgbody;
                            //替换imgurl地址，原来的cdn不能用了
                            if (itemobj.source) {
                                var tempStr = itemobj.source.substring(7, 11);
                                if (tempStr === "img1") {
                                    itemobj.source = itemobj.source.replace("img1.s3.tvm.cn/s3irs/g2r2/", "ts3.tvm.cn/sn1xso/");
                                } else if (tempStr === "ts3.") {
                                    itemobj.source = itemobj.source.replace("ts3.tvm.cn", "ts3.stcdn.wifiplus.com");
                                }
                            }
                            arrayobj.push(itemobj);
                        }

                        additem2itemscrolldiv(arrayobj, appendval,
                            isfirstload ? 1 : 2);

                    } else {
                        //$("#myConainerDiv").text("无PPT资源");
                    }

                } else {
                    alert(ref.status);
                }
                if (callback != null) {
                    callback();
                }
                itempanel2obj.attr("isloading", 0);

                // packid:packid,
            }, reqparms);
        }

        window.getOnePPTInkStream = function(loadgifpicid, callbackshowimg) {

            $("#itemdesc").remove();
            var loadgifpicidobj = document.getElementById(loadgifpicid);

            function showpptinkstream(filelist) {

                var descItemobj = document.getElementById("desc_" + loadgifpicid);
                if (descItemobj != null) {
                    var descstr = $(descItemobj).text() || "";
                    if (descstr != "") {
                        var contentbodydivobj = $("#contentbodydiv");
                        $("#itemdesc").remove();
                        contentbodydivobj
                            .append('<div style="position:absolute;left:3px;bottom:2px;border:0px solid #595959;width:255px;background-color:white" id="itemdesc" readOnly >'
                                // +'<div
                                // style="padding:3px;color:blue;background-color:#efefef;text-align:left;padding-left:8px;">备注</div>'
                                + '<div style="max-height:150px;overflow-x:hidden;overflow-y:auto;text-align:left;padding:3px;">' + descstr + '</div>' + '</div>');
                    }
                }

                var loadobj = document
                    .getElementById("loadimg_" + loadgifpicid);
                if (loadobj != null) { // 表示用户点了别的图这个图已经没有了不用显示了
                    var filelistlen = filelist == null ? 0 : filelist.length;
                    if (filelistlen > 0 && filelist[0].msgbody.TID == 1) {
                        // var newinkstreamarray=[];
                        for (var ii = 0; ii < filelistlen; ii++) {
                            parseInkStreamMsg(filelist[ii].msgbody);
                        }
                    } else {
                        callbackshowimg();
                    }

                }

            }

            if (loadgifpicidobj != null) {
                var dataCmdfrom = loadgifpicidobj.getAttribute("data-cmdfrom");
                if (dataCmdfrom != "") {
                    loadgifpicidobj.setAttribute("data-cmdfrom", "");
                    callbackshowimg();
                    return;
                }
                var inkstreamobj = document.getElementById("inkstream_" + loadgifpicid);

                if (inkstreamobj == null) {
                    var dataTimestamp = loadgifpicidobj
                        .getAttribute("data-timestamp");
                    if (dataTimestamp != null) {
                        var edataTimestamp = -1;
                        var loadgifpicidobjNextObj = loadgifpicidobj.nextSibling;
                        if (loadgifpicidobjNextObj != null) {
                            edataTimestamp = loadgifpicidobjNextObj
                                .getAttribute("data-timestamp");
                        }
                        var descguid = (loadgifpicidobj
                            .getAttribute("data-guid"));
                        var searchparm = {
                            "descguid": descguid,
                            cmdtype: 2,
                            courseId: activityobj["activityid"],
                            "offset": 1,
                            "limit": 300,
                            "stimestamp": dataTimestamp,
                            "etimestamp": edataTimestamp
                        };
                        getcmd(
                            searchparm,
                            function(ref) {
                                if (ref.status == "OK") {
                                    var filelist = ref.list;
                                    var descstr = ref.desc || "";
                                    var filelistlen = filelist == null ? 0 : filelist.length;
                                    var jqobj1 = $(loadgifpicidobj);
                                    // statusflag :1进行中有直播 2:进行中无直播
                                    // 3:结束有回放视频 4:结束没有回放视频
                                    if ((activityobj["statusflag"] == "3" || activityobj["statusflag"] == "4") || jqobj1.next().length > 0) {
                                        for (var i = 0; i < filelistlen; i++) {
                                            //替换imgurl地址，原来的cdn不能用了
                                            if (filelist[i].msgbody.source) {
                                                var tempStr = filelist[i].msgbody.source.substring(7, 11);
                                                if (tempStr === "img1") {
                                                    filelist[i].msgbody.source = filelist[i].msgbody.source.replace("img1.s3.tvm.cn/s3irs/g2r2/", "ts3.tvm.cn/sn1xso/");
                                                } else if (tempStr === "ts3.") {
                                                    filelist[i].msgbody.cloudImg = filelist[i].msgbody.cloudImg.replace("ts3.tvm.cn", "ts3.stcdn.wifiplus.com");
                                                }
                                            } else if (filelist[i].msgbody.cloudImg) {
                                                var tempStr = filelist[i].msgbody.cloudImg.substring(7, 11);
                                                if (tempStr === "img1") {
                                                    filelist[i].msgbody.cloudImg = filelist[i].msgbody.cloudImg.replace("img1.s3.tvm.cn/s3irs/g2r2/", "ts3.tvm.cn/sn1xso/");
                                                } else if (tempStr === "ts3.") {
                                                    filelist[i].msgbody.cloudImg = filelist[i].msgbody.cloudImg.replace("ts3.tvm.cn", "ts3.stcdn.wifiplus.com");
                                                }
                                            }
                                        }
                                        var jsonstr = '<textarea id="inkstream_' + loadgifpicid + '" style="display:none">' + JSON.stringify(filelist) + '</textarea>' + '<textarea id="desc_' + loadgifpicid + '" style="display:none">' + descstr + '</textarea>';
                                        console.log();
                                        jqobj1.append(jsonstr);

                                    }
                                    showpptinkstream(filelist);
                                }
                            });
                    }
                } else {
                    var filelist = JSON.parse(inkstreamobj.innerText || inkstreamobj.value);
                    showpptinkstream(filelist);
                }
            } else {
                callbackshowimg();
            }

            // 如果打开笔记列表则加载当前ppt的笔记
            gotonote(loadgifpicidobj);

        }

        window.viewpackfiles = function(evtobj, type1) {
                loadObj.show();
                var packjsonobj = JSON.parse($(evtobj).parent()
                    .children("textarea").text());
                invokeMethod(
                    "hdyun.cloudpackfiles",
                    function call1(ref) {
                        loadObj.hidd();
                        if (ref.status == "OK") {
                            var filelist = ref.list;
                            var filelistlen = filelist == null ? 0 : filelist.length;
                            var filehtml = '';

                            var height1val = 0;
                            for (var i = 0; i < filelistlen; i++) {
                                var fileobj = filelist[i];
                                var contenttype = fileobj["contenttype"];
                                if (contenttype == "image") {
                                    var imgurl = fileobj.image;
                                    var coverurl = "";
                                    /*
                                     * var coverurl=null;
                                     * if(imgurl.indexOf(".tvmcloud.")!=-1){
                                     * coverurl=imgurl+"_300_300.jpg"; }else{
                                     * coverurl=imgurl; }
                                     * 
                                     * 
                                     */
                                    filehtml += '<a class="zlfile" data-url="' + imgurl + '" data-load="0">'
                                        // +'<div
                                        // onclick="viewpackonefile(this,1)">'
                                        + '<img src="' + coverurl + '" data-img="1" class="img" onclick="viewpackonefile(this,1)">' + '<div class="title">' + fileobj.title + '</div>'
                                        // +'</div>'
                                        + (zuxiangviewtype == 2 ? '' : '<img  onclick="viewpackonefile(this,2)" src="./images/down.png" class="down">') + '<textarea style="display:none">' + JSON.stringify(fileobj) + '</textarea>' + '</a>';
                                    height1val += 150;
                                } else {
                                    if (type1 == 2) { // 下载文件
                                        var _title = encodeURIComponent(fileobj.title);
                                        //gotolocation(downiframe, fileobj.url + ".download?name=" + (_title));
                                        gotolocation(downiframe, fileobj.url);

                                        break;
                                    }
                                }
                                /*
                                 * contenttype: "image" id:
                                 * "577d97d7-39e1-4238-4051-7a682650fd1c" image:
                                 * "http://media.tvmcloud.com/57/7d/577d97d7-39e1-4238-4051-7a682650fd1c/userimg.jpg"
                                 * published: "20140115 112900" publishedUnix:
                                 * "1389756571" title: "科技改变世界"
                                 * console.log(fileobj);
                                 */

                            }
                            /**\\
                            }else if(type1==1){
                            			loadMediaShow(fileobj.url,contenttype);
                            			break;
                             */
                            if (type1 == 1) { // 下载文件 &&packjsonobj.packmime!="VIDEO"
                                if (filehtml) {
                                    var zlpacklistdivobj = $("#zlpacklistdiv");
                                    var cssstr = height1val < 500 ? 'height:100%;' : '';
                                    zlpacklistdivobj
                                        .append('<div id="packfilessdiv" style="' + cssstr + 'min-height:500px;background-color:#212121;width:300px;position:absolute;top:0px;left:300px">' + filehtml + '</div>');
                                    scrollloadimg(zlpacklistdivobj, $("#packfilessdiv"), 2);
                                    $("#packfilessdiv")
                                        .animate({
                                                left: 0
                                            },
                                            "fast",
                                            function() {
                                                $("#packitemssdiv").hide();
                                                $("#packtitlediv")
                                                    .html(
                                                        '<a href="javascript:cancel2pack()" style="color:white;font-size:12pt;"><img src="./images/back.png" align="center">&nbsp;&nbsp;' + packjsonobj.title + '</a>');
                                            });
                                } else {
                                    if (filelistlen > 0) {
                                        var fileobj = filelist[0];
                                        if (packjsonobj.packmime == "VIDEO") {
                                            loadMediaShow(fileobj.url, contenttype);
                                        } else {
                                            var _title = encodeURIComponent(fileobj.title);
                                            //gotolocation(downiframe, fileobj.url + ".download?name=" + (_title));
                                            gotolocation(downiframe, fileobj.url);
                                        }
                                    }
                                }
                            }
                        } else {
                            alert(ref.status);
                        }
                    }, {
                        packid: packjsonobj.id
                    });
            }
            //视频显示
        function loadMediaShow(url, contenttype) {
            $("#zlmainbgdiv").css("opacity", 1);
            var packfileviewplaneObj = $("#packfileviewplane");
            var html = '<video width="480" controls="controls"> <source src="' + url + '" type="video/mp4"> </video>';
            packfileviewplaneObj.html(html);
            var video = $(packfileviewplaneObj.find("video")[0]);
            video.canplay = function() {
                packfileviewplaneObj.css("height", video.height());
                console.log("can play");
            }
        }

        // downiframe
        window.viewpackonefile = function(evtobj, type1) {
            var filejsonobj = JSON.parse($(evtobj).parent()
                .children("textarea").text());
            if (type1 == 1) {
                var zlmainbgdivobj = $("#zlmainbgdiv");
                var packfileviewplaneobj = $("#packfileviewplane");

                packfileviewplaneobj[0].style.cssText = "height:319px;";
                zlmainbgdivobj.css("opacity", 1);
                loadImageShow(packfileviewplaneobj, filejsonobj.image, -1,
                    zlmainbgdivobj.parent().height());
            } else {
                var _title = encodeURIComponent(filejsonobj.title);
                //gotolocation(downiframe, filejsonobj.image+ ".download?name=" + (_title));
                gotolocation(downiframe, filejsonobj.image);

            }
        }

        window.cancel2pack = function() {
            $("#packitemssdiv").show()
            $("#packfilessdiv").animate({
                left: 300
            }, "fast", function() {
                $(this).remove();
                $("#packtitlediv").html('资料下载');
            });
        }
        window.loadcorepack = function(getpacktype) {
            activityobj["fakeid"] = loginfakeid;
            activityobj["fromsys"] = "eq";
            invokeMethod(
                "hdyun.activepacklist",
                function call1(ref) {
                    var xchdpackid = null;
                    if (ref.status == "OK") {
                        var packlist = ref.packlist;
                        var packlistlen = packlist == null ? 0 : packlist.length;
                        var zlhtml = '';
                        if (packlistlen == 0) {
                            packlist = [{
                                "id": "xchd",
                                "packtype": "weixin",
                                "title": "现场互动",
                                "packmime": "MIX",
                                "img": ""
                            }];
                            packlistlen = packlist == null ? 0 : packlist.length;
                        }
                        for (var i = 0; i < packlistlen; i++) {
                            var packobj = packlist[i];
                            var packid = packobj.id;
                            var packimg = packobj.img;
                            var packtype = packobj.packtype;
                            var packtitle = packobj.title;
                            var packmime = packobj.packmime;
                            var iconurl = ''
                            var downhtmlbut = 1;
                            if (packmime === "PPT") {
                                iconurl = './images/ppt.png';
                            } else if (packmime === "PDF") {
                                iconurl = './images/pdf.png';
                            } else if (packmime === "WORD") {
                                iconurl = './images/word.png';
                            } else if (packmime === "EXCEL") {
                                iconurl = './images/ex.png';
                            } else if (packmime === "VIDEO") {
                                iconurl = './images/mp4.png';
                            } else {
                                iconurl = './images/pack.png'
                                downhtmlbut = 0;
                            }

                            if (zuxiangviewtype == 2) {
                                downhtmlbut = 0; // ipad上不出现下载
                            }

                            if (packtype == "weixin" && packtitle == "现场互动") {
                                if (getpacktype == 1) {
                                    xchdpackid = packid;
                                    break;
                                }
                            } else if (getpacktype == 2) {
                                zlhtml += '<a class="zlpackitem" href="javascript:void(0)" title="' + packtitle + '"><div style="margin:6px 0px 6px 12px;cursor:pointer">' + '<div onclick="viewpackfiles(this,1)">' + '<img style="color:white;float:left" src="' + iconurl + '">' + '<div style="word-wrap:break-word;word-break:break-all;color:white;float:left;margin-left:10px;line-height:40px;height:40px;width:140px;overflow:hidden">' + packtitle + '</div>' + '</div>'
                                    // +'<button class="imgbut2"
                                    // style="float:left">下载</button>'
                                    + (downhtmlbut == 0 ? '' : '<img onclick="viewpackfiles(this,2)" src="./images/down2.png" style="float:left;margin-top:5px">') + '<div style="clear:both;height:0px;"></div>' + '<textarea style="display:none">' + JSON.stringify(packobj) + '</textarea>' + '</div></a>';

                            }

                            /*
                             * id: "9fd057e0-2cb2-26e7-661d-304daf5ef606"
                             * img:
                             * "http://media.tvmcloud.com/9f/d0/9fd057e0-2cb2-26e7-661d-304daf5ef606/t.jpg"
                             * packtype: "weixin" title: "现场互动"
                             */
                        }

                        var zlpacklistdivobj = $("#zlpacklistdiv");
                        var ua = navigator.userAgent.toLowerCase();
                        if (!ua.match(/webkit/i)) { // ie
                            zlpacklistdivobj.css("height", zlpacklistdivobj
                                .parent().height());
                        }

                        if (getpacktype == 2) {
                            zlpacklistdivobj
                                .html('<div id="packitemssdiv">' + zlhtml + '</div>');
                        }

                    } else {
                        alert(ref.status);
                    }

                    function startflowwebsocket() {
                        // statusflag :1进行中有直播 2:进行中无直播 3:结束有回放视频 4:结束没有回放视频
                        if (activityobj["statusflag"] == "1" || activityobj["statusflag"] == "2") {
                            beginflowwebsocket(); // 开始监听指令
                        }
                    }

                    if (false && xchdpackid == null) {
                        loadObj.hidd();
                        startflowwebsocket();
                    } else if (getpacktype == 1) {
                        XianChangHuDongFiles(true, xchdpackid,
                            startflowwebsocket);
                    } else {
                        loadObj.hidd();
                    }

                }, activityobj);
        }

        window.setCourseStatus = function(statusflag) {
            // statusflag :1进行中有直播 2:进行中无直播 3:结束有回放视频 4:结束没有回放视频
            var coursetitledivobj = $("#coursetitlediv");
            if (coursetitledivobj.attr("statusflag") != "") {
                return;
            }
            activityobj["statusflag"] = "" + statusflag;
            coursetitledivobj.attr("statusflag", statusflag);
            // console.log("setCourseStatus",activityobj)
            loadcorepack(1);
            var previewdivobj = document.getElementById("previewdiv");
            if (mainnew) {
                $("#showvideoimgbut").parent().parent().hide();
                $("#showvideoimgbut").parent().hide();
            } else {
                $("#showvideoimgbut").hide();
            }
            if (statusflag == "2" || statusflag == "4") {
                if (mainnew) {
                    $("#playpptimgbut").parent().attr("colspan", 2);
                    $("#playpptimgbut").parent().show();
                    $("#playpptimgbut").parent().parent().show();
                    previewdivobj.style.display = "";
                } else {
                    $("#playpptimgbut").show();
                    $("#checkmuteimgbut").show();
                    previewdivobj.style.display = "none";
                }
            } else {
                if (mainnew) {
                    $("#playpptimgbut").parent().hide();
                } else {
                    $("#playpptimgbut").hide();
                    $("#checkmuteimgbut").hide();
                }
                previewdivobj.style.display = "";
            }
            if (statusflag == "1") {
                if (mainnew) {
                    $("#showvideoimgbut").parent().attr("colspan", 2);
                    $("#showvideoimgbut").parent().show();
                    $("#showvideoimgbut").parent().parent().show();
                } else {
                    $("#showvideoimgbut").show();
                }
            }
        }
        onbodyscroll();
        playvideo();

        window.showHidd_m3u8 = function() {
            var currstatusflag = activityobj["statusflag"];
            // console.log("showHidd_m3u8",activityobj)
            if (currstatusflag == "1" || currstatusflag == "2") {
                var coursetitledivobj = $("#coursetitlediv");
                coursetitledivobj.attr("statusflag", "");
                gotolocation(socketiframe, "about:blank");
                clscoursehtml();
                if (currstatusflag == "1") { // 不要直播视频
                    $("#switchtext").attr("data-type", "0"); //ppt显示在大窗口
                    setCourseStatus(2);
                } else {
                    $("#switchtext").attr("data-type", "0"); //ppt显示在大窗口
                    playvideo();
                    // setCourseStatus(1);
                }
                if (mainnew) {
                    $("#playpptimgbut").parent().attr("colspan", 1);
                    $("#showvideoimgbut").parent().attr("colspan", 1);
                    $("#showvideoimgbut").parent().show();
                    $("#showvideoimgbut").parent().parent().show();
                } else {
                    $("#showvideoimgbut").show();
                }
            }
        }

    }
    window.XianChangHuDongFiles = function(isfirstload, packid, callback) { // 现场互动图片
        var itempanel2obj = $("#itempanel2");

        var offsetval = 1;
        if (!isfirstload) {
            if (itempanel2obj.attr("isloading") == "1") {
                // console.log("正在加载数据，防止重复提交！");
                return;
            }
            if (itempanel2obj.attr("isloadall") == "1") {
                if (callback != null) {
                    callback();
                }
                return;
            }
            offsetval = parseInt(itempanel2obj.attr("offset")) || 1;
        } else {
            offsetval = 1;
            itempanel2obj.removeAttr("packid");
            itempanel2obj.removeAttr("offset");
            itempanel2obj.removeAttr("isloading");
            itempanel2obj.removeAttr("isloadall");
        }
        itempanel2obj.attr("packid", packid);
        itempanel2obj.attr("isloading", 1)
        var limit = 50;
        // "hdyun.cloudpackfiles"

        var reqparms = {
            courseId: activityobj["activityid"],
            "offset": offsetval,
            "limit": limit
        };

        // statusflag :1进行中有直播 2:进行中无直播 3:结束有回放视频 4:结束没有回放视频
        var appendval = false;
        if (activityobj["statusflag"] == "1" || activityobj["statusflag"] == "2") { //
            reqparms["sort"] = "DESC";
            itempanel2obj.attr("reftype", "refwithtop"); // 到顶部加载
            appendval = false;
        } else if (activityobj["statusflag"] == "3" || activityobj["statusflag"] == "4") { //
            reqparms["sort"] = "ASC";
            itempanel2obj.attr("reftype", "refwithbottom"); // 到底部加载
            appendval = true;
        } else {
            alert('activityobj["statusflag"]=' + activityobj["statusflag"]);
        }
        invokeMethod("eq.coursePPT", function call1(ref) {
            loadObj.hidd();
            if (ref.status == "OK") {
                var arrayobj = [];
                var filelist = ref.list;
                var filelistlen = filelist == null ? 0 : filelist.length;
                // var startIndex=parseInt(ref.startIndex||1);
                // var itemsPerPage=parseInt(ref.itemsPerPage||50);
                var newstartIndex = offsetval + limit;
                var totalResults = parseInt(ref.totalResults || (newstartIndex + 1));

                if (filelistlen == 0 || newstartIndex >= totalResults) {
                    itempanel2obj.attr("isloadall", 1);
                }
                itempanel2obj.attr("offset", newstartIndex);

                if (filelistlen > 0) {
                    for (var i = 0; i < filelistlen; i++) {
                        var fileobj = filelist[i];
                        /*
                         * var
                         * itemobj={guid:fileobj.id,source:fileobj.image};
                         */
                        var itemobj = fileobj.msgbody;
                        //替换imgurl地址，原来的cdn不能用了
                        if (itemobj.source) {
                            var tempStr = itemobj.source.substring(7, 11);
                            if (tempStr === "img1") {
                                itemobj.source = itemobj.source.replace("img1.s3.tvm.cn/s3irs/g2r2/", "ts3.tvm.cn/sn1xso/");
                            } else if (tempStr === "ts3.") {
                                itemobj.source = itemobj.source.replace("ts3.tvm.cn", "ts3.stcdn.wifiplus.com");
                            }
                        }
                        arrayobj.push(itemobj);
                    }

                    additem2itemscrolldiv(arrayobj, appendval,
                        isfirstload ? 1 : 2);

                } else {
                    //$("#myConainerDiv").text("无PPT资源");
                }

            } else {
                alert(ref.status);
            }
            if (callback != null) {
                callback();
            }
            itempanel2obj.attr("isloading", 0);

            // packid:packid,
        }, reqparms);
    }
    		window.loadcorepack = function(getpacktype) {
			activityobj["fakeid"] = loginfakeid;
			activityobj["fromsys"] = "eq";
			invokeMethod(
					"hdyun.activepacklist",
					function call1(ref) {
						var xchdpackid = null;
						if (ref.status == "OK") {
							var packlist = ref.packlist;
							var packlistlen = packlist == null ? 0
									: packlist.length;
							var zlhtml = '';
							if (packlistlen == 0) {
								packlist = [ {
									"id" : "xchd",
									"packtype" : "weixin",
									"title" : "现场互动",
									"packmime" : "MIX",
									"img" : ""
								} ];
								packlistlen = packlist == null ? 0
										: packlist.length;
							}
							for ( var i = 0; i < packlistlen; i++) {
								var packobj = packlist[i];
								var packid = packobj.id;
								var packimg = packobj.img;
								var packtype = packobj.packtype;
								var packtitle = packobj.title;
								var packmime = packobj.packmime;
								var iconurl = ''
								var downhtmlbut = 1;
								if (packmime === "PPT") {
									iconurl = './images/ppt.png';
								} else if (packmime === "PDF") {
									iconurl = './images/pdf.png';
								} else if (packmime === "WORD") {
									iconurl = './images/word.png';
								} else if (packmime === "EXCEL") {
									iconurl = './images/ex.png';
								} else if(packmime === "VIDEO"){
									iconurl = './images/mp4.png';
								}else{
									iconurl = './images/pack.png'
									downhtmlbut = 0;
								}

								if (zuxiangviewtype == 2) {
									downhtmlbut = 0;// ipad上不出现下载
								}

								if (packtype == "weixin" && packtitle == "现场互动") {
									if (getpacktype == 1) {
										xchdpackid = packid;
										break;
									}
								} else if (getpacktype == 2) {
									zlhtml += '<a class="zlpackitem" href="javascript:void(0)" title="'
											+ packtitle
											+ '"><div style="margin:6px 0px 6px 12px;cursor:pointer">'
											+ '<div onclick="viewpackfiles(this,1)">'
											+ '<img style="color:white;float:left" src="'
											+ iconurl
											+ '">'
											+ '<div style="word-wrap:break-word;word-break:break-all;color:white;float:left;margin-left:10px;line-height:40px;height:40px;width:140px;overflow:hidden">'
											+ packtitle
											+ '</div>'
											+ '</div>'
											// +'<button class="imgbut2"
											// style="float:left">下载</button>'
											+ (downhtmlbut == 0 ? ''
													: '<img onclick="viewpackfiles(this,2)" src="./images/down2.png" style="float:left;margin-top:5px">')
											+ '<div style="clear:both;height:0px;"></div>'
											+ '<textarea style="display:none">'
											+ JSON.stringify(packobj)
											+ '</textarea>' + '</div></a>';

								}

								/*
								 * id: "9fd057e0-2cb2-26e7-661d-304daf5ef606"
								 * img:
								 * "http://media.tvmcloud.com/9f/d0/9fd057e0-2cb2-26e7-661d-304daf5ef606/t.jpg"
								 * packtype: "weixin" title: "现场互动"
								 */
							}

							var zlpacklistdivobj = $("#zlpacklistdiv");
							var ua = navigator.userAgent.toLowerCase();
							if (!ua.match(/webkit/i)) { // ie
								zlpacklistdivobj.css("height", zlpacklistdivobj
										.parent().height());
							}

							if (getpacktype == 2) {
								zlpacklistdivobj
										.html('<div id="packitemssdiv">'
												+ zlhtml + '</div>');
							}

						} else {
							alert(ref.status);
						}

						function startflowwebsocket() {
							// statusflag :1进行中有直播 2:进行中无直播 3:结束有回放视频 4:结束没有回放视频
							if (activityobj["statusflag"] == "1"
									|| activityobj["statusflag"] == "2") {
								beginflowwebsocket();// 开始监听指令
							}
						}

						if (false && xchdpackid == null) {
							loadObj.hidd();
							startflowwebsocket();
						} else if (getpacktype == 1){
							XianChangHuDongFiles(true, xchdpackid,
									startflowwebsocket);
						}else{
							loadObj.hidd();
						}

					}, activityobj);
		}
}
// init2()end



function checkitemscrollarrow() {
    var divwidth = itemscrolldivobj.width();

    if (divwidth > winwidth) {
        var itempanelobj = $("#itempanel2");
        var scrollleft = itempanelobj.scrollLeft();
        if (scrollleft > 0) {
            $("#leftarrow1").show();
        } else {
            $("#leftarrow1").hide();
        }
        // console.log((scrollleft+divwidth)+">="+itempanelobj.width())
        if (scrollleft + itempanelobj.width() >= divwidth) {
            $("#rightarrow1").hide();
        } else {
            $("#rightarrow1").show();
        }
    }
    var itemsourceonobj = itemscrolldivobj.children(".itemsourceon");
    if (itemsourceonobj.prev().length > 0) {
        $("#leftarrow2").show();
    } else {
        $("#leftarrow2").hide();
    }

    if (itemsourceonobj.next().length > 0) {
        $("#rightarrow2").show();
    } else {
        $("#rightarrow2").hide();
    }

    if (zuxiangviewtype == 1) { // 主线在顶部
        scrollloadimg($("#itempanel2"), itemscrolldivobj, 1);
    } else if (zuxiangviewtype == 2) { // 主线在右

        scrollloadimg($("#itempanel2"), itemscrolldivobj, 2);
    }

}
/**
 * 显示或隐藏‘点击，回看更多’按钮
 * @param v boolean
 */
function goMainBtnShow(v) {
    if (v) {
        bindMove(true); //开启按钮随鼠标移动功能
        $(".setBtnwrap").show();
    } else {
        bindMove(false);
        $(".setBtnwrap").hide();
    }
}

function gotolocation(iframeobj, url) {
    if (iframeobj.location) {
        iframeobj.location.replace(url);
    } else {
        iframeobj.contentWindow.location.replace(url);
    }
}



function goindex() {
    goMainBtnShow && goMainBtnShow(false);
    /*
     * if(true){ window.location.replace("main.htm"); return; }
     */
    try {
        gotolocation(socketiframe, "about:blank");
    } catch (e) {

    }
    // clscoursehtml();

    var searchactivitynameobj = $("#searchactivityname");
    var join2core = searchactivitynameobj.attr("join2core");
    searchactivitynameobj.attr("join2core", "0");

    var maindivobj = $("#maindiv");
    var coursedivobj = $("#coursediv");
    maindivobj.show();
    coursedivobj.hide();
    if ("1" == join2core) {
        loadObj.show();
        getActivityList();
    }
}
