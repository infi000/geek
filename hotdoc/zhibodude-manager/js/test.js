var test;

$.ajax({
    url: 'http://infi000.wilddogio.com/zhibodude.json?orderBy="weight"',
    // data:{
    // 	 orderBy:"weight",
    // 	},
    // 	dataType:"jsonp",
    success: function(msg) {
        console.log(msg);
        var data = msg;
        var obj="";
        for (keys in data) {
            var index = data[keys];
            console.log(index);
            var name = (index.name)?index.name:"无";
            var msg = index.msg;
            var img = index.img;
            var weight = index.weight;
            // obj += "<tr><td>" + keys + "</td>";
            obj += "<tr><td>" + name + "</td>";
            obj += "<td>" + weight + "</td>";
            obj += "<td>" + msg + "</td>";
            obj += "<td>" + img + "</td></tr>";
        };

        console.log(obj);
        $("#bsList").find("tbody").html(obj);
    }
})
