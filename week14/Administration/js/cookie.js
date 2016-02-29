//设置cookie
function setCookie(cname, value, expiredays) {
     var exdate = new Date()
     exdate.setDate(exdate.getDate() + expiredays)
     document.cookie = cname + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
 }

//取得cookie
 function getCookie(cname) {
     if (document.cookie.length > 0) {
         cstart = document.cookie.indexOf(cname + "=")
         if (cstart != -1) {
             cstart = cstart + cname.length + 1
             cend = document.cookie.indexOf(";", cstart)
             if (cend == -1) cend = document.cookie.length
             return unescape(document.cookie.substring(cstart, cend))
         }
     }
     return ""
 }

//检测cookie
 // function checkCookie() {
 //     username = getCookie('username')
 //     if (username != null && username != "") {
 //         alert('Welcome again ' + username + '!')
 //     } else {
 //         username = prompt('Please enter your name:', "")
 //         if (username != null && username != "") {
 //             setCookie('username', username, 365)
 //         }
 //     }
 // }
