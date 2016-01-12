//搜索框光标
$('#con_txt').focus();

//vip,设置，侧边工具栏的效果
function showBlock(y, z) {
    $(y).bind({
        mouseover: function() {
            $(z).css({
                "display": "block"
            });
        },
        mouseout: function() {
            $(z).css({
                "display": "none"
            });
        }
    });
    $(z).bind({
        mouseover: function() {
            $(z).css({
                "display": "block"
            });
        },
        mouseout: function() {
            $(z).css({
                "display": "none"
            });
        }
    });
}
showBlock("#vipout", "#vip");
showBlock("#setout", "#set");
showBlock("#headerlist_more", "#more_tips");

// 点击标签改变内容
//我的关注
$('.mine-text').on('click', function() {
    $('.s-content').hide();
    $('#s_content_1').show();
    $('.bg-menu').css({
        'background-color': 'white',
        'color': 'black'
    });
    $('.s-menu-mine').css({
        'background-color': '#9a9da2'
    });
    $('.mine-text').css({
        'color': 'white'
    })
});
//设置，导航，视频，购物
function showContent(a, b) {
    $(a).on('click', function() {
        $('.s-content').hide();
        $(b).show();
        $('.bg-menu').css({
            'background-color': 'white',
            'color': 'black'
        });
        $('.mine-text').css({
            'color': 'black'
        });
        $(a).css({
            'background-color': '#9a9da2',
            'color': 'white'
        });
    });
}
showContent("#tuijian", "#s_content_2");
showContent("#daohang", "#s_content_3");
showContent("#shipin", "#s_content_4");
showContent("#gouwu", "#s_content_5");
