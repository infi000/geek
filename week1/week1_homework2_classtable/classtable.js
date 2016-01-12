function showTime() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var weekday = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"];
        document.all.show.innerHTML = +year + "年" + (month + 1) + "月" + day + "日 " + hours + ":" + minutes + ":" + seconds + "</br>" + weekday[now.getDay() - 1];
        //一秒刷新一次显示时间
        var timeID = setTimeout(showTime, 1000);
    }