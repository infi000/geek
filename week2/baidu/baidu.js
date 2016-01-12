   window.onload = function() {
           var con_txt = document.getElementById("con_txt");
           var more_tips = document.getElementById("more_tips");
           var headerlist_more = document.getElementById('headerlist_more')
           con_txt.focus();

       }
       // 打开网页光标在搜索栏

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
   // 侧边栏动态
