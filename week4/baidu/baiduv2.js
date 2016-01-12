   window.onload = function() {
           var con_txt = document.getElementById("con_txt");
           var more_tips = document.getElementById("more_tips");
           var headerlist_more = document.getElementById('headerlist_more');
           var set = document.getElementById("set");
      
           con_txt.focus();

       }
       // 打开网页光标在搜索栏

   function tips() {
       more_tips.style.display = "block";
       headerlist_more.style.background = "rgba(238, 238, 238, 0.44)";
       headerlist_more.style.color = "black";

   }

   function tipsOut() {
       more_tips.style.display = "none";
       headerlist_more.style.background = "#38f";
       headerlist_more.style.color = "white";
   }

   function setshow() {
       set.style.display = "block";
   }

   function setout () {
      set.style.display="none"
   }

   function show(){
     var content = document.getElementById("page-content");
      var control = document.getElementById("page-control");
       var control2 = document.getElementById("page-control-2");
    content.style.display="block"
    control.style.display="none"
    control2.style.display="block"
   }

   function dis(){
      var content = document.getElementById("page-content");
      var control = document.getElementById("page-control");
       var control2 = document.getElementById("page-control-2");
    content.style.display="none"
    control.style.display="block"
    control2.style.display="none"
   }