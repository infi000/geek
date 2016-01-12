   window.onload = function() {
           var con_txt = document.getElementById("con_txt");
           var more_tips = document.getElementById("more_tips");
           var headerlist_more = document.getElementById('headerlist_more');
           var set = document.getElementById('set');
           var f_ipt = document.getElementById("f_ipt");
           con_txt.focus();
       }
       // 打开网页光标在搜索栏
       // 设置菜单
   function tips() {
       more_tips.style.display = "block";
       headerlist_more.style.background = "white";
       headerlist_more.style.color = "black";

   }

   function tipsOut() {
       more_tips.style.display = "none";
       headerlist_more.style.background = "#38f";
       headerlist_more.style.color = "white";
   }

   // 侧边栏
   function setshow() {
       set.style.display = "block";
   }

   function setout() {
       set.style.display = "none"
   }

   // 搜索框颜色
   function blue() {
       f_ipt.style.border = "1px solid #3385FF"
   }

   function black() {
       f_ipt.style.border =
           f_ipt.style.border = "1px solid #ccc";


   }
