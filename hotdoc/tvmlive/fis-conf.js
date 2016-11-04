/*
* @Author: 张驰阳
* @Date:   2016-09-25 10:23:57
* @Last Modified by:   张驰阳
* @Last Modified time: 2016-09-25 10:54:08
*/

'use strict';
fis.match("*.{js,css,png,jpg}",{
	useHash:true,
	release:'/static/$0'
});
fis.match("/fonts/",{
	release:'/statuc/$0'
});
fis.match("*.css",{
	optimizer:fis.plugin('clean-css')
});
fis.match("*.png",{
	optimizer:fis.plugin('png-compressor')
})