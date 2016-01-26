var data ;
var li1;
var li2;
// $(".sidebar-nav-ul1")

  // <li class="sidebar-nav-li1">
  //                       <h4 class="sidebar-nav-title"><a ><button type="button" class="close xbtn"><span class="glyphicon glyphicon-plus" ></span></button> <i class="iconfont">&#xe61d;</i>统计</a>
  //                   </h4>
  //                       <div class="sidebar-nav2">
  //                           <ul class="sidebar-nav-ul2">
  //                               <li class="sidebar-nav-li2"><a href="">1</a></li>
  //                               <li class="sidebar-nav-li2"><a href="">1</a></li>
  //                               <li class="sidebar-nav-li2"><a href="">1</a></li>
  //                           </ul>
  //                       </div>
  //                   </li>
var li ;
var h4;
var a;
var button;
$.ajax({
	url:"./configure.xml",
	type:"get",
	success: function(msg){
		data=$(msg);
		li1 = data.find("title").eq(0).attr("name");
		li2 = data.find("title").find("child").eq(0).text();
         lixxxx = $("<li>").appendTo($(".sidebar-nav-ul1")).attr("class","sidebar-nav-li1");



         h4 = $("<h4>").appendTo(lixxxx).attr("class","sidebar-nav-title").html(li1);
         a =$("<a>").appendTo(h4);
         button = $("<button>").appendTo(a).attr({class:"close xbtn",type:"button"});
         span= $("<span>").appendTo(button).attr("class","glyphicon glyphicon-plus");
         div=$("<div>").after(h4).attr("class","sidebar-nav2");
         ul = $("<ul>").appendTo(div).attr("class","sidebar-nav-ul2");
         li_2 = $("<li>").appendTo(ul).attr("class","sidebar-nav-li2").html(li2);



	}
});
