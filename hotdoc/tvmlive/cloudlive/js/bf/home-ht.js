/*
 * @Author: USER
 * @Date:   2016-08-25 13:54:58
 * @Last Modified by:   USER
 * @Last Modified time: 2016-08-25 14:45:48
 */

'use strict';

//头部信息
/*var url = '?m=1100';
 $.post(url,function(data){		
	if(data.status){
		$(".header").html(data.data)
	}
},'json');*/
//左侧信息
var url = '?m=1101';
 $.post(url,function(data){		
	if(data.status){
		$(".header").html(data.data.home)
	}
},'json');












