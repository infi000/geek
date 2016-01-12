var s_green2 = document.getElementById("s_green2");
var s_green3 = document.getElementById("s_green3");
var s_green4 = document.getElementById("s_green4");
var s_green5 = document.getElementById("s_green5");
var s_green6 = document.getElementById("s_green6");
var s_green7 = document.getElementById("s_green7");
var s_green8 = document.getElementById("s_green8");
var s_green9 = document.getElementById("s_green9");
var s_green10 = document.getElementById("s_green10");
var s_green11 = document.getElementById("s_green11");
var s_green12 = document.getElementById("s_green12");
var s_green13 = document.getElementById("s_green13");
var s_green14 = document.getElementById("s_green14");
var s_green = [s_green2, s_green3, s_green4, s_green5, s_green6, s_green7, s_green10, s_green11, s_green12, s_green13];
var z = localStorage.getItem('getColor');

function setColor(z) {
    for (var i = 0; i < s_green.length; i++) {
        s_green[i].style.color = z;
    }
    s_green8.style.background = z;
    s_green14.style.background = z;
    s_green9.style.borderTopColor = z;
}

setColor(z);

function styleColor(y) {
    for (var i = 0; i < s_green.length; i++) {
        s_green[i].style.color = y;
    }
    var getColor = s_green8.style.background;
    s_green8.style.background = y;
    s_green14.style.background = y;
    s_green9.style.borderTopColor = y;
    localStorage.setItem('getColor', y)
}
