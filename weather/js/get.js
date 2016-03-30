// 天气
var cityName = $(".cityName"); //城市
var pm25 = $(".pm25"); //pm25
var qlty = $(".qlty"); //空气质量
var time = $(".time"); //时间
var cityWeather = $(".cityWeather"); //天气
var cityTemp = $(".cityTemp"); //温度
var cityL_tmp = $(".cityL_tmp"); //最低温度
var cityH_tmp = $(".cityH_tmp"); //最高温度
var cityWD = $(".cityWD"); //风向
var cityWS = $(".cityWS"); //风力
var citySunrise = $(".citySunrise"); //日出时间
var citySunset = $(".citySunset"); //日落时间
var comf = $(".comf"); //舒适指数
var drsg = $(".drsg"); //穿衣指数
var flu = $(".flu"); //感冒指数
var sport = $(".sport"); //运动指数
var getWeather = $.ajax({
    url: 'http://apis.baidu.com/heweather/weather/free',
    type: 'GET',
    dataType: "json",
    data: {
        "city": "北京"
    },
    beforeSend: function(request) {
        request.setRequestHeader('apikey', '6e2948769e7f9ddf97e95ed8225812b5');
    },
    success: function(msg) {
        cityData = msg["HeWeather data service 3.0"][0];
        city7Data = cityData.daily_forecast;
        city3Data = cityData.hourly_forecast;
        cityName.html(cityData.basic.city);
        pm25.html(cityData.aqi.city.pm25); //pm2.5
        qlty.html(cityData.aqi.city.qlty); //空气质量
        time.html(cityData.basic.update.loc); //时间
        cityWeather.html(cityData.now.cond.txt); //天气
        cityTemp.html(cityData.now.tmp); //温度
        cityL_tmp.html(city7Data[0].tmp.min);//最低温度
        cityH_tmp.html(city7Data[0].tmp.max);//最高温度
        comf.html(cityData.suggestion.comf.brf + "," + cityData.suggestion.comf.txt); //舒适度
        drsg.html(cityData.suggestion.drsg.brf + "," + cityData.suggestion.drsg.txt); //穿衣
        flu.html(cityData.suggestion.flu.brf + "," + cityData.suggestion.flu.txt); //感冒
        sport.html(cityData.suggestion.sport.brf + "," + cityData.suggestion.sport.txt); //运动
        for (var i = 0; i < city7Data.length; i++) {
            $(' <li class="list-group-item"><div class="row weather7_row">').appendTo($(".weather7_ul"));
            $('<div class="col-xs-4"><span class="weather7_date"></div><div class="col-xs-4"><img class="weather7_img"></img><span class="weather7_cond"></span></div><div class="col-xs-4"><div class="weather7_maxmin"><span class="weather7_max"></span><span class="weather7_min"></span></div></div>').appendTo($(".weather7_row").eq(i));
            $(".weather7_date").eq(i).html(city7Data[i].date);
            $(".weather7_img").eq(i).attr({"src":"http://files.heweather.com/cond_icon/"+city7Data[i].cond.code_d+".png"});
            $(".weather7_cond").eq(i).html(city7Data[i].cond.txt_d);
            $(".weather7_max").eq(i).html(city7Data[i].tmp.max);
            $(".weather7_min").eq(i).html(city7Data[i].tmp.min);

        }

    }

})
//天气结束
//新闻
var channelName="体育最新";
var getNews = $.ajax({
    url: 'http://apis.baidu.com/showapi_open_bus/channel_news/search_news',
    type: 'GET',
    dataType: "json",
    data: {
        "channelName":channelName,"page":"1"
    },
    beforeSend: function(request) {
        request.setRequestHeader('apikey', '6e2948769e7f9ddf97e95ed8225812b5');
    },
    success: function(msg) {
         newsData=msg.showapi_res_body.pagebean.contentlist;//获取新闻数组
        for (var i = 0; i < newsData.length; i++) {
        $('<li class="list-group-item newsList-li"><img class="newsImg"><div class="newsBox"><a href="" class="newsUrl"><h4 class="newsTitle"></h4></a><p class="newsDesc"></p><span class="newspubDate label label-danger"></span></div></li>').appendTo($('.newsList-ul'));
        //动态渲染dom
        if(newsData[i].imageurls.length==0)
        {
            imgSrc="../img/sina.jpg"
        }else{
            imgSrc=newsData[i].imageurls[0].url
        }
        $(".newsUrl").eq(i).attr({"href":newsData[i].link})
         $(".newsImg").eq(i).attr({"src":imgSrc});//imgURL
        $(".newsTitle").eq(i).html(newsData[i].title);//新闻标题
        $(".newsDesc").eq(i).html(newsData[i].desc+"...");//新闻段落
        $(".newspubDate").eq(i).html(newsData[i].pubDate);//新闻日期
        };
       

}})

// "channelId": "5572a109b3cdc86cf39001e6",


//新闻结束
