<?php
class BoxManage extends Boxs{
	
	/**
	 * 对像静态变量
	 * 
	 * @var object
	 */
	static private $_class;
        
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
	 * 功能号：1200
	 * 盒子列表
	 * */
	public function clist(){
            //设置php脚本可以无限时间运行下去
            set_time_limit(0);
            $_SESSION['NAVAGATION'] = 100;
            COMFilter::$_jump = false;
            $type = 'unlock';
            $_SESSION['BOXTYPESTATUS'] = $type;
            $filename = md5(__CLASS__ . __FUNCTION__.$type);
            $cachefile = 'cache/logs/' . $filename;
            $cache = Core::readcache($cachefile,10*60);
            if ($cache['expire']) {
                $_where = "dstatus=0 and status=1";
                $result = Boxs::getList($_where, null);
                if (!empty($result)) {
                    if (is_array($result)) {
                        $online = array();
                        $offline = array();
                        foreach ($result as $row) {
                            $on = Box::getimeaxis($row->boxcode);
                            if ($on) {
                                $online[] = $row->id;
                            } else {
                                $offline[] = $row->id;
                            }
                        }
                        $total = count($result);
                        $ontotal = !empty($online)?count($online):0;
                        $offtotal = !empty($offline)?count($offline):0;
                    }
                }
                $data = array('total' => intval($total), 'ontotal' => intval($ontotal), 'offtotal' => intval($offtotal), 'online' => $online, 'offline' => $offline);
                $cachefile = Core::writecache(serialize($data), $cachefile);
            }elseif($cache['data']){
                $data = unserialize($cache['data']);
            }
            //实例化模板
            $tp = PHP_Templates::factory();
            //设置模板文件
            $tp->setFiles('manager');
            $tp->collect = '<img src="images/bf/j.png"><span>在线盒子'.$data['ontotal'].'</span>
                            <img src="images/bf/x.png"><span>离线盒子'.$data['offtotal'].'</span>';
            //$tp->pager = $this->_showpage;
            //输出页面
            $tp->execute();

            //释放模板变量
            unset($tp);
        }
	
        /**
	 * 功能号：1201
	 * 盒子列表页内容
	 * */
        public function boxlist() {
            $type = $_SESSION['BOXTYPESTATUS'];
            if($type == 'lock'){
                $fun = 'ulist';
            }else{
                $fun = 'clist';
            }
            $filename = md5(__CLASS__ . $fun .$type);
            $cachefile = 'cache/logs/' . $filename;
            $cache = Core::readcache($cachefile);
            if ($cache['data']) {
                $data = unserialize($cache['data']);
            }
            //每页显示记录条数
            $pageSize = 10;
            //显示的数字页码个数
            $showSize = 5;
            
            $dataTotal = $data['total'];
            //获取当前页
            $currPage = intval(Core::get('page',1));
            $pages = ( int )( ($dataTotal - 1)/$pageSize + 1 );
            if ($pages < 1)
                $pages = 1;
            if (!isset($currPage) || $currPage == "" || $currPage < 1) {
                $currPage = 1;
            } elseif ($currPage > $pages) {
                $currPage = $pages;
            }
            
            if($pages > 0){
                //获取数字页码范围
                if ($pages <= $showSize) {
                    $showMinPage = 1;
                    $showMaxPage = $pages;
                } elseif ($currPage > $pages - floor($showSize / 2)) {
                    $showMinPage = $pages - $showSize + 1;
                    $showMaxPage = $pages;
                } else {
                    $showMinPage = $currPage - floor(($showSize-1) / 2);
                    if ($showMinPage < 1){
                        $showMinPage = 1;
                        $showMaxPage = $showSize;
                    }else{
                        $showMaxPage = $currPage + floor($showSize / 2);
                        if ($showMaxPage > $pages)
                            $showMaxPage = $pages;
                    }
                }
                $temppage = '<li><a href="javascript:void(0);" aria-label="Previous" data-page="1"><span aria-hidden="true">&laquo;</span></a></li>';
                for($i = $showMinPage;$i<=$showMaxPage;++$i){
                    if($i == $currPage){
                        $temppage .= '<li class="active"><a href="javascript:void(0);"  data-page="'.$i.'">'.$i.'</a></li>';
                    }else{
                        $temppage .= '<li><a href="javascript:void(0);"  data-page="'.$i.'">'.$i.'</a></li>';
                    }
                }
                $temppage .= '<li><a href="javascript:void(0);" aria-label="Next"  data-page="'.$pages.'"><span aria-hidden="true">&raquo;</span></a></li>';
            }
            
            $currpos = ($currPage-1)*$pageSize;
            //获取页数据
            $result = array_merge($data['online'],$data['offline']);
            if (!empty($result)) {
                if (is_array($result)) {
                    $rownumber = 1;
                    $temp = '<tr class="active">
                                <th style="width:160px;">用户名</th>
                                <th>设备名称</th>
                                <th>设备ID</th>
                                <th>直播状态</th>
                                <th>预览图</th>
                                <th>监管</th>
                            </tr>';
                    for($i=$currpos;$i<$currpos+$pageSize && $i < $dataTotal;++$i){
                        $row = Boxs::i($result[$i]);
                        if($row){
                            $boxinfo = new box();
                            $imageurl = $boxinfo->thumbnail($row->boxcode);
                            if(empty($imageurl)){
                                $infoext = BoxExt::i($row->id);
                                if($infoext){
                                    $imageurl = $infoext->image?$infoext->image:$row->image;
                                }elseif($row->image) {
                                    $imageurl = $row->image;
                                }
                                if(empty($imageurl)){
                                    $imageurl = 'images/bf/set-default.png';
                                }
                            }
                           // if ($row->image) {
                             //       $imageurl = $row->image;
                               // } else {
                               //     $imageurl = 'http://' . Core::$_config->liveserver['host'] . "/picture/{$row->boxcode}.jpg";
                                //}
                                if(in_array($row->id,$data['online'])){
                                    $online = true;
                                }else{
                                    $online = false;
                                }
                                $userinfo = Users::i($row->userid);
                                $usertype = bUsers::$_usertype[$userinfo->usertype];
                                $userext = bUsersExt::i($row->userid);
                                if($userext){
                                    $orgname =  $userext->orgname;
                                    $address = $userext->address;
                                    $tel = $userext->telphone;
                                    $email = $userext->email;
                                    $othtel = $userext->othphone;
                                    $oicq = $userext->oicq;
                                }
                                $last = ($rownumber==$pageSize || $rownumber==$dataTotal)?' class="last"':'';
                                $temp .= '<tr><td'.$last.'><p><span>'.$userinfo->realname.'</span></p> <button class="btn btn-default btn-xs details">详情<span class="caret"></span></button>
                                    <div class="panel panel-default userInfo-box">
                                        <div class="panel-heading">用户详情</div>
                                        <ul class="list-group">
                                            <li class="list-group-item"><b>用户类型：</b><span>'.$usertype.'</span></li>
                                            <li class="list-group-item"><b>用户名：</b><span>'.$userinfo->realname.'</span></li>
                                            <li class="list-group-item"><b>手机号：</b><span>'.$userinfo->tvmid.'</span></li>
                                            <li class="list-group-item"><b>单位名称：</b>
                                                <p>'.$orgname.'</p>
                                            </li>
                                            <li class="list-group-item"><b>单位地址：</b>
                                                <p>'.$address.'</p>
                                            </li>
                                            <li class="list-group-item"><b>联系邮箱：</b>
                                                <p>'.$email.'</p>
                                            </li>
                                            <li class="list-group-item"><b>联系电话：</b><span>'.$tel.'</span></li>
                                            <li class="list-group-item"><b>联系人手机号：</b><span>'.$othtel.'</span></li>
                                            <li class="list-group-item"><b>联系人QQ：</b><span>'.$oicq.'</span></li>
                                        </ul>
                                    </div></td>
                                <td>'.$row->boxname.'</td>
                                <td>'.$row->boxcode.'</td>
                                <td><span class="label '.($online?'label-success':'label-danger').' label-lg">'.($online?'在线':'离线').'</span></td>
                                <td class="manager-preview"><img src="'.$imageurl.'" alt="预览图" onerror="javascript:this.src=\'images/bf/test2.png\'"></td>
                                <td>
                                    <button class="btn btn-info" data-boxid="'.$row->id.','.$row->userid.'">'.($row->status?'暂停':'恢复').'直播</button>
                                </td></tr>';
                               $rownumber++;
                        }
                    }
                    
                }
            }
             Core::json_result(array('body'=>$temp,'page'=>$temppage),'ok');
        }
	
      /**
	 * 功能号：1210
	 * 直播地址列表
	 * */
	public function urlmange(){
            $_SESSION['NAVAGATION'] = 100;
            
            //实例化模板
            $tp = PHP_Templates::factory();
            //设置模板文件
            $tp->setFiles('managerurl');
            $tp->tableBody = $this->urllist();
            $tp->pager = $this->_showpage;
            //输出页面
            $tp->execute();

            //释放模板变量
            unset($tp);
        }
	
        /**
	 * 直播地址列表内容
	 * */
        private function urllist() {
           $keyword = strtoupper(Core::$_dataFilter->valueCheck( Core::get("keyword") , "Limit" , "关键字最多20个字符" , false , 20 ));
                    	$_where = "dstatus=0";
			if($keyword){
                            $_where .= " boxcode like '%$keyword%'";
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
			
			//设置每显示记录条数
			$pageSize = 10;
			//设置显示的数字页码数
			$showSize = 10;
			$page = Boxs::getPage($_where, null,$_order,$pageSize);
				//获取当前页
			$currPage = $page['curr'];
                        $dataTotal = $page['total'];
            $pages = ( int )( ($dataTotal - 1)/$pageSize + 1 );
            if ($pages < 1)
                $pages = 1;
            if (!isset($currPage) || $currPage == "" || $currPage < 1) {
                $currPage = 1;
            } elseif ($currPage > $pages) {
                $currPage = $pages;
            }
            
            if($pages > 0){
                //获取数字页码范围
                if ($pages <= $showSize) {
                    $showMinPage = 1;
                    $showMaxPage = $pages;
                } elseif ($currPage > $pages - floor($showSize / 2)) {
                    $showMinPage = $pages - $showSize + 1;
                    $showMaxPage = $pages;
                } else {
                    $showMinPage = $currPage - floor(($showSize-1) / 2);
                    if ($showMinPage < 1){
                        $showMinPage = 1;
                        $showMaxPage = $showSize;
                    }else{
                        $showMaxPage = $currPage + floor($showSize / 2);
                        if ($showMaxPage > $pages)
                            $showMaxPage = $pages;
                    }
                }
                $temppage = '<li><a href="javascript:void(0);" aria-label="Previous" data-page="1"><span aria-hidden="true">&laquo;</span></a></li>';
                for($i = $showMinPage;$i<=$showMaxPage;++$i){
                    if($i == $currPage){
                        $temppage .= '<li class="active"><a href="javascript:void(0);"  data-page="'.$i.'">'.$i.'</a></li>';
                    }else{
                        $temppage .= '<li><a href="javascript:void(0);"  data-page="'.$i.'">'.$i.'</a></li>';
                    }
                }
                $temppage .= '<li><a href="javascript:void(0);" aria-label="Next"  data-page="'.$pages.'"><span aria-hidden="true">&raquo;</span></a></li>';
            }			
            $this->_showpage = $temppage;
            $temp = '<tr class="active">
                                <th>序号</th>
                                <th>盒子序列号</th>
                                <th>微信直播地址</th>
                                <th>网页直播地址</th>
                                <th>操作</th>
                            </tr>';
			//获取页数据
			$result = $page['list'];
                        //起始序号
                        $number = ($currPage-1)*$showSize+1;
			if(!empty($result)){
                           if(is_array($result)){
                               foreach ($result as $row){
                                    $infoext = BoxExt::i($row['id']);
                                    $temp .= '<tr><td>'.($number++).'</td>
                                <td>'.$row['boxcode'].'</td>
                                <td>'.($infoext->wxpath?$infoext->wxpath:$row['livepath']).'</td>
                                <td>'.$infoext->livepath.'</td>
                                <td>
                                    <button class="btn btn-info" data-boxid="'.$row['id'].'">编辑</button>
                                </td></tr>';
                               }
                           }
                            				
                        }
             return $temp;
        }
        
        
        
        /**
	 * 功能号：1202
	 * 盒子状态修改
	 * */
        public function boxstatus(){
            $id = Core::$_dataFilter->valueCheck( Core::get("id") , "Require,MultiId" , "id不能为空,数据非法！" );
            $params = explode(',', $id);
            $box = Boxs::getOne("id=? and userid=? and dstatus=0", array($params[0],$params[1]));
            if($box){
                if($box->status == 1){
                    $mess = "视频内容违规已屏蔽";
                    $box->status = 0;
                }else{
                    $mess = "视频屏蔽已解除";
                    $box->status = 1;
                }
                $flag = $box->save();
                if($flag){
                    $title = "后台通知-".$mess;
                    $text = "盒子 {$box->boxcode} 的".$mess;
                    bMessages::add($params[1],3,$title,$text);
                    Core::json_result($box->status,'ok');
                }
            }
             Core::json_error('fail');	
            
        }
    
        
         /**
	 * 功能号：1203
	 * 盒子列表
	 * */
	public function ulist(){
            //设置php脚本可以无限时间运行下去
            set_time_limit(0);
            $_SESSION['NAVAGATION'] = 101;
            $type = 'lock';
            $_SESSION['BOXTYPESTATUS'] = $type;
            COMFilter::$_jump = false;
            $filename = md5(__CLASS__ . __FUNCTION__.$type);
            $cachefile = 'cache/logs/' . $filename;
            $cache = Core::readcache($cachefile,100*60);
            if ($cache['expire']) {
                $_where = "dstatus=0 and status=0";
                $result = Boxs::getList($_where, null);
                if (!empty($result)) {
                    if (is_array($result)) {
                        $online = array();
                        $offline = array();
                        foreach ($result as $row) {
                            $on = Box::getimeaxis($row->boxcode);
                            if ($on) {
                                $online[] = $row->id;
                            } else {
                                $offline[] = $row->id;
                            }
                        }
                        $total = count($result);
                        $ontotal = !empty($online)?count($online):0;
                        $offtotal = !empty($offline)?count($offline):0;
                    }
                }
                $data = array('total' => intval($total), 'ontotal' => intval($ontotal), 'offtotal' => intval($offtotal), 'online' => $online, 'offline' => $offline);
                $cachefile = Core::writecache(serialize($data), $cachefile);
            }elseif($cache['data']){
                $data = unserialize($cache['data']);
            }
            //实例化模板
            $tp = PHP_Templates::factory();
            //设置模板文件
            $tp->setFiles('manager');
            $tp->collect = '<img src="images/bf/j.png"><span>在线盒子'.$data['ontotal'].'</span>
                            <img src="images/bf/x.png"><span>离线盒子'.$data['offtotal'].'</span>';
            //$tp->pager = $this->_showpage;
            //输出页面
            $tp->execute();

            //释放模板变量
            unset($tp);
        }
	
	
	 /**
	 * 功能号：1250
	 * 添加直播地址
	 * */
	public function addurl(){
            $_SESSION['NAVAGATION'] = 100;
            COMFilter::$_jump = false;
            $boxcode = Core::$_dataFilter->valueCheck( Core::get("code") , "Limit" , "数据非法" , false , 13 );
            $url = Core::$_dataFilter->valueCheck( Core::get("weburl") , "Limit" , "数据非法" , false , 255 );
            $mpurl = Core::$_dataFilter->valueCheck( Core::get("mpurl") , "Limit" , "数据非法" , false , 255 );
            if($boxcode && !Core::checkcode($boxcode)){
		Core::json_error('设备序列号不合法');
            }
            if($url && strpos($url,'http://') === false){
                Core::json_error('直播地址不合法');
            }
            if($mpurl && strpos($mpurl,'http://') === false){
                Core::json_error('直播地址不合法');
            }
            if($boxcode){
                $clientbox = new Boxs();
                $one = $clientbox->getOne("boxcode=? and dstatus=0", $boxcode);
                if($one){
                    $boxext = new BoxExt();
                    $flag = $boxext->add($one->id,$url,$mpurl);
                    if($flag){
                        Core::json_result($url,'直播地址修改成功');
                    }else{
                        Core::json_error('添加地址出错,请重试');
                    }
                }else{
                    $clientbox->boxcode = $boxcode;
                    $clientbox->userid = 0;
                    $clientbox->boxname = "";
                    $clientbox->image = "";
                    $clientbox->dstatus = 1;
                    $clientbox->status = 0;
                    $clientbox->livepath = "";
                    $boxid = $clientbox->save();
                    if($boxid){
                        $flag = $boxext->add($boxid,$url,$mpurl);
                        if($flag){
                             Core::json_result($url,'直播地址修改成功');
                        }else{
                             Core::json_error('添加地址出错,请重试');
                        }
                     }else{
                         Core::json_error('系统错误,请重试');
                     }
                }
            }else{
                COMFilter::$_jump = true;
                $id = Core::$_dataFilter->valueCheck( Core::get("id") , "Integer" , "数据非法！" );
                if($id){
                    $info = Boxs::i($id);
                    $infoext = BoxExt::i($id);
                }
                //实例化模板
                $tp = PHP_Templates::factory();
                //设置模板文件
                $tp->setFiles('addliveurl');
                $tp->code = $info->boxcode;
                $tp->weburl = $infoext->livepath;
                $tp->wxurl = $infoext->wxpath?$infoext->wxpath:$info->livepath;
                //$tp->pager = $this->_showpage;
                //输出页面
                $tp->execute();

                //释放模板变量
                unset($tp);
            }
        }
        
        
	/**
	 * 功能号：1026
	 * 设置状态
	 * */
	public function setstatus(){
		COMFilter::$_jump = false;
		$id = Core::$_dataFilter->valueCheck( Core::get("id") , "Integer" , "数据非法！" );
		$enable = Core::$_dataFilter->valueCheck( Core::get("t") , "Integer" , "数据非法！" );;
		if($id){
			$mess = '频道状态';
			$flag = $this->update_status( $id ,$enable );
			$mess .= ($enable == 1)?'激活':'关闭';
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



