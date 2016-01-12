

 var a;
 var b;
 var z;
// 屏幕显示以及赋值
 function screenNum(x) {
     var screen = document.getElementById("screen");
     screen.value = screen.value + x.value;
     console.log(x.value);
     console.log(screen.value);
 }

 function screenChars(y) {
     var screen = document.getElementById("screen");
     a = parseFloat(screen.value);
     z = y.placeholder;
     screen.value = "";
     console.log(z);
     console.log(screen.value)
 }

 // 清屏
 function clean() {
     var screen = document.getElementById("screen");
     screen.value = "";
     a=0;
     b=0;
     z=0;
     console.log(screen.value+a+b+z)
 }

// 答案
 function answer() {

     var screen = document.getElementById("screen");
     b = parseFloat(screen.value);
     if (z == "plus") {
         screen.value = a + b
     } else if (z == "minus") {
         screen.value = a - b
     } else if (z == "multiplication") {
         screen.value = a * b
     } else if (z == "division") {
         screen.value = a / b
     }



 }
