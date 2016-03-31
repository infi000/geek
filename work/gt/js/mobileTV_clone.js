/**
 * Created by testt on 2015/11/10.
 */
const AFFECTIONAL = "爱情";
const ACTION = "动作";
const COMEDY = "喜剧";
const ADVENTURE = "冒险";
const DRACULA = "恐怖";
const SUSPENSE = "悬疑";
const CARTOON = "动画"
const FRIGHTENED = "惊悚";
const SCIENCE = "科幻";
const PREVUE = "预告";
const FEATURE = "剧情";
const WAR = "战争";

var $preBtn = $("#preBtn");
var $nextBtn = $("nextBtn");
$preBtn.click(function(){});
$nextBtn.click(function(){});

var $list = [];
var $newlist = [];//最新电影
var $hotlist = [];//最热电影
var $futurelist = [];//即将上映

var affectionalList = [];//爱情片
var actionList = [];//动作片
var comedyList = []//喜剧片
var adventureList = [];//冒险
var draculaList = []//恐怖片
var suspenseList = []//悬疑片
var cartoonList = [];//动画片

var featureList = [];//剧情片
var warList = [];//战争片
var scienceList = [];//科幻片
var prevueList = []//预告片

function loadConfig()
{
    $.getJSON("config/out.json", function(data){
        $list = data;
        for(var i=0;i<$list.length;i++)
        {
            calssifyFilm($list[i]);
        }
    })
}

function calssifyFilm(data)
{
    if(data.resInfo === undefined || data.resInfo.tag === undefined)
        return;

    var tag=data.resInfo.tag;
    var year = data.resInfo.year;
    if(year != undefined && year == 2015)
    {
        $newlist.push(data);
    }

    if(tag.indexOf(AFFECTIONAL) > 0)
    {
        affectionalList.push(data);
        $hotlist.push(data);
        return;
    }
    if(tag.indexOf(ACTION) > 0)
    {
        actionList.push(data);
        return;
    }
    if(tag.indexOf(COMEDY) > 0)
    {
        comedyList.push(data);
        return;
    }
    if(tag.indexOf(ADVENTURE) > 0)
    {
        adventureList.push(data);
        return;
    }
    if(tag.indexOf(DRACULA) > 0 || tag.indexOf(FRIGHTENED))
    {
        draculaList.push(data);
        return;
    }
    if(tag.indexOf(SUSPENSE) > 0)
    {
        suspenseList.push(data);
        return;
    }
    if(tag.indexOf(CARTOON) > 0)
    {
        cartoonList.push(data);
        return;
    }
    if(tag.indexOf(SCIENCE) > 0)
    {
        scienceList.push(data);
        return;
    }
    if(tag.indexOf(PREVUE) > 0)
    {
        prevueList.push(data);
        $futurelist.push(data)
        return;
    }
    if(tag.indexOf(WAR) > 0)
    {
        warList.push(data);
        return;
    }

    if(tag.indexOf(FEATURE) > 0)
    {
        featureList.push(data);
        return;
    }
}

