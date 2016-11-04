<?php
class Box extends Boxs{
	
	/**
	 * 对像静态变量
	 * 
	 * @var object
	 */
	static private $_class;
        static private $_channellist;
	/**
	 * 实例化对像
	 * 
	 * @return class
	 */
	public static function factory(){
		if (!isset(self::$_class ) ) {
			$className = __CLASS__;
			self::$_class = new $className;
		}
		return self::$_class;	
	}
        
        private static function getchannelist($token=''){
            if (!isset(self::$_channellist ) ) {
                    $livehost = Core::$_config->liveserver['host'];
                    //管理员登录
                    $urlcloud = 'http://'.$livehost.'/approve/getchannel?format=json&access_token=';
                    $apidata = Core::request_url($urlcloud);
                    if($apidata){
                         self::$_channellist=json_decode(gzdecode($apidata));
                    }
		}
		return self::$_channellist;
        }


        /**
	 * 功能号：5122
	 * 增加盒子
	 * */
        public function add_box(){
            COMFilter::$_jump = false;
            $boxcode = Core::$_dataFilter->valueCheck( Core::get("code") , "Require,Limit" , "需要盒子ID,数据非法" , false , 13 );
            $name = Core::$_dataFilter->valueCheck( Core::get("name") , "Require,Limit" , "需要盒子名称,数据非法" , false , 30 );
            $userid = $_SESSION['USERID'];
            if(!Core::checkcode($boxcode)){
		Core::json_error('code 不合法');
            }
            if($boxcode){
                $livegroup = bLiveGroup::getOne("userid=?", $userid);
                if($livegroup){
                    $groupid = $livegroup->id;
                    $grouptitle = $livegroup->groupname;
                }
                $grouptitle = $grouptitle?$grouptitle:$name;
                $yunflag = COMCommon::add_boxyun($userid,$boxcode,$name,$groupid,$grouptitle);
                if($yunflag){
                    //$addate = COMCommon::sysTime();
                    $clientbox = new Boxs();
                    $one = $clientbox->getOne("boxcode=?", $boxcode);
                    if($one){
                        if (intval($one->dstatus) === 1) {
                            $one->boxname = $name;
                            $one->dstatus = 0;
                            $one->status = 1;
                            $one->del_time = "0000-00-00 00:00:00";
                            $one->userid = $userid;
                            $flag = $one->save();
                            
                        } else {
                             if($one->userid == $userid){
                                 $mess = "盒子已被绑定,不能重复绑定";
                             }else{
                                 $mess = "已被其它用户绑定,不能绑定该盒子";
                             }
                        }
                    }else{
                        $flag = $clientbox->add($userid,$boxcode,$name);
                    }
                }else{
                    $mess = "云服务出错,请稍后重试";
                }
                if($flag){
                    $title = "恭喜您！盒子已成功绑定盒子！";
                    $text = "恭喜您盒子 $boxcode 已成功绑定！快去看直播吧！";
                    bMessages::add($userid,1,$title,$text);
                    Core::json_result('', 'ok');
                }else{
                    if($mess){
                        Core::json_error($mess);
                    }else{
                        Core::json_error("系统错误,请稍后重试");
                    }
                }
            }else{
                Core::json_error('盒子ID为空');
            }
            
        }

       /**
	 * 功能号：5120
	 * 绑定盒子
	 * */
	public function bindbox() {
            //实例化模板
            $tp = PHP_Templates::factory();
            //设置模板文件
            $tp->setFiles('boxbangding');
            //输出页面
            $tp->execute();

            //释放模板变量
            unset($tp);
        }
        
         /**
	 * 功能号：5124
	 * 盒子名称修改
	 * */
        public function editname(){
            COMFilter::$_jump = false;
            $id = intval(Core::$_dataFilter->valueCheck( Core::get("id") , "Require,Integer" , "id不能为空,数据非法！" ));
            $name = Core::$_dataFilter->valueCheck( Core::get("name") , "Require,Limit" , "需要盒子名称,数据非法" , false , 30 );
            $userid = $_SESSION['USERID'];
            $clientbox = new Boxs();
            $one = Boxs::getOne("id=? and userid=?", array($id,$userid));
            if($one) {
                 $one->boxname = $name;                   
                 $flag = $one->save(); 
                 if($flag){
                     Core::json_result($name, 'ok');
                 }else{
                     $mess = "盒子不存在";
                     Core::json_error($mess);
                 }
            } else {
                $mess = "盒子不存在";
                Core::json_error($mess);
            }
        }
        
         /**
	 * 功能号：5125
	 * 删除盒子
	 * */
        public function delete_box(){
            COMFilter::$_jump = false;
            $id = intval(Core::$_dataFilter->valueCheck( Core::get("id") , "Require,Integer" , "id不能为空,数据非法！" ));
            $userid = $_SESSION['USERID'];
            $box = Boxs::getOne("id=? and userid=? and dstatus=0", array($id,$userid));
            if($box){
                $flag = Boxs::delete($box->boxcode,$userid);
                if($flag){
                    $date = COMCommon::sysTime();
                    Boxlogs::add($userid,$box->boxcode,$date);
                    $title = "盒子解除绑定成功！";
                    $text = "盒子 {$box->boxcode} 已成功解除绑定！";
                    bMessages::add($userid,1,$title,$text);
                    Core::json_result('', 'ok');
                }else{
                    $mess = "系统错误";
                    Core::json_error($mess);
                }
            }else{
                $mess = "盒子不存在";
                Core::json_error($mess);
            }
        }
        
        /**
	 * 功能号：5121
	 * 获取图片
	 * */
	public function getpicture() {
            COMFilter::$_jump = false;
            $boxcode = Core::$_dataFilter->valueCheck( Core::get("code") , "Require,Limit" , "需要盒子ID,数据非法" , false , 13 );
            
            if(!Core::checkcode($boxcode)){
		Core::json_error('code 不合法');
            }
            
            $picurl = $this->thumbnail($boxcode);
            $code = Core::request_code($picurl);
            $data = array(
                    'picurl'=>$picurl,
                    'code'=>$code
                );
            Core::json_result($data, 'ok');
        }
        
        /**
         * 获取截图
         * @param $channel
         * @param $datetime
         * @param $hlsToken
         */
        public function thumbnail($channel,$token, $datetime='')
        {
            $info = self::getchannelist($token);
            if($info->$channel){
                if ($datetime) {
                    $url = $info->$channel->picture_url."/approve/capture?type=".Core::$_config->liveserver['rate']."&channel=".$channel."&time=".$datetime;
                } else {
                    $url = $info->$channel->picture;
                }
            }
            return $url;
        }
        
        public function getimeaxis($camera_id,$liveurl=false,$token='') {
            $channelinfo = self::getchannelist($token);
            if($channelinfo->$camera_id){
                $live_url = $channelinfo->$camera_id->live_url;
                $mediainfo_url = $channelinfo->$camera_id->mediainfo;
                $timeaxis_url = $channelinfo->$camera_id->timeaxis;
            }
            $media_url = $mediainfo_url.'?format=json&channel=' . $camera_id;
            $mediainfo = Core::request_url($media_url);
            if ($mediainfo) {
                //处理类型
                $info = json_decode(gzdecode($mediainfo));
                $info = $info->$camera_id->stream_type;
                $info = explode('|', $info);
                $info = explode('=', $info[0]);
                $info_type = $info[0];
                //获取时间轴url
                $time = time();
                $stime = $time-30*6;
                $date = COMCommon::sysTime($time);
                $axis_url = $timeaxis_url.'?type=' . $info_type . '&channel=' . $camera_id . '&date=' . substr($date,0,10) . '&format=json&starttime=' . $stime . '&endtime=' . $time;
                $axisinfo = Core::request_url($axis_url);
                $datas = json_decode(gzdecode($axisinfo),true); 
                if (is_array($datas)) {
                    if($datas['FAILED']){
                        return false;
                    }else{
                        if($liveurl){
                            $url = $live_url.'?channel=' . $camera_id . '&type='.$info_type.'&access_token='.$token;
                           //$url = 'http://'.Core::$_config->liveserver['host'].'/approve/live?channel=T00E04CFC1EA6&type='.$info_type.'&access_token='.$token;
                           //$url = "http://10.20.50.51/approve/live?channel=T00E04CFC2AE9&type=iptv";
                           return array('online'=>true,'liveurl'=>$url);
                        }else{
                            return true;
                        }
                    }
                    
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
        
        /**
	 * 功能号：5129
	 * 盒子在线状态
	 * */
        public function camera_status() {
            COMFilter::$_jump = false;
            $token = Core::$_dataFilter->valueCheck( Core::get("token") , "Require,Limit" , "参数错误,数据非法！",false,50 );
            $camera_id = Core::$_dataFilter->valueCheck( Core::get("code") , "Require,Limit" , "需要盒子ID,数据非法" , false , 13 );
            
            if(!Core::checkcode($camera_id)){
		Core::json_error('code 不合法');
            }
            $box = Boxs::getOne("boxcode=? and dstatus=0", $camera_id);
            if($box){
                if(!$box->status){
                    Core::json_error('视频因涉嫌违规已暂停直播');
                }
            }
            
            $channelinfo = COMCommon::get_channel($token);
            if($channelinfo->$camera_id){
                $live_url = $channelinfo->$camera_id->live_url;
                $mediainfo_url = $channelinfo->$camera_id->mediainfo;
                $timeaxis_url = $channelinfo->$camera_id->timeaxis;
            }
            
            $flag = 0;
            $media_url = $mediainfo_url . '?format=json&channel=' . $camera_id;
            $mediainfo = Core::request_url($media_url);
            if ($mediainfo) {
                //处理类型
                $info = json_decode(gzdecode($mediainfo));
                $info = $info->$camera_id->stream_type;
                $info = explode('|', $info);
                $info = explode('=', $info[0]);
                $info_type = $info[0];
                //获取时间轴url
                $time = time();
                $stime = $time-30*4;
                $date = COMCommon::sysTime($time);
                $axis_url = $timeaxis_url . '?type=' . $info_type . '&channel=' . $camera_id . '&date=' . substr($date,0,10) . '&format=json&starttime=' . $stime . '&endtime=' . $time;
                $axisinfo = Core::request_url($axis_url);
                $datas = json_decode(gzdecode($axisinfo),true); 
                if (is_array($datas)) {
                    if($datas['FAILED']){
                        $flag = 0;
                    }else{
                        $flag = 1;
                    }
                    
                }
            }
            if($flag === 1){
                Core::json_result($datas, 'online');
            }else{
                Core::json_error('offline');
            }
            
        }
          /**
	 * 功能号：5133
	 * 边看边聊
	 * */
	public function weixinset(){
            $_SESSION['NAVAGATION'] = 1; 
            COMFilter::$_jump = false;
             $id = intval(Core::$_dataFilter->valueCheck( Core::get("code") , "Require,Integer" , "参数错误,数据非法！" ));
            $box = Boxs::getOne("id=? and dstatus=0", $id);
            if($box){
                $time = $_SERVER['REQUEST_TIME'] * 1000;
                $boxid = $box->boxcode;
                $name = $box->boxname;
                $wxtoken = '9c1d02c56065';
                $wsp_url = 'http://qa.wsq.mtq.tvm.cn';
                $sign = md5(md5("boxId=".$boxid."&token=".$wxtoken."&timestamp=".$time."&edukey=tvm!@#edu"));
                $seturl = $wsp_url.'/actions/linkedin/loginlivestream4edu.do?boxid='.$boxid.'&token='.$wxtoken.'&timestamp='.$time.'&sign='.$sign;
               
            }
                //实例化模板
		$tp = PHP_Templates::factory();
		setcookie("flagReturn",1); 
		//设置模板文件
		$tp->setFiles('boxwxset');
		$tp->tableBody = $this->boxlist();
                $tp->pager = $this->_showpage;
                $tp->seturl = $seturl;
                $tp->boxname = $name;
		//输出页面
		$tp->execute();
			
		//释放模板变量
		unset($tp);
	}
	
        
        /**
	 * 功能号：5101
	 * 盒子列表
	 * */
	public function clist(){
            $_SESSION['NAVAGATION'] = 1; 
            COMFilter::$_jump = false;
                //实例化模板
		$tp = PHP_Templates::factory();
		setcookie("flagReturn",1); 
		//设置模板文件
		$tp->setFiles('boxlist');
		$tp->tableBody = $this->boxlist();
                $tp->pager = $this->_showpage;
		//输出页面
		$tp->execute();
			
		//释放模板变量
		unset($tp);
	}
	
        private function boxlist() {
            $keyword = strtoupper(Core::$_dataFilter->valueCheck(Core::get("keyword"), "Limit", "关键字最多20个字符", false, 20));
            $userid = $_SESSION['USERID'];
            $_where = "userid=?and dstatus=0 ";
            if ($keyword) {
                $_where .= " and boxcode like '%$keyword%'";
            }
            $_order = Core::$_dataFilter->valueCheck(Core::get("order"), "Limit", "关键字最多20个字符", false, 20);
            $_asc = isset($_GET['asc']) ? $_GET['asc'] : 1;
            if ($_order) {
                if ($_asc) {
                    $_asc = 0;
                    $_order = "$_order desc";
                } else {
                    $_asc = 1;
                    $_order = "$_order asc";
                }
            } else {
                $_order = 'id desc ';
            }

            //设置每显示记录条数
            $pageSize = 100;
            //设置显示的数字页码数
            $showSize = 10;
            $page = Boxs::getPage($_where,$userid, $_order, $pageSize);

            $dataTotal = $page['total'];
            //获取当前页
            $currPage = $page['curr'];

            //获取页数据
            $result = $page['list'];
            if (!empty($result)) {
                if (is_array($result)) {
                    $temp1 = '';
                    $temp2 = '';
                    foreach ($result as $row) {
                        $imageurl = $this->thumbnail($row['boxcode']);
                        if(empty($imageurl)){
                            $infoext = BoxExt::i($row['id']);
                            if($infoext){
                                $imageurl = $infoext->image?$infoext->image:$row['image'];
                            }elseif($row['image']) {
                                $imageurl = $row['image'];
                            }
                            if(empty($imageurl)){
                                $imageurl = 'images/bf/set-default.png';
                            }
                        }
                        $temp5 = (COMCommon::textlen($row['boxname'])>10)?'<i>'.$row['boxname'].'</i>':'';
                        $temp3 = '<div class="preview"><img src="' . $imageurl . '"></div><p>设备序列号：'.$row['boxcode'].'</p>' .
                                '<div class="boxInfo"><ul>
                                    <li class="boxName"><span>' . COMCommon::cutSubstr($row['boxname'],0,10,'...') . '</span>'.$temp5.'</li>';
                        $temp4 = '<li class="boxCog">
                                        <button dataid= "' . $row['id'] . '" class="btn btn-default  boxCog">
                                            <span class="glyphicon glyphicon-cog"></span> 配置
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>';
                        $online = $this->getimeaxis($row['boxcode']);
                        if ($online) {
                            $temp1 .= '<div class="box2" data-status="in">' . $temp3 . '<li class="boxStatus"><img src="images/bf/j.png"><span>在线</span></li>' . $temp4;
                        } else {
                            $temp2 .= '<div class="box2" data-status="out">' . $temp3 . '<li class="boxStatus"><img src="images/bf/x.png"><span>离线</span></li>' . $temp4;
                        }
                    }
                    $temp = $temp1 . $temp2;
                }
            }
            return $temp;
        }
	
         /**
	 * 功能号：5150
	 * 获取验证字符串
	 * */
        public function live_token(){
            COMFilter::$_jump = false;
            $id = intval(Core::$_dataFilter->valueCheck( Core::get("code") , "Require,Integer" , "参数错误,数据非法！" ));
            $box = Boxs::getOne("id=? and dstatus=0", $id);
            if($box){
                if($box->status){
                    $liveid = md5($box->boxcode.session_id().COMCommon::getCode(6));
                    $groupcode = COMCommon::get_groupcode($box->userid);
                    if($groupcode){
                         $security = COMCommon::get_SecurityVerify($liveid,$groupcode);
                    }
                    if($security){
                       Core::json_result($security,'ok');
                    }else{
                         Core::json_error('fail');
                    }
                }else{
                    Core::json_error('fail');
                }
            }else{
                Core::json_error('fail');
            }
        }
        
         /**
	 * 功能号：5126
	 * 获取m3u8地址
	 * */
        public function getm3u8(){
            COMFilter::$_jump = false;
            $token = Core::$_dataFilter->valueCheck( Core::get("token") , "Require,Limit" , "参数错误,数据非法！",false,50);
            $id = intval(Core::$_dataFilter->valueCheck( Core::get("code") , "Require,Integer" , "参数错误,数据非法！" ));
            $box = Boxs::getOne("id=? and dstatus=0", $id);
            if($box){
                if($box->status){
                    $live = $this->getimeaxis($box->boxcode,true,$token);
                    if($live){
                        if(is_array($live)){
                            $liveurl = $live['liveurl'];
                        }
                    }else{
                         Core::json_error('没有直播');
                    }
                }else{
                    Core::json_error('已禁止播放');
                }
            }else{
                Core::json_error('参数错误');
            }
            $data = Core::request_url($liveurl);
            if($data){
                $temp =  json_decode(gzdecode($data));
                if($temp->access->status){
                    Core::print_result($liveurl.$temp->access->explain);
                }else{
                    $len = strlen($data);
                    $filename = 'tvmlive' . date('Ymd');
                    ob_end_clean();
                    header('Content-Type: application/x-mpegURL');                    // This should work for the rest
                    header('Content-Encoding: gzip');
                    header("Content-Length: $len");
                    header("Vary:Accept-Encoding");
                    header('Content-Disposition: attachment; filename="' . $filename . '.m3u8"');
                    print $data;
                }
            }else{
                Core::json_error('系统错误');
            }
        }
        
         /**
	 * 功能号：5201
	 * 接口m3u8地址
	 * */
        public function apim3u8(){
            COMFilter::$_jump = false;
            $uid = Core::$_dataFilter->valueCheck( Core::get("uid") , "Require,Limit" , "参数错误,数据非法！",false,50 );
            $boxcode = Core::$_dataFilter->valueCheck( Core::get("boxid") , "Require,Limit" , "需要盒子ID,数据非法" , false , 13 );
            if(!Core::checkcode($boxcode)){
		Core::json_error('code 不合法');
            }
            
            $box = Boxs::getOne("boxcode=? and dstatus=0", $boxcode);
            if($box){
                if($box->status){
                    //$uid = md5($box->boxcode.session_id().COMCommon::getCode(6));
                    $groupcode = COMCommon::get_groupcode($box->userid);
                    if($groupcode){
                         $security = COMCommon::get_SecurityVerify($uid,$groupcode);
                    }
                    $camera_id = $box->boxcode;
                    $token = COMCommon::get_tokenverify($uid,$groupcode);
                    $channelinfo = COMCommon::get_channel($token);
                    if($channelinfo->$camera_id){
                        $live_url = $channelinfo->$camera_id->live_url;
                        $mediainfo_url = $channelinfo->$camera_id->mediainfo;
                        $timeaxis_url = $channelinfo->$camera_id->timeaxis;
                        $media_url = $mediainfo_url.'?format=json&channel=' . $camera_id;
                        $mediainfo = Core::request_url($media_url);
                        if ($mediainfo) {
                            //处理类型
                            $info = json_decode(gzdecode($mediainfo));
                            $info = $info->$camera_id->stream_type;
                            $info = explode('|', $info);
                            $info = explode('=', $info[0]);
                            $info_type = $info[0];
                            $url = $live_url.'?channel=' . $camera_id . '&type='.$info_type; 
                            $datas = array('liveurl'=>$url,'security'=>$security['security']);
                            Core::json_result($datas, 'ok');
                        }
                    }else{
                         Core::json_error('没有直播');
                    }
                }else{
                    Core::json_error('已禁止播放');
                }
            }else{
                Core::json_error('参数错误');
            }
            
            
        }
        
         /**
            * 功能号：5127
            * 二维码生成
            */
        public function create_qrcode(){ 
            COMFilter::$_jump = false;
            include_once ROOT . 'class/plus/qrcode/qrlib.php';
            $id = intval(Core::$_dataFilter->valueCheck( Core::get("id") , "Require,Integer" , "id不能为空,数据非法！" ));
            $type = intval(Core::$_dataFilter->valueCheck( Core::get("type") , "Require,Integer" , "type不能为空,数据非法！" ));
            $userid = $_SESSION['USERID'];
            $box = Boxs::getOne("id=? and userid=? and dstatus=0 and status=1", array($id,$userid));
            if($box){
               $infoext = BoxExt::i($id); 
              $liveurl = $infoext->wxpath?$infoext->wxpath:$box->livepath;
            }else{
                Core::print_result('error');
            }
            if($liveurl){
                switch ($type){
                    case '1':
                        $path =  html_entity_decode($liveurl,ENT_QUOTES, "UTF-8");
                        if($path){
                            $filename = false;
                            $errorCorrectionLevel = "L"; 
                            $matrixPointSize = 5;
                            $data =  $path;
                            QRcode::png($data, $filename, $errorCorrectionLevel, $matrixPointSize,2); 
                        }
                        break;
                    default :
                        break;
                }
            }

        }
        
        /**
	 * 功能号：5132
	 * 盒子直播状态
	 * */
        public function live_status(){
            COMFilter::$_jump = false;
            $id = intval(Core::$_dataFilter->valueCheck( Core::get("code") , "Require,Integer" , "参数错误,数据非法！" ));
            $box = Boxs::getOne("id=? and dstatus=0", $id);
            if($box){
                if($box->status){
                    $live = $this->getimeaxis($box->boxcode);
                    if($live){
                        Core::json_result('','直播正常');
                    }else{
                        Core::json_error('没有直播画面');
                    }
                }else{
                    Core::json_error('视频因涉嫌违规已暂停直播');
                }
            }else{
                Core::json_error('请检查,参数错误');
            }
        }
        
        /**
	 * 功能号：5123
	 * 盒子设置显示
	 * */
        public function view_setting(){
            $id = intval(Core::$_dataFilter->valueCheck( Core::get("id") , "Require,Integer" , "id不能为空,数据非法！" ));
            $userid = $_SESSION['USERID'];
            $usertvmid = $_SESSION['USERTVMID'];
            $box = Boxs::getOne("id=? and userid=? and dstatus=0", array($id,$userid));
            if($box){
                             
                $live = $this->getimeaxis($box->boxcode);
                if($live){
                    //$liveid = md5($box->boxcode.session_id().COMCommon::getCode(6));
                    $groupcode = COMCommon::get_groupcode($box->userid);
                    if($groupcode){
                         $token = COMCommon::get_tokenverify($usertvmid,$groupcode);
                    }
                    $time = $_SERVER['REQUEST_TIME'];
                    $params = array('m'=>'5150','code'=>$id,'at'=>$time);
                    $params_sign = Core::get_signature($params);
                    $params["sign"] = $params_sign;
                    $paramstr = Core::get_params($params);
                    $liveurl = 'http://'.$_SERVER['HTTP_HOST'].'/cloudlive/live.html?'.$paramstr;
                    if($token){
                         $pliveurl = 'http://'.$_SERVER['HTTP_HOST'].'/cloudlive/?m=5126&code='.$id.'&token='.$token;
                    }
                    $online = true;
                }else{
                    $online = false;
                }
                
                $seturl = 'http://'.$_SERVER['HTTP_HOST'].'/cloudlive/?m=5133&code='.$id;
                
                $infoext = BoxExt::i($id);
                
               // $liveurl = $box->livepath;
                $code = $box->boxcode;
                $name = $box->boxname;
                $imageurl = $this->thumbnail($box->boxcode);
                $livempurl = $box->livepath;
            }else{
                Core::jump('盒子不存在', '?m=5101');
            }
            
            //实例化模板
            $tp = PHP_Templates::factory();
            //设置模板文件
            $tp->setFiles('boxsetting');
            $tp->boxid = $id;
            $tp->boxcode = $code;
            $tp->boxname = $name;
            $tp->online = $online?1:0;
            $tp->imageurl = $imageurl;
            $tp->pliveurl = $pliveurl;
            $tp->liveurl = $liveurl;
            $tp->token = $token;
            $tp->seturl = $seturl;
            $tp->mpliveurl = $livempurl;
            $tp->weburl = $infoext->livepath;
            $tp->wxurl = $infoext->wxpath?$infoext->wxpath:$box->livepath;
            //输出页面
            $tp->execute();

            //释放模板变量
            unset($tp);
        }
        
        /**
	 * 功能号：5128
	 * 显示图片设置
	 * */
        function uploadimg(){
           COMFilter::$_jump = false;
           $id = intval(Core::$_dataFilter->valueCheck( Core::get("id") , "Require,Integer" , "id不能为空,数据非法！" ));
           $userid = $_SESSION['USERID'];
           $upfile = $_FILES['file'];
           $filesize = $upfile['size'];
           if($filesize<=0){
              $mess = '需要上传文件';	
           }
            $filename = $upfile['name'];
            if($filename){
		$fileType = array('image/jpeg','image/png');
		$pos = strrpos($filename, '.');
                $ext = substr($filename,$pos+1);
                if ($pos !== false) {
                    $filename = substr($filename,0,$pos);
                }
		$ret= Core::fileUpLoad($upfile , $fileType ,'upload/', $filename ,1024*1024 );
		$path = $ret[2]?$ret[2]:'';
            }
            //$path = str_replace(array('../','cloudlive/'), '', $path);
           
            $urlpath = parse_url($path);
            $path = "..".$urlpath['path']; print $path;
            $imginfo = getimagesize($path);print_r($imginfo);
            $fmd5 = md5_file($path);
            $yunpath =  COMCommon::uploadYun($path,$fmd5);
            if($yunpath){
                @unlink($path);
                 $box = Boxs::getOne("id=? and userid=?", array($id,$userid));
                 if($box){
                     $boxext = new BoxExt();
                     $flag = $boxext->add($box->id,'','',$yunpath);
                 }
            }
           print "<script>".(($mess)?"alert('$mess')":'').";window.parent.uploadseccss();</script>";
        }
        
        /**
	 * 功能号：5500
	 * 用户频道列表
	 * */
        public function channel(){
           COMFilter::$_jump = false;
           $phone = Core::$_dataFilter->valueCheck( Core::get("phone") , "Require,Limit,Phone", "需要手机号,手机号最多11个字符,手机格式错误", false, 11 );
           $temp = array();
           $user = bUsers::getOne("tvmid=?", $phone);
           if($user){
                $userid = $user->id;
                $boxlist = Boxs::getList("userid=? and dstatus=0", $userid);
                if(is_array($boxlist)){
                     foreach($boxlist as $item){
                         $temp[] = array('sn'=>$item->boxcode,'name'=>$item->boxname,'url'=>$item->livepath);
                     }
                }else{
                    $mess = "用户没有绑定设备";
                }
           }else{
               $mess = "用户不存在";
           }
           if($mess){
                Core::json_error($mess);
           }else{
               Core::json_result($temp,'ok');	
           }
        }
        
 
	  /**
	 * 功能号：5130
	 * camera_info
	 * */
        public function camera_info(){
            COMFilter::$_jump = false;
            $id = intval(Core::$_dataFilter->valueCheck( Core::get("code") , "Require,Integer" , "参数错误,数据非法！" ));
            $box = Boxs::getOne("id=? and dstatus=0", $id);
            if($box){
                if($box->status){
                    $sn = $box->boxcode;
                    $views = $box->views;
                }
            }
            $data = array('sn'=>$sn,'date'=>COMCommon::sysTime(),'views'=>$views);
            Core::json_result($data,'ok');
        }
        
        /**
	 * 功能号：5131
	 * 盒子访问量增加
	 * */
        public function add_views(){
            COMFilter::$_jump = false;
            $views = $_SESSION['USERBOXVIEWS'];
            if(empty($views)){
                $token = Core::$_dataFilter->valueCheck( Core::get("token") , "Require,Limit" , "参数错误,数据非法！",false,50 );
                $id = intval(Core::$_dataFilter->valueCheck( Core::get("code") , "Require,Integer" , "参数错误,数据非法！" ));
               if($token && $id){
                    $box = Boxs::getOne("id=? and dstatus=0", $id);
                    if($box){
                         if($box->status){
                            $_SESSION['USERBOXVIEWS'] = $box->views;
                            $box->views = $box->views + 1;
                            $box->save();
                        }
                    }
               }
            }
            Core::json_result('','ok');
        }
  /**
	 * 功能号：2061
	 * 关闭重启
	 * */
	public function shutstart(){
		COMFilter::$_jump = false;
		$code = Core::$_dataFilter->valueCheck( Core::get("code") , "Require,Limit" , "code不能为空,code非法" , false , 13 );
		if(!Core::checkcode($code)){
			Core::json_error('code 不合法');
		}
		if($code){
			$mess = '重启命令';
			$flag = $this->shut_restart( $code );
			$mess .= ($enable == 1)?'启用':'禁用';
			if($flag){
				$mess .= '成功！';
			}else{
				$mess .= '失败！';
			}
			//Core::jump($mess,Core::get_url('/storage/clist'));
		}
		if($flag){
			Core::json_result('',$mess);	
		}else{
			Core::json_error($mess);	
		}
	}
	
	
}



