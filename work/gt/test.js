  var adUrl = "/gt/gt_data/film/videos/adVideo.mp4" //广告文件地址
      // var adUrl = "/gt/gt_data/film/videos/adImg.jpg" //广告文件地址
  var thisURL = document.URL; //当前IP
  var filename = ""; //文件名
  var filetype = ""; //文件类型
  var getval = thisURL.split('?')[1]; //切割IP取问号后面部分
  var video = $("#video");
  var videoTime;
  var h1= $("h1");
  // var array_parm = getval.split("\&");
  // //切割路由 
  // for (var i = 0; i < array_parm.length; i++) {
  //     var keyvalues = array_parm[i].split("=");
  //     var key = keyvalues[0];
  //     var value = keyvalues[1];
  //     if (key == "playid") {
  //         filename = value;
  //     } else if (key == "type") {
  //         filetype = value;
  //     }
  // }

  // var showval = ""; //播放路径
  // if (filetype == "film") {
  //     showval = "\\gt\\gt_data\\film\\videos\\" + filename + ".mp4";
  // } else if (filetype == "tv") {
  //     showval = "\\gt\\gt_data\\tv\\videos\\" + filename + ".mp4";
  // } else if (filetype == "music_rcm") {
  //     showval = "\\gt\\gt_data\\music\\musics\\rcm_" + filename + ".mp3";
  // } else if (filetype == "music") {
  //     showval = "\\gt\\gt_data\\music\\musics\\" + filename + ".mp3";
  // }

  function setvideopath() {
      document.getElementById('video').src = "/gt/gt_data/film/videos/3.mp4";
      // video.attr({ "autoplay": "autoplay" }); //设置自动播放
       // video.attr({ "controls": "controls" }); //设置自动播放
  } //播放

  function backurl() {
      if (filetype == "film") {
          window.location.href = "films.html";
      } else if (filetype == "tv") {
          window.location.href = "tv.html";
      } else if (filetype == "music_rcm") {
          window.location.href = "music.html";
      } else if (filetype == "music") {
          window.location.href = "music.html";
      }
  } //退回
  function setVideoAd() {
      document.getElementById('video').src = adUrl; //获取广告URL
      $("<div class='adLasttime'>").appendTo($(".content")); //广告倒计时元素
      video.on('loadedmetadata', function() {
          videoTime = video[0].duration;
      }); //广告长度
      video.on('timeupdate', function() {
          var adLasttime = $(".adLasttime");
          var nowTime = video[0].currentTime;
          var lastTime = videoTime - nowTime;
          h1.html("广告剩余时间：" + parseInt(lastTime));
          adLasttime.html("广告剩余时间：" + parseInt(lastTime));
          if (lastTime == 0) {

              removeVideo();
          }
      }); //广告剩余时间

  }

  function removeVideo() {
      $(".adLasttime").remove(); //去除广告倒计时
      setvideopath(); //播放点播文件
  };

  function removeImg() {
      $(".adLasttime").remove(); //去除广告倒计时
      $(".adImg").remove(); //去除广告
      setvideopath()
  }

  function setImgAd() {
      var xtime = 5;
      $("<div class='adLasttime'>").appendTo($(".content")); //广告倒计时元素
      $("<img class='adImg'>").appendTo($(".content")).attr({ "src": adUrl });
      $(".adLasttime").html("广告剩余时间：" + 5);


      var interval = setInterval(function() {
          xtime -= 1;
          if (xtime === 0) {
              clearInterval(interval);
              removeImg();
          }
          $(".adLasttime").html("广告剩余时间：" + xtime);
          console.log(xtime)
              //do whatever here..
      }, 1000);
      console.log("do img")
  }
