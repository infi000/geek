  var adUrl = "/gt/gt_data/film/videos/adVideo.mp4" //广告文件地址
      // var adUrl = "/gt/gt_data/film/videos/adImg.jpg" //广告文件地址
  var thisURL = document.URL; //当前IP
  var filename = ""; //文件名
  var filetype = ""; //文件类型
  var getval = thisURL.split('?')[1]; //切割IP取问号后面部分
  var video = $("#video");
  var videoTime;
  var array_parm = getval.split("\&");
  //切割路由 
  for (var i = 0; i < array_parm.length; i++) {
      var keyvalues = array_parm[i].split("=");
      var key = keyvalues[0];
      var value = keyvalues[1];
      if (key == "playid") {
          filename = value;
      } else if (key == "type") {
          filetype = value;
      }
  }

  var showval = ""; //播放路径
  if (filetype == "film") {
      showval = "\\gt\\gt_data\\film\\videos\\" + filename + ".mp4";
  } else if (filetype == "tv") {
      showval = "\\gt\\gt_data\\tv\\videos\\" + filename + ".mp4";
  } else if (filetype == "music_rcm") {
      showval = "\\gt\\gt_data\\music\\musics\\rcm_" + filename + ".mp3";
  } else if (filetype == "music") {
      showval = "\\gt\\gt_data\\music\\musics\\" + filename + ".mp3";
  }



  //设置点播文件地址
  function setvideopath() {
      document.getElementById('video').src = showval;
      // video.attr({ "autoplay": "autoplay" }); //设置自动播放

  }



  //退回点播页
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
  }

  function removeVideo() {
      $(".adLasttime").remove(); //去除广告倒计时dom元素
      // video.attr({ "controls": "controls" }); //设置控制台
      // video.removeAttr( "autoplay" ); //关闭自动播放
      setvideopath(); //播放点播文件
  };

  function removeImg() {
      $(".adLasttime").remove(); //去除广告倒计时
      $(".adImg").remove(); //去除广告
       // video.removeAttr( "autoplay" ); //关闭自动播放
      setvideopath()
  }

  //设置视频广告
  function setVideoAd() {
      document.getElementById('video').src = adUrl; //获取广告URL
      $("<div class='adLasttime'>").appendTo($(".content")); //广告倒计时元素
      video.on('loadedmetadata', function() {
          // videoTime = video[0].duration;
          //安卓部部分手机无法再该事件下获取食品总时间
      }); //广告长度
      video.on('timeupdate', function() {
          videoTime = video[0].duration; //视频总时间
          var adLasttime = $(".adLasttime"); //获取广告市场dom元素
          var nowTime = video[0].currentTime; //现在广告时间
          var lastTime = videoTime - nowTime; //剩余广告时间
          adLasttime.html("广告剩余时间：" + parseInt(lastTime));
        
          if (lastTime == 0) {

              removeVideo();
          }
      });

  }


  //设置图片广告
  function setImgAd() {
      var xtime = 5;
      $("<div class='adLasttime'>").appendTo($(".content")); //创建广告倒计时元素
      $("<img class='adImg'>").appendTo($(".content")).attr({ "src": adUrl });//创建广告
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
