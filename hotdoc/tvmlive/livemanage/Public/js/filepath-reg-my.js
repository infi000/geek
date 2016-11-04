function getAllUploadImagePath(data){
	//var reg=new RegExp('\.\.\/Public\/Uploads\/News\/\d{8}\/\d{14}_\d{5}\.(png|jpg|bmp|gif|jpeg)','ig');
	var reg=/\.\.\/Public\/Uploads\/News\/\d{8}\/\d{14}_\d{5}\.(png|jpg|bmp|gif|jpeg)/g;
	//../Public/Uploads/News/20161018/20161018124713_96594.jpg
	//var rs=reg.match(data);
	var rs=data.match(reg);	
	return rs;
}
