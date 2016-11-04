<?php
/**
 * 接口实现文件(多维系统)
 * To contact the author write to {@link jingyunshan@myce.net.cn}
 * @author 景云山
 */
class Rms extends SqlRms implements IRms{

	//临时变量
	private static $temp;
		
	//临时数组
	private static $_columnNodeList;
	
	/**
	 * 获取全部结点列表
	 * 
	 * @return array 全部记录
	 */
	public function getNodeList( $last = false ) {
		self::$temp = '';
		self::$_columnNodeList = $this->getAllRecord();
		$parent = $this->getArrayParent();
		foreach($parent as $row){
			$this->selectNodeList( $row , $last );
		}
		return self::$temp;
	}
	
	/**
	 * 菜单获取全部结点列表
	 * 
	 * @return array 全部记录
	 */
	public function getNodeList2( $last = false ) {
		self::$temp = '';
		self::$_columnNodeList = $this->getAllRecord();
		$parent = $this->getArrayParent();
		foreach($parent as $row){
			$this->selectNodeList2( $row , $last );
		}
		return self::$temp;
	}
	
	/**
	 * 获取全部记录
	 * 
	 * @return array 全部记录
	 */
	public function getAllRecord( ) {
		return Core::$_mdb->search( $this->sqlArrRms[ "selAllRecord" ][0].$this->sqlArrRms[ "selAllRecord" ][1] );
	}
	
	private function getArrayParent( ){
		$parent = array();
		if(self::$_columnNodeList){
			foreach (self::$_columnNodeList as $row){
				if(empty($row["PID"])){
					$parent[] = $row;
				}
			}
		}
		return $parent;
	}
	
	private function getArraySon( $pid ){
		$son = array();
		if(self::$_columnNodeList){
			foreach (self::$_columnNodeList as $row){
				if($row["PID"] == $pid){
					$son[] = $row;
				}
			}
		}
		return $son;
	}
	
	/**
	 * 获取结点列表
	 * 
	 * @return array 全部记录
	 */
	private function selectNodeList( $arrParent , $last ) {
		$subClass = $this->getArraySon( $arrParent['ID'] );
		if($subClass){
			self::$temp .= '<li class="Closed" id="u'.$arrParent['ID'].'"> <img class=s src="images/s.gif" onclick="nodeClick(this)" />'.'<INPUT type="checkbox" class="nodeList" onclick="getText(this)" value="'.$arrParent['ID'].','.$arrParent['NAME'].'" />'.$arrParent['NAME'].'<ul>';
			foreach($subClass as $row){
				self::$temp .= $this->selectNodeList( $row , $last );
			}
			self::$temp .= '</ul></li>';
		}else{
			//if($arrParent['ISLAST'] == '1'){
				if( $last ) self::$temp .= '<LI class="Child" id="u'.$arrParent['ID'].'"><IMG class="s" src="images/s.gif" /> <INPUT type="checkbox"  class="nodeList" onclick="getText(this)" value="'.$arrParent['ID'].','.$arrParent['NAME'].'" />'.$arrParent['NAME'].'</LI>';
			//}else{
			//	self::$temp .= '<LI class="Closed" id="u'.$arrParent['ID'].'"><IMG class="s" src="images/s.gif"  onclick="nodeClick(this)" />'.($last?'':'<INPUT type="checkbox"  class="nodeList" onclick="getText(this)" value="'.$arrParent['ID'].','.$arrParent['NAME'].'" />').$arrParent['NAME'].'</LI>';

			//}
		}
	}
	
	/**
	 * 获取结点列表2
	 * 
	 * @return array 全部记录
	 */
	private function selectNodeList2( $arrParent , $last ) {
		$subClass = $this->getArraySon( $arrParent['ID'] );
		if($subClass){
			self::$temp .= '<li class="Closed" id="u'.$arrParent['ID'].'"> <img class=s src="images/s.gif" onclick="nodeClick(this)" />'.'<INPUT type="checkbox" class="nodeList"  value="'.$arrParent['ID'].'" /><a href="?do=/prms/addmenu&menuId='.$arrParent['ID'].'">'.$arrParent['NAME'].'</a><ul>';
			foreach($subClass as $row){
				self::$temp .= $this->selectNodeList2( $row , $last );
			}
			self::$temp .= '</ul></li>';
		}else{
			//if($arrParent['ISLAST'] == '1'){
				if( $last ) self::$temp .= '<LI class="Child" id="u'.$arrParent['ID'].'"><IMG class="s" src="images/s.gif" /> <INPUT type="checkbox"  class="nodeList"  value="'.$arrParent['ID'].'" /><a href="?do=/prms/addmenu&menuId='.$arrParent['ID'].'">'.$arrParent['NAME'].'</a></LI>';
			//}else{
			//	self::$temp .= '<LI class="Closed" id="u'.$arrParent['ID'].'"><IMG class="s" src="images/s.gif"  onclick="nodeClick(this)" />'.($last?'':'<INPUT type="checkbox"  class="nodeList" onclick="getText(this)" value="'.$arrParent['ID'].','.$arrParent['NAME'].'" />').$arrParent['NAME'].'</LI>';

			//}
		}
	}
	
	/**
	 * 获取结点列表
	 * 
	 * @return array 全部记录
	 */
	protected function selectRoleList( ) {
		$subClass = $this->selectAllRole( );
		if(!empty($subClass)){
			foreach($subClass as $row){
				$temp .= '<LI class="Child"><INPUT type="checkbox"  class="nodeList" value="'.$row['ID'].'" />'.$row['NAME'].'</LI>';
			}
		}
		return $temp;
	}
	
	protected function Duplicate($sqlPropertyName,$fieldsArr){
		$temp = Core::$_mdb->search($sqlPropertyName['selDuplicate'],$fieldsArr);
		if(empty($temp)){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 添加模块
	 *
	 * @param unknown_type $name
	 * @param unknown_type $pid
	 * @param unknown_type $url
	 * @param unknown_type $sort
	 * @return unknown
	 */
	function addModule($name,$pid = 0,$url,$sort){
		if($this->Duplicate($this->sqlArrRms,array($name,0,$pid))){
			if(Core::$_mdb->execute($this->sqlArrRms['insert'],array($name,$pid,$url,$sort))){
				return '菜单添加成功';
			}else{
				return '菜单添加失败';
			}
		}else{
			return '模块名称已经存在！';
		}
	}
	/**
	 * 更新模块
	 *
	 * @param unknown_type $id
	 * @param unknown_type $name
	 * @param unknown_type $pid
	 * @param unknown_type $url
	 * @param unknown_type $sort
	 * @return unknown
	 */
	function updateModule($id,$name,$pid = 0,$url,$sort){
		if($this->Duplicate($this->sqlArrRms,array($name,$id,$pid))){
			if(Core::$_mdb->execute($this->sqlArrRms['update'],array($name,$pid,$url,$sort,$id))){
				return '菜单更新成功';
			}else{
				return '菜单更新失败';
			}
		}else{
			return '模块名称已经存在！';
		}
	}
	
	function deleteModule($menuid){
		$flag = true;
		Core::$_mdb->beginTransaction( );
		if(Core::$_mdb->execute($this->sqlArrRms['delete']."( $menuid )")){
			if(!Core::$_mdb->execute($this->sqlArrRmsRole['deleteMenuModule']."( $menuid )")){
				$flag = false;
			}
		}else{
			$flag = false;
		}
		if($flag){
			$flag = Core::$_mdb->commit( );
		}else{
			Core::$_mdb->rollBack( );
		}
		if($flag){
			return '菜单删除成功！';
		}else{
			return '菜单删除失败！';
		}
	}
	
	function selectOneModule($id){
		return Core::$_mdb->search($this->sqlArrRms['selOneRecord'],array($id));
	}
	
	/**
	 * 添加模块
	 *
	 * @param unknown_type $name
	 * @param unknown_type $pid
	 * @param unknown_type $url
	 * @param unknown_type $sort
	 * @return unknown
	 */
	function addRoleName($name,$type = 0,$intro){
		if($this->Duplicate($this->sqlArrRmsRole,array($type,$name,0))){
			if(Core::$_mdb->execute($this->sqlArrRmsRole['insert'],array($name,$type,$intro))){
				return ($type?'部门':'角色').'添加成功';
			}else{
				return ($type?'部门':'角色').'添加失败';
			}
		}else{
			return ($type?'部门':'角色').'名称已经存在！';
		}
	}
	/**
	 * 更新模块
	 *
	 * @param unknown_type $id
	 * @param unknown_type $name
	 * @param unknown_type $pid
	 * @param unknown_type $url
	 * @param unknown_type $sort
	 * @return unknown
	 */
	function updateRole($id,$name,$type = 0,$intro){
		if($this->Duplicate($this->sqlArrRmsRole,array($type,$name,$id))){
			if(Core::$_mdb->execute($this->sqlArrRmsRole['update'],array($name,$type,$intro,$id))){
				return ($type?'部门':'角色').'更新成功';
			}else{
				return ($type?'部门':'角色').'更新失败';
			}
		}else{
			return ($type?'部门':'角色').'名称已经存在！';
		}
	}
	
	function selectOneRole($id){
		return Core::$_mdb->search($this->sqlArrRmsRole['selOneRecord'],array($id));
	}
	
	protected function selectAllRole($type = 0){
		return Core::$_mdb->search($this->sqlArrRmsRole['selAllRecord'],array($type));
	}
	
	protected function getRoleModule($roleid){
		$temp = $this->arrayMultiStr(Core::$_mdb->search($this->sqlArrRmsRole['selRoleModule'],array($roleid)));
		return $temp;
	}
	protected function addRoleModule($roleid,$module){
		$flag = true;
		$module = explode(',',$module);
		if(!empty($module)){
			Core::$_mdb->beginTransaction( );
			if(Core::$_mdb->execute($this->sqlArrRmsRole['deleteRoleModule'],array($roleid))){
				foreach ($module as $id){
					$flag = Core::$_mdb->execute($this->sqlArrRmsRole['insertRoleModule'],array($roleid , $id));
					if(!$flag){
						break;
					}
				}
			}else{
				$flag = false;
			}
			if($flag){
				$flag = Core::$_mdb->commit( );
			}else{
				Core::$_mdb->rollBack( );
			}
		}else{
			$flag = false;
		}
		if($flag){
			return '添加权限成功！';
		}else{
			return '添加权限失败！';
		}
	}
	
	/**
		 * 添加用户
		 *
		 * @param unknown_type $name
		 * @param unknown_type $depart
		 * @param unknown_type $intro
		 * @return unknown
		 */
	function addUserName($name,$depart = 0,$intro){
		if($this->Duplicate($this->sqlArrRmsUser,array($name,0))){
			if(Core::$_mdb->execute($this->sqlArrRmsUser['insert'],array($name,$depart,$intro))){
				return '用户添加成功';
			}else{
				return '用户添加失败';
			}
		}else{
			return '用户帐号名已经存在！';
		}
	}
	/**
	 * 更新用户
	 *
	 * @param unknown_type $id
	 * @param unknown_type $name
	 * @param unknown_type $depart
	 * @param unknown_type $intro
	 * @return unknown
	 */
	function updateUser($id,$name,$depart = 0,$intro){
		if($this->Duplicate($this->sqlArrRmsUser,array($name,$id))){
			if(Core::$_mdb->execute($this->sqlArrRmsUser['update'],array($name,$depart,$intro,$id))){
				return '用户更新成功';
			}else{
				return '用户更新失败';
			}
		}else{
			return '用户帐号名已经存在！';
		}
	}
	
function updatePass($id,$opass,$pass){
		$data = $this->selectOneUser($id);
		if($data){
			$opass = sha1($data[0]['NAME'].sha1($opass).$data[0]['ID']);
			if($data[0]['PASS'] == $opass){
				$pass = sha1($data[0]['NAME'].sha1($pass).$data[0]['ID']);
				if(Core::$_mdb->execute($this->sqlArrRmsUser['updatepass'],array($pass,$id))){
					return '密码修改成功';
				}else{
					return '密码修改失败';
				}
			}else{
				return '原密码不正确';
			}
		}else{
			return '用户不存在！';
		}
	}
	
	function selectOneUser($id){
		return Core::$_mdb->search($this->sqlArrRmsUser['selOneRecord'],array($id));
	}
	
	function selectOneNameUser($name){
		return Core::$_mdb->search($this->sqlArrRmsUser['selOneNameRecord'],array($name));
	}
	
	
	protected function getUserModule($userid){
		return Core::$_mdb->search($this->sqlArrRmsUser['selRoleUser'],array($userid));
	}
	
	protected function addUserModule($userid,$module){
		$flag = true;
		$module = explode(',',$module);
		if(!empty($module)){
			Core::$_mdb->beginTransaction( );
			if(Core::$_mdb->execute($this->sqlArrRmsUser['deleteRoleUser'],array($userid))){
				foreach ($module as $id){
					$flag = Core::$_mdb->execute($this->sqlArrRmsUser['insertRoleUser'],array($userid , $id));
					if(!$flag){
						break;
					}
				}
			}else{
				$flag = false;
			}
			if($flag){
				$flag = Core::$_mdb->commit( );
			}else{
				Core::$_mdb->rollBack( );
			}
		}else{
			$flag = false;
		}
		if($flag){
			return '添加角色成功！';
		}else{
			return '添加角色失败！';
		}
	}
	
	function userRoleModule( $name ){
		$userid = $this->selectOneNameUser($name);
		$temp = $this->arrayMultiStr($this->getUserModule($userid[0]['ID']));
		if(!empty($temp)){
			$temp = $this->arrayMultiStr(Core::$_mdb->search($this->sqlArrRmsRole['selUserRoleModule'][0].$temp.$this->sqlArrRmsRole['selUserRoleModule'][1]));
			if(!empty($temp)){
				$data = Core::$_mdb->search($this->sqlArrRms['selUserModule'][0].$temp.$this->sqlArrRms['selUserModule'][1]);
			}
		}
		return $data;
	}
	
	private function arrayMultiStr($arr){
		$temp = '';
		if(!empty($arr)){
			foreach ($arr as $c){
				$temp .= current($c).',';
			}
			$temp = rtrim($temp,',');
		}
		return $temp;
	}
	
	private function cmsUserRights($menu){
		$flag = false;
		if(!empty(Core::$userInfo->userRights)){
			foreach (Core::$userInfo->userRights as $right){
				if(is_array($menu)){
					if(in_array($right,$menu)){
						$flag = true;
						break;
					}
				}else{
					if($right == $menu){
						$flag = true;
						break;
					}
				}
			}
		}
		return $flag;
	}
	
	function cmsUserMaster($menu){
		if(!$this->cmsUserRights($menu)){
			Core::jump('你没有权限访问啊','?do=/cms/index',2);
		}
	}
}
