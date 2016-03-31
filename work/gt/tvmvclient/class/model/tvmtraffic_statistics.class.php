<?php
/* 数据操作文件(TVM-ENCODER系统)
 * To contact the author write to {@link jingyunshan@tvmining.com}
 * @author 景云山 
*/
class Traffic_statistics extends Bean {
	
	const TABLE = 'traffic_statistics';
	public static $desc = null;
	//const PRIMARY_KEY = 'id';
	
    public function add($boxid,$title,$pageurl, $hits,$status,$date) {
        $bean = new Traffic_statistics();
        $bean->box_id = $boxid;
        $bean->title = $title;
        $bean->pageurl = $pageurl;
        $bean->hitscount = $hits;
        $bean->add_time = $date;
	$bean->status = $status;
        return $bean->save();
    }

    public function edit($hits,$status, $id) {

        $bean = Users_token::i($id);
        if ($bean->box_id) {
            if($hits)$bean->hitscount = $hits;
	    if($status)$bean->status = $status;
            $flag = $bean->save();
        }
        return $flag;
    }

    
    

}
