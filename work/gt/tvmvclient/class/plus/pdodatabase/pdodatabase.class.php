<?php
/**
 * 应用PDO扩展的数据库操作类，继承PDO扩展类库
 * @author 景云山 To contact the author write to {@link jingyunshan@myce.net.cn}
 * @version 2008-8-15
 * 提示：获取插入的前一行主建ID（ID必须为数字,mysql中ID设为自增）值的方法。
 * function lastInsertId ( [string name] )
 * param name 为序列名称
 * 事务发起方法 PDO::beginTransaction( )
 * 事务提交方法PDO::commit( )或PDO::rollBack( )
 */
class pdoDatabase extends PDO {
	
	//驱动名称 值为 'mysql' 或 'oci'
	private $_driver;	
	//数据库连接静态变量
	private static  $_conn = array();  
	
	/**
	 * 构造函数，构造数据库连接
	 * @author 景云山
	 * @version 2008-8-15
	 * @param array $connectionInfo 服务器连接信息 
	 	参数格式 array(
						host => "localhost",   //数据库服务器IP或域名
						user => "test",      //用户帐号
						pass => "123",      //用户帐号密码
						dbname => "test"       //数据库名
					)
	 * @param int $port 数据库服务器端口号
	 * @param string $driver 数据库驱动名称 值为 'mysql' 或 'oci'
	 * @param string $charset mysql数据库链接层字符集
	 * @param array $driverOptions 数据库驱动特定的连接选项数组
	 * @return void 无返回值
	 */
	
	private function pdoDatabase ( $connectionInfo , $port = 3306 , $driver = 'mysql' , $charset = 'utf8' , $driverOptions = null ) {
		$this->newConnection ( $connectionInfo , $port , $driver , $charset , $driverOptions );
	}
	/**
	 * 
	 */
	function __destruct(){
		unset($this->_driver);
	}
	/**
	 * 单实例数据库连接
	 * @author 景云山
	 * @version 2008-8-15
	 * @param array $connectionInfo 服务器连接信息 
	 	参数格式 array(
						host => "localhost",   //数据库服务器IP或域名
						user => "test",      //用户帐号
						pass => "123",      //用户帐号密码
						dbname => "test"       //数据库名
					)
	 * @param int $port 数据库服务器端口号
	 * @param string $driver 数据库驱动名称 值为 'mysql' 或 'oci'
	 * @param string $charset mysql数据库链接层字符集
	 * @param array $driverOptions 数据库驱动特定的连接选项数组
	 * @return void 无返回值
	 */
	
	private function newConnection ( $connectionInfo , $port = 3306 , $driver = 'mysql' , $charset = 'utf8' , $driverOptions = null ) {
		$message = '扩展没有加载，请检查PHP配置。';
		if ( !extension_loaded( 'pdo' ) ) {
			throw new Exception('php_pdo '.$message , 504 );
		}
		if ( !in_array( $driver,pdo_drivers ( ) ) ) {
			throw new Exception('php_pdo_'.$driver.' '.$message , 505 );
		}
		if( !is_array( $connectionInfo ) ) {
			throw new Exception('$connectionInfo 参数应为一维数组，请检查传入值。' , 506 );
		}
		switch ( $driver ) {
			case 'mysql':
				$dsn = 'mysql:host='.$connectionInfo[ 'host' ].';dbname='.$connectionInfo[ 'dbname' ].';port='.$port;
				if ( $charset ) { $charsetSql = "set names $charset"; }
				break;
			case 'oci':
				$dsn = "oci:dbname={$connectionInfo[ 'dbname' ]};charset=$charset";
				break;
			default:
				throw new Exception("数据库类不支持 $driver 数据库连接。" , 507 );
		}
		try {
			parent::__construct( $dsn , $connectionInfo[ 'user' ] , $connectionInfo[ 'pass' ] , $driverOptions );
			$this->_driver = $driver;
			if ( $charsetSql ) {
				//设置mysql结果集字符编码
				$this->exec( $charsetSql );
			}
		} catch ( PDOException $e ) {
			throw new Exception('Failed: '.$e->getMessage( ) , 503 );
		}
	}

	/**
	 * 获取单实例数据库连接
	 * @author 景云山
	 * @version 2008-8-15
	 * @param array $connectionInfo 服务器连接信息 
	 	参数格式 array(
						host => "localhost",   //数据库服务器IP或域名
						user => "test",      //用户帐号
						pass => "123",      //用户帐号密码
						dbname => "test"       //数据库名
					)
	 * @param int $port 数据库服务器端口号
	 * @param string $driver 数据库驱动名称 值为 'mysql' 或 'oci'
	 * @param string $charset mysql数据库链接层字符集
	 * @param array $driverOptions 数据库驱动特定的连接选项数组
	 * @return object 返回数据库连接实例
	 */
	
	static public function getConn ( $connectionInfo , $port = 3306 , $driver = 'mysql' , $charset = 'utf8' , $driverOptions = null ) {
		$conns = serialize($connectionInfo);
		if ( !isset( self::$_conn[$conns] ) ) {
			 self::$_conn[$conns] = new pdoDatabase( $connectionInfo , $port , $driver , $charset , $driverOptions );
		}
		return self::$_conn[$conns];
	}

	/**
	 * 防止数据库连接被克隆
	 * @return void 无返回值
	 */
	
	public function __clone( ) {
		throw new Exception('不可以clone.' , 503 );
	}
	
	/**
	 * 执行有返回结果集的SQL查询
	 * @author 景云山
	 * @version 2008-8-15
	 * @param string $sql select查询语句
	 * @param array $bindParam 绑定参数变量值数组  例：array(:test=>'test')
	 * @param int $mode 返回结果集的模式
	 * @return array 结果集数组
	 */
	
	public function search( $sql , $bindParam = null, $mode = 2 ) {
		try {
			$statement = $this->prepare( $sql );
			$flag = $statement->execute( $bindParam );
			if( $flag ) {
				$rowset = $statement->fetchall( $mode );
				if( !empty( $rowset ) )return $rowset;
				else return 0;
			} else {
				throw new Exception('执行查询SQL语句出错！' , 501 );
			}
		} catch ( Exception $e ){
			throw new Exception('执行查询SQL语句出错！Failed: '.$e->getMessage( ) , 5012 );
		}
	}
	
	/**
	 * 执行有返回结果集的SQL查询以字段
	 * @author 景云山
	 * @version 2010-07-02
	 * @param string $sql select查询语句
	 * @param array $bindParam 绑定参数变量值数组  例：array(:test=>'test')
	 * @param int $mode 返回结果集的模式
	 * @return array 结果集数组
	 */
	
	public function searchColumn( $sql , $bindParam = null, $mode = 0 ) {
		try {
			$statement = $this->prepare( $sql );
			$flag = $statement->execute( $bindParam );
			if( $flag ) {
				while ($cell = $statement->fetchColumn( $mode )) {
					$rowset[] = $cell;
				}
				if( !empty( $rowset ) )return $rowset;
				else return 0;
			} else {
				throw new Exception('执行查询SQL语句出错！' , 501 );
			}
		} catch ( Exception $e ){
			throw new Exception('执行查询SQL语句出错！Failed: '.$e->getMessage( ) , 5012 );
		}
	}
	
	/**
	 * 执行无返回结果集的SQL查询。
	 * @author 景云山
	 * @version 2008-8-15
	 * @param string $sql 非select SQL语句
	 * @param array $bindParam 绑定参数变量值数组  例：array(:test=>'test')
	 * @param bool $affect 是否返回被影响的行数
	 * @return int 返回执行SQL语句影响的行数
	 */
	
	public function execute( $sql , $bindParam = null , $affect = false ) {
		try {
			$statement = $this->prepare( $sql );
			$flag = $statement->execute( $bindParam );
			if( $flag ) {
				if( $affect ) return $statement->rowCount( );
				else return true;
			} else {
				throw new Exception('执行SQL语句出错！' , 502 );
			}
		} catch ( Exception $e ){
			throw new Exception('执行SQL语句出错！Failed: '.$e->getMessage( ) , 5022 );
		}
	}
	
	/**
	 * 调用事务处理SQL语句
	 * @author 景云山
	 * @version 2008-8-15
	 * @param array $sql 非select SQL语句数组
	 * @return bool
	 */
	
	public function transaction( $sql ) {
		try {
			if( !is_array( $sql ) ){
				throw new Exception('调用事务处理参数应是值为SQL语句的一维数组，请检查传入值。' , 510 );
			}
			$flag = true;
			$this->beginTransaction( );
			foreach ( $sql as $cell ) {
				$preparedStatement  = $this->prepare( $cell );
				if( !$preparedStatement->execute( ) ) {
					$flag = false;
					break;
				}
			}
			if ( $flag ) {
				$this->commit( );
			} else {
				$this->rollBack( );
			}
			return $flag;
		} catch ( Exception $e ){
			throw new Exception('调用事务处理执行SQL语句出错。Failed: '.$e->getMessage( ) , 511 );
		}
	}
	
	/**
	 * MySql中选择数据库方法 
	 * @author 景云山
	 * @version 2008-8-15
	 * @param string $basename 数据库名称
	 * @return void 无返回值  
	*/
	
	public function selectDatabase( $basename ) {
		try {
			switch ( $this->_driver ) {
				case 'mysql':
					$this->exec( "use $basename" );
					break;
				default:
					throw new Exception("数据库类不支持 $this->_driver 更改数据库。" , 508 );
			}
		} catch ( Exception $e ){
			throw new Exception('选择数据库出错！Failed: '.$e->getMessage( ) , 509 );
		}
	}
	
	/**
	 * 设定SQL语句提交模式
	 * @author 景云山
	 * @version 2008-8-15
	 * @param int $commitmode
	 * @return void 无返回值
	 */
	
	public function autocommit( $commitmode = 0 ) {
		$this->setAttribute( PDO::ATTR_AUTOCOMMIT , $commitmode );
	}
	
	/**
	 * 设置私有属性
	 * @param $attribute 访问属性名称
	 * @return 返回属性名称
	 */
	public function __set( $attribute , $value ){
		$this->{$attribute} = $value;
	}
	
	/**
	 * 访问私有属性
	 * @param $attribute 访问属性名称
	 * @return 返回属性名称
	 */
	public function __get( $attribute ){
		if(isset($this->{$attribute})){
			return $this->{$attribute};
		}else{
			return null;
		}
	}
	
	/**
	 * 判断属性是否被设置
	 * @return boolean
	 */
	public function __isset( $attribute ){
		return isset($this->{$attribute});
	}

	/**
	 * 释放属性内存
	 * @return boolean
	 */
	public function __unset( $attribute ){
		unset($this->{$attribute});
	}

	/**
	 * 对像引用错误调用方法
	 */
	public function __toString(){
		return '对像不能被直接输出';
	}

	/**
	 * 调用不存在的方法时
	 */
	public function __call( $function , $args ){
		print "你所调用的函数：$function(参数：".implode(',',$args);
		print ")不存在！<br>\n";
	}

	/**
	 * 序列化时私有属性值也被序列化
	 */
	/*public function __sleep(){
		$serializeTxt = array('pageSize','curr','currName','rows','pages','showPages','startRow','endRow','urlstr','url','Content','recont');
		return($serializeTxt);
	}*/
	
	/**
	 * 重新生成对象时调用
	 */
	/*public function __wakeup(){
		
	}*/
}
?>