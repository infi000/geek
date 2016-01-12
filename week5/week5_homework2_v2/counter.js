 // 页面加载后进行
 window.onload = function() {
     var first = document.getElementById('first');
     var second = document.getElementById('second');
     var chars = document.getElementById('chars');
     var ans = document.getElementById("ans");
 }
// 计算器的方法
 function answer() {
    // 判断空字符
     if (first.value == "" || second.value == "") {
         ans.value = ("输入正确数字")
     } 
     // 计算器运算
     else if (isNaN(Number(first.value)) == false && isNaN(Number(second.value)) == false) {

         if (chars.value == "plus") {
             ans.value = parseFloat(first.value) + parseFloat(second.value)
         } else if (chars.value == "minus") {
             ans.value = parseFloat(first.value) - parseFloat(second.value)
         } else if (chars.value == "multiply") {
             ans.value = parseFloat(first.value) * parseFloat(second.value)
         } else if (chars.value == "division") {
             ans.value = parseFloat(first.value) / parseFloat(second.value)
         }
         // console.log("log文件:"+first.value+""+second.value+""+chars.value)
     } 
     // 其他非数字
     else {
         ans.value = ("输入正确数字")
     }
 }
