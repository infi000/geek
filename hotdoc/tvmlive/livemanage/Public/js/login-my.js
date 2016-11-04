
$(function(){
	$(".user").hover(function(){
		$(this).css("background","#090");
	},
	function(){
		$(this).css("background","white");
	});
	$(".pwd").hover(function(){
		$(this).css("background","#090");
	},function(){
		$(this).css("background","white");
	});
});
	function login(form){
		deleteMyAlert();
		var name=form.uname.value;
		var passwd=form.pwd.value;
		var urlCStr=(window.location.href.toLowerCase().indexOf("admin.php")==(window.location.href.length-9))?true:false;
		var reurl;
		if(urlCStr){
			reurl="admin.php?m=Admin&c=Index&a=admin_login";	
		}
		else{
			reurl="?m=Admin&c=Index&a=admin_login";		
		}
		$.ajax({
				type : "Post",
				url :reurl,
				data : {
					text:name,
					pwd:passwd
				},
				dataType : "json",
				success : function(result) { 
					if (result == "failed") {
						alert("登陆失败！","提示");
					}
					else if (result ) {
						delCookie("atoken");
						document.cookie = "atoken="+result;
						var urlCStr=(window.location.href.toLowerCase().indexOf("admin.php")==(window.location.href.length-9))?true:false;
						var reurl;
						if(urlCStr){
							reurl="admin.php?m=Admin&c=Index&a=admin";	
						}
						else{		
							reurl="?m=Admin&c=Index&a=admin";
						}
						post(reurl, {token :result});  
						//window.location.href="admin.php/admin?token="+result;
					} 
					else{
						alert("登陆异常！"+result,"提示");
					}
				},
				error : function(result) {
						alert("登陆异常！"+result.responseText,"提示");
				},
			});
	} 
	function post(URL, PARAMS) {        
	    var temp = document.createElement("form");        
	    temp.action = URL;        
	    temp.method = "post";        
	    temp.style.display = "none";        
	    for (var x in PARAMS) {        
	        var opt = document.createElement("textarea");        
	        opt.name = x;        
	        opt.value = PARAMS[x];        
	        // alert(opt.name)        
	        temp.appendChild(opt);        
	    }        
	    document.body.appendChild(temp);        
	    temp.submit();        
	    return temp;        
	} 
	function getCookie(name)
	{
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
		else
		return null;
	}
	function delCookie(name)
	{
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=getCookie(name);
		if(cval!=null){
			document.cookie= name + "="+cval+";expires="+exp.toGMTString();
		}
	}
	function alert(msg,title){
		var div=document.createElement("div");
		div.id="myAlert";
		div.className="alert alert-danger";
		div.innerHTML="<a href=\"#\" class=\"close\" data-dismiss=\"alert\">&times;</a><strong>"+title+"！</strong><span>"+msg+"</span>";
	    document.body.appendChild(div);
	}
	function deleteMyAlert(){
		var myAlert=document.getElementById("myAlert");
		if(myAlert){
			var parentElement = myAlert.parentNode;
			if(parentElement){
				parentElement.removeChild(myAlert);  
			}
		}
	}