var addFontsize = $(".addFontsize");
var reduceFontsize = $(".reduceFontsize");
var resetFontsize = $(".resetFontsize");
var h1 = $(".content").find("h1");
var p = $(".content").find("p");
p.css({ "font-size":"20px" });
// addFontsize.on("click", add_FontSize(p, h1));
addFontsize.on("click", function() {
    add_FontSize(p, h1)
})
reduceFontsize.on("click", function() {
    reduce_FontSize(p, h1)
});
resetFontsize.on("click", function() {
    reset_FontSize(p, h1, 32)
})
