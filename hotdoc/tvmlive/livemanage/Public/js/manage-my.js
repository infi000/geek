var r_type="caseinfo";
var cur_url="__URL__";
var del_id=-1;
//总记录数,每页条数,总页数
$(document).ready(function() {
	
	/*
	 * 获取合作案例信息
	 * 
	 *  */
	$(".caseinfo_p").on('click', function() {	
		r_type="caseinfo";
		setSelectBar();
		//document.getElementById('htitle').innerText="合作案例";
		getCaseData(1);
	});
	/*
	 * 添加合作案例信息
	 * 
	 *  */
	$(".caseinfo_insert").on('click', function() {
		r_type="caseinfo_insert";
		setSelectBar();
		setOutHtml(CURURL+"/admin.php?s=caseinsert.html",-1,loadedInsertCase);
	});
	/**
	 *
	 * 获取公寓信息
	 * 
	 *  */
	
	//获取指定页的用户信息
	$("#user_data_td").on('click', "a", function() {
		var page = $(this).attr("data-page");
		//获取当前页
		if(r_type=="caseinfo"){
			getCaseData(page);
		}
		else if(r_type=="newsinfo"){
			getNewsData(page);
		}
	});
	$(".newsinfo_p").on('click', function() {
		r_type="newsinfo";
		setSelectBar();
		//document.getElementById('htitle').innerText="最新动态";
		getNewsData(1)
	});
	$(".newsinfo_insert").on('click', function() {
		r_type="newsinfo_insert";
		setSelectBar();
		setOutHtml(CURURL+"/admin.php?s=newsinsert.html",-1,loadedInsertNews);
	});


	/*
	 * 获取Banner信息
	 * 
	 *  */
	$(".bannerinfo_p").on('click', function() {	
		r_type="bannerinfo";
		setSelectBar();
		getBannerData(1);
	});
	/*
	 * 添加Banner信息
	 * 
	 *  */
	$(".bannerinfo_insert").on('click', function() {
		r_type="bannerinfo_insert";
		setSelectBar();
		setOutHtml(CURURL+"/admin.php?s=bannerinsert.html",-1,loadedInsertBanner);
	});
		
	/*
	 * 获取申请人信息
	 * 
	 *  */
	$(".userinfo_p").on('click', function() {	
		r_type="userinfo";
		setSelectBar();
		getUserData(1);
	});
		
	/*
	 * 获取邮件地址信息
	 * 
	 *  */
	$(".mailinfo_p").on('click', function() {	
		r_type="mailinfo";
		setSelectBar();
		getMailData(1);
	});
	/*
	 * 添加邮件地址信息
	 * 
	 *  */
	$(".mailinfo_insert").on('click', function() {
		r_type="mailinfo_insert";
		setSelectBar();
		setOutHtml(CURURL+"/admin.php?s=mailinsert.html",-1,loadedInsertMail);
	});
		
	getCaseData(1);
}); 

function setSelectBar(){
	var caseinfo_li=document.getElementById("caseinfo_p_li");
	var caseinfo_insert_li=document.getElementById("caseinfo_insert_li");
	var newsinfo_li=document.getElementById("newsinfo_p_li");
	var newsinfo_insert_li=document.getElementById("newsinfo_insert_li");
	var bannerinfo_li=document.getElementById("bannerinfo_p_li");
	var bannerinfo_insert_li=document.getElementById("bannerinfo_insert_li");
	var userinfo_li=document.getElementById("userinfo_p_li");
	var mailinfo_li=document.getElementById("mailinfo_p_li");
	var mailinfo_insert_li=document.getElementById("mailinfo_insert_li");
	caseinfo_li.className="";
	caseinfo_insert_li.className="";
	newsinfo_li.className="";
	newsinfo_insert_li.className="";
	bannerinfo_li.className="";
	bannerinfo_insert_li.className="";
	userinfo_li.className="";
	mailinfo_li.className="";
	mailinfo_insert_li.className="";
					if(r_type=="caseinfo"){
					 caseinfo_li.className="active";
					}
					else if(r_type=="caseinfo_insert"){						
					 	caseinfo_insert_li.className="active";
					}
					else if(r_type=="newsinfo"){						
					 	newsinfo_li.className="active";
					 }
					else if(r_type=="newsinfo_insert"){
					 	newsinfo_insert_li.className="active";					
					}
					else if(r_type=="bannerinfo"){						
					 	bannerinfo_li.className="active";
					 }
					else if(r_type=="bannerinfo_insert"){
					 	bannerinfo_insert_li.className="active";					
					}
					else if(r_type=="userinfo"){						
					 	userinfo_li.className="active";
					 }
					else if(r_type=="mailinfo"){						
					 	mailinfo_li.className="active";
					 }
					else if(r_type=="mailinfo_insert"){
					 	mailinfo_insert_li.className="active";					
					}
}
function loadedInsertCase(id){	
		//document.getElementById('htitle').innerText="添加案例";
		//document.getElementById('btnSubmitCase').value="保存";
}
function loadedUpdateCase(id){	
	$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=getcaseById",
           		data:{
					did : id,
				},
				success : function(result) { 
					if (result == "") {
					} 
					else if (result == "查询失败!") {
					} 
					else{
						var res = eval('(' + result + ')');
						var datajson = res['data'];
						if(datajson.length>0){							
							document.getElementById('casetitle').value=datajson[0]['case_title'];
							document.getElementById('casethumbinal').src=ROOT+datajson[0]['case_thumbinal'];
							document.getElementById('caseqrcode').src=ROOT+datajson[0]['case_qrcode'];
							document.getElementById('caseweight').value=datajson[0]['case_weight'];
							document.getElementById('caseid').value=datajson[0]['id'];
							document.getElementById('caseguid').value=datajson[0]['case_guid'];
						}
					}
				},
				error : function(result) {
				},
			});
}

function loadedInsertNews(id){
		//document.getElementById('htitle').innerText="添加动态";
		//document.getElementById('btnSubmitNews').value="保存";
		//var d=document.getElementById('newsdate');
		//document.getElementById('newsdate').value = new Date();
		document.getElementById('newsdate').valueAsDate = new Date();
}
function loadedUpdateNews(id){
	document.getElementById('newsid').value=id;	
	//var guid=Guid.NewGuid().ToString('D');
	//document.getElementById('newsguid').value=	guid;	
}
function loadedInsertBanner(id){	
}
function loadedInsertMail(id){	
}
function loadedUpdateBanner(id){	
	$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=getbannerById",
           		data:{
					did : id,
				},
				success : function(result) { 
					if (result == "") {
					} 
					else if (result == "查询失败!") {
					} 
					else{
						var res = eval('(' + result + ')');
						var datajson = res['data'];
						if(datajson.length>0){							
							document.getElementById('bannerurl').value=datajson[0]['banner_url'];
							document.getElementById('bannerthumbinal').src=ROOT+datajson[0]['banner_thumbinal'];
							document.getElementById('bannerweight').value=datajson[0]['banner_weight'];
							document.getElementById('bannerid').value=datajson[0]['banner_id'];
						}
					}
				},
				error : function(result) {
				},
			});
}
function loadedUpdateUser(id){	
	$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=getapplyuserById",
           		data:{
					did : id,
				},
				success : function(result) { 
					if (result == "") {
					} 
					else if (result == "查询失败!") {
					} 
					else{
						var res = eval('(' + result + ')');
						var datajson = res['data'];
						if(datajson.length>0){					
							document.getElementById('userid').value=datajson[0]['apply_user_id'];
							document.getElementById('usercompany').value=datajson[0]['apply_user_company'];		
							document.getElementById('username').value=datajson[0]['apply_user_name'];
							document.getElementById('userphone').value=datajson[0]['apply_user_phone'];
							document.getElementById('usermail').value=datajson[0]['apply_user_mail'];
						}
					}
				},
				error : function(result) {
				},
			});
}
function loadedUpdateMail(id){	
	$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=getmailById",
           		data:{
					did : id,
				},
				success : function(result) { 
					if (result == "") {
					} 
					else if (result == "查询失败!") {
					} 
					else{
						var res = eval('(' + result + ')');
						var datajson = res['data'];
						if(datajson.length>0){					
							document.getElementById('mailid').value=datajson[0]['id'];	
							document.getElementById('sendname').value=datajson[0]['mailname'];
							document.getElementById('sendmail').value=datajson[0]['s_mail'];	
						}
					}
				},
				error : function(result) {
				},
			});
}
function loadNewsData(){
	$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=getNewsById",
           		data:{
					did : document.getElementById('newsid').value,
				},
				success : function(result) { 
					if (result == "") {
					} 
					else if (result == "查询失败!") {
					} 
					else{
						var res = eval('(' + result + ')');
						var datajson = res['data'];
						if(datajson.length>0){							
							document.getElementById('newstitle').value=datajson[0]['news_title'];
							//var date=Date.parse(datajson[0]['news_time']);
							//date.setHours(date.getHours() + 8);
							var date=new Date(datajson[0]['news_time']);
							date.setHours(date.getHours() + 8);
							document.getElementById('newsdate').valueAsDate=date;
							document.getElementById('newsthumbinal').src=ROOT+datajson[0]['news_thumbinal'];
							document.getElementById('newsdescribe').value=datajson[0]['news_des'];
							document.getElementById('newsweight').value=datajson[0]['news_weight'];
							document.getElementById('newsid').value=datajson[0]['id'];
							document.getElementById('newsguid').value=datajson[0]['news_guid'];
							var htmlEditor=window.frames["newsiframe"].newseditor;
							htmlEditor.html(datajson[0]['news_html_content']);
						}
					}
				},
				error : function(result) {
				},
			});
}
function setOutHtml(htmlPath,id,callback){
		var xmlhttp; 
		if (window.XMLHttpRequest) { // 兼容 IE7+, Firefox, Chrome, Opera, Safari 
			xmlhttp = new XMLHttpRequest(); 
		} 
		else { // 兼容IE6, IE5 
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
		} 
		xmlhttp.onreadystatechange = function(data) { 
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { 
				var parentElement;
				if(r_type=="caseinfo"){
					 	parentElement=document.getElementById("modifyCase");
					}
					else if(r_type=="caseinfo_insert"){						
					 	parentElement=document.getElementById("user_data_td");
					}
					else if(r_type=="newsinfo"){						
					 parentElement=document.getElementById("modifyNews");
					}
					else if(r_type=="newsinfo_insert"){
					 	parentElement=document.getElementById("user_data_td");						
					}
					else if(r_type=="bannerinfo"){						
					 parentElement=document.getElementById("modifyBanner");
					}
					else if(r_type=="bannerinfo_insert"){
					 	parentElement=document.getElementById("user_data_td");						
					}
					else if(r_type=="userinfo"){						
					 parentElement=document.getElementById("modifyUser");
					}
					else if(r_type=="mailinfo"){						
					 parentElement=document.getElementById("modifyMail");
					}
					else if(r_type=="mailinfo_insert"){
					 	parentElement=document.getElementById("user_data_td");						
					}
					//document.body.className="modal-open";
					//var div=document.getElementById("modifyFade");
					//div.className="modal-backdrop fade in";
					//div.style.display="block";
					//parentElement.className="modal fade in";
					//parentElement.style.display="block";
					//parentElement.style.paddingLeft="17px";
					if(parentElement){
						parentElement.innerHTML=data.currentTarget.response;
					}
					if(callback){
						callback(id);
					}
			} 
		} 
		xmlhttp.open("GET",htmlPath, true); 
		xmlhttp.send(); 
	}
	//Ajax获取信息
function getCaseData(curpage) {
		$.ajax({
			type : "Post",
			url : "admin.php?m=Admin&c=Index&a=getcase",
			data : {
				r_type_link : 'caseinfo',
				page : curpage,
				pagecount:10,
				token:getCookie('atoken'),
			},
			dataType : "json",
			success : function(result) {
				if (result == "") {
					document.getElementById('user_data_td').innerHTML = "<h2 class=\"sub-header\" >没有案例数据！</h2>";
				} else if (result == "查询失败!") {
					document.getElementById('user_data_td').innerHTML = "<h2 class=\"sub-header\" >查询案例数据失败！</h2>";
				} else {
					//var datajson=	result['data'];
					//var pagejson=	result['page'];
					var res = eval('(' + result + ')');
					var datajson = res['data'];
					var total_num = res['total_num'];
					//总记录数
					var page_size = res['page_size'];
					//每页数量
					var page_cur = res['page'];
					//当前页
					var page_total_num = res['page_total_num'];
					//总页数
					
					
					
					//var datahtml ="<div id=\"case\"> <h2 class=\"sub-header\">案例列表</h2><div class=\"table-responsive\"><table class=\"table table-striped\"><tr><th style=\"width:0px;visibility: collapse;\">ID</th><th style=\"width:200px\">标题</th><th style=\"width:200px\">缩略图</th><th style=\"width:100px\">二维码</th><th style=\"width:30px\">权重</th><th style=\"width:100px\">创建时间</th><th style=\"width:100px\">操作</th></tr>";
					var datahtml ="<div id=\"case\"> <h2 class=\"sub-header\">案例列表</h2><div class=\"table-responsive\"><table class=\"table table-striped\"><tr><th style=\"width:200px\">标题</th><th style=\"width:200px\">缩略图</th><th style=\"width:100px\">二维码</th><th style=\"width:30px\">权重</th><th style=\"width:100px\">创建时间</th><th style=\"width:100px\">操作</th></tr>";
					for (var i = 0; i < datajson.length; i++) {
					
						var elehtml = "<tr>";
						//elehtml +="<td style=\"visibility: collapse;\">" + datajson[i]['id'] + "</td>";
						elehtml += "<td>" + datajson[i]['case_title'] + "</td>";
						elehtml += "<td class=\"case_thumbinal\"><img src='" +ROOT+ datajson[i]['case_thumbinal'] + "'></td>";
						elehtml += "<td class=\"case_qrcode\"><img src='" +ROOT+ datajson[i]['case_qrcode'] + "'></td>";
						elehtml += "<td>" + datajson[i]['case_weight'] + "</td>";
						elehtml += "<td>" + datajson[i]['createtime'] + "</td>";
						elehtml += "<td><div class=\"btn-group\">";
						elehtml += "<button type=\"button\" class=\"btn btn-xs btn-primary\" data-toggle=\"modal\" data-target=\"#modifyCase\" onclick=\"showcasedata("+datajson[i]['id']+")\">修改</button>";
						elehtml +="<button type=\"button\" class=\"btn btn-xs btn-danger\" data-toggle=\"modal\" data-target=\"#delCase\" onclick=\"setdeleteId("+datajson[i]['id']+")\">删除</button>";
						
						//elehtml += "<td style=\"cursor:pointer;\" onclick=\"showcasedata("+datajson[i]['id']+")\">修改</td>";
						//elehtml += "<td style=\"cursor:pointer;\" onclick=\"deletedata('case',"+datajson[i]['id']+")\">删除</td></tr>";
						elehtml +="</div></td></tr>";
						datahtml += elehtml;
					}
					datahtml+=" </table></div></div>";
					//var pagerhtml=	res['page'];
					//var pagehtml="<tr><td colspan=\"8\">"+pagerhtml+"</td></tr>";
					var pagehtml = "<div class=\"pageBox\" style=\"text-align: center;\"> <nav><ul class=\"pagination\">" + getPageBar(page_cur , total_num, page_size, page_total_num) + "</ul></nav></div>";
					datahtml += pagehtml + "</div>";
					document.getElementById('user_data_td').innerHTML = datahtml;
				}
			},
			error : function(result) {
				alert(result.responseText,"获取异常");
			},
		});
	};
	
	//Ajax获取信息
function getNewsData(curpage) {
		$.ajax({
			type : "Post",
			url : "admin.php?m=Admin&c=Index&a=getnews",
			data : {
				r_type_link : 'newsinfo',
				page : curpage,
				token:getCookie('atoken'),
			},
			dataType : "json",
			success : function(result) {
				if (result == "") {
					document.getElementById('user_data_td').innerHTML = "<h2 class=\"sub-header\" >没有动态数据！</h2>";
				} else if (result == "查询失败!") {
					document.getElementById('user_data_td').innerHTML = "<h2 class=\"sub-header\" >查询动态数据失败！</h2>";
				} else {
					//var datajson=	result['data'];
					//var pagejson=	result['page'];
					var res = eval('(' + result + ')');
					var datajson = res['data'];
					var total_num = res['total_num'];
					//总记录数
					var page_size = res['page_size'];
					//每页数量
					var page_cur = res['page'];
					//当前页
					var page_total_num = res['page_total_num'];
					//总页数
					//	id	name	address	user_name	c_time	describe
					
					
					//var datahtml ="<div id=\"case\"> <h2 class=\"sub-header\">最新动态列表</h2><div class=\"table-responsive\"><table class=\"table table-striped\"><tr><th style=\"width:30px\">ID</th><th style=\"width:150px\">标题</th><th style=\"width:150px\">发布时间</th><th style=\"width:70px\">缩略图</th><th style=\"width:70px\">描述</th><th style=\"width:100px\">页面路径</th><th style=\"width:45px\">权重</th><th style=\"width:150px\">创建时间</th><th style=\"width:90px\">操作</th></tr>";
					var datahtml ="<div id=\"case\"> <h2 class=\"sub-header\">最新动态列表</h2><div class=\"table-responsive\"><table class=\"table table-striped\"><tr><th style=\"width:150px\">标题</th><th style=\"width:150px\">发布时间</th><th style=\"width:70px\">缩略图</th><th style=\"width:70px\">描述</th><th style=\"width:100px\">页面路径</th><th style=\"width:45px\">权重</th><th style=\"width:150px\">创建时间</th><th style=\"width:90px\">操作</th></tr>";
					for (var i = 0; i < datajson.length; i++) {
					
						var elehtml = "<tr>";
						//elehtml +="<td>" + datajson[i]['id'] + "</td>";
						elehtml += "<td>" + datajson[i]['news_title'] + "</td>";
						elehtml += "<td>" + datajson[i]['news_time'].substring(0,10) + "</td>";
						elehtml += "<td class=\"news_thumbinal\"><img src='" +ROOT+ datajson[i]['news_thumbinal'] + "'></td>";
						elehtml += "<td><button class=\"btn btn-link btn-defult\" data-toggle=\"popover\" data-container=\"body\" data-content=\"" + datajson[i]['news_des'] + "\">查看</button></td>";
						elehtml += "<td><a charset=\"UTF-8\" href=\""+ROOT+"/"+datajson[i]['news_html'] +"\" target=\"_blank\">" + datajson[i]['news_html'] + "</a></td>";
						//elehtml += "<td><button type=\"button\"  onclick=\"openNewWindow('"+ROOT+"/"+datajson[i]['news_html'] +"')\">" + datajson[i]['news_html'] + "</button></td>";
						elehtml += "<td>" + datajson[i]['news_weight'] + "</td>";
						elehtml += "<td>" + datajson[i]['create_time'] + "</td>";
						elehtml += "<td><div class=\"btn-group\">";
						elehtml += "<button type=\"button\" class=\"btn btn-xs btn-primary\" data-toggle=\"modal\" data-target=\"#modifyNews\" onclick=\"shownewsdata("+datajson[i]['id']+")\">修改</button>";
						elehtml +="<button type=\"button\" class=\"btn btn-xs btn-danger\" data-toggle=\"modal\" data-target=\"#delNews\" onclick=\"setdeleteId("+datajson[i]['id']+")\">删除</button>";
						
						//elehtml += "<td style=\"cursor:pointer;\" onclick=\"showcasedata("+datajson[i]['id']+")\">修改</td>";
						//elehtml += "<td style=\"cursor:pointer;\" onclick=\"deletedata('case',"+datajson[i]['id']+")\">删除</td></tr>";
						elehtml +="</div></td></tr>";
						datahtml += elehtml;
					}
					datahtml+=" </table></div></div>";
					//var pagerhtml=	res['page'];
					//var pagehtml="<tr><td colspan=\"8\">"+pagerhtml+"</td></tr>";
					var pagehtml = "<div class=\"pageBox\" style=\"text-align: center;\"> <nav><ul class=\"pagination\">" + getPageBar(page_cur , total_num, page_size, page_total_num) + "</ul></nav></div>";
					datahtml += pagehtml + "</div>";
					
					
 					$("#user_data_td").html(datahtml);
 					$(function () {$("[data-toggle='popover']").popover();});
					//document.getElementById('user_data_td').innerHTML = datahtml;
				}
			},
			error : function(result) {
				alert(result.responseText,"获取异常");
			},
		});
	};
	
function getBannerData(curpage) {
		$.ajax({
			type : "Post",
			url : "admin.php?m=Admin&c=Index&a=getbanner",
			data : {
				r_type_link : 'bannerinfo',
				page : curpage,
				pagecount:-1,
				bannertoken:getCookie('atoken'),
			},
			dataType : "json",
			success : function(result) {
				if (result == "") {
					document.getElementById('user_data_td').innerHTML = "<h2 class=\"sub-header\" >没有Banner数据！</h2>";
				} else if (result == "查询失败!") {
					document.getElementById('user_data_td').innerHTML = "<h2 class=\"sub-header\" >查询Banner数据失败！</h2>";
				} else {
					var res = eval('(' + result + ')');
					var datajson = res['data'];
					var total_num = res['total_num'];
					//总记录数
					var page_size = res['page_size'];
					//每页数量
					var page_cur = res['page'];
					//当前页
					var page_total_num = res['page_total_num'];
					//总页数
					
					
					
					var datahtml ="<div id=\"banner\"> <h2 class=\"sub-header\">Banner列表</h2><div class=\"table-responsive\"><table class=\"table table-striped\"><tr><th style=\"width:200px\">相关链接</th><th style=\"width:200px\">缩略图</th><th style=\"width:30px\">权重</th><th style=\"width:100px\">创建时间</th><th style=\"width:100px\">操作</th></tr>";
					for (var i = 0; i < datajson.length; i++) {
					
						var elehtml = "<tr>";
						//elehtml +="<td style=\"visibility: collapse;\">" + datajson[i]['banner_id'] + "</td>";
						elehtml += "<td><a href=\""+datajson[i]['banner_url'] + "\" target=\"_blank\">" + datajson[i]['banner_url'] + "</a></td>";
						elehtml += "<td class=\"banner_thumbinal\"><img src='" +ROOT+ datajson[i]['banner_thumbinal'] + "' onLoad=setImgSize(this)></td>";
						elehtml += "<td>" + datajson[i]['banner_weight'] + "</td>";
						elehtml += "<td>" + datajson[i]['createtime'] + "</td>";
						elehtml += "<td><div class=\"btn-group\">";
						elehtml += "<button type=\"button\" class=\"btn btn-xs btn-primary\" data-toggle=\"modal\" data-target=\"#modifyBanner\" onclick=\"showbannerdata("+datajson[i]['banner_id']+")\">修改</button>";
						elehtml +="<button type=\"button\" class=\"btn btn-xs btn-danger\" data-toggle=\"modal\" data-target=\"#delBanner\" onclick=\"setdeleteId("+datajson[i]['banner_id']+")\">删除</button>";
						
						elehtml +="</div></td></tr>";
						datahtml += elehtml;
					}
					datahtml+=" </table></div></div>";
					document.getElementById('user_data_td').innerHTML = datahtml;
				}
			},
			error : function(result) {
				alert(result.responseText,"获取异常");
			},
		});
	};
	
	//Ajax获取信息
function getUserData(curpage) {
		$.ajax({
			type : "Post",
			url : "admin.php?m=Admin&c=Index&a=getapplyuser",
			data : {
				r_type_link : 'userinfo',
				page : curpage,
				usertoken:getCookie('atoken'),
			},
			dataType : "json",
			success : function(result) {
				if (result == "") {
					document.getElementById('user_data_td').innerHTML = "<h2 class=\"sub-header\" >没有申请人数据！</h2>";
				} else if (result == "查询失败!") {
					document.getElementById('user_data_td').innerHTML = "<h2 class=\"sub-header\" >查询申请人数据失败！</h2>";
				} else {
					var res = eval('(' + result + ')');
					var datajson = res['data'];
					var total_num = res['total_num'];
					//总记录数
					var page_size = res['page_size'];
					//每页数量
					var page_cur = res['page'];
					//当前页
					var page_total_num = res['page_total_num'];
					//总页数
					//	id	name	address	user_name	c_time	describe
					
					
					var datahtml ="<div id=\"user\"> <h2 class=\"sub-header\">申请人列表</h2><div class=\"table-responsive\"><table class=\"table table-striped\"><tr><th style=\"width:150px\">公司</th><th style=\"width:150px\">联系人</th><th style=\"width:70px\">手机</th><th style=\"width:100px\">邮箱</th><th style=\"width:100px\">申请时间</th><th style=\"width:90px\">操作</th></tr>";
					for (var i = 0; i < datajson.length; i++) {
					
						var elehtml = "<tr>";
						//elehtml +="<td>" + datajson[i]['apply_user_id'] + "</td>";
						elehtml += "<td>" + datajson[i]['apply_user_company'] + "</td>";
						elehtml += "<td>" + datajson[i]['apply_user_name'] + "</td>";
						elehtml += "<td>" + datajson[i]['apply_user_phone'] + "</td>";
						elehtml += "<td>" + datajson[i]['apply_user_mail'] + "</td>";
						elehtml += "<td>" + datajson[i]['apply_time'] + "</td>";
						elehtml += "<td><div class=\"btn-group\">";
						elehtml += "<button type=\"button\" class=\"btn btn-xs btn-primary\" data-toggle=\"modal\" data-target=\"#modifyUser\" onclick=\"showuserdata("+datajson[i]['apply_user_id']+")\">修改</button>";
						elehtml +="<button type=\"button\" class=\"btn btn-xs btn-danger\" data-toggle=\"modal\" data-target=\"#delUser\" onclick=\"setdeleteId("+datajson[i]['apply_user_id']+")\">删除</button>";
						
					
						elehtml +="</div></td></tr>";
						datahtml += elehtml;
					}
					datahtml+=" </table></div></div>";
					var pagehtml = "<div class=\"pageBox\" style=\"text-align: center;\"> <nav><ul class=\"pagination\">" + getPageBar(page_cur , total_num, page_size, page_total_num) + "</ul></nav></div>";
					datahtml += pagehtml + "</div>";
					
					
 					$("#user_data_td").html(datahtml);
				}
			},
			error : function(result) {
				alert(result.responseText,"获取异常");
			},
		});
	};
		//Ajax获取信息
function getMailData(curpage) {
		$.ajax({
			type : "Post",
			url : "admin.php?m=Admin&c=Index&a=getmail",
			data : {
				r_type_link : 'mailinfo',
				page : curpage,
				mailtoken:getCookie('atoken'),
			},
			dataType : "json",
			success : function(result) {
				if (result == "") {
					document.getElementById('user_data_td').innerHTML = "<h2 class=\"sub-header\" >没有邮件地址数据！</h2>";
				} else if (result == "查询失败!") {
					document.getElementById('user_data_td').innerHTML = "<h2 class=\"sub-header\" >查询邮件地址数据失败！</h2>";
				} else {
					var res = eval('(' + result + ')');
					var datajson = res['data'];
					var total_num = res['total_num'];
					//总记录数
					var page_size = res['page_size'];
					//每页数量
					var page_cur = res['page'];
					//当前页
					var page_total_num = res['page_total_num'];
					//总页数
					//	id	name	address	user_name	c_time	describe
					
					
					var datahtml ="<div id=\"mail\"> <h2 class=\"sub-header\">邮件地址</h2><div class=\"table-responsive\"><table class=\"table table-striped\"><tr><th style=\"width:150px\">名字</th><th style=\"width:150px\">邮件地址</th><th style=\"width:100px\">添加时间</th><th style=\"width:90px\">操作</th></tr>";
					for (var i = 0; i < datajson.length; i++) {
					
						var elehtml = "<tr>";
						//elehtml +="<td>" + datajson[i]['id'] + "</td>";
						elehtml += "<td>" + datajson[i]['mailname'] + "</td>";
						elehtml += "<td>" + datajson[i]['s_mail'] + "</td>";
						elehtml += "<td>" + datajson[i]['create_time'] + "</td>";
						elehtml += "<td><div class=\"btn-group\">";
						elehtml += "<button type=\"button\" class=\"btn btn-xs btn-primary\" data-toggle=\"modal\" data-target=\"#modifyMail\" onclick=\"showmaildata("+datajson[i]['id']+")\">修改</button>";
						elehtml +="<button type=\"button\" class=\"btn btn-xs btn-danger\" data-toggle=\"modal\" data-target=\"#delMail\" onclick=\"setdeleteId("+datajson[i]['id']+")\">删除</button>";
						
					
						elehtml +="</div></td></tr>";
						datahtml += elehtml;
					}
					datahtml+=" </table></div></div>";
					var pagehtml = "<div class=\"pageBox\" style=\"text-align: center;\"> <nav><ul class=\"pagination\">" + getPageBar(page_cur , total_num, page_size, page_total_num) + "</ul></nav></div>";
					datahtml += pagehtml + "</div>";
					
					
 					$("#user_data_td").html(datahtml);
				}
			},
			error : function(result) {
				alert(result.responseText,"获取异常");
			},
		});
	};

	//获取页码HTML
function getPageBar(page_cur , total_num, page_size, page_total_num) {//js生成分页
		if (page_cur > page_total_num)
			page_cur = page_total_num;
		//当前页大于最大页数
		if (page_cur < 1)
			page_cur = 1;
		//当前页小于1
		page_str = "<li><span  style=\"color:black;border:0px;\">共" + total_num + "条      " + page_cur + "/" + page_total_num + "</span></li>";
		if (page_cur == 1) {//若是第一页
			page_str += "<li class=\"disabled\"><span>首页</span></li><li class=\"disabled\"><span>上一页</span></li>";
		} else {
			page_str += "<li><a href='javascript:void(0)' class=\"userinfo_p\" data-page='1'>首页</a></li><li><a href='javascript:void(0)' class=\"userinfo_p\" data-page='" + (page_cur - 1) + "'>上一页</a></li>";
		}
		if (page_cur >= page_total_num) {//若是最后页
			page_str += "<li class=\"disabled\"><span>下一页</span></li><li class=\"disabled\"><span >尾页</span></li>";
		} else {
			page_str += "<li><a href='javascript:void(0)' class=\"userinfo_p\" data-page='" + (parseInt(page_cur) + 1) + "'>下一页</a></li><li><a href='javascript:void(0)' class=\"userinfo_p\" data-page='" + page_total_num + "'>尾页</a></li>";
		}
		return page_str;
	};

function showcasedata(id){
		r_type="caseinfo";
		setOutHtml(CURURL+"/admin.php?s=caseupdate.html",id,loadedUpdateCase);
}
function shownewsdata(id){
		r_type="newsinfo";
		setOutHtml(CURURL+"/admin.php?s=newsupdate.html",id,loadedUpdateNews);
}
function showbannerdata(id){
		r_type="bannerinfo";
		setOutHtml(CURURL+"/admin.php?s=bannerupdate.html",id,loadedUpdateBanner);
}
function showuserdata(id){
		r_type="userinfo";
		setOutHtml(CURURL+"/admin.php?s=userupdate.html",id,loadedUpdateUser);
}
function showmaildata(id){
		r_type="mailinfo";
		setOutHtml(CURURL+"/admin.php?s=mailupdate.html",id,loadedUpdateMail);
}
function caseUpdateSummit(form){
	if(!form){
	form=document.getElementById("fmCaseUpdate");
	}
	if(checkCaseSubmit(form,true)==true){
		updatecasedata("caseupdate");
	}
}
function newsUpdateSummit(form){
	if(!form){
	form=document.getElementById("fmNewsUpdate");
	}
	if(checkNewsSubmit(form,true)==true){
		updatenewsdata("newsupdate");
	}
}
function bannerUpdateSummit(form){
	if(!form){
	form=document.getElementById("fmBannerUpdate");
	}
	if(checkBannerSubmit(form,true)==true){
		updatebannerdata("bannerupdate");
	}
}
function userUpdateSummit(form){
	if(!form){
	form=document.getElementById("fmUserUpdate");
	}
	if(checkUserSubmit(form,true)==true){
		updateuserdata("userupdate");
	}
}
function mailUpdateSummit(form){
	if(!form){
	form=document.getElementById("fmMailUpdate");
	}
	if(checkMailSubmit(form,true)==true){
		updatemaildata("mailupdate");
	}
}

function resetCase(){
		document.getElementById("fmCaseInsert").reset();
		document.getElementById("casethumbinal").src="";
		document.getElementById("caseqrcode").src="";
}
function resetNews(){
		document.getElementById("fmNewsInsert").reset();
		document.getElementById("newsthumbinal").src="";
		document.getElementById('newsdate').valueAsDate = new Date();
		var htmlEditor=window.frames["newsiframe"].newseditor;
		var htmlContent=htmlEditor.html();
		htmlEditor.html("");
}
function resetBanner(){
		document.getElementById("fmBannerInsert").reset();
		document.getElementById("bannerthumbinal").src="";
}
function resetMail(){
		document.getElementById("fmMailInsert").reset();
}
function backCase(){
		var id= document.getElementById('caseid').value;
		document.getElementById("fmCaseUpdate").reset();
		document.getElementById("casethumbinal").src="";
		document.getElementById("caseqrcode").src="";
		loadedUpdateCase(id);
}
function backNews(){
		var id= document.getElementById('newsid').value;
		document.getElementById("fmNewsUpdate").reset();
		document.getElementById("newsthumbinal").src="";
		document.getElementById('newsdate').valueAsDate = new Date();
		var htmlEditor=window.frames["newsiframe"].newseditor;
		var htmlContent=htmlEditor.html();
		htmlEditor.html("");
		//if($isCancel==true){			
		//	var res=getAllUploadImagePath(htmlContent);
		//	if(res){
		//		deleteNewsImage(res);
		//	}
		//}	
		loadedUpdateNews(id);
		loadNewsData();
}
function backBanner(){
		var id= document.getElementById('bannerid').value;
		document.getElementById("fmBannerUpdate").reset();
		document.getElementById("bannerthumbinal").src="";
		loadedUpdateBanner(id);
}
function backUser(){
		var id= document.getElementById('userid').value;
		document.getElementById("fmUserUpdate").reset();
		loadedUpdateUser(id);
}
function backMail(){
		var id= document.getElementById('mailid').value;
		document.getElementById("fmMailUpdate").reset();
		loadedUpdateMail(id);
}
function updatecasedata(rtype){
		document.getElementById("casetoken").value=getCookie('atoken');
		var formData = new FormData($("#fmCaseUpdate")[0]);
		$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=updatecase",
				data : formData,
				autoSubmit: false,
           		async: false,
           		cache: false,
           		contentType: false,
           		processData: false,
				enctype: 'multipart/form-data',
				dataType : "json",
				success : function(result) { 
					if (result == "success") {
						alert("修改成功！","提示");
					document.body.className="";
					//var div=document.getElementById("modifyFade");
					//div.className="modal-backdrop fade";
					//div.style.display="none";
					//var parentElement=document.getElementById("modifyCase");
					//parentElement.className="modal fade";
					//parentElement.style.display="none";
						getCaseData(1);
					} 
					else if (result == "failed") {
						alert("修改失败！","提示");
					} else{
						alert("修改异常！"+result,"异常");
					}
				},
				error : function(result) {
						alert("修改异常！"+result.responseText,"异常");
				},
			});
	}
function updatenewsdata(rtype){
		document.getElementById("newstoken").value=getCookie('atoken');
		var htmlEditor=window.frames["newsiframe"].newseditor;
		var htmlContent= htmlEditor.html();
		document.getElementById("newshtmlcontent").value=htmlContent;
		var formData = new FormData($("#fmNewsUpdate")[0]);
		$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=updatenews",
				data : formData,
				autoSubmit: false,
           		async: false,
           		cache: false,
           		contentType: false,
           		processData: false,
				enctype: 'multipart/form-data',
				dataType : "json",
				success : function(result) { 
					if (result == "success") {
						alert("修改成功！","提示");
						getNewsData(1);
					} 
					else if (result == "failed") {
						alert("修改失败！","提示");
					} else{
						alert("修改异常！"+result,"异常");
					}
				},
				error : function(result) {
						alert("修改异常！"+result.responseText,"异常");
				},
			});
	}
	
function updatebannerdata(rtype){
		document.getElementById("bannertoken").value=getCookie('atoken');
		var formData = new FormData($("#fmBannerUpdate")[0]);
		$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=updatebanner",
				data : formData,
				autoSubmit: false,
           		async: false,
           		cache: false,
           		contentType: false,
           		processData: false,
				enctype: 'multipart/form-data',
				dataType : "json",
				success : function(result) { 
					if (result == "success") {
						alert("修改成功！","提示");
					document.body.className="";
						getBannerData(1);
					} 
					else if (result == "failed") {
						alert("修改失败！","提示");
					} else{
						alert("修改异常！"+result,"异常");
					}
				},
				error : function(result) {
						alert("修改异常！"+result.responseText,"异常");
				},
			});
	}
function updateuserdata(rtype){
		document.getElementById("usertoken").value=getCookie('atoken');
		var formData = new FormData($("#fmUserUpdate")[0]);
		$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=updateapplyuser",
				data : formData,
				autoSubmit: false,
           		async: false,
           		cache: false,
           		contentType: false,
           		processData: false,
				enctype: 'multipart/form-data',
				dataType : "json",
				success : function(result) { 
					if (result == "success") {
						alert("修改成功！","提示");
					document.body.className="";
						getUserData(1);
					} 
					else if (result == "failed") {
						alert("修改失败！","提示");
					} else{
						alert("修改异常！"+result,"异常");
					}
				},
				error : function(result) {
						alert("修改异常！"+result.responseText,"异常");
				},
			});
	}
	
function updatemaildata(rtype){
		document.getElementById("mailtoken").value=getCookie('atoken');
		var formData = new FormData($("#fmMailUpdate")[0]);
		$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=updatemail",
				data : formData,
				autoSubmit: false,
           		async: false,
           		cache: false,
           		contentType: false,
           		processData: false,
				enctype: 'multipart/form-data',
				dataType : "json",
				success : function(result) { 
					if (result == "success") {
						alert("修改成功！","提示");
					document.body.className="";
						getMailData(1);
					} 
					else if (result == "failed") {
						alert("修改失败！","提示");
					} else{
						alert("修改异常！"+result,"异常");
					}
				},
				error : function(result) {
						alert("修改异常！"+result.responseText,"异常");
				},
			});
	}
	function undeletedata(){
		del_id=-1;
	}
	function setdeleteId(id){
		del_id=id;
	}
function deletedata(rtype){
	if(del_id!=-1){
		$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=delete",
				data : {
					dtype : rtype,
					did:del_id,
					token:getCookie('atoken'),
				},
				dataType : "json",
				success : function(result) { 
					if (result == "success") {
						alert("删除成功！","提示",100);
						if(r_type=="caseinfo"){
							getCaseData(1);
						}
						else if(r_type=="newsinfo"){
							getNewsData(1);
						}
						else if(r_type=="bannerinfo"){
							getBannerData(1);
						}
						else if(r_type=="userinfo"){
							getUserData(1);
						}
						else if(r_type=="mailinfo"){
							getMailData(1);
						}
					} 
					else if (result == "failed") {
						alert("删除失败！","提示");
					} else{
						alert("删除异常！"+result,"异常");
					}
				},
				error : function(result) {
						alert("删除异常！"+result.responseText,"异常");
				},
			});
		}
	}

function caseSummit(form){
		if(checkCaseSubmit(form,false)==true){
			caseInsert();
		}
	}
function checkCaseSubmit(form,isupdate){
	var casethumbinalselect=document.getElementById("thumbinalselect");   
	var caseqrcodeselect=document.getElementById("qrcodeselect");   
	//if(isupdate==true)
	{
		if(form.casetitle.value==""){
			form.casetitle.focus();
			alert("标题不能为空！","提示");
			return false;
		}
		else if(form.casethumbinal.src==""||(casethumbinalselect.files.length<1&&isupdate==false)){
			form.casethumbinal.focus();
			alert("缩略图不能为空！","提示");
			return false;
		}
		else if(form.caseqrcode.src==""||(caseqrcodeselect.files.length<1&&isupdate==false)){
			form.caseqrcode.focus();
			alert("二维码不能为空！","提示");
			return false;
		}
		return true;
	}
}
function bannerSummit(form){
		if(checkBannerSubmit(form,false)==true){
			bannerInsert();
		}
	}
function checkBannerSubmit(form,isupdate){
	var bannerthumbinalselect=document.getElementById("thumbinalselect");   
	//if(isupdate==true)
	{
		if(form.bannerurl.value==""){
			form.bannerurl.focus();
			alert("相关链接不能为空！","提示");
			return false;
		}
		else if(form.bannerthumbinal.src==""||(bannerthumbinalselect.files.length<1&&isupdate==false)){
			form.casethumbinal.focus();
			alert("Banner图不能为空！","提示");
			return false;
		}
		return true;
	}
}
function checkUserSubmit(form,isupdate){ 
	//if(isupdate==true)
	{
		if(form.usercompany.value==""){
			form.usercompany.focus();
			alert("公司不能为空！","提示");
			return false;
		}
		else if(form.username.value==""){
			form.username.focus();
			alert("联系人不能为空！","提示");
			return false;
		}
		else if(form.userphone.value==""){
			form.userphone.focus();
			alert("手机不能为空！","提示");
			return false;
		}
		else if(form.usermail.value==""){
			form.usermail.focus();
			alert("邮箱不能为空！","提示");
			return false;
		}
		return true;
	}
}
function checkMailSubmit(form,isupdate){ 
	//if(isupdate==true)
	{
		if(form.sendname.value==""){
			form.sendname.focus();
			alert("名字不能为空！","提示");
			return false;
		}
		else if(form.sendmail.value==""){
			form.sendmail.focus();
			alert("邮件地址不能为空！","提示");
			return false;
		}
		return true;
	}
}
function checkNewsSubmit(form,isupdate){
	var newsthumbinalselect=document.getElementById("newsthumbinalselect");   
		if(form.newstitle.value==""){
			form.newstitle.focus();
			alert("标题不能为空！","提示");
			return false;
		}
		else if(form.newsdate.value==""){
			form.newsdate.focus();
			alert("时间不能为空！","提示");
			return false;
		}
		else if(form.newsthumbinal.src==""||(newsthumbinalselect.files.length<1&&isupdate==false)){
			form.newsthumbinal.focus();
			alert("缩略图不能为空！","提示");
			return false;
		}
		else if(form.newsdescribe.value==""){
			form.newsdescribe.focus();
			alert("描述不能为空！","提示");
			return false;
		}
		else{			
			var htmlEditor=window.frames["newsiframe"].newseditor;
			if(htmlEditor.html()==""){
				htmlEditor.focus();
				alert("动态页面不能为空！","提示");
			return false;
			}
			else{
			return true;
			}
		}
			return true;
}
function caseInsert( ){
		document.getElementById("casetoken").value=getCookie('atoken');
		var formData = new FormData($( "#fmCaseInsert" )[0]);
		$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=addcase",
           		data:formData,
           		autoSubmit: false,
           		async: false,
           		cache: false,
           		contentType: false,
           		processData: false,
				enctype: 'multipart/form-data',
				dataType : "json",
				success : function(result) { 
					if (result.status == 1||result=="success") {
						alert("添加成功！","提示");
						resetCaseAdd();
					} 
					else if (result == "failed") {
						alert("添加失败！","提示");
					} else{
						alert("添加异常！"+result,"异常");
					}
				},
				error : function(result) {
						alert("添加异常！"+result.responseText,"异常");
				},
			});
	}
function bannerInsert( ){
		document.getElementById("bannertoken").value=getCookie('atoken');
		var formData = new FormData($( "#fmBannerInsert" )[0]);
		$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=addbanner",
           		data:formData,
           		autoSubmit: false,
           		async: false,
           		cache: false,
           		contentType: false,
           		processData: false,
				enctype: 'multipart/form-data',
				dataType : "json",
				success : function(result) { 
					if (result.status == 1||result=="success") {
						alert("添加成功！","提示");
						resetBannerAdd();
					} 
					else if (result == "failed") {
						alert("添加失败！","提示");
					} else{
						alert("添加异常！"+result,"异常");
					}
				},
				error : function(result) {
						alert("添加异常！"+result.responseText,"异常");
				},
			});
	}
function uploadCaseImg( ){
		document.getElementById("casetoken").value=getCookie('atoken');
		var formData = new FormData($( "#fmCaseInsert" )[0]);
		$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=caseFileUpload",
           		data:formData,
           		autoSubmit: false,
           		async: false,
           		cache: false,
           		contentType: false,
           		processData: false,
				enctype: 'multipart/form-data',
				dataType : "json",
				success : function(result) { 
					if (result.status == 1) {
						document.getElementById("casethumbinalpath").value=result.info["thumbinalpath"];
						document.getElementById("caseqrcodepath").value=result.info["qrcodepath"];
						caseInsert();
					} 
					else if (result == "failed") {
						alert("添加失败！","提示");
					} else{
						alert("添加异常！"+result,"异常");
					}
				},
				error : function(result) {
						alert("添加异常！"+result.responseText,"异常");
				},
			});
	} 

function newsSummit(form){
	if(checkNewsSubmit(form,false)==true){
		newsInsert();
	}
}
function newsInsert( ){
		document.getElementById("newstoken").value=getCookie('atoken');
		var htmlEditor=window.frames["newsiframe"].newseditor;
		var htmlContent= htmlEditor.html();
		document.getElementById("newshtmlcontent").value=htmlContent;
		var formData = new FormData($( "#fmNewsInsert" )[0]);
		$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=addnews",
           		data:formData,
           		autoSubmit: false,
           		async: false,
           		cache: false,
           		contentType: false,
           		processData: false,
				enctype: 'multipart/form-data',
				dataType : "json",
				success : function(result) { 
					if (result.status == 1||result=="success") {
						alert("添加成功！","提示");
						resetNewsAdd(false);
					} 
					else if (result == "failed") {
						alert("添加失败！","提示");
					} else{
						alert("添加异常！"+result,"异常");
					}
				},
				error : function(result) {
						alert("添加异常！"+result.responseText,"异常");
				},
			});
	}
	
function mailSummit(form){
	if(checkMailSubmit(form,false)==true){
		mailInsert();
	}
}
function mailInsert( ){
		document.getElementById("mailtoken").value=getCookie('atoken');
		var formData = new FormData($( "#fmMailInsert" )[0]);
		$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=addmail",
           		data:formData,
           		autoSubmit: false,
           		async: false,
           		cache: false,
           		contentType: false,
           		processData: false,
				enctype: 'multipart/form-data',
				dataType : "json",
				success : function(result) { 
					if (result.status == 1||result=="success") {
						alert("添加成功！","提示");
						resetMail();
					} 
					else if (result == "failed") {
						alert("添加失败！","提示");
					} else{
						alert("添加异常！"+result,"异常");
					}
				},
				error : function(result) {
						alert("添加异常！"+result.responseText,"异常");
				},
			});
	}
	
function getCookie(name)
	{
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
		else
		return null;
	}

function setCaseImageQrcode(){
	  var docObj=document.getElementById("qrcodeselect");   
        var imgObjPreview=document.getElementById("caseqrcode");  
        if(docObj.files &&docObj.files[0])  
        {  
            //火狐下，直接设img属性   
            //imgObjPreview.style.width = '200px';  
            //imgObjPreview.style.height = '200px';                      
           //imgObjPreview.src = docObj.files[0].getAsDataURL();  
           //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式    
            imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);  
        }
      
         return true;  
	}

function setBannerImageThumbinal(){
	  var docObj=document.getElementById("thumbinalselect");   
        var imgObjPreview=document.getElementById("bannerthumbinal");  
        if(docObj.files &&docObj.files[0])  
        {  
            //火狐下，直接设img属性   
            //imgObjPreview.style.width = '200px';  
            //imgObjPreview.style.height = '200px';                      
           //imgObjPreview.src = docObj.files[0].getAsDataURL();  
           //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式    
            imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);  
        }
      
         return true;  
	}

function setCaseImageThumbinal()   
	{  
        var docObj=document.getElementById("thumbinalselect");   
        var imgObjPreview=document.getElementById("casethumbinal");  
        if(docObj.files &&docObj.files[0])  
        {  
            //火狐下，直接设img属性   
            //imgObjPreview.style.width = '200px';  
            //imgObjPreview.style.height = '200px';                      
           //imgObjPreview.src = docObj.files[0].getAsDataURL();  
           //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式    
            imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);  
        } 
         return true;  
 	} 


function setNewsImageThumbinal()   
	{  
        var docObj=document.getElementById("newsthumbinalselect");   
        var imgObjPreview=document.getElementById("newsthumbinal");  
        if(docObj.files &&docObj.files[0])  
        {  
            //火狐下，直接设img属性   
            //imgObjPreview.style.width = '200px';  
            //imgObjPreview.style.height = '200px';                      
           //imgObjPreview.src = docObj.files[0].getAsDataURL();  
           //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式    
            imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);  
        } 
         return true;  
 	} 

function setImgSize(img){
	// 判断是否有缓存
		if(img.width>=img.height){
			img.style.width="200px";
		}
		else{
			img.style.height="200px";
		}
}

function resetCaseAdd(){
		document.getElementById("fmCaseInsert").reset();
		document.getElementById("casethumbinal").src="";
		document.getElementById("caseqrcode").src="";
	}
function resetBannerAdd(){
		document.getElementById("fmBannerInsert").reset();
		document.getElementById("bannerthumbinal").src="";
	}
	
function resetNewsAdd($isCancel){
		document.getElementById("fmNewsInsert").reset();
		document.getElementById("newsthumbinal").src="";
		document.getElementById('newsdate').valueAsDate = new Date();
		var htmlEditor=window.frames["newsiframe"].newseditor;
		var htmlContent=htmlEditor.html();
		htmlEditor.html("");
		if($isCancel==true){			
			var res=getAllUploadImagePath(htmlContent);
			if(res){
				deleteNewsImage(res);
			}
		}		
	}
	
function deleteNewsImage(imagelist){
		$.ajax({
				type : "Post",
				url : "admin.php?m=Admin&c=Index&a=deleteImage",
           		data:{
					imagelist : imagelist,
					token:getCookie('atoken'),
				},
				success : function(result) { 
					if (result.status == 1||result=="success") {
					} 
					else if (result == "failed") {
					} else{
					}
				},
				error : function(result) {
				},
			});
	}

//表示全局唯一标识符 (GUID)。
function Guid(g){
     var arr = new Array(); //存放32位数值的数组
     if (typeof(g) == "string"){ //如果构造函数的参数为字符串
         InitByString(arr, g);
     }
     else{
         InitByOther(arr);
     }

     //返回一个值，该值指示 Guid 的两个实例是否表示同一个值。
     this.Equals = function(o){
         if (o && o.IsGuid){
              return this.ToString() == o.ToString();
         }
         else{
              return false;
         }
     }

     //Guid对象的标记
     this.IsGuid = function(){}
     //返回 Guid 类的此实例值的 String 表示形式。
     this.ToString = function(format){
         if(typeof(format) == "string"){
              if (format == "N" || format == "D" || format == "B" || format == "P"){
                   return ToStringWithFormat(arr, format);
              }
              else{
                   return ToStringWithFormat(arr, "D");
              }
         }
         else{
              return ToStringWithFormat(arr, "D");
         }
     }

     //由字符串加载
     function InitByString(arr, g){
         g = g.replace(/\{|\(|\)|\}|-/g, "");
         g = g.toLowerCase();
         if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1){
              InitByOther(arr);
         }
         else{
              for (var i = 0; i < g.length; i++){
                   arr.push(g[i]);
              }
         }
     }

     //由其他类型加载
     function InitByOther(arr){
         var i = 32;
         while(i--){
              arr.push("0");
         }
     }

     /*
     根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。
     N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx}
     P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
     */
     function ToStringWithFormat(arr, format){
         switch(format){
              case "N":
                   return arr.toString().replace(/,/g, "");
              case "D":
                   var str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20,32);
                   str = str.replace(/,/g, "");
                   return str;
              case "B":
                   var str = ToStringWithFormat(arr, "D");
                   str = "{" + str + "}";
                   return str;
              case "P":
                   var str = ToStringWithFormat(arr, "D");
                   str = "(" + str + ")";
                   return str;
              default:
                   return new Guid();
         }
     }
}

//Guid 类的默认实例，其值保证均为零。
Guid.Empty = new Guid();
//初始化 Guid 类的一个新实例。
Guid.NewGuid = function(){
     var g = "";
     var i = 32;
     while(i--){
         g += Math.floor(Math.random()*16.0).toString(16);
     }
     return new Guid(g);
}

