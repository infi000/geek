// 选择切换单位
$(".chooseBtn").on("click", function() {
	//	$(".errorMsg").hide();
    var that = $(this);
    $(".chooseBtn").find("div").removeClass("choosed");
    that.find("div").addClass("choosed");
    var name = that.attr("data-type");
	var type = that.attr("data-value");
	$("input[name=usertype]").val(type);
    //$(".cInfo").find("input").val("");
     $(".cInfo").find(".inputStatus").find("img").show();
     $(".cInfo").find(".inputStatus").find(".input-msg").show();
   
});

//点击注册
var Intid=0;
$(".regsiterBtn").on("click", function(){
	$(".aerrorMsg").hide();
	 $(".cEmail").parent().parent().find(".errorMsg").hide();
	var err = 1;
	var type = $("input[name=usertype]").val();
	$.each($(".pInfo").find("input"),function(i,n){
		if($(n).val().trim()==""){
			err = 0;
			$(n).closest('.temp-box').find(".inputStatus").find(".input-msg").hide();
			$(n).closest('.temp-box').find(".inputStatus").find(".errorMsg").show();
		}
	});
		if($(".cName").val().trim()==""){
			err = 0;
			$(".cName").closest('.temp-box').find(".inputStatus").find(".input-msg").hide();
			$(".cName").closest('.temp-box').find(".inputStatus").find(".errorMsg").show();
		}
	var phone,pass,email;
    if (err == 1) {
		var len = strlen($(".username").val());
		if( len < 4 || len >20 ){
			return;
		}
		temp = $(".phone");
		phone = temp.val();
		if(!checkphone(phone)){
			return;
		}
		pass = $(".password").val().trim();
		if(pass==""){
			return;
		}
		if($(".password").val().length <8 || $(".password").val().length >20 ){
			return;
		}
		if(pass!=$(".password2").val()){
			return;
		}
		email = $(".cEmail").val();
        if(email && !checkemail(email)){
				 $(".cEmail").parent().parent().find(".errorMsg").text("邮箱格式错误");
				 $(".cEmail").parent().parent().find(".errorMsg").show();
				return;
		}

	}else{
		return;
	}
	var params = {'name':$(".username").val(),
		'phone':phone,
		'utype':type,
		'passwd':pass,
		'cname':$(".cName").val(),
		'caddr':$(".cAddr").val(),
		'cphone':$(".cPhone").val(),
		'cemail':$(".cEmail").val(),
		'uphone':$(".uPhone").val(),
		'oicq':$(".Oicq").val()
		};

	var url = '?m=5001';
		 $.post(url,params,function(data){
			var msg = data.msg.replace("\\n","<br/>");			
			if(data.status){
				//location.href = urlaa;
				$(".TC").show();
				$(".skipto").show();
				Intid = setInterval("jump_link()",1000);
					
			}else{
				//window.sessionStorage.setItem('CLIENTTOKEN',null);
                 $(".aerrorMsg").find("span").text(msg);
				 $(".aerrorMsg").show();
				
			}
		},'json');

});
var counter = 2;
function jump_link(){
  counter--;
  if(counter <= 0){
	   var url = "?m=5101";
	   clearInterval(Intid);
	   location.href=url;
  }
}
$(".errorMsg").hide();
$(".aerrorMsg").hide();
//判断Input内是否有值
function checkInput(){
	$(this).parent().parent().find(".errorMsg").hide();
    var imgObj = $(this).closest('.temp-box').find(".inputStatus").find("img");
    var msgObj = $(this).closest('.temp-box').find(".inputStatus").find(".input-msg");
    if ($(this).val().trim() == ""){
        imgObj.show();
        msgObj.show();
        imgObj.attr({"src": "images/bf/xing.png"});
    } else {
		if($(this).attr('class') == "phone"){
			if(checkphone($(this).val())){
				 msgObj.show();
				imgObj.attr({ "src": "images/bf/right.png" });
			}else{
				msgObj.hide();
				$(this).parent().parent().find(".errorMsg").text("手机号格式错误");
				$(this).parent().parent().find(".errorMsg").show();
				imgObj.attr({ "src": "images/bf/xing.png" });
			}
		}else if($(this).attr('class') =="username"){
			var len = strlen($(".username").val());
			if( len >=4 && len <=20 ){
				imgObj.attr({ "src": "images/bf/right.png" });
			}else{
				$(this).parent().parent().find(".errorMsg").text("姓名4到20个字符");
				$(this).parent().parent().find(".errorMsg").show();
				imgObj.attr({ "src": "images/bf/xing.png" });
			}
		}else if($(this).attr('class') =="password"){
			if($(".password").val().length >=8 && $(".password").val().length <=20 ){
				imgObj.attr({ "src": "images/bf/right.png" });
			}else{
				$(this).parent().parent().find(".errorMsg").text("密码8到20个字符");
				$(this).parent().parent().find(".errorMsg").show();
				imgObj.attr({ "src": "images/bf/xing.png" });
			}
		}else if($(this).attr('class') =="password2"){
			if($(".password").val()==$(".password2").val()){
				imgObj.attr({ "src": "images/bf/right.png" });
			}else{
				$(this).parent().parent().find(".errorMsg").text("两次输入的密码不一致");
				$(this).parent().parent().find(".errorMsg").show();
				imgObj.attr({ "src": "images/bf/xing.png" });
			}
		}else{
			imgObj.attr({ "src": "images/bf/right.png" });
		}
    }
}
$(".pInfo").find("input").blur(checkInput);
$(".pInfo").find("input").keyup(checkInput);




