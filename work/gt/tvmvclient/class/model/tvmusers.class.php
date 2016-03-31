<?php
/* SQL文件(TVM-ENCODER系统)
 * To contact the author write to {@link jingyunshan@tvmining.com}
 * @author 景云山 
*/
class Users extends Bean {
	
	const TABLE = 'users';
	public static $desc = null;
	//const PRIMARY_KEY = 'id';
	
    public function add($phone, $addate) {

        $bean = new Users();
        $bean->user_name = $phone;
        $bean->addate = $addate;
        
        return $bean->save();
    }

    public function edit($phone, $addate, $id) {

        $bean = Channels::i($id);
        if ($bean->user_name) {
            $bean->ip = $ip;
            $bean->localip = $localip;
            $flag = $bean->save();
        }
        return $flag;
    }

    public static function get_select_rate($value = 0) {
        $temp = '<option value="0">请选择</option>';
        foreach (self::$rate_list as $row) {
            if ($row == $value) {
                $temp .= '<option value="' . $row . '" selected>' . $row . '</option>';
            } else {
                $temp .= '<option value="' . $row . '">' . $row . '</option>';
            }
        }
        return $temp;
    }

    public static function get_select_trans($value) {
        $trans = array('ftp', 'udt');
        $temp = '';
        foreach ($trans as $row) {
            if ($row == $value) {
                $temp .= '<option value="' . $row . '" selected="selected">' . $row . '</option>';
            } else {
                $temp .= '<option value="' . $row . '">' . $row . '</option>';
            }
        }
        return $temp;
    }

    public static function get_select_module($value) {
        $smodule = explode(',', $value);
        $modules = bModules::getList("enable = 1 and code not in('tvmeup','daemontools','rpmforge-release')");
        foreach ($modules as $row) {
            if (in_array($row->code, $smodule)) {
                $temp .= '<li style="background-color: #563D7C;color: #FFFFFF;"><input class="pullCheckBox" id="pull' . $row->id . '" type="checkbox" checked="checked" value="' . $row->code . '"><label for="pull' . $row->id . '">' . $row->code . '</label> </li>';
            } else {
                $temp .= '<li><input class="pullCheckBox" id="pull' . $row->id . '" type="checkbox" value="' . $row->code . '"><label for="pull' . $row->id . '">' . $row->code . '</label> </li>';
            }
        }
        return $temp;
    }

    public static function get_select_storage($value, $groupid) {
        $storage = Storage_device::getList("enable = 1 and groupid = ?", $groupid);
        foreach ($storage as $row) {
            if ($row->id == $value) {
                $temp .= '<option value="' . $row->id . '" selected="selected">' . $row->name . '</option>';
            } else {
                $temp .= '<option value="' . $row->id . '">' . $row->name . '</option>';
            }
        }
        return $temp;
    }

    public static function get_select_width($val=0,$flag=false){
	if($val){
		$encode = explode('_', $val);
		if($flag){
			$value = intval($encode[1]);
			$list = self::$width_list;
		}else{
			$value = intval($encode[2]);
			$list = self::$height_list;
		}
	}else{
		$value = 0;
		if($flag){
			$list = self::$width_list;
		}else{
			$list = self::$height_list;
		}
	}
		$temp =  '<option value="">请选择</option>';
		foreach($list as $row){
			if($row == $value){
				$temp .= '<option value="'.$row.'" selected>'.$row.'</option>';
			}else{
				$temp .= '<option value="'.$row.'">'.$row.'</option>';
			}

		}
		return $temp;
	}
	
	//版本号比较
	public function checkVersion($oldvers,$newvers){
		$old = explode('.', $oldvers);
		$new = explode('.', $newvers);
		$m = count($old);
		$maxver = $old;
		$minver = $new;
		$flag = 1;
		$nm = count($new);
		if($m < $nm){
			$m = $nm;
			$maxver = $new;
			$minver = $old;
			$flag = 2;
		}
		for($i = 0;$i < $m;$i++){
			if(intval($maxver[$i]) > intval($minver[$i])){
				$max = 1;
				break;
			}elseif(intval($maxver[$i]) < intval($minver[$i])){
				$min = 1;
				break;
			}
		}
		if($flag == 1 && $min == 1){
			return true;
		}elseif($flag == 2 && $max == 1){
			return true;
		}
		return false;
	}	
	
	public static function enableping( $value ){
		if($value[1]){
			$text = '<a class="_pageinalEnableButton" xls="'.$value[0].'" xlst = "0" href="javascript:void(0);">已启用</a>&nbsp;&nbsp;<a href="?m=1024&code='.$value[2].'">查看</a>';
		}else{
			$text = '<a class="_pageinalEnableButton" xls="'.$value[0].'" xlst = "1" href="javascript:void(0);">已禁用</a>';
		}
		return $text;
	}
	
	public static function enablestart( $value ){
		if($value[1]){
			$text = '<a class="_pageinalEnableStart" xls="'.$value[0].'" xlst = "0" href="javascript:void(0);">已启用</a>';
		}else{
			$text = '<a class="_pageinalEnableStart" xls="'.$value[0].'" xlst = "1" href="javascript:void(0);">已禁用</a>';
		}
		return $text;
	}
	public static function enablestatus( $value ){
		if($value[1]){
			$text = '<a class="_pageinalEnableStatus" xls="'.$value[0].'" xlst = "0" href="javascript:void(0);">已激活</a>';
		}else{
			$text = '<a class="_pageinalEnableStatus" xls="'.$value[0].'" xlst = "1" href="javascript:void(0);">已关闭</a>';
		}
		return $text;
	}
        public static function set_transport( $value ){
		$text = $value[1].' <a class="_pageinalTransport" xls="'.$value[0].'"  href="javascript:void(0);">设置</a>';
		return $text;
	}
	
	public static function set_pullback( $value ){
		$text = ($value[1]?'<font style="color:red;font-weight:bold">已设回退</font>':'').' <a class="_pageinalPullback" xls="'.$value[0].'"  href="javascript:void(0);">设置</a>';
		return $text;
	}
	function update_enable($id,$type){
		$channel = self::i($id);
		if($channel->code){
			$channel->ping = $type;
		}
		return $channel->save();
	}
	
   function update_restart($id,$type){
		$channel = self::i($id);
		if($channel->code){
			$channel->restart = $type;
		}
		return $channel->save();
	}
        function update_status($id,$type){
		$channel = self::i($id);
		if($channel->code){
			$channel->enable = $type;
         $channel->startime = time();
		}
		return $channel->save();
	}
   function shut_restart($code){
		$channel = self::getOne("code=?", $code);
		if($channel->id){
			$channel->restart = 0;
		}
		return $channel->save();
	}
	
	public static function set_transtatus( $value ){
		$status = $value[1];
		if($status{0}){
			$text = '<a class="_pageinalTranstatus" xls="'.$value[0].'" xlst = "0" href="javascript:void(0);">已关闭</a>';
		}else{
			$text = '<a class="_pageinalTranstatus" xls="'.$value[0].'" xlst = "1" href="javascript:void(0);">已开启</a>';
		}
		return $text;
	}

    public static function fieldsdesc($value){
        $text = '<a href="'.$value[1].'" target="_self">'.$value[0].'</a>';
        return $text;
    }
    

}
