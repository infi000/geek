
//清除空格
String.prototype.trim = function() { return this.replace(/[\s　]+|(&nbsp;)+/gi, ''); };

function checkphone(p){
		var reg = new RegExp( /^1[3458]{1}[0-9]{9}$/ );
		if(reg.test(p)){
			return true;
		}else{
			return false;
		}
	}

function checkemail(p){
		var reg = new RegExp( /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ );
		if(reg.test(p)){
			return true;
		}else{
			return false;
		}
	}

function checkpasswd(p){
		var reg = new RegExp( /^[a-z\d]*$/i );
		if(reg.test(p)){
			return true;
		}else{
			return false;
		}
	}
/**
	字符长度
*/
function strlen( str ) {
		return str.replace( /[^\x00-\xff]/g , "**" ).length; 
	}

function checkcode(p){
		var reg = new RegExp( /^T[0-9A-Z]{12}$/i );
		if(reg.test(p)){
			return true;
		}else{
			return false;
		}
	}

function checknumber(p){
		var reg = new RegExp( /^\d+$/ );
		if(reg.test(p)){
			return true;
		}else{
			return false;
		}
	}