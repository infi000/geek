// 技能下拉动态
$(".content-jineng-box").hover(
    function() {
        $(this).find("div").stop();//停止之前未完成的动态
        $(this).find("div").slideDown()
    },
    function() {
        $(this).find("div").stop();
        $(this).find("div").slideUp()
    })
