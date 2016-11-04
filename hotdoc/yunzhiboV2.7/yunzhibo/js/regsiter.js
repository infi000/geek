// 选择切换单位
$(".chooseBtn").on("click", function() {
		$(".errorMsg").hide();
    var that = $(this);
    $(".chooseBtn").find("div").removeClass("choosed");
    that.find("div").addClass("choosed");
});

//点击注册

$(".regsiterBtn").on("click", function() {
    if (1 == 12) {
        $(".TC").show();
        $(".skipto").show();
    } else {
    	$(".input-msg").hide();
    	$(".errorMsg").show();
    }
});

//判断Input内是否有值
$("input").keyup(function() {
	$(".errorMsg").hide();
    var imgObj = $(this).closest('.temp-box').find(".inputStatus").find("img");
    var msgObj = $(this).closest('.temp-box').find(".inputStatus").find(".input-msg");
    if ($(this).val() == "") {
        imgObj.show();
        msgObj.show();
        imgObj.attr({ "src": "../img/xing.png" });
    } else {
        imgObj.hide();
        msgObj.hide();
    }
});
