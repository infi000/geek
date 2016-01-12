$("h3").bind({
    click: function() {
        $(this).next().slideToggle()
    },
});
//点击问题获取答案
