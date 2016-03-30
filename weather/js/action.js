//天气页面###############################################################################
//把按钮的值放入DATA中通过AJAX得到参数
function getCityweather() {
    var citydata = $(this).find("a").html();

    $.ajax({
        url: 'http://apis.baidu.com/heweather/weather/free',
        type: 'GET',
        dataType: "json",
        data: {
            "city": citydata,
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
            cityL_tmp.html(city7Data[0].tmp.min); //最低温度
            cityH_tmp.html(city7Data[0].tmp.max); //最高温度
            comf.html(cityData.suggestion.comf.brf + "," + cityData.suggestion.comf.txt); //舒适度
            drsg.html(cityData.suggestion.drsg.brf + "," + cityData.suggestion.drsg.txt); //穿衣
            flu.html(cityData.suggestion.flu.brf + "," + cityData.suggestion.flu.txt); //感冒
            sport.html(cityData.suggestion.sport.brf + "," + cityData.suggestion.sport.txt); //运动
            for (var i = 0; i < city7Data.length; i++) {

                $(".weather7_date").eq(i).html(city7Data[i].date);
                $(".weather7_img").eq(i).attr({ "src": "http://files.heweather.com/cond_icon/" + city7Data[i].cond.code_d + ".png" });
                $(".weather7_cond").eq(i).html(city7Data[i].cond.txt_d);
                $(".weather7_max").eq(i).html(city7Data[i].tmp.max);
                $(".weather7_min").eq(i).html(city7Data[i].tmp.min);


            }
         changeWeatherBg()
        }
    })
}
$(".getCityweather").on("click", getCityweather);
//绑定到点击事件到按钮上
function searchCityweather() {
    //查询城市的天气
    var citydata = $(this).closest('.input-group').find(".searchCity").val();
    $.ajax({
        url: 'http://apis.baidu.com/heweather/weather/free',
        type: 'GET',
        dataType: "json",
        data: {
            "city": citydata,
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
            cityL_tmp.html(city7Data[0].tmp.min); //最低温度
            cityH_tmp.html(city7Data[0].tmp.max); //最高温度
            comf.html(cityData.suggestion.comf.brf + "," + cityData.suggestion.comf.txt); //舒适度
            drsg.html(cityData.suggestion.drsg.brf + "," + cityData.suggestion.drsg.txt); //穿衣
            flu.html(cityData.suggestion.flu.brf + "," + cityData.suggestion.flu.txt); //感冒
            sport.html(cityData.suggestion.sport.brf + "," + cityData.suggestion.sport.txt); //运动
            for (var i = 0; i < city7Data.length; i++) {

                $(".weather7_date").eq(i).html(city7Data[i].date);
                $(".weather7_img").eq(i).attr({ "src": "http://files.heweather.com/cond_icon/" + city7Data[i].cond.code_d + ".png" });
                $(".weather7_cond").eq(i).html(city7Data[i].cond.txt_d);
                $(".weather7_max").eq(i).html(city7Data[i].tmp.max);
                $(".weather7_min").eq(i).html(city7Data[i].tmp.min);

            }
        }

    })
    console.log("dd");
    console.log(citydata)
}
$(".searchCityweather").on("click", searchCityweather);

//改变背景
function changeWeatherBg(){
     weatherBg=cityWeather.html();
    if (weatherBg=="晴"){
        {$(".main-weather").css({"background":"url(img/sun.jpg)"})}
    }
  else if(weatherBg=="阴"){
        {$(".main-weather").css({"background":"url(img/mai.png)"})}
    }
    else if(weatherBg=="小雨")
        {$(".main-weather").css({"background":"url(img/rain.png)"})}
};

//天气页面结束
//新闻页面#######################################################################
//翻页
function getnextPage() {
    var page = $(this).html();
    $.ajax({
        url: 'http://apis.baidu.com/showapi_open_bus/channel_news/search_news',
        type: 'GET',
        dataType: "json",
        data: {
            // "channelId": "5572a109b3cdc86cf39001e6",
            "channelName": channelName,
            "page": page
        },
        beforeSend: function(request) {
            request.setRequestHeader('apikey', '6e2948769e7f9ddf97e95ed8225812b5');
        },
        success: function(msg) {
            newsData = msg.showapi_res_body.pagebean.contentlist; //获取新闻数组
            for (var i = 0; i < newsData.length; i++) {
                if (newsData[i].imageurls.length == 0) {
                    imgSrc = "../img/sina.jpg"
                } else {
                    imgSrc = newsData[i].imageurls[0].url
                }
                $(".newsUrl").eq(i).attr({ "href": newsData[i].link })
                $(".newsImg").eq(i).attr({ "src": imgSrc }); //imgURL
                $(".newsTitle").eq(i).html(newsData[i].title); //新闻标题
                $(".newsDesc").eq(i).html(newsData[i].desc + "..."); //新闻段落
                $(".newspubDate").eq(i).html(newsData[i].pubDate); //新闻日期
            };
        }
    })
}
$(".newsPage").on("click", getnextPage);
//切换新闻
function changeChannel(){
    channelName=$(this).html();
     $.ajax({
        url: 'http://apis.baidu.com/showapi_open_bus/channel_news/search_news',
        type: 'GET',
        dataType: "json",
        data: {
            // "channelId": "5572a109b3cdc86cf39001e6",
            "channelName": channelName,
            "page": '1'
        },
        beforeSend: function(request) {
            request.setRequestHeader('apikey', '6e2948769e7f9ddf97e95ed8225812b5');
            console.log(channelName)
        },
        success: function(msg) {
            newsData = msg.showapi_res_body.pagebean.contentlist; //获取新闻数组
            for (var i = 0; i < newsData.length; i++) {
                if (newsData[i].imageurls.length == 0) {
                    imgSrc = "../img/sina.jpg"
                } else {
                    imgSrc = newsData[i].imageurls[0].url
                }
                $(".newsUrl").eq(i).attr({ "href": newsData[i].link })
                $(".newsImg").eq(i).attr({ "src": imgSrc }); //imgURL
                $(".newsTitle").eq(i).html(newsData[i].title); //新闻标题
                $(".newsDesc").eq(i).html(newsData[i].desc + "..."); //新闻段落
                $(".newspubDate").eq(i).html(newsData[i].pubDate); //新闻日期
            };
        }
    })
}
$(".channelName").on("click", changeChannel);