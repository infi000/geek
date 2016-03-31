/**
 * Created by testt on 2015/11/10.
 */

//电影分类
const AFFECTIONAL = "爱情";
const ACTION = "动作";
const COMEDY = "喜剧";
const ADVENTURE = "冒险";
const DRACULA = "恐怖";
const SUSPENSE = "悬疑";
const CARTOON = "动画"
const FRIGHTENED = "惊悚";
const SCIENCE = "科幻";
const FEATURE = "剧情";
const WAR = "战争";

const PREVUE = "特辑";

const PATH = "";
const STARURL = PATH+"images/star.png";

//电影一排长度
var NEWRESLENGTH = 5;
var HOTRESLENGTH = 3;
var FUTURERESLENGTH = 6;

const MOREFILMLENGTH = 6

var filmlist = [];
var headlist = [];//滚动展示
var newlist = [];//最新电影
var hotlist = [];//最热电影
var futurelist = [];//即将上映
var affectionalList = [];//爱情片
var actionList = [];//动作片
var comedyList = [];//喜剧片
var adventureList = [];//冒险
var draculaList = [];//恐怖片
var suspenseList = [];//悬疑片
var cartoonList = [];//动画片

var featureList = [];//剧情片
var warList = [];//战争片
var scienceList = [];//科幻片

var $myCarousel = $("#myCarousel");
var $preBtn = $("#preBtn");
var $nextBtn = $("nextBtn");

var $banner = $("#banner");
var $bannerTitle = $("#bannerTitle");
var $bannerDetail = $("#bannerDetail");
var $bannerActor = $("#bannerActor");
var $bannerStar = $("#bannerStar");
var $bannerPraise = $("#bannerPraise");
var $bannerBrief = $("#bannerBrief");

var $classifyBox = $("#classifyBox");

var $leftBox = $("#leftBox")
var $newLeftBg = $leftBox.children("div").eq(0).find("img");
var $newTitle = $("#newTitle");
var $newDetail = $("#newDetail");
var $newStarLevel = $("#newStarLevel");
var $newPraise = $("#newPraise");

var $newBox = $("#newBox");
var $newBox2 = $("#newBox2");
var $hotBox = $("#hotBox");
var $futureBox = $("#futureBox");
var $calssifyBox = $("#calssifyBox");

var $newMoreBox = $("#newMoreBox");
var $hotMoreBox = $("#hotMoreBox");
var $futureMoreBox = $("#futureMoreBox");

var $newBtn = $("#newBtn");
var $hotBtn = $("#hotBtn");
var $futureBtn = $("#futureBtn");

var $calssifyTabNav = $("#calssifyTabNav");

var newResList = [];
var hotResList = [];
var futureResList = [];
var calssifyResList = [];

function init() {
    IsInit = true;

    if(IsPhone){
        NEWRESLENGTH = 5;
        HOTRESLENGTH = 3;
        FUTURERESLENGTH = 6;
    }else{
        NEWRESLENGTH = 8;
        HOTRESLENGTH = 6;
        FUTURERESLENGTH = 6;
    }

    initElement();
    addEvent();
    loadConfig(initRefres);
}

function addEvent() {
    //$preBtn.click(function (e) {
    //});
    //$nextBtn.click(function (e) {
    //});
    if($classifyBox != undefined){
        $classifyBox.delegate("div", "click", function(e){
            if(IsPhone){
                location.href = "classify-phone.html?url="+encodeURI(JSON.stringify($(this).index()));
            }else{
                location.href = "classify.html?url="+encodeURI(JSON.stringify($(this).index()));
            }
        })
    }

    $newBtn.click(clickMoreBtn);
    $hotBtn.click(clickMoreBtn);
    $futureBtn.click(clickMoreBtn);

    var ress = $calssifyTabNav.children("li");
    for(var i=0;i<ress.length;i++)
    {
        var re = ress.eq(i);
        re.click(function(data){
            clickCalssify($(this))
        })
    }

    $myCarousel.on('slide.bs.carousel', function(e){
        var res = $(e.relatedTarget);
        headSwitch(res.data("data"));
    })
}

function clickCalssify($re)
{
    if(IsPhone){
        $calssifyTabNav.find(".cur").removeClass("cur");
        $($re).addClass("cur");
    }else{
        $calssifyTabNav.find(".bg").removeClass("bg");
        $($re).addClass("bg");
    }


    $calssifyBox.html("");
    var index = $("#calssifyTabNav li").index($re);
    moreRefres(getListByIndex(index), $calssifyBox, getNameByIndex(index));
}

function getListByIndex(index)
{
    switch(index)
    {
        case 0:
            return newlist;
        case 1:
            return actionList;
        case 2:
            return comedyList;
        case 3:
            return adventureList;
        case 4:
            return affectionalList;
        case 5:
            return draculaList;
        case 6:
            return suspenseList;
        case 7:
            return cartoonList;
    }
}

function getNameByIndex(index)
{
    switch(index)
    {
        case 0:
            return "new";
        case 1:
            return "action";
        case 2:
            return "comedy";
        case 3:
            return "adventure";
        case 4:
            return "affectional";
        case 5:
            return "dracula";
        case 6:
            return "suspense";
        case 7:
            return "cartoon";
    }
}

function initElement() {
    addElementToList($newBox, newResList);
    addElementToList($hotBox, hotResList);
    addElementToList($futureBox, futureResList);
    addElementToList($calssifyBox, calssifyResList);

    addElementToList($newBox2, newResList);
}

var IsNewVisible = false;
var IsHotVisible = false;
var IsFutureVisible = false;

function clickMoreBtn(data) {
    if(!IsConfigComplete)return;

    var tarString = data.target.id;
    switch (tarString) {
        case "newBtn":
            visibleMore(IsNewVisible, $newMoreBox, newlist, NEWRESLENGTH, "newMore");
            return false;
        case "hotBtn":
            visibleMore(IsHotVisible, $hotMoreBox, hotlist, HOTRESLENGTH, "hotMore");
            return false;
        case "futureBtn":
            visibleMore(IsFutureVisible, $futureMoreBox, futurelist, FUTURERESLENGTH, "future");
            return false;
    }
}

function visibleMore(IsVisible, resBox, dataList, dataLen, name) {
    if (IsVisible)return;

    IsVisible = true;

    //if (resBox.find("ul") != undefined)
    //    resBox.style.display = "block";
    //else {
        moreRefres(getDesignatedArray(dataList, 0, dataLen), resBox, name);
    //}
}

//获取指定数组
function getDesignatedArray(list, len, startIndex) {
    if (len > 0) {
        return list.length >= len ? list.slice(0, len) : list;
    }
    else {
        return list.length >= startIndex ? list.slice(startIndex, list.length) : null;
    }
}

function initRefres() {
    bannerRefres();
    if(headlist.length > 0)
        headSwitch(headlist[0]);

    newRefresLeft();

    filmRefres(newResList, getDesignatedArray(newlist, NEWRESLENGTH));
    filmRefres(hotResList, getDesignatedArray(hotlist, HOTRESLENGTH));
    filmRefres(futureResList, getDesignatedArray(futurelist, FUTURERESLENGTH));
    filmRefres(calssifyResList, getDesignatedArray(affectionalList, affectionalList.length));
}

function addElementToList($res, resList) {
    if($res === undefined || resList === undefined)
        return;
    var $ress;
    if(IsPhone){
        $ress = $res.children("ul").eq(0).children("li");
    }else{
        $ress = $res.children("div").eq(0).children("ul").eq(0).children("li");
    }

    for (var i = 0; i < $ress.length; i++) {
        resList.push($ress.eq(i).children("div").eq(0));
    }
}

var IsConfigComplete = false;
function loadConfig(callback) {
    $.getJSON(PATH+"config/out.json", function (data) {
        filmlist = data;
        for (var i = 0; i < filmlist.length; i++) {
            calssifyFilm(filmlist[i]);
        }

        printf();
        if(callback != undefined){
            callback();
        }
        IsConfigComplete = true;
    });
}

function printf()
{
    for(var i=0;i<affectionalList.length;i++)
    {
        var data = affectionalList[i];
        console.info(data.resInfo.title+"\n");
        console.info(data.resFileList[0].resFileInfo.localFileName+"\n");
        console.info(data.resInfo.remoteImgNormal);
    }
}

function validate(data)
{
    if(data.resFileList === undefined
        || data.resFileList.length <= 0
        || data.resFileList[0].resFileInfo === undefined
        || data.resFileList[0].resFileInfo.localFileName === undefined){
        return "";
    }


    var url = data.resFileList[0].resFileInfo.localFileName;
    url = url.split(".")[0]+".mp4";
    var resInfo = data.resInfo;
    var title = "";
    var norImg = "";
    var sImg = "";
    var brief = "";
    var detail = "";
    if(resInfo != undefined){
        if(resInfo.title != undefined){
            title = resInfo.title;
        }

        if(resInfo.remoteImgNormal != undefined){
            norImg = resInfo.remoteImgNormal;
        }
        if(resInfo.remoteImgSmall != undefined){
            sImg = resInfo.remoteImgSmall;
        }

        if(resInfo.description != undefined){
            brief = getDetail(data);
            detail = resInfo.description;
        }
    }
    var jsonString = JSON.stringify({url:url, title:title, norImg:norImg, sImg:sImg, brief:brief, detail:detail});

    return encodeURI(jsonString);
}

function filmPlay(data, IsPhone) {
    //console.info(data.resFileList[0].resFileInfo.localFileName);
    var url = "video/prevue/ChQoM1XMeoeALpBDCcjwAGRau3U8450.mp4";
    if(IsPhone){
        location.href = "player/mobilePlayer.html?url="+validate(data);
            //validate(data);
    }else{
        location.href = "player/player.html?url="+validate(data);
            //validate(data);
    }
    return false;
}

var dataObject = {};
function moreRefres(list, parent, name) {
    if (list == null || parent == null)return;
    dataObject[name] = list;
    var box='';
    var i=0;
    if(name == "future"){

        if(IsPhone){
            box += '<ul class="movies-list">'
        }else{
            box +='<div class="list"><ul>'
        }

        for(i=0;i<list.length;i++){
            var data = list[i];
            if(data.resInfo === undefined || data.resInfo.remoteImgSmall === undefined)
                continue;
            var idString = i+","+name;
            var jsonData = JSON.stringify(data);
            if(IsPhone){
                box += '<li id="'+idString+'" onclick="filmMore($(this))"><div class="item"><a>' +
                    '<div class="pic"><img src="'+PATH+data.resInfo.remoteImgSmall+'"/><span class="pic-title">2015</span>' +
                    '</div><div class="info"><h3 class="title">"'+data.resInfo.title+'"</h3><p>"'+getDetail(data)+'"</p></div></a></div></li>';
            }else{
                box += '<li id="'+idString+'" onclick="filmMore($(this))"><div class="item"><a>' +
                    '<img src="'+PATH+data.resInfo.remoteImgSmall+'"/><div class="Lucency">2015</div></a>' +
                    '<div class="info"><h4>"'+data.resInfo.title+'"</h4><h6>"'+getDetail(data)+'"</h6></div></div>';
            }
        }

        if(IsPhone){
            box += '</ul>';
        }else{
            box += "</ul></div>";
        }

        parent.html(box);
        return false;
    }

    if(IsPhone){
        box = '<ul class="movies-list">';
    }else{
        box = '<div class="list"><ul>';
    }
    for (i = 0; i < list.length; i++) {
        var data = list[i];
        if (data.resInfo === undefined || data.resInfo.remoteImgSmall === undefined)
            continue;
        var idString = i+","+name;
        var jsonData = JSON.stringify(data);
        if(IsPhone){
            box += '<li id="'+idString+'" onclick="filmMore($(this))"><div class="item"><a>' +
                '<div class="pic"><img src="'+PATH+data.resInfo.remoteImgSmall+'"/><div class="pic-rating">' +
                '<span class="rating">'+getStarLevel()+'</span><span class="bg"></span></div></div><div class="info">' +
                '<h3 class="title">"'+data.resInfo.title+'"</h3><p>"'+getDetail(data)+'"</p> </div></a></div></li>';
        }else {
            //filmPlay(JSON.parse($(this).film)) data-film="jsonData"
            box += '<li id="'+idString+'" onclick="filmMore($(this))"><div class="item">' +
                '<a><img src="' + PATH + data.resInfo.remoteImgSmall + '"/><div class="mark">'+getStarLevel()+'</div></a>' +
                '<div class="info"><h4>"' + data.resInfo.title + '"</h4><h6>"' + getDetail(data) + '"</h6></div></div></li>';
        }
    }

    if(IsPhone){
        box += '</ul>'
    }else{
        box += "</ul></div>"
    }

    parent.html(box);
}

function filmMore($res){
    //var data = JSON.parse($res.getAttribute("data-film"));
    var id = $res.attr("id");
    var arr = id.split(",");
    var index=-1;
    var data;
    if(arr.length > 0)
        index = arr[0];
    if(arr.length > 1)
        id = arr[1];
    var list = dataObject[id];
    if(list != undefined && list.length > index)
        data = list[index];

    if(data === undefined)
        return;

    filmPlay(data, IsPhone);
}

//清除显示
function removeResList(resList) {
    for (var i = 0; i < resList.length; i++) {
        var res = resList[i];
        res[0].style.display = 'none';
    }
}

//显示
function addResList(resList) {
    for (var i = 0; i < resList.length; i++) {
        var res = resList[i];
        res[0].style.display = 'block';
    }
}

//刷新滚动
function bannerRefres() {
    var ress = $banner.children("div");
    for(var i=0;i<ress.length;i++)
    {
        var res = ress.eq(i);
        var data = headlist[i];
        res.data("data", data);
        if(res === undefined || data.resInfo === undefined || data.resInfo.remoteImgNormal === undefined)
            return;
        //res.find("img").attr("src", PATH+data.resInfo.remoteImgNormal);

        res.click(function(e){
            filmPlay($(this).data("data"), IsPhone);
        })
    }
}

function headSwitch(data)
{
    if(data === undefined || data.resInfo === undefined)
        return;

    $bannerTitle.html(data.resInfo.title);
    $bannerDetail.html(data.resInfo.description);
    $bannerActor.html(data.resInfo.actor);
    filmStar($bannerStar, getStarLevel());
    $bannerPraise.html(getPraise());
    $bannerBrief.html(getDetail(data));
}

//最新上映左边刷新
function newRefresLeft() {

    $newPraise.html(getPraise());
    filmStar($newStarLevel, getStarLevel())

    var data = newlist.shift();
    if (data == null || data.resInfo === undefined || data.resInfo.remoteImgNormal === undefined)
        return;
    $newLeftBg.attr("src", PATH+data.resInfo.remoteImgNormal);
    $newTitle.html(data.resInfo.title);
    $newDetail.html(getDetail(data));
    $leftBox.data("data", data);
    $leftBox.click(function(e){
        filmPlay($(this).data("data"), IsPhone);
    })
}

//电影刷新
function filmRefres(resList, dataList) {
    if(resList === undefined || dataList === undefined)
        return;
    for (var i = 0; i < resList.length; i++) {
        if (i >= dataList.length)break;
        var res = resList[i];
        var data = dataList[i];
        if (data.resInfo === undefined || data.resInfo.remoteImgSmall === undefined)
            continue;

        res.find("a").removeAttr("href");
        res.data("data", data);
        res.find("img").attr("src", PATH+data.resInfo.remoteImgSmall);
        if(IsPhone){
            res.find("h3").html(data.resInfo.title);
            res.find("p").html(getDetail(data));
            res.find(".rating") && res.find(".rating").text(getStarLevel()*2);
            res.find(".pic-title") && res.find(".pic-title").text("2015");

        }else{

            res.find("h4").html(data.resInfo.title);
            res.find("h6").html(getDetail(data));
            res.find(".mark").text(getStarLevel()*2);
        }


        res.click(function (e) {
            filmPlay($(this).data("data"), IsPhone);
        });
    }
}

function linkTo(res){
    if(res.parent("li").content === undefined){
        return;
    }
    var data = res.parent("li").data("data");
    filmPlay(data, IsPhone)
}

function getDetail(data)
{
    var des = data.resInfo.description;
    if(des.length > 15) {
        des = des.slice(0, 15)+"...";
    }

    return des;
}

function getPraise()
{
    return parseInt(Math.random()*30000+20000);
}

function getStarLevel()
{
    return (Math.random()*3+2).toFixed(1);
}

function filmStar(res, level)
{

    len = parseInt(level);
    var html = "";
    for(var i=0;i<level;i++){
        html += '<img src="'+STARURL+'">';
    }

    html += '<span>  '+level*2+'</span>';
    res.html(html);
}

//电影分类
function calssifyFilm(data) {
    if (data.resInfo === undefined || data.resInfo.tag === undefined)
        return;

    var tag = data.resInfo.tag;
    var year = data.resInfo.year;
    if (year != undefined && year == "2015") {
        newlist.push(data);
    }

    if(tag.indexOf(PREVUE) > 0){
        futurelist.push(data);
        //headlist.push(data);
    }

    if (tag.indexOf(AFFECTIONAL) > 0) {
        affectionalList.push(data);
        hotlist.push(data);
        headlist.push(data);
        return;
    }
    if (tag.indexOf(ACTION) > 0) {
        actionList.push(data);
        //futurelist.push(data);
        return;
    }
    if (tag.indexOf(COMEDY) > 0) {
        comedyList.push(data);
        return;
    }
    if (tag.indexOf(ADVENTURE) > 0) {
        adventureList.push(data);
        return;
    }
    if (tag.indexOf(DRACULA) > 0 || tag.indexOf(FRIGHTENED)) {
        draculaList.push(data);
        return;
    }
    if (tag.indexOf(SUSPENSE) > 0) {
        suspenseList.push(data);
        return;
    }
    if (tag.indexOf(CARTOON) > 0) {
        cartoonList.push(data);
        return;
    }
    if (tag.indexOf(SCIENCE) > 0) {
        scienceList.push(data);
        return;
    }

    if (tag.indexOf(WAR) > 0) {
        warList.push(data);
        return;
    }

    if (tag.indexOf(FEATURE) > 0) {
        featureList.push(data);
        return;
    }
}

$(function(){
		 var url = 'http://192.168.1.15/tvmvclient/i.php?m=13060';
		 title = $(document).attr("title");
		 pageurl = location.href;
		$.post(url,{'title':title,'url':pageurl},function(data){
			/*if(data.status){
                   alert(data.msg.replace("\\n","<br/>"));
                          
			}else{
                   alert(data.msg.replace("\\n","<br/>"));
			}*/
		},'json');
    })


