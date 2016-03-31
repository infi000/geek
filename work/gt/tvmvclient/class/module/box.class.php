<?php
class Box extends Boxs{
	
	/**
	 * 对像静态变量
	 *
	 * @var object
	 */
	static private $_class;
        
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
	 * 功能号：2050
	 * 频道列表
	 * */
        public function client_update(){
            $clientmac = Core::$_dataFilter->valueCheck( Core::get("mac") , "Limit" , "数据非法" , false , 13 );
            $rtime = Core::$_dataFilter->valueCheck( Core::get("time") , "Limit" , "数据非法" , false , 13 );
             $host = $this->_host;
             //$network = Core::connect_check($host);
            // if ($network) {
                    if($clientmac){
                        $param = array("m" => 2050, "mac" => $clientmac, "time" => $rtime);
                        $sign = Core::get_signature($param);
                        $param["sign"] = $sign;
                        $url = "http://$host/tvmv/?m=2050";
                        $temp = Core::request_url($url, $param, 1);
                        $return = json_decode($temp);
                        if ($return->status === 1) {
                            $rdata = $return->data;
                            $boxid = $rdata->boxid;
                            $addate = COMCommon::sysTime();
                            $clientbox = new Boxs();
                            $one = $clientbox->getOne("id=?", $boxid);
                            if($one){
                                  $clientbox->edit($rtime,$one->id);
                            }else{
                                  $clientbox->add($boxid,$clientmac,$addate,1,$rtime);
                            		 }
                            $data["boxid"] = $boxid;
                            $data["status"] =  $rdata->status;
                            Core::json_result($data, 'ok');
                        }else{
                             Core::json_error('fail');
                        }
                    }else{
                        Core::json_error('MAC为空');
                    }
             // }else{
            //       Core::json_error('无网络');
             // }
        }


        /**
	 * 功能号：2020
	 * 频道列表
	 * */
	public function clist(){
                //实例化模板
		$tp = PHP_Templates::factory();
			setcookie("flagReturn",1); 
		//设置模板文件
		$tp->setFiles('listbox');
		$tp->tableBody = $this->boxlist();
		$tp->pager = $this->_showpage;
		//输出页面
		$tp->execute();
			
		//释放模板变量
		unset($tp);
	}
	
	private function boxlist( ){
			$keyword = strtoupper(Core::$_dataFilter->valueCheck( Core::get("keyword") , "Limit" , "关键字最多20个字符" , false , 20 ));
		
			$_where = "";
			if($keyword){
                            $_where .= " mac like '%$keyword%'";
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
			$page = Boxs::getPage($_where, null,$_order,$pageSize);
			
			$pager->dataTotal = $page['total'];
			//获取当前页
			$currPage = $page['curr'];
			//创建分页实例
			$pager->pagerInit( ROOT.'class/plus/pagination/pagerstatictemplate.htm' , $pageSize , $showSize , $currPage , 'page' );
						
			//获取页数据
			$result = $page['list'];
			if(!empty($result)){
				//设置表头
                                $url = $pager->getPageUrl("order=update_time&asc=$_asc",'order');
				$pager->setHeader(array('序号','盒子CODE','更新时间','运行时间'));
				//设置显示的字段
				$showFields = array( 'id','order','mac','update_time','runtime');
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
	
	public function view(){
		$id = intval(Core::$_dataFilter->valueCheck( Core::get("id") , "Require,Integer" , "id不能为空,数据非法！" ));
		
		$channel = self::i($id);
		//实例化模板
		$tp = PHP_Templates::factory();

		//设置模板文件
		$tp->setFiles('view_channel');
		if($channel->code){
			$tp->code = $channel->code;
			$tp->name = $channel->name;
			$tp->rate = $channel->rate;
			$tp->hdmi = $channel->hdmi;
			$tp->videof = $channel->videof;
			$info = explode('_',$channel->encode);
			$tp->profile = $info[0];
			$tp->info = '&nbsp;&nbsp;宽： '.$info[1].'&nbsp;&nbsp;高： '.$info[2];
			$tp->localip = $channel->localip;
			$tp->ip = $channel->ip;
			$tp->runtime = $channel->runtime;
		}

		//输出页面
		$tp->execute();

		//释放模板变量
		unset($tp);
	}
        
	/**
	 * 功能号：1012
	 * 设置版本
	 * */        
	public function setvers(){
		$id = intval(Core::$_dataFilter->valueCheck( Core::get("id") , "Require,Integer" , "id不能为空,数据非法！" ));
		$code = Core::$_dataFilter->valueCheck( Core::get("code") , "Limit" , "code非法" , false , 13 );
		if($code && !Core::checkcode($code)){
			Core::json_error('code 不合法');
		}elseif($code){
			$module = Core::get('module');
			$vers = Core::get("vers");
			$data = $this->getOne('code=?',$code);
			if($data){
				$code = $data->id;
				$vch = new Vers_channel();
				if($module){
					foreach ($module as $k=>$v){
						if($vers[$k]){
							$version = $vch->getMOne($code,$v);
							if($version){
								$vch->update($code,$vers[$k],$v,$version[0]['id']);
							}else{
								$vch->add($code,$vers[$k],$v);
							}
						}else{
							$vch->delete($code,$v);
						}
					}
				}
				$mess = '版本设置成功';
				Core::jump($mess,Core::get_url('/channel/clist'));
			}
		}
		
		
		$data = $this->getOne('id=?',$id);
		if($data){
			$code = $data->id;
			$vch = new Vers_channel();
			if($code){
				$modules = bModules::getList('enable=?', array(1));
				if($modules){
					$ver = new Versions();
					$vers_temp = '';
					foreach ($modules as $row){
						$vers_temp .= '<li><span style="width:180px;">模块：'.$row->code.'</span><input type="hidden" name="module[]" value="'.$row->id.'"></li>';
						$version = $vch->getMOne($code,$row->id);
						$option =  $ver->get_select_option($version[0]['ver'],10,$row->id);
						$vers_temp .='<li><span style="width:150px;">更新版本：</span><select name="vers[]">'.$option.'</select></li>'; 
					}
				}
			}
		}else{
			$mess = '没有相关频道';
			Core::jump($mess,Core::get_url('/channel/clist'));
		}
				
		//实例化模板
		$tp = PHP_Templates::factory();

		//设置模板文件
		$tp->setFiles('setversions');
		if(!empty($code)){
			$tp->code = $data->code;
			$tp->option = $vers_temp;
		}

		//输出页面
		$tp->execute();

		//释放模板变量
		unset($tp);
	
	}
	
	public function view_rate(){
		$id = intval(Core::$_dataFilter->valueCheck( Core::get("id") , "Require,Integer" , "id不能为空,数据非法！" ));
		$type =  intval(Core::get("t",'0'));
                
		$channel = self::i($id);
		//实例化模板
		$tp = PHP_Templates::factory();

		//设置模板文件
		$tp->setFiles('set_rate_channel');
		if($channel->code){
			$tp->code = $channel->code;
			$tp->name = $channel->name;
                        $groupid = $channel->groupid;
                        $tp->type = $type;
                        if($type === 3){
                            $storage = Storage_channel::getOne("channel_id = ?", $id);
                            $tp->selestorage = self::get_select_storage($storage->storage_id ,$groupid );
                            if($storage->old_storage){
                                $storage = Storage_device::i($storage->old_storage);
                            }
                            $tp->old_storage = $storage->name;
                        }elseif($type === 2){
                            $tp->selemodule = self::get_select_module($channel->pullback);
                        }elseif($type === 1){
                            $tp->selectrans = self::get_select_trans($channel->transport);
                        }else{
                            $tp->selectrate = self::get_select_rate($channel->rate);
                            $tp->selectwidth = self::get_select_width($channel->encode,true);
                            $tp->selectheight = self::get_select_width($channel->encode,false);
                        }
		}

		//输出页面
		$tp->execute();

		//释放模板变量
		unset($tp);
	}
	
        
	//设置码率
	public function set_rate_ajax(){
		COMFilter::$_jump = false;
		$code = Core::$_dataFilter->valueCheck( Core::get("code") , "Require,Limit" , "code不能为空,code非法" , false , 13 );
		$rate = Core::$_dataFilter->valueCheck( Core::get("rate") , "Require,Integer" , "码率不能为空,rate非法" );
		$width = Core::$_dataFilter->valueCheck( Core::get("width") , "Require,Integer" , "宽不能为空,rate非法" );
		//$height = Core::$_dataFilter->valueCheck( Core::get("height") , "Require,Integer" , "高不能为空,rate非法" );
		
		if(!Core::checkcode($code)){
			Core::json_error('code 不合法');
		}
		$addate = time();
		$channel = Channels::getOne("code = ?",array($code));
		if($channel){
			$flag = false;
			if($rate != $channel->rate){
				$channel->rate = $rate;
			}else{
				$data['rate'] = $rate;
				$flag = true;
			}
			$encode = explode('_',$channel->encode);
			if($width != $encode[1]){
				$encode[1] = $width;
			}
			//if($height != $encode[2]){
				$encode[2] = 0;
			//}
			$channel->encode = implode('_', $encode);
			$channel->edate = $addate;
			if($channel->save()){
				$data['rate'] = $rate;
				$flag = true;
			}
		}	
		
		if($flag){
			Core::json_result($data,'ok');	
		}else{
			Core::json_error('设置码率失败');	
		}

	}
	
	/**
	 * 功能号：1027
	 * 设置协议
	 * */
	public function set_trans_ajax(){
		COMFilter::$_jump = false;
		$code = Core::$_dataFilter->valueCheck( Core::get("code") , "Require,Limit" , "code不能为空,code非法" , false , 13 );
		$trans = Core::$_dataFilter->valueCheck( Core::get("trans") , "Require" , "协议不能为空" );
			
		if(!Core::checkcode($code)){
			Core::json_error('code 不合法');
		}
		$addate = time();
		$channel = Channels::getOne("code = ?",array($code));
		if($channel){
			
			$channel->transport = $trans;
			$channel->edate = $addate;
			if($channel->save()){
				$data['trans'] = $trans;
				$flag = true;
			}
		}	
		
		if($flag){
			Core::json_result($data,'ok');	
		}else{
			Core::json_error('设置协议失败');	
		}

	}
	/**
	 * 功能号：1029
	 * 设置回退版本
	 * */
	public function set_pullback_ajax(){
		COMFilter::$_jump = false;
		$code = Core::$_dataFilter->valueCheck( Core::get("code") , "Require,Limit" , "code不能为空,code非法" , false , 13 );
		$modules = COMCommon::scriptFilter(Core::get("modules"));
		if($modules)$modules = rtrim($modules,',');
		if(!Core::checkcode($code)){
			Core::json_error('code 不合法');
		}
		$addate = time();
		$channel = Channels::getOne("code = ?",array($code));
		if($channel){
			$channel->pullback = $modules;
			$channel->edate = $addate;
			$flag = $channel->save();
		}	
		
		if($flag){
			Core::json_result('','ok');	
		}else{
			Core::json_error('设置码率失败');	
		}

	}
         
	/**
	 * 功能号：2060
	 * 设置Ping命令
	 * */
	public function set_pinginfo(){
		COMFilter::$_jump = false;
		$code = Core::$_dataFilter->valueCheck( Core::get("code") , "Require,Limit" , "code不能为空,code非法" , false , 13 );
		$pingstr = Core::$_dataFilter->valueCheck( Core::get("ping") , "Require" , "ping不能为空" );
		if(!Core::checkcode($code)){
			Core::json_error('code 不合法');
		}
		bChannel_ping::delete();
		$flag = false;
		$addate = time();
		$channel = Channels::getOne("code = ?",array($code));
		if($channel){
			$pingstr = str_replace("\n",'<br/>',$pingstr);
			if(bChannel_ping::addChannel_ping($code, $pingstr, $addate))
			{
				$flag = true;
				$mess = "添加信息成功";
			}else{
				$mess = "添加信息失败";
			}
		}else{
			$mess = "频道不存在";
		}	
		
		if($flag){
			Core::json_result('',$mess);
		}else{
			Core::json_error($mess);
		}

	}
	
	/**
	 * 功能号：1023
	 * 启用禁用Ping命令
	 * */
	public function setping(){
		COMFilter::$_jump = false;
		$id = Core::$_dataFilter->valueCheck( Core::get("id") , "Integer" , "数据非法！" );
		$enable = Core::$_dataFilter->valueCheck( Core::get("t") , "Integer" , "数据非法！" );;
		if($id){
			$mess = 'Ping命令';
			$flag = $this->update_enable( $id ,$enable );
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
	
	/**
	 * 功能号：1025
	 * 设置重启
	 * */
	public function setstart(){
		COMFilter::$_jump = false;
		$id = Core::$_dataFilter->valueCheck( Core::get("id") , "Integer" , "数据非法！" );
		$enable = Core::$_dataFilter->valueCheck( Core::get("t") , "Integer" , "数据非法！" );;
		if($id){
			$mess = '重启命令';
			$flag = $this->update_restart( $id ,$enable );
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
        
	/**
	 * 功能号：1026
	 * 设置重启
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
	
	/**
	 * 功能号：1030
	 * 设置传输状态
	 * */
	public function transtatus_ajax(){
		COMFilter::$_jump = false;
		$id = Core::$_dataFilter->valueCheck( Core::get("id") , "Integer" , "数据非法！" );
		$enable = Core::$_dataFilter->valueCheck( Core::get("t") , "Integer" , "数据非法！" );;
		if($id){
			$mess = '频道传输状态';
			$flag = $this->update_transtatus( $id ,$enable );
			$mess .= ($enable == 1)?'关闭':'开启';
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
	
	function check_tvmeup($clientvers){
		
			foreach ($clientvers as $key=>$vers){
				if($key == "tvmeup"){
					$bmodule = bModules::getOne("enable = 1 and code=?",array($key));
					if($bmodule){
						$vers_ch = Vers_channel::getMOne($channel_id,$bmodule->id);
						if($vers_ch){
							$version = Versions::selectOne($vers_ch[0]['ver']);
							if($version){
								if($this->checkVersion($vers,$version[0]['version'])){
									$data=array('module'=>$bmodule->code,'version'=>$version[0]['version'],'path'=>$version[0]['path'],'file'=>$bmodule->filename);
								}
							}
						}elseif($bmodule->enable){
							$version = Versions::selectMOne($bmodule->id,1);
							if($version){
								if($this->checkVersion($vers,$version[0]['version'])){
									$data=array('module'=>$bmodule->code,'version'=>$version[0]['version'],'path'=>$version[0]['path'],'file'=>$bmodule->filename);
								}
							}
						}
					}
				}
			}
		return $data;	
	}
	
}










