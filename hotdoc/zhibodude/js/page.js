var lookback={};

lookback.headerstyle=function() {
    if ($(document).scrollTop() > 50) {
        $("header").css({
            'box-shadow': '1px 0px 12px #ccc',
            'position': 'fixed',
            "width":  $(document).width()
        });

    } else {
        $("header").css({
            'box-shadow': 'none',
            'position': 'relative'
        });

    }
};
lookback.getSource=function(){
    var url=document.URL;
    url=url.split("?&=")[1];
    $("iframe").attr("src",url);
}

jQuery(document).ready(function($) {
    $("header").css({
        width:$(document).width()
    });
    lookback.getSource();
    window.onscroll = function() {
        lookback.headerstyle()
    };
});
