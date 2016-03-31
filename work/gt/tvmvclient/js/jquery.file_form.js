jQuery.fn.extend({
	ohtml: function() {
		return this[0]?(
		document.all?
		this[0].outerHTML:null)
		:null;
	},
	fileclear: function(){
		this[0]?
		(document.all?
		this[0].outerHTML = this[0].outerHTML.replace(/value=\w/g,"")
		:this[0].value = '')
		:null;
	}
});