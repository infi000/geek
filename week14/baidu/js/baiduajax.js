var Atext1;
var jsontext1;
var Atext2;
var jsontext2;
var Atext3;
var jsontext3;


function newsinfo() {
    Atext1 = $.ajax({
        type: "post",
        url: "../mysql/get.php",
        dataType: "json",
        success: function() {
            jsontext1 = JSON.parse(Atext1.responseText);
            for (var i = 0; i < jsontext1.result.length; i++) {
                $(".news-main-title").eq(i).html(jsontext1.result[i].newstitle);
                $(".news-time").eq(i).html(jsontext1.result[i].addtime);
                $(".news-from").eq(i).html(jsontext1.result[i].newsfrom);
                $(".news-img").eq(i).attr("src", jsontext1.result[i].newsimg);
            }

        }
    });
}
function newsinfo2() {
    Atext2 = $.ajax({
        type: "post",
        url: "../mysql/get2.php",
        dataType: "json",
        success: function() {
            jsontext2 = JSON.parse(Atext2.responseText);
            for (var i = 0; i < jsontext2.result.length; i++) {
                $(".news-main-title2").eq(i).html(jsontext2.result[i].newstitle);
                $(".news-time2").eq(i).html(jsontext2.result[i].addtime);
                $(".news-img2").eq(i).attr("src", jsontext2.result[i].newsimg);
            }

        }
    });
}
function newsinfo3() {
    Atext3 = $.ajax({
        type: "post",
        url: "../mysql/get3.php",
        dataType: "json",
        success: function() {
            jsontext3 = JSON.parse(Atext3.responseText);
            for (var i = 0; i < jsontext3.result.length; i++) {
                $(".news-title3").eq(i).html(jsontext3.result[i].newstitle);
                $(".news-time3").eq(i).html(jsontext3.result[i].addtime);
                $(".news-content3").eq(i).html(jsontext3.result[i].newscontent);
            }

        }
    });
}
newsinfo();
newsinfo2();
newsinfo3();
// var newstitle1 = jsontext.result[0].newstitle;
