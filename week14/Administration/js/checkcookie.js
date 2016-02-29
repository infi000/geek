// 检测cookie
function checkCookie() {
    username = getCookie('username')
    if (username != null && username != "") {
        alert('欢迎' + username+'回来 ' + '!')
    } else {
        location.href = "../login.html"
    }

}