var array = ['a', 'x', 'b', 'd', 'm', 'a', 'k', 'm', 'p', 'j', 'a']


function check() {
    var answer = document.getElementById('answer')
    var space = [];  //创建一个空数组
    for (var i = 0; i < array.length; i++) {
        var z = [array[i]]; //创建一个数组，第一个元素为原数组的中的字母
        for (var j = i; j < array.length; j++) {
            if (array[j] == array[i]) {
                z.push(j) //把相同的元素的位置放到一个数组中
            }
        }
        console.log('z是' + z)

        if (z.length > space.length) {
            space = z; //比较大小，如果大则代替原来的
        }
        console.warn('space是' + space)
    }
    console.warn(space);
    var b = space.length-1; //得到的数组的第一个元素为重复最多的那个字母，后面的位置是其所在原来数组的位置
    answer.innerHTML = ("最多的字母是：" + space[0] + "</br>" + '个数为：'+b+'</br>'+'他们的位置分别为:'+space.splice(1) )
}
