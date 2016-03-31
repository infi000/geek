<?php
/* SQL文件(TVM-ENCODER系统)
 * To contact the author write to {@link jingyunshan@tvmining.com}
 * @author 景云山 
*/
class Boxs extends Bean {
	
	const TABLE = 'boxs';
	public static $desc = null;
	//const PRIMARY_KEY = 'id';
	
    public function add($boxid,$mac,$time,$status,$runtime) {
        $bean = new Boxs();
        $bean->id = $boxid;
        $bean->mac = $mac;
	$bean->add_time = $time;
	$bean->status = $status;
        $bean->runtime = $runtime;
        return $bean->save();
    }

    public function edit($runtime,$id) {
        $bean = Boxs::i($id);
        if ($bean->mac) {
            $bean->runtime = $runtime;
            $flag = $bean->save();
        }
        return $flag;
    }

    
    

}
