<?php
/**
 * SQL文件(TVM-ENchannel_idR系统)
 * To contact the author write to {@link jingyunshan@tvmining.com}
 * @author 景云山
 */

class SqlVers_channel {

	public static $sqlArrs = array(
			"selectOne"=> array("channel_id"=>"SELECT id,channel_id,ver,module_id FROM version_channel WHERE channel_id =?",
						"id"=>"SELECT id,channel_id,ver,module_id FROM version_channel WHERE id =?"),
			"selectMOne"=> "SELECT id,channel_id,ver,module_id FROM version_channel WHERE channel_id =? and module_id=?",
			'total' => "SELECT count(ID) as total FROM version_channel",
			'insert'=>"insert into version_channel (channel_id,ver,module_id) values(?,?,?)",
			'update'=>"update version_channel set channel_id=?,ver=?,module_id=? where id = ?",
			'delete'=>"delete from version_channel  Where channel_id = ? and module_id = ?",
		);

    
	/**
	 * 析构函数
	 * 
	 * @return void
	 */
	public function __destruct(){
		unset( $this->sqlArrs );
	}
}
