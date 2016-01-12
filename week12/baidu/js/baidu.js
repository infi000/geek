//使用工厂模式，主要根据专门定义的类，来在不同环境下创建具体的实例。
var tools = {};//工厂名称

tools.setBlock = function(y, z) {
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
};//vip,设置效果，侧边工具栏的效果

tools.setContent = function(y, z) {
    $(y).on('click', function() {
        $('.s-content').hide();
        $(z).show();
        $('.bg-menu').css({
            'background-color': 'white',
            'color': 'black'
        });
        $('.mine-text').css({
            'color': 'black'
        });
        $(y).css({
            'background-color': '#9a9da2',
            'color': 'white'
        });
    });
};//设置内容切换：导航，视频，购物

tools.render = function(x, y, z) {
    return new tools[x](y, z);
};//中间件

var showBlock_vipout = tools.render("setBlock", "#vipout", "#vip");//vip效果
var showBlock_setout = tools.render("setBlock", "#setout", "#set");//个人设置效果
var showBlock_headerlist_more = tools.render("setBlock", "#headerlist_more", "#more_tips");//更多菜单
var showContent_tuijian = tools.render("setContent", "#tuijian", "#s_content_2");//推荐板块
var showContent_daohang = tools.render("setContent", "#daohang", "#s_content_3");//导航板块
var showContent_shipin = tools.render("setContent", "#shipin", "#s_content_4");//视频板块
var showContent_gouwu = tools.render("setContent", "#gouwu", "#s_content_5");//购物板块


//搜索框光标
$('#con_txt').focus();

//我的关注（单独特例）
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
