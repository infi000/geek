function maxWidthHeightHash(_objwidth,_objheight,_maxw,_maxh){
			var _zoom=1;
			var oldw=_objwidth;
			var oldh=_objheight;
			if(_maxw>1){
				if (_objwidth>_maxw) {
					_zoom=_maxw/_objwidth; //alert("width:"+_zoom);
				//	_zoom=ForDight(_zoom+0.5,2);
					_objwidth=_maxw;
					_objheight=_objheight*_zoom;
				}
			}
			if(_maxh>1){ 
				if (_objheight>_maxh) {
					_zoom=_maxh/oldh; //alert("height:"+_zoom);
				//	_zoom=ForDight(_zoom+0.5,2);
					_objheight=_maxh;
					_objwidth=oldw*_zoom;
				}
			}
		//alert("zoom:"+_zoom);
			//var _cssText="margin:1px 0px 1px 0px;width:"+_objwidth+"px;height:"+(_objheight-2)+"px";
	 		return {"zoom":_zoom,"width":_objwidth,"height":_objheight};
	}