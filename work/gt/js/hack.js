if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.") {
    document.getElementById("hackcss1").href = "css/hackie89.css"; //根据ID改变style的href路径
    document.getElementById("hackcss2").href = "css/sidangerous.swiper.css"; //根据ID改变style的href路径
    document.getElementById("hackjs3").src = "js/idangerous.swiper.min.js"; //根据ID改变js的href路径

} else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i) == "9.") {
    document.getElementById("hackcss1").href = "css/hackie89.css"; //根据ID改变style的href路径
    document.getElementById("hackcss2").href = "css/sidangerous.swiper.css"; //根据ID改变style的href路径
    document.getElementById("hackjs3").src = "js/idangerous.swiper.min.js"; //根据ID改变js的href路径
} else {
    document.getElementById("hackcss1").href = "css/swiper-3.3.1.min.css"; //根据ID改变css的href路径
      document.getElementById("hackcss2").href = ""; //根据ID改变style的href路径
    document.getElementById("hackjs3").src = "js/swiper-3.3.1.jquery.min.js"; //根据ID改变js的href路径
}
