$('#con_txt').focus();

 // 更多产品菜单
 function listShow() {
     $("#more_tips").show('fast')
 }
 function listHide() {
     $("#more_tips").hide('fast')
 }
 $("#headerlist_more").mouseenter(listShow);
 $("#more_tips").mouseenter(listShow);
 $("#more_tips").mouseleave(listHide);
 //设置
 function setShow() {
     $("#set").fadeIn()
 }
 function setHide() {
     $("#set").fadeOut()
 }
 $("#setout").mouseenter(setShow);
 $("#set").mouseenter(setShow);
 $("#set").mouseleave(setHide);
 //vip
 function vipShow() {
     $("#vip").fadeIn()
 }
 function vipHide() {
     $("#vip").fadeOut()
 }
 $("#vipout").mouseenter(vipShow);
 $("#vip").mouseenter(vipShow);
 $("#vip").mouseleave(vipHide);


 // 点击标签改变内容
 //我的关注
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
     // 推荐
 $('#tuijian').on('click', function() {
         $('.s-content').hide();
         $('#s_content_2').show();
         $('.bg-menu').css({
             'background-color': 'white',
             'color': 'black'
         });
         $('.mine-text').css({
             'color': 'black'
         });
         $('#tuijian').css({
             'background-color': '#9a9da2',
             'color': 'white'
         });
     });
     // 导航
 $('#daohang').on('click', function() {
         $('.s-content').hide();
         $('#s_content_3').show();
         $('.bg-menu').css({
             'background-color': 'white',
             'color': 'black'
         });
         $('.mine-text').css({
             'color': 'black'
         });
         $('#daohang').css({
             'background-color': '#9a9da2',
             'color': 'white'
         });
     });
     // 视频
 $('#shipin').on('click', function() {
         $('.s-content').hide();
         $('#s_content_4').show();
         $('.bg-menu').css({
             'background-color': 'white',
             'color': 'black'
         });
         $('.mine-text').css({
             'color': 'black'
         });
         $('#shipin').css({
             'background-color': '#9a9da2',
             'color': 'white'
         });
     });
     // 购物
 $('#gouwu').on('click', function() {
     $('.s-content').hide();
     $('#s_content_5').show();
     $('.bg-menu').css({
         'background-color': 'white',
         'color': 'black'
     });
     $('.mine-text').css({
         'color': 'black'
     });
     $('#gouwu').css({
         'background-color': '#9a9da2',
         'color': 'white'
     });
 });
