var a;
var b;
var c;
var z;
var screen = document.getElementById("screen");
var power = document.getElementById("power");
// 开关机
function openScreen() {
    // 开机
    if (screen.placeholder == "CASIO") {
        screen.style.background = "white";
        screen.style.color = "black";
        screen.placeholder = "";
    }
    // 关机
    else {
        screen.placeholder = "CASIO";
        screen.style.background = "#A9A9A9";
        screen.style.color = "#A9A9A9";
    }
    screen.value = "";
    a = 0;
    b = 0;
    z = 0;
    console.log(screen.value + a + b + z);
}
// 屏幕显示以及赋值
function screenNum(x) {

    screen.value = screen.value + x.value;
    console.log("x的值为:"+x.value);
    console.log("屏幕的值为:"+screen.value);
}

function screenChars(y) {
    a = parseFloat(screen.value);
    z = y.name;
    screen.value = '';
    console.log("z的值为:"+z);
    console.log("屏幕的值为:"+screen.value);
}

// 清屏
function clean() {
    // var screen = document.getElementById("screen");
    screen.value = "";
    a = 0;
    b = 0;
    z = 0;
    console.log(screen.value + a + b + z);
}

// 答案
function answer() {

    // var screen = document.getElementById("screen");
    b = parseFloat(screen.value);
    if (z == "plus") {
        screen.value = (a + b)       
    } else if (z == "minus") {
        screen.value = (a - b) 
    } else if (z == "multiplication") {
        screen.value = (a * b) 
    } else if (z == "division") {
        screen.value = (a / b) 
    }
}

function showSin() {
    c = parseFloat(screen.value);
    screen.value = Math.sin(c);
}

function showCos() {
    c = parseFloat(screen.value);
    screen.value = Math.cos(c);
}

function showTan() {
    c = parseFloat(screen.value);
    screen.value = Math.tan(c);
}

function showLog() {
    c = parseFloat(screen.value);
    screen.value = Math.log(c);
}

function showExp() {
    c = parseFloat(screen.value);
    screen.value = Math.exp(c);
}

function showSqrt() {
    c = parseFloat(screen.value);
    screen.value = Math.sqrt(c);
}
