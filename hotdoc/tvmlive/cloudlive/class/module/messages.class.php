<?php
class Messages extends bMessages{
	
	/**
	 * 对像静态变量
	 *
	 * @var object
	 */
	static private $_class;
        
        private $_messtype = array('1'=>'盒子绑定','2'=>'后台消息','3'=>'违规提醒','4'=>'直播时间');
        
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
        
       /**
	 * 功能号：400x
	 * 消息详情
	 * */
        public function info_message(){
            $id = Core::$_dataFilter->valueCheck( Core::get("id") , "Limit" , "数据非法" , false , 13 );
            $userid = $_SESSION['USERID'];
            
            if(!Core::checkcode($clientmac)){
		Core::json_error('code 不合法');
            }
            
            if($clientmac){
                $addate = COMCommon::sysTime();
                $clientbox = new Boxs();
                $one = $clientbox->getOne("mac=?", $clientmac);
                if($one){
                    $clientbox->edit($rtime,$version,$addate,$one->id);
                    $boxid = $one->id;
                    $status = $one->status;
                    $ping = intval($one->ping);
                    $restart = intval($one->restart);
                    $verspull = $one->pullback;
                }else{
                    $boxid = $clientbox->add($clientmac,$addate,1,$rtime,$version);
                    $status = 1;
                    $ping = 0;
                    $restart = 0;
                }
                $data['timestamp'] = time();
                Core::json_result($data, 'ok');
            }else{
                Core::json_error('MAC为空');
            }
            
        }

        /**
	 * 功能号：4001
	 * 消息列表
	 * */
	public function mlist(){
                $_SESSION['NAVAGATION'] = 4; 
               $userid = $_SESSION['USERID'];
                //实例化模板
		$tp = PHP_Templates::factory();
		//设置模板文件
		$tp->setFiles('homemsg');
		$tp->tableBody = $this->boxlist();
		$tp->total = $this->messageTotal;
                $tp->read = self::getTotal("userid=? and status=1",$userid);
                $tp->noread = self::getTotal("userid=? and status=0",$userid); 
                $_SESSION['NOREADMESSAGE'] =  $tp->noread;
		//输出页面
		$tp->execute();
			
		//释放模板变量
		unset($tp);
	}
	
	private function boxlist( ){
			$keyword = strtoupper(Core::$_dataFilter->valueCheck( Core::get("keyword") , "Limit" , "关键字最多20个字符" , false , 20 ));
                        $userid = $_SESSION['USERID'];
			$_where = "userid = $userid";
			if($keyword){
                            $_where .= " and title like '%$keyword%'";
			}
                        $_order = Core::$_dataFilter->valueCheck( Core::get("order") , "Limit" , "关键字最多20个字符" , false , 20);
                        $_asc =  isset($_GET['asc'])?$_GET['asc']:1;
                        if($_order){
                            if($_asc){
                                $_asc = 0;
                                $_order = "$_order desc";
                            }else{
                                $_asc = 1;
                                $_order = "$_order asc";
                            }
                        }else{
                            $_order = 'status asc,id desc ';
                        }
			//实例化分页数据获取
			$pager	= Pagination::factory();
			
			//设置每显示记录条数
			$pageSize = 10;
			//设置显示的数字页码数
			$showSize = 10;
			$page = self::getPage($_where, null,$_order,$pageSize);
			
			$pager->dataTotal = $page['total'];
                        $this->messageTotal = $page['total'];
			//获取当前页
			$currPage = $page['curr'];
			//创建分页实例
			$pager->pagerInit( ROOT.'class/plus/pagination/pagerstatictemplate.htm' , $pageSize , $showSize , $currPage , 'page' );
						
			//获取页数据
			$result = $page['list'];
			if(!empty($result)){
                            if (is_array($result)) {
                                $temp = '';
                                foreach ($result as $row) {
                                    $temp .= '<li class="list-group-item">
                                                '.(($row['status']==0)?'<span class="label label-danger msg-temp-2">未读</span>':'').
                                                '<span class="msg-intro" data-msgid="'.$row['id'].'">'.$row['title'].'</span>
                                                <span class=" glyphicon glyphicon-menu-down msg-arrow"></span>
                                                <div class="msg-line" data-target="close">
                                                    '.$row['content'].'
                                                    <div class="msg-line-tool">
                                                        <ul><li><span class="glyphicon glyphicon-comment"></span></li>
                                                            <li style="padding:0 25px">|</li>
                                                            <li><span class="glyphicon glyphicon-trash" data-msgid="'.$row['id'].'"></span></li>
                                                         </ul><div class="clear"></div>
                                                    </div></div></li>';
                                }
                            }
			}
                        return $temp;
	}
	
       
	  /**
	 * 功能号：4002
	 * 修改消息状态
	 * */
	public function setstatus(){
		COMFilter::$_jump = false;
		$id = Core::$_dataFilter->valueCheck( Core::get("id") , "Integer" , "数据非法！" );
                $userid = $_SESSION['USERID'];
		if($id){
			$bean = self::getOne("id=? and userid=?",array($id,$userid));
                        if ($bean->userid){
                            $bean->status = 1;
                            $flag = $bean->save();
                        }
		}
		if($flag){
			Core::json_result('','ok');	
		}else{
			Core::json_error($mess);	
		}
	}
        
	/**
	 * 功能号：4003
	 * 删除消息
	 * */
	public function setdelete(){
		COMFilter::$_jump = false;
		$id = Core::$_dataFilter->valueCheck( Core::get("id") , "Integer" , "数据非法！" );
                $userid = $_SESSION['USERID'];
		if($id){
			$bean = self::getOne("id=? and userid=?",array($id,$userid));
                        if ($bean->userid){
                            $flag = $bean->del();
                        }
		}
		if($flag){
			Core::json_result('','ok');	
		}else{
			Core::json_error($mess);	
		}
	}
 
	
}







