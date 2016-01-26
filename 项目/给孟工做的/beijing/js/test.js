var sli1_h4 = $(".sidebar-nav-li1 h4"); //一级菜单的合集
var snav2 = $(".sidebar-nav2"); //二级菜单的合集

function nav2Show(i) {
    sli1_h4.eq(i).on("click", function() {
            if (snav2.eq(i).css("display") == 'none') {
                $(".sidebar-nav2").slideUp("fast",function() {
                    $(".sidebar-nav-li1 span").attr("class", "glyphicon glyphicon-plus")
                });
                snav2.eq(i).slideDown("fast",function() {
                    $(".sidebar-nav-li1 span").eq(i).attr("class", "glyphicon glyphicon-minus");
                });
            }
         else if (snav2.eq(i).css("display") == 'block') {
            snav2.eq(i).slideUp("fast",function() {
                $(".sidebar-nav-li1 span").eq(i).attr("class", "glyphicon glyphicon-plus")
            })
        }
    });
}
//点击一级菜单后触发
//如果二级菜单没display==none;
//剩余所有二级菜单slidup；图标都为+;
//二级菜单display==block，二级菜单slideUp；
for (var i = 0; i < sli1_h4.length; i++) {
    nav2Show(i)
}
