<?php
/**
 * SQL文件(多维系统)
 * To contact the author write to {@link jingyunshan@ceopen.cn}
 * @author 景云山
 */

class SqlRms {
	
	public $sqlArrRms = array(
		'insert'=>"insert into cms_module(NAME,PID,URL,SORT) values(?,?,?,?)",
		'update'=>"update cms_module set NAME=?,PID=?,URL=?,SORT=? where ID = ?",
		'delete'=>"delete from cms_module Where ID in ",
		'selAllRecord'=>array("select ID,NAME,PID,URL,SORT from cms_module",
			" order by PID,SORT"),
		'selAllRecordTotal'=>"SELECT count(ID) as total FROM cms_module",
		'selOneRecord'=>"select ID,NAME,PID,URL,SORT from cms_module where ID = ?",
		'selDuplicate'=>"select ID,NAME from cms_module where  NAME = ? and ID != ? and PID = ?",
		'selUserModule'=>array("select ID,NAME,PID,URL,SORT from cms_module where ID in (",
				") ORDER BY SORT",
			),
	);
	public $sqlArrRmsRole = array(
		'insert'=>"insert into cms_role_depart(NAME,TYPE,INTRO) values(?,?,?)",
		'update'=>"update cms_role_depart set NAME=?,TYPE=?,INTRO=? where ID = ?",
		'selAllRecord'=>"select ID,NAME,TYPE,INTRO from cms_role_depart where TYPE = ?",
		'selAllRecordTotal'=>"SELECT count(ID) as total FROM cms_role_depart where TYPE = ?",
		'selOneRecord'=>"select ID,NAME,TYPE,INTRO from cms_role_depart where ID = ?",
		'selDuplicate'=>"select ID,NAME from cms_role_depart where TYPE = ? and NAME = ? and ID != ?",
		'selRoleModule'=>"select MODULEID from cms_role_module where ROLEID = ?",
		'insertRoleModule'=>"insert into cms_role_module(ROLEID,MODULEID) values(?,?)",
		'deleteRoleModule'=>"delete from cms_role_module where ROLEID = ?",
		'deleteMenuModule'=>"delete from cms_role_module where MODULEID in ",
		'selUserRoleModule' =>array("SELECT MODULEID FROM cms_role_module where ROLEID in (",
			") group by MODULEID",),
	);
	public $sqlArrRmsUser = array(
		'insert'=>"insert into cms_user(NAME,DEPART,INTRO) values(?,?,?)",
		'update'=>"update cms_user set NAME=?,DEPART=?,INTRO=? where ID = ?",
		'updatepass'=>"update cms_user set PASS=? where ID = ?",
		'selAllRecord'=>"select ID,NAME,DEPART,INTRO from cms_user",
		'selAllRecordTotal'=>"SELECT count(ID) as total FROM cms_user",
		'selOneRecord'=>"select ID,NAME,PASS,DEPART,INTRO from cms_user where ID = ?",
		'selOneNameRecord'=>"select ID,NAME,PASS,DEPART,INTRO from cms_user where NAME = ?",
		'selDuplicate'=>"select ID,NAME from cms_user where  NAME = ? and ID != ?",
		'selRoleUser'=>"select ROLEID from cms_user_role where USERID = ?",
		'insertRoleUser'=>"insert into cms_user_role(USERID,ROLEID) values(?,?)",
		'deleteRoleUser'=>"delete from cms_user_role where USERID = ?",
	);
	/**
	 * 析构函数
	 * 
	 * @return void
	 */
	public function __destruct(){
		unset( $this->sqlArrRms );
	}
}