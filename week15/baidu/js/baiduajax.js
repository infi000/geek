var Atext1;
var jsontext1;
var Atext2;
var jsontext2;
var Atext3;
var jsontext3;


function newsinfo() {
    Atext1 = $.ajax({
        type: "get",
        url:  "http://115.159.150.183:3900/1",
        dataType: "json",
        success: function() {
            jsontext1 = JSON.parse(Atext1.responseText);
            for (var i = 0; i < jsontext1.length; i++) {
                $(".news-main-title").eq(i).html(jsontext1[i].newstitle);
                $(".news-time").eq(i).html(jsontext1[i].addtime);
                $(".news-from").eq(i).html(jsontext1[i].newsfrom);
                $(".news-img").eq(i).attr("src", jsontext1[i].newsimg);
            }

        }
    });
}
function newsinfo2() {
    Atext2 = $.ajax({
        type: "get",
        url:  "http://115.159.150.183:3900/2",
        dataType: "json",
        success: function() {
            jsontext2 = JSON.parse(Atext2.responseText);
            for (var i = 0; i < jsontext2.length; i++) {
                $(".news-main-title2").eq(i).html(jsontext2[i].newstitle);
                $(".news-time2").eq(i).html(jsontext2[i].addtime);
                $(".news-img2").eq(i).attr("src", jsontext2[i].newsimg);
            }

        }
    });
}
function newsinfo3() {
    Atext3 = $.ajax({
        type: "get",
        url:  "http://115.159.150.183:3900/3",
        dataType: "json",
        success: function() {
            jsontext3 = JSON.parse(Atext3.responseText);
            for (var i = 0; i < jsontext3.length; i++) {
                $(".news-title3").eq(i).html(jsontext3[i].newstitle);
                $(".news-time3").eq(i).html(jsontext3[i].addtime);
                $(".news-content3").eq(i).html(jsontext3[i].newscontent);
            }

        }
    });
}
newsinfo();
newsinfo2();
newsinfo3();
// var newstitle1 = jsontext.result[0].newstitle;
