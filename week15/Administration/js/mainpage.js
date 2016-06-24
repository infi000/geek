//+++++++++++++++++++++时间+++++++++++++++++++++

function getNewDate() {
    var d = new Date();
    var month = function(){var x=d.getMonth() + 1;
        if(x<10){
            x="0"+x
        }
        return x;
    }
    return d.getFullYear() + "-" + month() + "-" + d.getDate();

}


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

// ++++++++++++++++++=上传表格信息+++++++++++++++==
// 服务端路由格式POST：(/:open/:data) ,,data格式[tag,title,from,img,content,time]


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
     img=encodeURIComponent(img)
    newsfrom = $(".tag1-newsfrom").val();
    time = getNewDate();
    ul = (1 + ",:," + "" + ",:," + title + ",:," + newsfrom + ",:," + img + ",:," + "" + ",:," + time);
    $.ajax({
        url: "http://104.194.79.133:3900/0/" + ul,
        type: "post",
        success: function() {
            alert("上传文件成功！");
            location.reload()
        }
    })
    console.log(ul);
});

$(".addtag2").click(function() {
    title = $(".tag2-newstitle").val();
    img = $(".tag2-newsimg").val();
        img=encodeURIComponent(img);
    time = getNewDate();
    ul = (2 + ",:," + "" + ",:," + title + ",:," + "" + ",:," + img + ",:," + "" + ",:," + time);
    $.ajax({
        url: "http://104.194.79.133:3900/0/" + ul,
        type: "post",
        success: function() {
            alert("上传文件成功！");
            location.reload()
        }
    })
    console.log(ul);
});
// ('/:open/:id/:tag/:title/:img/:from/:content/:time', respond);
$(".addtag3").click(function() {
    title = $(".tag3-newstitle").val();
    content = $(".tag3-newscontent").val();
    time = getNewDate();
    ul = (3 + ",:," + "" + ",:," + title + ",:," + "" + ",:," + "" + ",:," + content + ",:," + time);
    $.ajax({
        url: "http://104.194.79.133:3900/0/" + ul,
        type: "post",
        success: function() {
            alert("上传文件成功！");
            location.reload()
        }
    })
    console.log(ul);
});

// 修改表格——————————————————————————————————————————————-
// server.post('/:open/:id/:tag/:title/:img/:from/:content/:time', respond);

//+++++++++++++++++++++++++++修改表格+++++++++++++++++++++++++++++++++++


function changeNews1() {
    $(".nbtn1").click(function() {
        id = $(this).closest('.modal-content').find('.tag-newsid').html();
        title = $(this).closest('.modal-content').find('.tag-newstitle').val();
        img =$(this).closest('.modal-content').find('.tag-newsimg').val();
        img=encodeURIComponent(img)
        newsfrom = $(this).closest('.modal-content').find('.tag-newsfrom').val();
        time = getNewDate();
        ul = (1 + ",:," + id + ",:," + title + ",:," + newsfrom + ",:," + img + ",:," + "" + ",:," + time);
        $.ajax({
            url: "http://104.194.79.133:3900/1/" + ul,
            type: "post",
            success: function() {
                alert("上传文件成功！");
                location.reload()
            }
        })
        console.log(ul);

    });
}




function changeNews2() {
    $(".nbtn2").click(function() {
        id = $(this).closest('.modal-content').find('.tag-newsid').html();
        title = $(this).closest('.modal-content').find('.tag-newstitle').val();
        img = $(this).closest('.modal-content').find('.tag-newsimg').val();
         img=encodeURIComponent(img)
        time = getNewDate();
        ul = (2 + ",:," + id + ",:," + title + ",:," + "" + ",:," + img + ",:," + "" + ",:," + time);
        $.ajax({
            url: "http://104.194.79.133:3900/1/" + ul,
            type: "post",
            success: function() {
                alert("上传文件成功！");
                location.reload()
            }
        })
        console.log(ul);

    });
}

function changeNews3() {
    $(".nbtn3").click(function() {
        id = $(this).closest('.modal-content').find('.tag-newsid').html();
        title = $(this).closest('.modal-content').find('.tag-newstitle').val();
        content = $(this).closest('.modal-content').find('.tag-newscontent').val();
        time = getNewDate();
        ul = (3 + ",:," + id + ",:," + title + ",:," + "" + ",:," + img + ",:," + content + ",:," + time);
        $.ajax({
            url: "http://104.194.79.133:3900/1/" + ul,
            type: "post",
            success: function() {
                alert("上传文件成功！");
                location.reload()
            }
        })
        console.log(ul);

    });
}

function change(){
    changeNews3();
    changeNews2();
    changeNews1();
}
// // 延时加载
setTimeout("change()",500);









// function change1(i) {
//     $(".nbtn1").eq(i).click(function() {
//         id = $(".nid1").eq(i).attr("name");
//         title = $(".ntitle1").eq(i).val();
//         img = $(".nimg1").eq(i).val();
//         newsfrom = $(".nfrom1").eq(i).val();
//         time = getNewDate();
//         ul = (1 + ",:," + id + ",:," + title + ",:," + newsfrom + ",:," + img + ",:," + "" + ",:," + time);
//         $.ajax({
//             url: "http://104.194.79.133:3900/1/" + ul,
//             type: "post",
//             success: function() {
//                 alert("上传文件成功！");
//                 location.reload()
//             }
//         })
//         console.log(ul);
//     });
// }

// function change2(i) {
//     $(".nbtn2").eq(i).click(function() {
//         id = $(".nid2").eq(i).attr("name");
//         title = $(".ntitle2").eq(i).val();
//         img = $(".nimg2").eq(i).val();
//         time = getNewDate();
//         ul = (2 + ",:," + id + ",:," + title + ",:," + "" + ",:," + img + ",:," + "" + ",:," + time);
//         $.ajax({
//             url: "http://104.194.79.133:3900/1/" + ul,
//             type: "post",
//             success: function() {
//                 alert("上传文件成功！");
//                 location.reload()
//             }
//         })
//         console.log(ul);
//     });
// }

// function change3(i) {
//     $(".nbtn3").eq(i).click(function() {
//         id = $(".nid3").eq(i).attr("name");
//         title = $(".ntitle3").eq(i).val();
//         content = $(".ncontent3").eq(i).val();
//         time = getNewDate();
//         ul = (3 + ",:," + id + ",:," + title + ",:," + "" + ",:," + img + ",:," + content + ",:," + time);
//         $.ajax({
//             url: "http://104.194.79.133:3900/1/" + ul,
//             type: "post",
//             success: function() {
//                 alert("上传文件成功！");
//                 location.reload()
//             }
//         })
//         console.log(ul);
//     });
// }



// function change() {
//     for (var x = 0; x < $(".nbtn1").length; x++) {
//         change1(x)
//     };
//     for (var y = 0; y < $(".nbtn2").length; y++) {
//         change2(y)
//     };

//     for (var z = 0; z < $(".nbtn3").length; z++) {
//         change3(z)
//     };
//     console.log('change')
// }

// function newsinfo() {
//     newsinfo1();
//     newsinfo2();
//     newsinfo3();
//     console.log('newsinfo')
// };


// (function() {
//     newsinfo();
//     setTimeout('change()', 200);
// })()
