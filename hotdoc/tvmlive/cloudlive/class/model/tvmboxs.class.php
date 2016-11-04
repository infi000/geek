<?php
/* 数据模型文件(直播云系统)
 * To contact the author write to {@link jingyunshan@tvmining.com}
 * @author 景云山 
*/
class Boxs extends Bean {
	
	const TABLE = 'liveboxs';
	public static $desc = null;
	//const PRIMARY_KEY = 'id';
	
    public function add($userid,$mac,$name) {
        $bean = new Boxs();
        $bean->userid = $userid;
        $bean->boxcode = $mac;
	$bean->boxname = $name;
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
    
    public function delete($code,$userid) {
        $date = COMCommon::sysTime();
        $bean = Boxs::getOne("boxcode=? and userid=?",array($code,$userid));
        if ($bean->boxcode) {
            $bean->userid = 0;
            $bean->boxname = "";
            $bean->image = "";
            $bean->del_time = $date;
            $bean->dstatus = 1;
            $bean->status = 0;
            $flag = $bean->save();
        }
        return $flag;
    }


    public function boxcode($id) {
        $bean = Boxs::i($id);
        if ($bean->boxcode) {
           return $bean->boxcode;
        }
        return "";
    }
    
	function update_enable($id,$type){
		$channel = self::i($id);
		if($channel->code){
			$channel->ping = $type;
		}
		return $channel->save();
	}
	
}
