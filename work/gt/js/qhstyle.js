$(function(){
		   var max_file_count=4;
		 var innerwidth=860;
		 var mousedown_x=0;
		 var is_mousedown=false;
         //��껬��banner�����Ұ�ť������ʾ������

         $(".banner").hover(function(){

                   $(".lr").show();

         },function(){

                   $(".lr").hide();

         });


         var a=0;
         //��������С��ť��ͼƬ���������л�Ч��

         $(".anniu li").click(function(){

                   $(this).addClass("on").siblings().removeClass("on");
					//innerwidth=document.body.clientWidth-200;
                   var num=$(this).index();
				   a=num;

                   $(".pic").animate({marginLeft:-innerwidth*num},"slow");
				//document.getElementById('lb_des').value =  document.getElementById('t'+(num+1)+'_des').value;
				   var value=$("#t"+(a+1)+"_des").html();
				   $("#lb_des").html(value);

         });
		 
		 $(".play_video").click(function(e){
					var attrvalue=	e.currentTarget.attributes["imgtype"].nodeValue;
                	window.location.href="play-file.html?type="+attrvalue+"\&playid=t"+(a+1); 
         });

		  $(".pc1").mousedown(function(e){
							mousedown_x=  e.pageX;
							is_mousedown=true;
              });

		  $(".pc1").mouseup(function(e){
				 var x=e.pageX;
				 if((mousedown_x-x)>=max_file_count&&is_mousedown){
					a++;
                   a=a%max_file_count;
					//innerwidth=document.body.clientWidth-200;
                   $(".pic").animate({marginLeft:-innerwidth*a},"slow");

                   $(".anniu li").eq(a).addClass("on").siblings().removeClass("on");
				   var value=$("#t"+(a+1)+"_des").html();
				   $("#lb_des").html(value);
				 }
				 else if((mousedown_x-x)<=-max_file_count&&is_mousedown){
					  a--;
                   a=(a+max_file_count)%max_file_count;

					//innerwidth=document.body.clientWidth-200;
                   $(".pic").animate({marginLeft:-innerwidth*a},"slow");

                   $(".anniu li").eq(a).addClass("on").siblings().removeClass("on");
				   var value=$("#t"+(a+1)+"_des").html();
				   $("#lb_des").html(value);
				 }
				 else{
					var attrvalue=	e.currentTarget.attributes["imgtype"].nodeValue;
                	window.location.href="play-file.html?type="+attrvalue+"\&playid=t"+(a+1); 
				 }
				 is_mousedown=false;
              });

         //ͼƬ�Զ��ֲ�Ч��

         var automatic=setInterval(function(){

                   a++;

                   a=a%max_file_count;

					//innerwidth=document.body.clientWidth-200;
                   $(".pic").animate({marginLeft:-innerwidth*a},"slow");

                   $(".anniu li").eq(a).addClass("on").siblings().removeClass("on");
				   var value=$("#t"+(a+1)+"_des").html();
				   $("#lb_des").html(value);
				//document.getElementById('lb_des').value =  document.getElementById('t'+(num+1)+'_des').value;

         },2000);

         //������Ұ�ť��ͼƬ�����л�Ч��

         $(".pre").click(function(){

                   a--;

                   a=(a+max_file_count)%max_file_count;

					//innerwidth=document.body.clientWidth-200;
                   $(".pic").animate({marginLeft:-innerwidth*a},"slow");

                   $(".anniu li").eq(a).addClass("on").siblings().removeClass("on");
				   var value=$("#t"+(a+1)+"_des").html();
				   $("#lb_des").html(value);

         });

         $(".next").click(function(){

                   a++;

                   a=a%max_file_count;

					//innerwidth=document.body.clientWidth-200;
                   $(".pic").animate({marginLeft:-innerwidth*a},"slow");

                   $(".anniu li").eq(a).addClass("on").siblings().removeClass("on");
				   var value=$("#t"+(a+1)+"_des").html();
				   $("#lb_des").html(value);

         });
		 
});

$(function(){
		 var url = 'http://192.168.1.157/tvmvclient/i.php?m=13060';
		 title = $(document).attr("title");
		 pageurl = location.href;
		$.post(url,{'title':title,'url':pageurl},function(data){
			/*if(data.status){
                   alert(data.msg.replace("\\n","<br/>"));
                          
			}else{
                   alert(data.msg.replace("\\n","<br/>"));
			}*/
		},'json');
    })
