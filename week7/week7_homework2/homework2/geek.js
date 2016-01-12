// 网站导航
var pl = $("#part1-l ul li");
var lshow = $(".lesson-list-show");

function show(a, b) {
    $(a).bind({

        mouseover: function() {
            $(b).css({
                "display": "block"
            });
            $("#part1-l").css({
                "overflow": "visible"
            });
            $(".line").hide();
            $(a).css({
                "border-right-color": "white",
                "border-left": "2px solid green",
            });
        },
        mouseout: function() {
            $(b).css({
                "display": "none"
            });
            $("#part1-l").css({
                "overflow": "hidden"
            });
            $(a).css({
                "border-right-color": "#D1D1D1",
                "border-left": "0",
            });
            $(".line").show();
        }
    });
    $(b).bind({
        mouseover: function() {
            $(b).css({
                "display": "block"
            });
            $("#part1-l").css({
                "overflow": "visible"
            });
            $(a).css({
                "border-right-color": "white",
                "border-left": "2px solid green"
            });
            $(".line").hide();
        },
        mouseout: function() {
            $(b).css({
                "display": "none"
            });
            $("#part1-l").css({
                "overflow": "hidden"
            });
            $(a).css({
                "border-right-color": "#D1D1D1",
                "border-left": "0"
            });
            $(".line").show();
        }
    });
}

function navShow() {
    for (var i = 0; i < pl.length; i++) {
        show(pl[i], lshow[i])
    };
}
navShow();


// 热门推荐简介

var p3li = $("#p3-1 ul li");
var lessonp = $(".lesson-info-p");

function slide(a, b) {

    $(a).bind({
        mouseenter: function() {
            if ($(b).css("display") == "none")
                $(b).slideDown()
        },
        mouseleave: function() {
            $(b).slideUp()
        }
    });
    $(b).bind({
        mouseenter: function() {
            if ($(b).css("display") == "none")
                $(b).slideDown()
        },
        mouseleave: function() {
            $(b).slideUp()
        }
    });
}

// 放到数组中调用
function lessonShow() {
    for (var i = 0; i < p3li.length; i++) {
        slide(p3li[i], lessonp[i]);
        console.log(slide(p3li[i], lessonp[i]))
    };
}
lessonShow();





// 知识体系图


function cover(a, b) {

    $(a).bind({
        mouseenter: function() {
            if ($(a).css("opacity") > 0.5) {
                $(a).addClass("out").removeClass('in');
                $(b).addClass("in").removeClass('out');
            }

        },
        mouseleave: function() {
            if ($(a).css("opacity") < 0.5) {
                $(a).addClass("in").removeClass('out');
                $(b).addClass("out").removeClass('in');
            }

        }
    });
    //   $(b).bind({
    //     mouseover: function() {
    //         $(a).addClass("out").removeClass('in');
    //         $(b).addClass("out").removeClass('in');
    //     },
    //     mouseout: function() {
    //         $(a).addClass("in").removeClass('out');
    //         $(b).addClass("out").removeClass('out');
    //     }
    // });

}
var front = $("#p-part5 td .front");
var back = $("#p-part5 td .back");

function showCover() {
    for (var i = 0; i < front.length; i++) {
        cover(front[i], back[i])
    };
}
showCover();


// 合作院校
var btl1 = $(".btl1");
var btr1 = $(".btr1");
var btl2 = $(".btl2");
var btr2 = $(".btr2");
var btl3 = $(".btl3");
var btr3 = $(".btr3");

var p8 = $(".p8li");

function lunbo() {
    btl1.bind({
        click: function() {
            $('.p7li:first').fadeOut('1500', function() {
                $('.p7li:last').after($('.p7li:first'));

            });
            $('.p7li').css({
                "display": "block"
            });
        }
    });
    btr1.bind({
        click: function() {
            $('.p7li:last').fadeOut('1500', function() {
                $('.p7li:first').after($('.p7li:last'));

            });
            $('.p7li').css({
                "display": "block"
            });
        }

    });
    btl2.bind({
        click: function() {
            $('.p8li:first').fadeOut('1500', function() {
                $('.p8li:last').after($('.p8li:first'));

            });
            $('.p8li').css({
                "display": "block"
            });
        }
    });
    btr2.bind({
        click: function() {
            $('.p8li:last').fadeOut('1500', function() {
                $('.p8li:first').after($('.p8li:last'));

            });
            $('.p8li').css({
                "display": "block"
            });
        }

    });
    btl3.bind({
        click: function() {
            $('.p9li:first').fadeOut('1500', function() {
                $('.p9li:last').after($('.p9li:first'));

            });
            $('.p9li').css({
                "display": "block"
            });
        }
    });
    btr3.bind({
        click: function() {
            $('.p9li:last').fadeOut('1500', function() {
                $('.p9li:first').after($('.p9li:last'));

            });
            $('.p9li').css({
                "display": "block"
            });
        }

    })

};


lunbo();

// 金品课程
var book1 = $(".fengmian1");

function close() {
    $(".fengmian1").animate({
        left: '0px'
    }, "800");
}

function open() {
    $(".fengmian1").animate({
        left: '-10px'
    }, "800");
}

function book(a) {
    a.bind({
        mouseover: function() {
            $(a).animate({
                left: '-10px'
            }, "800");
        },
        mouseout: function() {
            $(a).animate({
                left: '0px'
            }, "800");
        }
    })

}
