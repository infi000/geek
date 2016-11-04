<?php
/**
 * SQL文件(TVM-ENCODER系统)
 * To contact the author write to {@link jingyunshan@tvmining.com}
 * @author 景云山
 */

class SqlVersions {
	
	public static $sqlArrs = array(
			"select"=> "SELECT id,version,path,remark,addate,edate,enable,module_id FROM versions WHERE id in",
			'selectOne' => "SELECT id,version,path,remark,addate,edate,enable,module_id FROM versions WHERE id = ?",
			'selectVers' => "SELECT id,version,path,remark,addate,edate,enable,module_id FROM versions WHERE version = ? and module_id = ?",
			'selectMVers' => "SELECT id,version,path,remark,addate,edate,enable,module_id FROM versions WHERE module_id = ? and enable = ?",
			'selectMVer' => "SELECT id,version,path,remark,addate,edate,enable,module_id FROM versions WHERE module_id = ? and enable = ?",
			'total' => "SELECT count(ID) as total FROM versions",
			"selectAll"=> "SELECT id,version,path,remark,addate,edate,enable,module_id FROM versions",
			'insert'=>"insert into versions (version,path,remark,addate,edate,module_id) values(?,?,?,?,?,?)",
			'update'=>"update versions set version = ?,path = ?,remark = ?,edate=?,module_id=? where id = ?",
			'updatenable'=>"update versions set enable = ? where id = ?",
			'updatuenable'=>"update versions set enable = ? where id != ? and module_id=?",
			'delete'=>"delete from versions  Where id = ?",
			'delpatch'=>"delete from versions  Where id in ",
	
		);

	/**
	 * 析构函数
	 * 
	 * @return void
	 */
	public function __destruct(){
	}
}
