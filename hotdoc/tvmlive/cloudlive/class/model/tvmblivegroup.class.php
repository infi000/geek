<?php
/* 数据模型文件(直播云系统)
 * To contact the author write to {@link jingyunshan@tvmining.com}
 * @author 景云山 
*/
class bLiveGroup extends Bean {
	
	const TABLE = 'livegroup';
	public static $desc = null;
	//const PRIMARY_KEY = 'id';
	
    public function add($id,$userid,$name,$code) {
        $bean = bLiveGroup::i($id);
        if ($bean->groupname){
            $bean->groupname = $name;
        }else{
            $bean = new bLiveGroup();
            $bean->id = $id;
            $bean->userid = $userid;
            $bean->groupname= $name;
            $bean->code = $code;
        }
        return $bean->save();
    }

    public function edit($name,$image,$id=0,$status=1) {
        $bean = Boxs::i($id);
        if ($bean->boxcode){
            if($name)$bean->boxname = $name;
            if($image)$bean->image = $image;
            $bean->status = $status;
            $flag = $bean->save();
        }
        return $flag;
    }
    
  
	
}
