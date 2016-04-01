//放大字体
function add_FontSize(x,y) {
    var xSize = parseInt(x.css(
        "font-size"
    ));
    var ySize = parseInt(y.css(
        "font-size"
    ));
    console.log(xSize, ySize);
    if (xSize < 50) {
        x.css({
            "font-size": xSize + 10 + "px"
        });
        y.css({
            "font-size": ySize + 10 + "px"
        });
    }}
//缩小字体
function reduce_FontSize(x,y) {
            var xSize = parseInt(x.css(
                "font-size"
            ));
            var ySize = parseInt(y.css(
                "font-size"
            ));
            console.log(xSize, ySize);
            if (xSize > 12) {
                x.css({
                    "font-size": xSize - 10 + "px"
                });
                y.css({
                    "font-size": ySize - 10 + "px"
                });
            }

        }
//还原字体
function reset_FontSize(x,y,z) {
        x.css({
            "font-size": "20px"
        });
        y.css({
            "font-size": z+"px"
        });
        var xSize = parseInt(x.css(
            "font-size"
        ));
        var ySize = parseInt(y.css(
            "font-size"
        ));
        console.log(xSize, ySize);
    }




