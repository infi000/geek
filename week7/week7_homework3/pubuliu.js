$(document).ready(function() {
    $(window).on("load", function() {
        waterfall();
        var dataImg = {
            "data": [{
                "src": "31.jpg"
            }, {
                "src": "32.jpg"
            }, {
                "src": "33.jpg"
            }, {
                "src": "34.jpg"
            }, {
                "src": "35.jpg"
            }, {
                "src": "36.gif"
            }, {
                "src": "37.jpg"
            }, {
                "src": "38.jpg"
            }, {
                "src": "39.jpg"
            }, {
                "src": "40.jpg"
            }, {
                "src": "41.jpg"
            }, {
                "src": "42.jpg"
            }, {
                "src": "43.jpg"
            }, {
                "src": "44.jpg"
            }, {
                "src": "45.jpg"
            }, {
                "src": "46.jpg"
            }, {
                "src": "47.jpg"
            }, {
                "src": "48.jpg"
            }, {
                "src": "49.jpg"
            }, {
                "src": "50.jpg"
            }, ]
        }
        // 滑动执行
        window.onscroll = function() {
            headSytle();
            if (scrollside() == 1) {
                $.each(dataImg.data, function(index, value) {
                    var box = $("<div>").addClass("box").appendTo($("#container"));
                    var content = $("<div>").addClass("content").appendTo(box);
                    var img = $("<img>").attr("src", "./img/" + $(value).attr("src")).appendTo(content);
                    var news = $("<div>").addClass("news");
                    var news_a = $("<a>").text('"有人潇洒度假，有人慵懒宅家"').appendTo(news);
                    // $("#container").css({"height":$(document).height()})
                    img.after(news);//在图片后面添加news
                    waterfall();//执行瀑布流
                });
            }
        }

    });
});


function waterfall() {
    var box = $('.box');
    var boxWidth = box.eq(0).width();
    var num = Math.floor($("#container").width() / boxWidth);
    var heightArr = [];
    for (var i = 0; i < box.length; i++) {
        var boxHeight = box.eq(i).height();
        // console.log("盒子" + i + "高度：" + boxHeight);
        //第i个盒子的高度
        if (i < num) {
            heightArr[i] = boxHeight;
            // console.warn("数组为" + heightArr)
            //将第一行的box的高度组成一个数组
        } else {
            var minHeight = Math.min.apply(null, heightArr);
            var numMin = $.inArray(minHeight, heightArr);
            // console.log("动态最小高度" + minHeight)
            // console.log("最小高度为" + minHeight + "位置在" + numMin);
            box.eq(i).css({
                "position": "absolute",
                "left": box.eq(numMin).position().left,
                "top": minHeight
            })
            //设定插进最短box的元素样式
            heightArr[numMin] += box.eq(i).height();
            // console.warn(box.eq(i));
        }

    };
}

function scrollside() {
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    if (scrollTop + windowHeight == scrollHeight)
        return (1);
    //返回1时执行
    //滑动滚轮到页面最下方
}

function headSytle() {
    if ($(document).scrollTop() > 100) {

        $(".header").css({
            "opacity": "0.5",
          'box-shadow':' 0px 4px 4px #22DE30'
        });
        $(".header h1").css({
            "float": "right",
            "color": "#36BA5A"
        });
    } else if ($(document).scrollTop() == 0) {
        $(".header").css({
            "opacity": "1",
            'box-shadow':'none'
        });
        $(".header h1").css({
            "float": "none",
            "color": "white"
        });
    }
}
//header在滑动滚轮后改变样式