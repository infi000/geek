jQuery.fn.extend({
Validator:{
	Require : /.+/,
	Email : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ ,
	Phone : /^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/ ,
	Mobile : /^((\(\d{3}\))|(\d{3}\-))?13\d{9}$/ ,
	URL : /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/ ,
	IdCard : /^\d{15}(\d{2}[A-Za-z0-9])?$/ , //身份证的验证
	Currency : /^\d+(\.\d+)?$/ ,
	NetIp : /^(\d+\.\d+\.\d+\.\d+)(:(\d+))?$/ ,
        Host : /^[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/ ,
	Number : /^\d+$/ ,
	Zip : /^[1-9]\d{5}$/ ,
	QQ : /^[1-9]\d{4,8}$/ ,
	Integer : /^[-\+]?\d+$/ ,
	double : /^[-\+]?\d+(\.\d+)?$/ ,
	English : /^[A-Za-z]+$/,
	Chinese :  /^[\u0391-\uFFE5]+$/ ,
	UnSafe : /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/ ,
	IsSafe : function( str ){
		return !this.UnSafe.test( str );
	},
	SafeString : "this.IsSafe( value )",
	Limit : "this.limit( value.length , getAttribute( 'min' ) , getAttribute( 'max' ) )",
	LimitB : "this.limit( this.LenB( value ) , getAttribute( 'min' ) , getAttribute( 'max' ) )",
	Date : "this.IsDate( value , getAttribute( 'min' ) , getAttribute( 'format' ) )",
	Repeat : "value == document.getElementsByName( getAttribute( 'to' ) )[ 0 ].value",
	Range : "getAttribute( 'min' ) < value && value < getAttribute( 'max' )",
	Compare : "this.compare( value , getAttribute( 'operator' ) , getAttribute( 'to' ) )",
	Custom : "this.Exec( value , getAttribute( 'regexp' ) )",
	Group : "this.MustChecked( getAttribute( 'name' ) , getAttribute( 'min' ) , getAttribute( 'max' ) )",
	ErrorItem : [ document.forms[ 0 ] ],
	ErrorMessage : [ "以下原因导致提交失败：\t\t\t\t" ],
	Validate : function( theForm , mode ) {
		var obj = theForm || event.srcElement;
		var count = obj.elements.length;
		this.ErrorMessage.length = 1;
		this.ErrorItem.length = 1;
		this.ErrorItem[ 0 ] = obj;
		for( var i = 0 ; i < count ; i++ ) {
			with( obj.elements[ i ] ) {
				typeq = getAttribute( "dataType" );
				msgq = getAttribute( "msg" );
				if( typeq != null){
					var dataType = typeq.toString().split(',');
					var msg = msgq.toString().split(',');
					for(var j in dataType){
						var _dataType = dataType[j];
						if( typeof( _dataType ) == "object" || typeof( this[ _dataType ] ) == "undefined" ) {
							continue;
						}
						this.ClearState( obj.elements[ i ] ); 
						if( getAttribute( "require" ) == "false" && value == "" ) {
							continue;
						}
						switch( _dataType ){
							case "Date" :
							case "Repeat" :
							case "Range" :
							case "Compare" :
							case "Custom" :
							case "Group" :
							case "Limit" :
							case "LimitB" :
							case "SafeString" :
							if( !eval( this[ _dataType ] )) {
								this.AddError( i , msg[j] );
							}
							break;
							default :
							if( !this[ _dataType ].test( value )) {
								this.AddError( i , msg[j] );
							}
							break;
						}
					}
				}
			}
		}
		if( this.ErrorMessage.length > 1 ) {
			mode = mode || 1;
			var errCount = this.ErrorItem.length;
			switch( mode ) {
				case 2 : for( var i = 1 ; i < errCount ; i++ )
					this.ErrorItem[ i ].style.color = "red";
				case 1 : alert( this.ErrorMessage.join( "\n" ) );
					this.ErrorItem[ 1 ].focus( );
					break;
				case 3 :  for( var i = 1 ; i < errCount ; i++ ) {
					try{
						var span = document.createElement( "SPAN" );
						span.id = "__ErrorMessagePanel";
						span.style.color = "red";
						this.ErrorItem[ i ].parentNode.appendChild( span );
						span.innerHTML = this.ErrorMessage[ i ].replace( /\d+:/,"*" );
					} catch( e ) {
						alert( e.description ); 
					}
				}
				this.ErrorItem[ 1 ].focus( );
				break;
				case 4 :  for( var i = 1 ; i < errCount ; i++ ) {
					try{
						var span = document.createElement( "SPAN" );
						span.id = "__ErrorMessagePanel";
						span.style.color = "red";
						this.ErrorItem[ i ].parentNode.appendChild( span );
						span.innerHTML = this.ErrorMessage[ i ].replace( /\d+:/,"" );
					} catch( e ) {
						alert( e.description ); 
					}
				}
				this.ErrorItem[ 1 ].focus( );
				break;
				default :
				alert( this.ErrorMessage.join( "\n" ) );  
				break;
			}
			return false;
		}
		return true;
	},
	limit : function( len , min , max ) {
		min = min || 0;
		max = max || Number.MAX_VALUE;
		return min <= len && len <= max;
	},
	LenB : function( str ) {
		return str.replace( /[^\x00-\xff]/g , "**" ).length; 
	},
	ClearState : function( elem ) {
		with( elem ) {
			if( style.color == "red" ) {
				style.color = "";
			}
			var lastNode = parentNode.childNodes[ parentNode.childNodes.length - 1 ];
			if( lastNode.id == "__ErrorMessagePanel" ) {
				parentNode.removeChild( lastNode );
			}
		}
	},
	AddError : function( index , str ) {
		this.ErrorItem[ this.ErrorItem.length ] =  this.ErrorItem[ 0 ].elements[ index ];
		this.ErrorMessage[ this.ErrorMessage.length ] = this.ErrorMessage.length + ":" + str;
	},
	Exec : function( op , reg ){
		return new RegExp( reg , "g" ).test( op );
	},
	compare : function( op1 , operator , op2 ) {
		switch ( operator ) {
			case "NotEqual":   return ( op1 != op2 );
			case "GreaterThan":   return ( op1 > op2 );
			case "GreaterThanEqual":  return ( op1 >= op2 );
			case "LessThan":   return ( op1 < op2 );
			case "LessThanEqual": return ( op1 <= op2 );
			default: return ( op1 == op2 );
		}
	},
	MustChecked : function( name , min , max ) {
		var groups = document.getElementsByName( name );
		var hasChecked = 0;
		min = min || 1;
		max = max || groups.length;
		for( var i = groups.length - 1 ; i >= 0 ; i-- ) {
			if( groups[i].checked ) {
			 	hasChecked++;
			}
		}
		return min <= hasChecked && hasChecked <= max;
	},
	IsDate : function( op , formatString ) {
		formatString = formatString || "ymd";
		var m, year, month, day;
		switch( formatString ) {
			case "ymd" :
				m = op.match( new RegExp( "^((\\d{4})|(\\d{2}))([-./])(\\d{1,2})\\4(\\d{1,2})$" ) );
				if( m == null ) { 
					return false; 
				}
				day = m[ 6 ];  
				month = m[ 5 ]--;
				year =  ( m[ 2 ].length == 4 ) ? m[ 2 ] : GetFullYear( parseInt( m[ 3 ] , 10 ) );
				break;
			case "dmy" :
				m = op.match( new RegExp( "^(\\d{1,2})([-./])(\\d{1,2})\\2((\\d{4})|(\\d{2}))$" ) );
				if( m == null ) return false;
				day = m[ 1 ];
				month = m[ 3 ]--;
				year = ( m[ 5 ].length == 4 ) ? m[ 5 ] : GetFullYear( parseInt( m[ 6 ] , 10 ) );
				break;
			default :  break;
		}
		if( !parseInt( month ) ) {
			return false;
		}
		month = month == 12 ? 0 : month;
		var date = new Date( year , month , day );
		return ( typeof( date ) == "object" && year == date.getFullYear( ) && month == date.getMonth( ) && day == date.getDate( ) );
		function GetFullYear( y ) { 
			return ( (y < 30 ? "20" : "19" ) + y ) | 0;
		}
	}
}
})

//定义编辑器网站地址
var siteUrl = "http://www.cms.cn/index/";

function oPenWin(_sTitle, _sWidth, _sHeight, _sUrl, _bDialog, _open){
		xposition=0; yposition=0;
		if ((parseInt(navigator.appVersion) >= 4 )) {
			xposition = (screen.width - _sWidth) / 2;
			yposition = (screen.height - _sHeight) / 2;
		}
		if(_open) {
			window.open(_sUrl,"win","menubar=no,location=no,resizable=no,scrollbars=no,status=no,left="+xposition+",top="+yposition+",width="+_sWidth+",height="+_sHeight);
		} else {
			if(window.Event) {
				window.open(_sUrl,"win","menubar=no,location=no,resizable=no,scrollbars=no,status=no,left="+xposition+",top="+yposition+",innerWidth="+_sWidth+",innerHeight="+_sHeight);
			} else {
				if(_bDialog == true) {
					showModelessDialog(_sUrl, window, "dialogHeight:"+(_sHeight+20)+"px;dialogWidth:"+_sWidth+"px;status:no;help:no;resizable:yes;status:no;tustatus:no;");
				} else {
					showModalDialog(_sUrl, window, "dialogHeight:"+(_sHeight+20)+"px;dialogWidth:"+_sWidth+"px;status:no;help:no;resizable:yes;status:no;tustatus:no;");
				}
			}
		}
	}
function selClass(){
	typeid = (arguments[0] != 'undefined')?arguments[0]:0;
	oPenWin("请选择分类", 350, 400, "cmsselclass.php?id="+typeid);
}

//清除空格
String.prototype.trim = function() { return this.replace(/[\s　]+|(&nbsp;)+/gi, ''); };

//清空html标签
function maskHtml(t){
	var reg = /(<[^<]*>)+/g;
	return t.replace(reg,"");
}
function filterScript(t){
	//var reg = /\s*\<script((.|\n)*?)\/script\>\s*/ig;
	var reg = /<script((.|\n)*?)\/script>/ig;
	return t.replace(reg,"");
}

function checkNull(){
	publish_article();
	t = maskHtml($('#message_textarea').val()).trim();
	if(t == ''){
		err = '内容不能为空！\n';
		alert(err);
		document.getElementById('message_area').focus();
		return false;
	}
	return true;
}

function showObject(obj){
	o = $(obj);
	if(o.css('display') == 'none'){
		o.show();
	}else{
		o.hide();
	}
}

//确认框
function  confirm_box(message,callback){
    $(document.body).append('<div id="dialog-alert" style="display:none;" class="ui-widget ui-widget-content ui-corner-all" title=""></div>');
        $("#dialog-alert").dialog({  
		        autoOpen : false,  
		        height : 200,  
		        width : 355, 
		        title : '确认框',
		        modal : true,  
		        buttons : {  
		        	"确定" : function() {
                                        $(this).dialog("close");
                                        if(callback != undefined){
                                            callback();
                                        } 
		            	},
		            	"取消" : function() {  
                                    $(this).dialog("close"); 
                                    
		            	} 
		        	},  
		        close :function(){ 
                                $("#dialog-alert").remove();
		            }
		        });  
    $("#dialog-alert").html(message);
    $("#dialog-alert").dialog("open");
}
//提示框
function  alert_box(message,callback){
    $(document.body).append('<div id="dialog-alert" style="display:none;" class="ui-widget ui-widget-content ui-corner-all" title=""></div>');
    $("#dialog-alert").dialog({  
		        autoOpen : false,  
		        height : 200,  
		        width : 355, 
		        title : '提示框',
		        modal : true,  
		        buttons : {  
		        	"确定" : function() {
                                        $(this).dialog("close");
                                        if(callback != undefined){
                                            callback();
                                        }
                                    }
		        	},  
		        close :function(){  
                                $("#dialog-alert").remove();
		            }
		        });  
    $("#dialog-alert").html(message);
    $("#dialog-alert").dialog("open");
}
