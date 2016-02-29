 //++++++++++++++++++++++ 获取后端信息 ++++++++++++++
 var Atext1;
 var jsontext1;
 var Atext2;
 var jsontext2;
 var Atext3;
 var jsontext3;
 var from1 = $(".from1");
 var from2 = $(".from2");
 var from3 = $(".from3");

 function newsinfo1() {
     Atext1 = $.ajax({
         type: "GET",
         url: "http://115.159.150.183:3900/1",
         dataType: "json",
         success: function() {
             jsontext1 = JSON.parse(Atext1.responseText);
             for (var i = 0; i < jsontext1.length; i++) {
                 var inputtitle = jsontext1[i].newstitle;
                 var inputimg = jsontext1[i].newsimg;
                 var inputfrom = jsontext1[i].newsfrom;
                 var inputtime = jsontext1[i].addtime;
                 var inputid = jsontext1[i].newsid;
                 var tr = $("<tr>");
                 var form = $("<div>").attr({
                     "method": "post",
                     "target": "hideIframe"
                 }).addClass("nform nform1");
                 var li = $("<li>").addClass("del-li1");
                 li.appendTo(from1);
                 form.appendTo(li);
                 // 动态添加表格
                 $("<input>").attr({
                     value: i,
                     type: "text",
                     name: inputid
                 }).addClass("nid nid1").appendTo(form);

                 $("<input>").attr({
                     value: inputtitle,
                     type: "textarea",
                     name: "newstitle"
                 }).addClass("ntitle ntitle1").appendTo(form);
                 $("<input>").attr({
                     value: inputimg,
                     type: "textarea",
                     name: "newsimg"
                 }).addClass("nimg nimg1").appendTo(form);
                 $("<input>").attr({
                     value: inputfrom,
                     type: "text",
                     name: "newsfrom"
                 }).addClass("nfrom nfrom1").appendTo(form);
                 $("<p>").html(inputtime).addClass("ntime ntime1").appendTo(form);
                 $("<input>").attr({
                     value: "修改",
                     type: "submit"
                 }).addClass("nbtn nbtn1").appendTo(form);

             };
         }

     });
 }

 function newsinfo2() {
     Atext2 = $.ajax({
         type: "GET",
         // contentType : 'application/json',
         url: "http://115.159.150.183:3900/2",
         dataType: "json",
         success: function() {
             jsontext2 = JSON.parse(Atext2.responseText);
             for (var i = 0; i < jsontext2.length; i++) {
                 var inputtitle = jsontext2[i].newstitle;
                 var inputimg = jsontext2[i].newsimg;
                 var inputfrom = jsontext2[i].newsfrom;
                 var inputtime = jsontext2[i].addtime;
                 var inputid = jsontext2[i].newsid;
                 var form = $("<div>").attr({
                     "method": "post",
                     "target": "hideIframe"
                 }).addClass("nform nform2");
                 var li = $("<li>").addClass("del-li2");
                 li.appendTo(from2);
                 form.appendTo(li);
                 $("<input>").attr({
                     value: i,
                     type: "text",
                     name: inputid
                 }).addClass("nid nid2").appendTo(form);
                 $("<input>").attr({
                     value: inputtitle,
                     type: "text",
                     name: "newstitle"
                 }).addClass("ntitle ntitle2").appendTo(form);
                 $("<input>").attr({
                     value: inputimg,
                     type: "text",
                     name: "newsimg"
                 }).addClass("nimg nimg2").appendTo(form);
                 $("<p>").html(inputtime).addClass("ntime ntime2").appendTo(form);
                 $("<input>").attr({
                     value: "修改",
                     type: "submit"
                 }).addClass("nbtn nbtn2").appendTo(form);

             };
           
         }

     });
 }

 function newsinfo3() {
     Atext3 = $.ajax({
         type: "GET",
         url: "http://115.159.150.183:3900/3",
         dataType: "json",
         success: function() {
             jsontext3 = JSON.parse(Atext3.responseText);
             for (var i = 0; i < jsontext3.length; i++) {
                 var inputtitle = jsontext3[i].newstitle;
                 var inputimg = jsontext3[i].newsimg;
                 var inputcontent = jsontext3[i].newscontent;
                 var inputtime = jsontext3[i].addtime;
                 var inputid = jsontext3[i].newsid;
                 var form = $("<div>").attr({
                     "method": "post",
                     "target": "hideIframe"
                 }).addClass("nform nform3");
                 var li = $("<li>").addClass("del-li3");
                 li.appendTo(from3);
                 form.appendTo(li);
                 $("<input>").attr({
                     value: i,
                     type: "text",
                     name: inputid
                 }).addClass("nid nid3").appendTo(form);
                 $("<input>").attr({
                     value: inputtitle,
                     type: "text",
                     name: "newstitle"
                 }).addClass("ntitle ntitle3").appendTo(form);
                 $("<input>").attr({
                     value: inputcontent,
                     type: "text",
                     name: "newscontent"
                 }).addClass("ncontent ncontent3").appendTo(form);
                 $("<p>").html(inputtime).addClass("ntime ntime3").appendTo(form);
                 $("<input>").attr({
                     value: "修改",
                     type: "submit"
                 }).addClass("nbtn nbtn3").appendTo(form);
               // 
             };change();
         }

     });
 }

 function newsinfo() {
     newsinfo1();
     newsinfo2();
     newsinfo3();
     console.log('newsinfo')
 };
newsinfo();