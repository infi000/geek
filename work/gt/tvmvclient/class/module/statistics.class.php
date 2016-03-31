<?php
class Statistics {
	
	/**
	 * 对像静态变量
	 *
	 * @var object
	 */
	static private $_class;
	static private $_timeout = 5;
        //锁定时间
        private $_max_time = 10;
        
        private $_host = SERVERHOST;
        
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
	 * 功能号：13050
	 * 点击量汇总接口
	 */
	public function statistic(){
           
	}
        
    static function hitscounter($id,$title,$url){
            $timeout = self::$_timeout;
            $requestime = $_SERVER['REQUEST_TIME'];
            $cookiename = strtoupper(md5($title));
            if(empty($_COOKIE[$cookiename])){
                setcookie($cookiename, $requestime);
            }else{
                if($_COOKIE[$cookiename]+$timeout > $requestime){
                    return false;
                }
            }
            $addate = COMCommon::sysTime();
            $stat = new Traffic_statistics();
            $one = $stat->getOne("box_id=? and title=?", array($id,$title));
            if($one){
                $one->hitscount = $one->hitscount +1;
                $one->status = 1;
                $flag = $one->save();
            }else{
                $flag = $stat->add($id,$title,$url,1,1,$addate);
            }
            return $flag;
     }
     
     /**
        * 功能号：13051
        * 导出点击量数据
        */
       function export_counter() {
            $boxmac = new COMGetmac();
            $clientmac = 'M' . $boxmac->getmac();
            $clientbox = new Boxs();
            $one = $clientbox->getOne("mac=?", $clientmac);
            if (empty($one)) {
                Core::json_error('Null');
            }
            $host = $this->_host;
            $clientboxid = intval($one->id);
            if($clientboxid > 0){
                $stat = new Traffic_statistics();
                $sql = "update traffic_statistics set box_id=$clientboxid where box_id = 0";
                $flag = Core::$_mdb->execute($sql);
                    $dir = COMFile::createFolder("download/statis");
                    $filename = $dir."/box_$clientboxid.txt";
                    $data = $stat->getList("status=1");
                    if($data){
                        $flag = file_put_contents($filename,serialize($data));
                        if($flag){
                            foreach($data as $item){
                                $item->status = 0;
                                $item->save();
                            		 }
                            $network = Core::connect_check($host);
                            if ($network) {
                                $host = $this->_host;
                                $param = array("m" => 14050);
                                $sign = Core::get_signature($param);
                                $param["file"] = "@".ROOT.$filename;
                                $param["sign"] = $sign;
                                $url = "http://$host/tvmv/?m=14050";
                                $temp = Core::request_url($url, $param, 1,1);
                                $return = json_decode($temp); 
                                if ($return->status === 1) {
                                      Core::json_result("","finish ok");
                                }
                            }
                        }
                    }
            }
         Core::json_result("","ok");
            
    }
     
     /**
        * 功能号：13060
        * 点击量计数
        */
       function click_counter() {
           $urltitle = Core::$_dataFilter->valueCheck( Core::get("title") , "Limit" , "数据非法" , false , 100 );
           $xurl = Core::$_dataFilter->valueCheck( Core::get("url") , "Limit" , "数据非法" , false , 255 );
            $boxmac = new COMGetmac();
            $clientmac = 'M' . $boxmac->getmac();
            $clientbox = new Boxs();
            $one = $clientbox->getOne("mac=?", $clientmac);
            if (empty($one)) {
                Core::json_error("fail");
            }
            $clientboxid = intval($one->id);
            if($clientboxid > 0){
               self::hitscounter($clientboxid,$urltitle,$xurl);
            }
            Core::json_result("","ok");
            
    }
    
   /**
	 * 功能号：1013
	 * 统计管理
	 * */
	public function clist(){
                //实例化模板
		$tp = PHP_Templates::factory();
			setcookie("flagReturn",1); 
		//设置模板文件
		$tp->setFiles('liststat');
		$tp->tableBody = $this->statlist();
		$tp->pager = $this->_showpage;
		//输出页面
		$tp->execute();
			
		//释放模板变量
		unset($tp);
	}
	
	private function statlist( ){
			$keyword = strtolower(Core::$_dataFilter->valueCheck( Core::get("keyword") , "Limit" , "关键字最多20个字符" , false , 20 ));
		
			$_where = "";
			if($keyword){
                            $_where .= "title like '%$keyword%'";
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
                            $_order = 'id desc ';
                        }
			//实例化分页数据获取
			$pager	= Pagination::factory();
			
			//设置每显示记录条数
			$pageSize = 10;
			//设置显示的数字页码数
			$showSize = 10;
			$page = Traffic_statistics::getPage($_where, null,$_order,$pageSize,FALSE,',sum(hitscount) as hits','title');
			
			$pager->dataTotal = $page['total'];
			//获取当前页
			$currPage = $page['curr'];
			//创建分页实例
			$pager->pagerInit( ROOT.'class/plus/pagination/pagerstatictemplate.htm' , $pageSize , $showSize , $currPage , 'page' );
						
			//获取页数据
			$result = $page['list'];
			if(!empty($result)){
				//设置表头
                                $url = $pager->getPageUrl("order=edate&asc=$_asc",'order');
				$pager->setHeader(array('序号','名称','URL地址','点击量'));
				//设置显示的字段
				$showFields = array( 'id','order','title','pageurl','hits');
				//设置处理字段函数
				$multFunction = array('id'=>array('PaginalTable','createCheckBox'),'order'=>array('Core','order')
                                        );
				//复合字段处理
				$multFields = array('order'=>array('id'));
				//设置表格标签
				$pager->setTableTag(true);
				//设置表格样式
				$pager->setTableClass('newblog');
				//设置选择框
				$pager->setCheckBox();
				$pager->setRowNumber(($currPage-1)*$showSize);
				//$pager->setDetailButton();
				//$pager->setCustomButton(array('设置版本','设置码率'));
								
				$this->_showpage = $pager->showGet('','<em>|</em>');
				return $pager->createTable( $result , $showFields , $multFunction , $multFields );
			}
	}
}



