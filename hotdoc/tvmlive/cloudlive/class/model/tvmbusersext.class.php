<?php
/* 数据模型文件(直播云系统)
 * To contact the author write to {@link jingyunshan@tvmining.com}
 * @author 景云山 
*/
class bUsersExt extends Bean {
	
    const TABLE = 'users_ext';
    public static $desc = null;
    //const PRIMARY_KEY = 'id';
	
    public function add($userid,$orgname,$address,$tel,$email,$othtel,$oicq){
        $bean = new bUsersExt();
        if($orgname || $address || $tel || $email || $othtel || $oicq){
            $bean->id = $userid;
            if($orgname)$bean->orgname = $orgname;
            if($address)$bean->address = $address;
            if($tel)$bean->telphone = $tel;
            if($email)$bean->email = $email;
            if($othtel)$bean->othphone = $othtel;
            if($oicq)$bean->oicq = $oicq;
            $flag = $bean->save();
        }
        return $flag;
    }

    public function edit($orgname,$address,$tel,$email,$othtel,$oicq,$userid) {
        $bean = bUsersExt::i($userid);
        if ($bean->orgname || $bean->address || $bean->telphone || $bean->email || $bean->othphone || $bean->oicq){
            if($orgname)$bean->orgname = $orgname;
            if($address)$bean->address = $address;
            if($tel)$bean->telphone = $tel;
            if($email)$bean->email = $email;
            if($othtel)$bean->othphone = $othtel;
            if($oicq)$bean->oicq = $oicq;
            $flag = $bean->save();
        }
        return $flag;
    }
    
   
}
