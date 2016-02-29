$(document).ready(function() {
     checkCookie();
    $(".btn-primary").click(function() {
        $.ajax({
            type: "post",
            url: "../mysql/login.php",
            data: {
                username: $(".username").val(),
                password: $(".password").val()
            },
            datatype: "text",
            success: function(msg) {
                if (msg == '成功') {
                    setCookie("username", $(".username").val(), 10)
                    alert("登陆成功！跳转中....");
                    window.location.href = './mainpage/mainpage.html';

                } else {
                    alert("用户名或密码错误")
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.warn(XMLHttpRequest.status);
                console.warn(XMLHttpRequest.readyState);
                console.warn(textStatus);
            },
            complete: function(XMLHttpRequest, textStatus) {
                this; // 调用本次AJAX请求时传递的options参数
            }
        })
    })


})

function checkCookie() {
    username = getCookie('username')
    if (username != null && username != "") {
       $(".username").val(username);
    } 
}
