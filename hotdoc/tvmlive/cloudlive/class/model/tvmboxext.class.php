<?php
/* 数据模型文件(直播云系统)
 * To contact the author write to {@link jingyunshan@tvmining.com}
 * @author 景云山 
*/
class BoxExt extends Bean {
	
    const TABLE = 'liveboxs_ext';
    public static $desc = null;
    //const PRIMARY_KEY = 'id';
	
    public function add($boxid,$weburl='',$mpurl='',$imageurl=''){
        $bean = BoxExt::getOne("id=?", $boxid);
        if(empty($bean)){
            $bean = new BoxExt();
            if($weburl || $mpurl || $imageurl){
                $bean->id = $boxid;
                if($weburl)$bean->livepath = $weburl;
                if($mpurl)$bean->wxpath = $mpurl;
                if($imageurl)$bean->image = $imageurl;
                $flag = $bean->save();
            }
        }else{
            $flag = $this->edit($boxid,$weburl,$mpurl,$imageurl);
        }
        return $flag;
    }

    public function edit($boxid,$weburl='',$mpurl='',$imageurl='') {
        $bean = BoxExt::i($boxid);
        if($bean->livepath || $bean->wxpath || $bean->image){
            if($weburl)$bean->livepath = $weburl;
            if($mpurl)$bean->wxpath = $mpurl;
            if($imageurl)$bean->image = $imageurl;
            $flag = $bean->save();
        }
        return $flag;
    }
    
	
}



