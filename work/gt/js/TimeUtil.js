/**
 * Created by testt on 2015/11/27.
 */

//鼠标单击事件间隔
ClickInterval = function(interval){
    var clickTime = 0;
    getClick = function(){
        console.info("cur:"+getCurTime()+"  "+"last:"+clickTime);
        if(getCurTime() - clickTime < interval){
            return false;
        }

        clickTime = getCurTime();
        return true;
    }
    return getClick;
}

//获取当前时间(毫秒数)
getCurTime = function(){
    var d = new Date();
    return d.getTime();
}