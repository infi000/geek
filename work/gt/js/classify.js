/**
 * Created by testt on 2015/11/23.
 */
$classifyBox = $("#classifyBox");
$titleImg = $("#titleBox").find("img");
$listContainer = $("#listContainer");

var dataList = [];
function classifyInit(){
    initElement();
    addEvent();
}

function initElement(){
    var url = location.search;

    if (url === undefined) {
        return false;
    }
    var arr = url.split("=");
    if (arr.length < 2) {
        return false;
    }

    try{

        var index = JSON.parse(decodeURI(arr[1]));
        var ress = $classifyBox.children(".classify");
        if(ress != undefined){
            var re = ress.eq(index);
            $curSelect = getSelectRes(re);
            selectVisible($curSelect);
        }
        filmRefres(index);

    }catch(e){

    }
}

var $curSelect;
function addEvent(){
    var clickInterval = ClickInterval(33);
    var ress = $classifyBox.children(".classify");
    for(var i=0;i<ress.length;i++){
        var re = ress.eq(i);

        re.click(function(e){
            //c.getClick
            if(!clickInterval()){
                return false;
            }
            var ci = ClickInterval(33);
            selectHidden($curSelect)
            $curSelect = getSelectRes($(this));
            selectVisible($curSelect);
            clickClassifyBoxBtn($(this));
        })
    }

    //$calssifyBox.delegate()


}

function getSelectRes($re){
    return $re.find(".select").find("img");
}

function selectVisible($res){
    $res.attr("src", "images/classifySelect.png");
    $res[0].style.visibility = "visible";
}

function selectHidden($res) {
    $res.attr("src", "");
    $res[0].style.visibility = "hidden";
}

function clickClassifyBoxBtn($res){
    var index = $("#classifyBox .classify").index($res);
    filmRefres(index);
}

function filmRefres(index){
    var url = "images/film/"+getNameByIndex(index)+".png";
    var list = getListByIndex(index);

    if(list == undefined){
        return;
    }

    dataList = list;

    $titleImg.attr("src", url);
    var html = "";
    for(var i=0;i<list.length;i++){
        var data = list[i];
        if(data.resInfo == undefined || data.resInfo.remoteImgSmall == undefined){
            continue;
        }

        var mark = IsPhone ? "images/phone/mark.png":"images/mark.png";
        html += '<div id="'+i+'" class="film" onclick="parseList($(this))">' +
            '<div class="imgBox"><div class="background"><img src="'+PATH+data.resInfo.remoteImgSmall+'"/></div>' +
            '<div class="mark"><img src="'+mark+'"/></div>' +
            '<div class="evaluate"><span>'+getStarLevel()+'</span></div></div>' +
            '<div class="film-title"><span>"'+data.resInfo.title+'"</span></div>' +
            '<div class="film-des"><span>"'+getDetail(data)+'"</span></div></div>';
    }

    $listContainer.html(html);
}

function parseList($res){
    var id = parseInt($res.attr("id"));
    if(id < 0 || id >= dataList.length){
        return;
    }

    var data = dataList[id];
    filmPlay(data, IsPhone);
}

