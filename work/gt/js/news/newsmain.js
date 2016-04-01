var addFontsize = $(".addFontsize");
var reduceFontsize = $(".reduceFontsize");
var resetFontsize = $(".resetFontsize");
var a = $(".article-content").find("a");
var span = $(".article-content").find("span");

addFontsize.on("click", function() {
    add_FontSize(a, span)
})
reduceFontsize.on("click", function() {
    reduce_FontSize(a, span)
});
resetFontsize.on("click", function() {
    reset_FontSize(a, span, 16)
})


