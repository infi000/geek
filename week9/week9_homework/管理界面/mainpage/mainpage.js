    // ++++++++++++++++++++++++切换页面+++++++++++++++++++++++++
    var tuijian = $(".tuijian");
    var baijia = $(".baijia");
    var bendi = $(".bendi");
    var tuijianclick = $("#tuijian");
    var baijiaclick = $("#baijia");
    var bendiclick = $("#bendi");
    tuijianclick.click(
        function() {
            tuijianclick.css({
                "background": "#7ECE94",
            });
            bendiclick.css({
                "background": "#F5F5F5",
            });
            baijiaclick.css({
                "background": "#F5F5F5",
            });
            bendi.css({
                "display": "none"
            });
            baijia.css({
                "display": "none"
            });
            tuijian.fadeIn("fast");
        })
    baijiaclick.click(
        function() {
            baijiaclick.css({
                "background": "#7ECE94"
            });
            tuijianclick.css({
                "background": "#F5F5F5"
            });
            bendiclick.css({
                "background": "#F5F5F5"
            });
            bendi.css({
                "display": "none"
            });
            tuijian.css({
                "display": "none"
            });
            tuijian.slideUp("fast");
            bendi.slideUp("fast");
            baijia.fadeIn("fast");
        })
    bendiclick.click(
            function() {
                bendiclick.css({
                    "background": "#7ECE94"
                });
                tuijianclick.css({
                    "background": "#F5F5F5"
                });
                baijiaclick.css({
                    "background": "#F5F5F5"
                });
                tuijian.css({
                    "display": "none"
                });
                baijia.css({
                    "display": "none"
                });
                baijia.slideUp("fast");
                tuijian.slideUp("fast");
                bendi.fadeIn("fast");
            })
        //++++++++++++++++++++++ 获取后端信息 ++++++++++++++
    var Atext1;
    var jsontext1;
    var Atext2;
    var jsontext2;
    var Atext3;
    var jsontext3;
    var from1 = $(".from1");
    var from2 = $(".from2");
    var from3 = $(".from3");

    function newsinfo() {
        Atext1 = $.ajax({
            type: "GET",
            url: "http://49.5.2.109:3900/1",
            dataType: "json",
            success: function() {
                jsontext1 = JSON.parse(Atext1.responseText);
                for (var i = 0; i < jsontext1.length; i++) {
                    var inputtitle = jsontext1[i].newstitle;
                    var inputimg = jsontext1[i].newsimg;
                    var inputfrom = jsontext1[i].newsfrom;
                    var inputtime = jsontext1[i].addtime;
                    var inputid = jsontext1[i].newsid;
                    var tr = $("<tr>");
                    var form = $("<form>").attr({
                        "method": "post",
                        "target": "hideIframe"
                    }).addClass("nform nform1");
                    var li = $("<li>").addClass("del-li1");
                    li.appendTo(from1);
                    form.appendTo(li);
                    // 动态添加表格
                    $("<input>").attr({
                        value: i,
                        type: "text",
                        name: inputid
                    }).addClass("nid nid1").appendTo(form);

                    $("<input>").attr({
                        value: inputtitle,
                        type: "textarea",
                        name: "newstitle"
                    }).addClass("ntitle ntitle1").appendTo(form);
                    $("<input>").attr({
                        value: inputimg,
                        type: "textarea",
                        name: "newsimg"
                    }).addClass("nimg nimg1").appendTo(form);
                    $("<input>").attr({
                        value: inputfrom,
                        type: "text",
                        name: "newsfrom"
                    }).addClass("nfrom nfrom1").appendTo(form);
                    $("<input>").attr({
                        value: inputtime,
                        type: "datetime",
                        name: "addtime"
                    }).addClass("ntime ntime1").appendTo(form);
                    $("<input>").attr({
                        value: "修改",
                        type: "submit"
                    }).addClass("nbtn nbtn1").appendTo(form);

                };
            }

        });
    }

    function newsinfo2() {
        Atext2 = $.ajax({
            type: "GET",
            // contentType : 'application/json',
            url: "http://49.5.2.109:3900/2",
            dataType: "json",
            success: function() {
                jsontext2 = JSON.parse(Atext2.responseText);
                for (var i = 0; i < jsontext2.length; i++) {
                    var inputtitle = jsontext2[i].newstitle;
                    var inputimg = jsontext2[i].newsimg;
                    var inputfrom = jsontext2[i].newsfrom;
                    var inputtime = jsontext2[i].addtime;
                    var inputid = jsontext2[i].newsid;
                    var form = $("<form>").attr({
                        "method": "post",
                        "target": "hideIframe"
                    }).addClass("nform nform2");
                    var li = $("<li>").addClass("del-li2");
                    li.appendTo(from2);
                    form.appendTo(li);
                    $("<input>").attr({
                        value: i,
                        type: "text",
                        name: inputid
                    }).addClass("nid nid2").appendTo(form);
                    $("<input>").attr({
                        value: inputtitle,
                        type: "text",
                        name: "newstitle"
                    }).addClass("ntitle ntitle2").appendTo(form);
                    $("<input>").attr({
                        value: inputimg,
                        type: "text",
                        name: "newsimg"
                    }).addClass("nimg nimg2").appendTo(form);
                    $("<input>").attr({
                        value: inputtime,
                        type: "datetime",
                        name: "addtime"
                    }).addClass("ntime ntime2").appendTo(form);
                    $("<input>").attr({
                        value: "修改",
                        type: "submit"
                    }).addClass("nbtn nbtn2").appendTo(form);

                };
            }

        });
    }

    function newsinfo3() {
        Atext3 = $.ajax({
            type: "GET",
            url: "http://49.5.2.109:3900/3",
            dataType: "json",
            success: function() {
                jsontext3 = JSON.parse(Atext3.responseText);
                for (var i = 0; i < jsontext3.length; i++) {
                    var inputtitle = jsontext3[i].newstitle;
                    var inputimg = jsontext3[i].newsimg;
                    var inputcontent = jsontext3[i].newscontent;
                    var inputtime = jsontext3[i].addtime;
                    var inputid = jsontext3[i].newsid;
                    var form = $("<form>").attr({
                        "method": "post",
                        "target": "hideIframe"
                    }).addClass("nform nform3");
                    var li = $("<li>").addClass("del-li3");
                    li.appendTo(from3);
                    form.appendTo(li);
                    $("<input>").attr({
                        value: i,
                        type: "text",
                        name: inputid
                    }).addClass("nid nid3").appendTo(form);
                    $("<input>").attr({
                        value: inputtitle,
                        type: "text",
                        name: "newstitle"
                    }).addClass("ntitle ntitle3").appendTo(form);
                    $("<input>").attr({
                        value: inputcontent,
                        type: "text",
                        name: "newscontent"
                    }).addClass("ncontent ncontent3").appendTo(form);
                    $("<input>").attr({
                        value: inputtime,
                        type: "datetime",
                        name: "addtime"
                    }).addClass("ntime ntime3").appendTo(form);
                    $("<input>").attr({
                        value: "修改",
                        type: "submit"
                    }).addClass("nbtn nbtn3").appendTo(form);


                    // 
                };
            }

        });
    }
    newsinfo();
    newsinfo2();
    newsinfo3();

    // ++++++++++++++++++=上传表格信息+++++++++++++++==
    var title;
    var img;
    var content;
    var time;
    var newsfrom;
    var ul;
    var id;
    $(".addtag1").click(function() {
        title = $(".tag1-newstitle").val();
        img = $(".tag1-newsimg").val();
        newsfrom = $(".tag1-newsfrom").val();
        time = $(".tag1-addtime").val();
        ul = 1 + "/" + title + "/" + img + "/" + newsfrom + "/" + "/" + time;
        console.log(ul);
        $(".tag1-post").attr("action", 'http://49.5.2.109:3900/0//' + ul)
        console.log($(".tag1-post").attr("action"))
    });

    $(".addtag2").click(function() {
        title = $(".tag2-newstitle").val();
        img = $(".tag2-newsimg").val();
        time = $(".tag2-addtime").val();
        ul = 2 + "/" + title + "/" + img + "/" + "/" + "/" + time;
        console.log(ul);
        $(".tag2-post").attr("action", 'http://49.5.2.109:3900/0//' + ul)
        console.log($(".tag2-post").attr("action"))
    });
    // ('/:open/:id/:tag/:title/:img/:from/:content/:time', respond);
    $(".addtag3").click(function() {
        title = $(".tag3-newstitle").val();
        content = $(".tag3-newscontent").val();
        time = $(".tag3-addtime").val();
        ul = 3 + "/" + title + "/" + img + "/" + "/" + content + "/" + time;
        console.log(ul);
        $(".tag3-post").attr("action", 'http://49.5.2.109:3900/0//' + ul)
        console.log($(".tag3-post").attr("action"))
    });

    // 修改表格——————————————————————————————————————————————-
    // server.post('/:open/:id/:tag/:title/:img/:from/:content/:time', respond);
    // $(".nbtn1").eq(0).click(function() {
    //     title = $(".ntitle").eq(0).val();
    //     img = $(".tag1-newsimg").eq(0).val();
    //     newsfrom = $(".tag1-newsfrom").eq(0).val();
    //     time = $(".tag1-addtime").eq(0).val();
    //     ul = 1 + "/" + title + "/" + img + "/" + newsfrom + "/" + "/" + time;
    //     $("form").eq(0).attr("action", 'http://49.5.2.109:3900/0//' + ul)
    //     console.log($("form").eq(0).attr("action"))
    //     console.log(ul);
    // })

    function del(i) {
        $(".nbtn1").eq(i).click(function() {
            id = $(".nid1").eq(i).attr("name");
            title = $(".ntitle1").eq(i).val();
            img = $(".nimg1").eq(i).val();
            newsfrom = $(".nfrom1").eq(i).val();
            time = $(".ntime1").eq(i).val();
            ul = "/" + id + "/" + 1 + "/" + title + "/" + img + "/" + newsfrom + "/" + "/" + time;
            $("form").eq(i).attr("action", 'http://49.5.2.109:3900/1' + ul)
            console.log($("form").eq(i).attr("action"))
            console.log(ul);
        })
    }
    for (var i = 0; i < $(".btn1").length; i++) {
        del(i)
    };
