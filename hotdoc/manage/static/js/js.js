/*
//自定义单选框or复选框

*/
$(function(){
	  //头部导航
      $(".home").find("img").mouseover(function(){
        $(this).hide();
        $(".home").find("span").show();
      });
      $(".home").find("span").mouseout(function(){
        $(this).hide();
        $(".home").find("img").show();
      });
      $(".serimg").mouseover(function(){
        $(this).hide();
        $(".serword").stop().animate({"width":96});
      
        $(".serword").show();
      });
      $(".serword").mouseout(function(){
        if($(this).attr("isfold")=="0"){
            $(".serword").stop().animate({"width":0},function(){
                $(".serword").hide(); 
                  $(".serimg").show(); 
            });
        }
      });

      $(".serword").click(function(event){
        if($(this).attr("isfold")=="0"){
            $(this).attr("isfold","1");
            $(this).addClass("serfold");
            $(".foldMenu").slideDown();
        }else{
            $(this).removeClass("serfold");
            $(".foldMenu").slideUp();
            $(this).attr("isfold","0");
        }
        if($(".lk").attr("issel")=="1"){
            $(".lk").attr("issel","0");
            $(".lk").find("img").attr("src","/manage/static/images/down.png");
            $(".userInfo").slideUp();
        }
        event.stopPropagation();
      });
      if($(".msg").find("div").html() ==""){
        $(".msg").find("div").hide();
      }else{
        $(".msg").find("div").show();
      }
      $(".lk").click(function(event){
        if($(this).attr("issel")=="0"){
          $(this).find("img").attr("src","/manage/static/images/up.png");
          $(this).attr("issel","1");
          $(".userInfo").slideDown();
        }else{
          $(this).attr("issel","0");
          $(this).find("img").attr("src","/manage/static/images/down.png");
          $(".userInfo").slideUp();
        }

         if($(".serword").attr("isfold")=="1"){
            $(".serword").removeClass("serfold");
            $(".foldMenu").stop().slideUp();
            $(".serword").attr("isfold","0");
            $(".serword").animate({"width":0},function(){
                 $(".serword").hide(); 
                 $(".serimg").show(); 
            });
        }
        event.stopPropagation();
      });

      $(".dst_name").click(function(event){
        $(".lk").click();
        event.stopPropagation();
      });
  $(document).click(function(){
        if($(".serword").attr("isfold")=="1"){
            $(".serword").removeClass("serfold");
            $(".foldMenu").stop().slideUp();
            $(".serword").attr("isfold","0");
            $(".serword").animate({"width":0},function(){
                 $(".serword").hide(); 
                 $(".serimg").show(); 
            });
        }

        if($(".lk").attr("issel")=="1"){
            $(".lk").attr("issel","0");
            $(".lk").find("img").attr("src","/manage/static/images/down.png");
            $(".userInfo").slideUp();
        }
  });
});

//top js end

 $(".baseinfo").css("min-height",$(window).height()-130+"px");
function makeUpRadio(name){
	var aObj=document.getElementsByName(name);
	var aSpan = [];
	for(var i=0;i<aObj.length;i++){

		var oS = document.createElement('span');
		oS.className='myRadio_off';
		aSpan.push(oS);
		aObj[i].parentNode.insertBefore(oS,aObj[i]);
		aObj[i].style.display='none';
		
		(function(index){
			oS.onclick=function(){
				for(var i=0;i<aSpan.length;i++){
					aSpan[i].className='myRadio_off';
				}
				this.className='myRadio_on';
				aObj[index].checked=true;

			};
		})(i);
	}
}
function addMouseWheel(obj,fn){
	if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',fnWheel,false);
	}else{

		obj.onmousewheel=fnWheel;
	}

	function fnWheel(ev){
	    var oEvent=ev||event;
		var down=true;
        down=oEvent.wheelDelta?(oEvent.wheelDelta<0):(oEvent.detail>0);
        fn&&fn(down);
		oEvent.preventDefault&&oEvent.preventDefault();
		return false;
	}
}


  //弹出层
    function msgBoxShow(showDiv,str){
        $(".del_dilog").css({"width":$(window).width(),"height":$(window).height()});
        $(".dialog").css({"width":$(document).width(),"height":$(document).height()});
        _scrollTop=$(window).scrollTop();
        $(".del_dilog").css({"top":_scrollTop+ "px"});//设置position 
        $(".del_dilog").show();
        $(".dialog").show();
        $("."+showDiv+"").show();
    
    }
    function msgBoxHide(hideDiv){
      $(".del_dilog").hide();
      $("."+hideDiv+"").hide();
      $(".dialog").hide();
    }

    //编辑框获得焦点 改变边框
    function changeBorder(className){
        $("."+className+"").focus(function(){
        	$(this).addClass("textbg");
        });
          $("."+className+"").blur(function(){
        	$(this).removeClass("textbg");
        });

    }



