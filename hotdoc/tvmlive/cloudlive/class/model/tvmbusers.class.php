<?php
/* 数据模型文件(直播云系统)
 * To contact the author write to {@link jingyunshan@tvmining.com}
 * @author 景云山 
*/
class bUsers extends Bean {
	
    const TABLE = 'users';
    public static $desc = null;
    //const PRIMARY_KEY = 'id';
    public static $_usertype = array(1=>'个人',2=>'学校',3=>'教育培训机构',4=>'政府机关单位',5=>'其他公司/企业');
	
    public function add($tvmid,$pass,$name,$phone,$type,$ip,$date) {
        $user = bUsers::getOne("tvmid=?", $phone);
        if(empty($user)){
            $bean = new bUsers();
            $bean->tvmid = $tvmid;
            $bean->password = $pass;
            $bean->phone = $phone;
            $bean->realname = $name;
            $bean->usertype = $type;
            $bean->last_ip = $ip;
            $bean->last_time = $date;
            $bean->login_max = 1;
            return $bean->save();
        }else{
            return -1;
        }
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