/**
 * Created by testt on 2015/11/24.
 */
var IsPhone = false;
var u = navigator.userAgent;
if (u.indexOf('Android') > -1 || u.indexOf('iPhone') > -1 || u.indexOf('Mobile') > -1) {
    IsPhone = true;
}