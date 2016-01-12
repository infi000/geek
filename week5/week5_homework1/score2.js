// 函数用来判断学生档次
function show(x, y) {
    var degree
    switch (true) {
        case x.value >= 90 && x.value <= 100:
            degree = "高手，大牛！"
            y.value = degree + '你是1等生';
            break;
        case x.value >= 80 && x.value < 90:
            degree = "不错，很棒！"
            y.value = degree + '你是2等生';
            break;
        case x.value >= 70 && x.value < 80:
            degree = "不错，很棒！"
            y.value = degree+'你是3等生';
            break;
        case x.value >= 60 && x.value < 70:
            degree = "及格，加油！"
            y.value = degree + '你是4等生';
            break;
        case x.value >= 50 && x.value < 60:
            degree = "继续努力！"
            y.value = degree + '你是5等生';
            break;
        case x.value >= 40 && x.value < 50:
            degree = "继续努力！"
            y.value = degree + '你是6等生';
            break;
        case x.value >= 30 && x.value < 40:
            degree = "继续努力！"
            y.value = degree + '你是7等生';
            break;
        case x.value >= 20 && x.value < 30:
            degree = "继续努力！"
            y.value = degree + '你是8等生';
            break;
        case x.value >= 10 && x.value < 20:
            degree = "继续努力！"
            y.value = degree + '你是9等生';
            break;
        case x.value > 0 && x.value < 10:
            degree = "很遗憾！"
            y.value = degree + '你是末等生';
            break;
        case x.value == '0':
            degree = "很遗憾！"
            y.value = degree + '你是末等生';
            break;

        default:
            y.value = "请输入正确分数"
    }

}
// 小明档次
function show1() {
    var score1 = document.getElementById('score1');
    var level1 = document.getElementById('level1');
    show(score1, level1);
    console.log(score1.value);
    console.log(level1.value);
}
// 小王档次
function show2() {
    var score2 = document.getElementById('score2');
    var level2 = document.getElementById('level2');
    show(score2, level2);
    console.log(score2.value);
    console.log(level2.value);
}
// 小红档次
function show3() {
    var score3 = document.getElementById('score3');
    var level3 = document.getElementById('level3');
    show(score3, level3);
    console.log(score3.value);
    console.log(level3.value);
}
