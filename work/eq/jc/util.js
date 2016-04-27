/**
工具类
*/
//将url的参转换为hash
function url2Hash(_url) {
    var parmhash = {};
    var querstr = _url || location.search;//search 属性是一个可读可写的字符串，可设置或返回当前 URL 的查询部分（问号 ? 之后的部分）。
    var offset1 = querstr.indexOf("?");
    if (offset1 != -1) {
        querstr = querstr.substring(offset1 + 1);
    }
    if (querstr != "") {
        var parms = querstr.split("&");
        var parmsLen = parms.length;
        for (var i = 0; i < parmsLen; i++) {
            var _keyval = parms[i].split("=");
            var _key = _keyval[0];
            var _val = _keyval[1];
            try {
                parmhash[_key] = decodeURI(_val);
            } catch (ex) {
                var offset0 = -1;
                var n = 0;
                while ((offset0 = _val.indexOf("%%")) != -1) {
                    _val = _val.substring(0, offset0) + '%25' + _val.substring(offset0 + 1);
                    n += 4;
                }
                parmhash[_key] = decodeURI(_val);
            }
        }
    }
    return parmhash;
}

function invokeMethod(_methodname, _callback, qparm) {
	var ediscoveryurl="";
    var urlstr = ediscoveryurl + "invoke/" + _methodname
    $.ajax({
        type: "GET",
        url: urlstr,
        data: qparm || "",
        dataType: 'json',
        success: function(ref) {
 
            if (ref.status == "没有权限") {
                LOGOUT();
            } else {
                _callback(ref);
            }
        },
        error: function(ref) {
            console.log("请求失败invokeMethod(" + _methodname + ")！", ref);
            if (ref.status == 403) {
                LOGOUT();
            } else if (ref.status == 500) {

            }
            //alert("error:"+urlstr);
        }
    });

}
