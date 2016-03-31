<?php
/* SQL文件(TVM-ENCODER系统)
 * To contact the author write to {@link jingyunshan@tvmining.com}
 * @author 景云山 
*/
class Users_token extends Bean {
	
	const TABLE = 'users_token';
	public static $desc = null;
	//const PRIMARY_KEY = 'id';
	
    public function add($userid,$appid,$ordersn, $tokenid,$stime,$etime,$status,$authcode) {
        $bean = new Users_token();
        $bean->id = $userid;
        $bean->app_id = $appid;
        $bean->order_sn = $ordersn;
        $bean->token_id = $tokenid;
	$bean->start_time = $stime;
	$bean->end_time = $etime;
	$bean->status = $status;
        $bean->authcode = $authcode;
        return $bean->save();
    }

    public function edit($appid,$ordersn, $tokenid,$stime,$etime,$status,$authcode, $id) {

        $bean = Users_token::i($id);
        if ($bean->token_id) {
            if($appid)$bean->app_id = $appid;
            if($ordersn)$bean->order_sn = $ordersn;
            if($tokenid)$bean->token_id = $tokenid;
            if($stime)$bean->start_time = $stime;
            if($etime)$bean->end_time = $etime;
	    if($status)$bean->status = $status;
            if($authcode)$bean->authcode = $authcode;
            $flag = $bean->save();
        }
        return $flag;
    }

    
    

}
