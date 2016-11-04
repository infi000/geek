jQuery.fn.extend({
	pagination:{
		bgcolor:'',
		action:function(){
			if($("#_paginalDataContainer").children().parent().is('table')){
				var row = $("#_paginalDataContainer").children().children();
			}else{
				var row = $("#_paginalDataContainer").children();
			}
			row.mouseover(function(){
				this.bgcolor = $(this).css('background-color');
				$(this).css('background-color','#eee');
			}).mouseout(function(){
				$(this).css('background-color',this.bgcolor);
			});   
			$("._pageinalCheckBoxAll").click(function(){
				var l = $("._pageinalCheckBox:not(:checked)").length;
				if(this.checked){
					$("._pageinalCheckBox:not(:disabled)").prop({checked:true}); 
					$("._pageinalCheckBoxAll").prop({checked:true}); 
				}else{
					//$("._pageinalCheckBox").removeAttr("checked");
					//$("._pageinalCheckBoxAll").removeAttr("checked");
					$("._pageinalCheckBox:not(:disabled)").prop({checked:false}); 
					$("._pageinalCheckBoxAll").prop({checked:false}); 
				}
			});
			$("._pageinalCheckBox").click(function(){
				var l = $("._pageinalCheckBox:not(:checked)").length;
				if(l){
					//$("._pageinalCheckBoxAll").removeAttr("checked");
					$("._pageinalCheckBoxAll").prop({checked:false}); 
				}else{
					$("._pageinalCheckBoxAll").prop({checked:true}); 
				}
			})
			var reg = /\/$/;
			var url = document.URL.split('?');
			url[1] = this.cutid(url[1]);
			if(url[1] != undefined) {
				query = url[1] + '&';
				if(this.removeparam != ''){
					pos = query.indexOf( this.removeparam );
					if(pos != -1){
						len = query.length;
						temp1 = query.substr(0,pos);
						temp2 = query.substr(pos);
						pos = temp2.indexOf( '&' );
						temp2 = temp2.substr(pos+1);
						query = temp1+temp2;
					}
				}
			}else query = '';
			var editUrl = this.editUrl;
			var viewUrl = this.viewUrl;
			var delUrl = this.delUrl;
			$("._pageinalDeleteButton").click(function(){
				if(confirm("确认要删除记录吗？")){
					if(delUrl.indexOf('?') != -1){
						this.href = delUrl+'&'+query+'id='+$(this).attr("xls");
					}else{
						this.href = delUrl+'?'+query+'id='+$(this).attr("xls");
					}
				}
			});
			$("._pageinalEditButton").click(function(){
				if(editUrl.indexOf('?') != -1){
					this.href = editUrl+'&'+query+'id='+$(this).attr("xls");
				}else{
					this.href = editUrl+'?'+query+'id='+$(this).attr("xls");
				}
			});
			$("._pageinalDetailButton").click(function(){
				if(viewUrl.indexOf('?') != -1){
					this.href = viewUrl+'&'+query+'id='+$(this).attr("xls");
				}else{
					this.href = viewUrl+'?'+query+'id='+$(this).attr("xls");
				}
			});
			if(this.custom.length > 0){
				for(i=0;i<this.custom.length;i++){
					var cusurl = this.custom[i];
					$("._pageinalCustomButton"+(i+1)).click(function(){
						this.href = cusurl+'?'+query+'id='+$(this).attr("xls");
						if(cusurl.indexOf('?') != -1){
							this.href = cusurl+'&'+query+'id='+$(this).attr("xls");
						}else{
							this.href = cusurl+'?'+query+'id='+$(this).attr("xls");
						}
					});
				}
			}
		},
		cutid:function(query){
			if(query != undefined){
				var pos = query.indexOf('id');
				if( pos != -1 ){
					query = query.substr(0,pos);
				}
				if(query == '')query = undefined;
			}
			return query;
		},
		editUrl:'',
		delUrl:'',
		viewUrl:'',
		removeparam:'',
		custom:Array()
	}
});

