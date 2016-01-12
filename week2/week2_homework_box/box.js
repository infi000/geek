 function showTime() {
     var now = new Date();
     var year = now.getFullYear();
     var month = now.getMonth();
     var day = now.getDate();
     var hours = now.getHours();
     if (hours < 10) {
         hours = "0" + hours
     };
     var minutes = now.getMinutes();
     if (minutes < 10) {
         minutes = "0" + minutes
     };
     var seconds = now.getSeconds();
     if (seconds < 10) {
         seconds = "0" + seconds;
     };

     var weekday = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"];
     document.all.clock.innerHTML = hours + ":" + minutes + ":" + seconds;
     //一秒刷新一次显示时间
     setTimeout(showTime, 1000);
 }
