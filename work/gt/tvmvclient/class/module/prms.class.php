<?php
class Prms extends Rms {
	
	/**
	 * 对像静态变量
	 *
	 * @var object
	 */
	static private $_class;
	
	private $_showpage;
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
	
	function addmenu(){
		//登录检查
		Login::logincheck();
		//$this->cmsUserMaster('/prms/addmenu');
		$moduleid = Core::$params->moduleid = Core::$_dataFilter->valueCheck( $_GET["menuId"]?$_GET["menuId"]:$_POST["menuId"] , "Integer" , "数据非法！" );
		$name = Core::$params->name = Core::$_dataFilter->valueCheck( $_POST["menuName"] , "Limit" , "菜单名最多25个汉字" , false , 50 );
		$url = Core::$params->url = Core::$_dataFilter->valueCheck( $_POST["menuUrl"] , "Limit" , "菜单链接地址最多200个字符" , false , 200 );
		$pid = Core::$params->pid = Core::$_dataFilter->valueCheck( $_POST["menuPid"] , "Integer" , "数据非法！" );
		$sort = Core::$params->sort = Core::$_dataFilter->valueCheck( $_POST["menuSort"] , "Integer" , "数据非法！" );
		if(!empty($moduleid)){
			if(empty($name)){
				$data = $this->selectOneModule($moduleid);
			}else{
				$mess = $this->updateModule($moduleid,$name,$pid,$url,$sort);
				Core::jump($mess,'?do=/prms/menu',2);
			}
		}elseif(!empty($name)){
			$mess = $this->addModule($name,$pid,$url,$sort);
			Core::jump($mess,'?do=/prms/menu',2);
		}
		//实例化模板
		$tp = PHP_Templates::factory();

		//设置模板文件
		$tp->setFiles('addmenu');
		if(!empty($data)){
			$tp->id = $data[0]['ID'];
			$tp->name = $data[0]['NAME'];
			$tp->pid = $data[0]['PID'];
			$pdata = $this->selectOneModule($data[0]['PID']);
			$tp->pname = $pdata[0]['NAME'];
			$tp->url = $data[0]['URL'];
			$tp->sort = $data[0]['SORT'];
		}

		//输出页面
		$tp->execute();

		//释放模板变量
		unset($tp);
	}
	
	function menulist(){
			//登录检查
			Login::logincheck();
			//实例化模板
			$tp = PHP_Templates::factory();
			
			//设置模板文件
			$tp->setFiles('datalist');
			$tp->dataContent = $this->getNodeList(true);
			//输出页面
			$tp->execute();
			
			//释放模板变量
			unset($tp);
	}
	
	function menu(){
			//登录检查
			Login::logincheck();
			//$this->cmsUserMaster('/prms/menu');
			$menuid = Core::$params->menuid = Core::$_dataFilter->valueCheck( $_POST["delNode"] , "MultiId" , "数据非法！" );
			if(!empty($menuid)){
				$mess = $this->deleteModule($menuid);
				Core::jump($mess,'?do=/prms/menu',2);
			}
			//实例化模板
			$tp = PHP_Templates::factory();
			//设置模板文件
			$tp->setFiles('managemenu');
			$tp->dataContent = $this->getNodeList2(true);
			//输出页面
			$tp->execute();
			
			//释放模板变量
			unset($tp);
	}
	
	function rights(){
			//登录检查
			Login::logincheck();
			//$this->cmsUserMaster('/prms/role');
			$roleid = Core::$params->roleid = Core::$_dataFilter->valueCheck( $_GET["roleId"]?$_GET["roleId"]:$_POST["roleId"] , "Integer" , "数据非法！" );
			$moudle = Core::$params->moudle = Core::$_dataFilter->valueCheck( $_POST["moudle"] , "MultiId" , "参数非法" );
		
			//实例化模板
			$tp = PHP_Templates::factory();
			//设置模板文件
			$tp->setFiles('manageright');
			$tp->dataContent = $this->getNodeList2(true);
			if(!empty($roleid)){
				$tp->id = $roleid;
				if(empty($moudle)){
					$tp->module = $this->getRoleModule($roleid);
				}else{
					$mess = $this->addRoleModule($roleid,$moudle);
					Core::jump($mess,'?do=/prms/role',2);
				}
			}
			//输出页面
			$tp->execute();
			
			//释放模板变量
			unset($tp);
	}
	
	function addrole(){
		//登录检查
		Login::logincheck();
		//$this->cmsUserMaster('/prms/role');
		Core::$params->moduleid = Core::$_dataFilter->valueCheck( $_GET["roleId"]?$_GET["roleId"]:$_POST["roleId"] , "Integer" , "数据非法！" );
		Core::$params->name = Core::$_dataFilter->valueCheck( $_POST["roleName"] , "Limit" , "角色名最多20个汉字" , false , 40 );
		Core::$params->intro = Core::$_dataFilter->valueCheck( $_POST["roleIntro"] , "Limit" , "角色最多120个汉字" , false , 240 );
		$this->addRoleDepart(0);
	}
	
	function adddepart(){
		//登录检查
		Login::logincheck();
		//$this->cmsUserMaster('/prms/depart');
		Core::$params->moduleid = Core::$_dataFilter->valueCheck( $_GET["roleId"]?$_GET["roleId"]:$_POST["roleId"] , "Integer" , "数据非法！" );
		Core::$params->name = Core::$_dataFilter->valueCheck( $_POST["roleName"] , "Limit" , "角色名最多20个汉字" , false , 40 );
		Core::$params->intro = Core::$_dataFilter->valueCheck( $_POST["roleIntro"] , "Limit" , "角色最多120个汉字" , false , 240 );
		$this->addRoleDepart(1);
	}
	
	private function addRoleDepart($type = 0){
		//登录检查
		Login::logincheck();
		$roleid = Core::$params->moduleid;
		$name = Core::$params->name;
		$intro = Core::$params->intro;
		if(!empty($roleid)){
			if(empty($name)){
				$data = $this->selectOneRole($roleid);
			}else{
				$mess = $this->updateRole($roleid,$name,$type,$intro);
				Core::jump($mess,$type?'?do=/prms/depart':'?do=/prms/role',2);
				
			}
		}elseif(!empty($name)){
			$mess = $this->addRoleName($name,$type,$intro);
			Core::jump($mess,$type?'?do=/prms/depart':'?do=/prms/role',2);
		}
		//实例化模板
		$tp = PHP_Templates::factory();

		//设置模板文件
		$tp->setFiles($type?'adddepart':'addrole');
		if(!empty($data)){
			$tp->id = $data[0]['ID'];
			$tp->name = $data[0]['NAME'];
			$tp->intro = $data[0]['INTRO'];
		}

		//输出页面
		$tp->execute();

		//释放模板变量
		unset($tp);
	}
	
	function role(){
		//登录检查
		Login::logincheck();
		//$this->cmsUserMaster('/prms/role');
		$this->roleDepart(0);
	}
	
	function depart(){
		//登录检查
		Login::logincheck();
		//$this->cmsUserMaster('/prms/depart');
		$this->roleDepart(1);
	}
	
	private function roleDepart( $type ){
			
			//实例化模板
			$tp = PHP_Templates::factory();
			
			//设置模板文件
			$tp->setFiles($type?'managedepart':'managerole');
			$tp->tableBody = $this->roleResult( $type );
			$tp->pager = $this->_showpage;
			//输出页面
			$tp->execute();
			
			//释放模板变量
			unset($tp);
	}
	
	
	private function roleResult( $type = 0 ){
			//实例化分页数据获取
			$pager	= Pagination::factory();
			//查询条件
			$sql = $this->sqlArrRmsRole['selAllRecordTotal'];
			$pager->getDataTotal( $sql , array( $type ) );
			//设置每显示记录条数
			$pageSize = 38;
			//设置显示的数字页码数
			$showSize = 10;
			//获取当前页
			$currPage = $_GET[ 'page' ];
			//创建分页实例
			$pager->pagerInit( ROOT.'class/plus/pagination/pagerstatictemplate.htm' , $pageSize , $showSize , $currPage , 'page' );
			//获取当前页码
			$cur = $pager->getCurrentPage();
			//获取记录的SQL语句
			$sql = $this->sqlArrRmsRole[ "selAllRecord" ];
			//获取页数据
			$result = $pager->getDataSet( $sql , $cur , $pageSize , array( $type ) );
			if(!empty($result)){
				//设置显示的字段
				$showFields = array( 'ID','NAME');
				//设置处理字段函数
				$multFunction = array('ID'=>array('PaginalTable','createCheckBox'),'NAME'=>array(__CLASS__,$type?'createTitleDepart':'createTitle'));
				//复合字段处理
				$multFields = array('NAME'=>array('ID','NAME'));
				//设置表格标签
				$pager->setTableTag(false);
				//设置表格样式
				$pager->setTableClass('newblog');
				//设置选择框
				$pager->setCheckBox();
				$this->_showpage = $pager->showGet(ROOT.'class/plus/pagination/dwpager_get.htm','','<em>|</em>');
				return $pager->createTable( $result , $showFields , $multFunction , $multFields );
			}
	}
	//格式化标题显示方法
	public function createTitle( $value ){
		if($value){
			$title = COMCommon::titleString(stripcslashes($value[1]),55);
			$text = '<a href="?do=/prms/addrole&roleId='.$value[0].'" '.$title.'>'.COMCommon::cutSubstr(stripcslashes($value[1]),0,55,'').'</a>&nbsp;&nbsp;
			<a href="'.Core::get_url('/prms/rights').'&roleId='.$value[0].'" >权限</a>';
		}
		return $text;
	}
	
	//格式化标题显示方法
	public function createTitleDepart( $value ){
		if($value){
			$title = COMCommon::titleString(stripcslashes($value[1]),55);
			$text = '<a href="?do=/prms/adddepart&roleId='.$value[0].'" '.$title.'>'.COMCommon::cutSubstr(stripcslashes($value[1]),0,55,'').'</a>';
		}
		return $text;
	}
	
	function user(){
			//登录检查
			Login::logincheck();
			//$this->cmsUserMaster('/prms/user');
			//实例化模板
			$tp = PHP_Templates::factory();
			
			//设置模板文件
			$tp->setFiles('manageuser');
			$tp->tableBody = $this->userResult();
			$tp->pager = $this->_showpage;
			//输出页面
			$tp->execute();
			
			//释放模板变量
			unset($tp);
	}
	
	
	private function userResult(){
			//实例化分页数据获取
			$pager	= Pagination::factory();
			//查询条件
			$sql = $this->sqlArrRmsUser['selAllRecordTotal'];
			$pager->getDataTotal( $sql );
			//设置每显示记录条数
			$pageSize = 38;
			//设置显示的数字页码数
			$showSize = 10;
			//获取当前页
			$currPage = $_GET[ 'page' ];
			//创建分页实例
			$pager->pagerInit( ROOT.'class/plus/pagination/pagerstatictemplate.htm' , $pageSize , $showSize , $currPage , 'page' );
			//获取当前页码
			$cur = $pager->getCurrentPage();
			//获取记录的SQL语句
			$sql = $this->sqlArrRmsUser[ "selAllRecord" ];
			//获取页数据
			$result = $pager->getDataSet( $sql , $cur , $pageSize );
			if(!empty($result)){
				//设置显示的字段
				$showFields = array( 'ID','NAME');
				//设置处理字段函数
				$multFunction = array('ID'=>array('PaginalTable','createCheckBox'),'NAME'=>array(__CLASS__,'userCreateTitle'));
				//复合字段处理
				$multFields = array('NAME'=>array('ID','NAME'));
				//设置表格标签
				$pager->setTableTag(false);
				//设置表格样式
				$pager->setTableClass('newblog');
				//设置选择框
				$pager->setCheckBox();
				$this->_showpage = $pager->showGet(ROOT.'class/plus/pagination/dwpager_get.htm','','<em>|</em>');
				return $pager->createTable( $result , $showFields , $multFunction , $multFields );
			}
	}
	//格式化标题显示方法
	public function userCreateTitle( $value ){
		if($value){
			$title = COMCommon::titleString(stripcslashes($value[1]),55);
			$text = '<a href="?do=/prms/adduser&userId='.$value[0].'" '.$title.'>'.COMCommon::cutSubstr(stripcslashes($value[1]),0,55,'').'</a>&nbsp;&nbsp;
			<a href="?do=/prms/userrole&userId='.$value[0].'" >角色</a>';
		}
		return $text;
	}
	
	function adduser(){
		//登录检查
		Login::logincheck();
		//$this->cmsUserMaster('/prms/user');
		$userid = Core::$params->moduleid = Core::$_dataFilter->valueCheck( $_GET["userId"]?$_GET["userId"]:$_POST["userId"] , "Integer" , "数据非法！" );
		$departid = Core::$params->departid = Core::$_dataFilter->valueCheck( $_POST["depart"] , "Integer" , "数据非法！" );
		$name = Core::$params->name = Core::$_dataFilter->valueCheck( $_POST["userName"] , "Limit" , "角色名最多20个汉字" , false , 40 );
		$intro = Core::$params->intro = Core::$_dataFilter->valueCheck( $_POST["userIntro"] , "Limit" , "角色最多120个汉字" , false , 240 );
		if(!empty($userid)){
			if(empty($name)){
				$data = $this->selectOneUser($userid);
			}else{
				$mess = $this->updateUser($userid,$name,$departid,$intro);
				Core::jump($mess,'?do=/prms/user',2);
				
			}
		}elseif(!empty($name)){
			$mess = $this->addUserName($name,$departid,$intro);
			Core::jump($mess,'?do=/prms/user',2);
		}
		//实例化模板
		$tp = PHP_Templates::factory();

		//设置模板文件
		$tp->setFiles('adduser');
		if(!empty($data)){
			$tp->id = $data[0]['ID'];
			$tp->name = $data[0]['NAME'];
			$tp->intro = $data[0]['INTRO'];
		}
		$tp->option = $this->setDepartOption($data[0]['DEPART']);
		//输出页面
		$tp->execute();

		//释放模板变量
		unset($tp);
	}
	
	function pass(){
		//登录检查
		Login::logincheck();
		//$this->cmsUserMaster('/prms/user');
		$userid = Core::$userInfo->userID;
		$opass = Core::$_dataFilter->valueCheck( Core::get('opass') , "Limit" , "密码6-20个字符" , false , 6,20 );
		$pass = Core::$_dataFilter->valueCheck( Core::get('pass') , "Limit" , "密码6-20个字符" , false , 6,20 );
		$rpass = Core::get('opass');
		
		if(!empty($rpass)){
			if($opass && $pass){
				$mess = $this->updatePass($userid,$opass,$pass);
				Core::jump($mess,Core::get_url('/prms/pass'));
			}
		}
		//实例化模板
		$tp = PHP_Templates::factory();

		//设置模板文件
		$tp->setFiles('password');
		
		//输出页面
		$tp->execute();

		//释放模板变量
		unset($tp);
	}
	
	/**
	 * 获取部门角色列表选项
	 * 
	 * @param integer $id 被选择分类ID
	 * @return string 分类列表html字符串
	 */
	private function setDepartOption( $id = '' , $type = 1 ){
		$this->dataSet = $this->selectAllRole( $type );
		if(!empty($this->dataSet)){
			$this->temp = '';
			foreach ($this->dataSet as $row){
				if( $row['ID'] == $id && $id )$selected = 'selected';
				$this->temp .= '<option value="'.$row['ID'].'" '.$selected.'>'.stripcslashes($row['NAME']).'</option>';
				if($selected)$selected = '';
			}
			return $this->temp;
		}
	}
	
	function userRole(){
			//登录检查
			Login::logincheck();
			//$this->cmsUserMaster('/prms/user');
			$userid = Core::$params->userid = Core::$_dataFilter->valueCheck( $_GET["userId"]?$_GET["userId"]:$_POST["userId"] , "Integer" , "数据非法！" );
			$moudle = Core::$params->moudle = Core::$_dataFilter->valueCheck( $_POST["moudle"] , "MultiId" , "参数非法" );
		
			//实例化模板
			$tp = PHP_Templates::factory();
			
			//设置模板文件
			$tp->setFiles('manageuserrole');
			$tp->dataContent = $this->selectRoleList();
			if(!empty($userid)){
				$tp->id = $userid;
				if(empty($moudle)){
					$mod = $this->getUserModule($userid);
					if(!empty($mod)){
						$temp = '';
						foreach ($mod as $s){
							$temp .= $s['ROLEID'].',';
						}
						$tp->module = rtrim($temp,',');
					}
				}else{
					$mess = $this->addUserModule($userid,$moudle);
					Core::jump($mess,'?do=/prms/user',2);
				}
			}
			//输出页面
			$tp->execute();
			
			//释放模板变量
			unset($tp);
	}
}
