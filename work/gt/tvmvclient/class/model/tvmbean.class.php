<?php
/**
 * Bean 文件(TVM-ENCODER系统)
 * To contact the author write to {@link jingyunshan@tvmining.com}
 * @author 景云山
 */

class Bean {
	
   const TABLE = NULL;       //string 数据库表名
   const PRIMARY_KEY = 'id'; //string 数据库主键名
   private $class = null;
   private $data = null;   //当前数据
   private $data_ed = null;//修改数据
   public static $desc = null;
		
	public function __construct($pk=NULL){
		$my = $this->class = self::get_class_name();
		if($pk){
			$this->data_ed[$my::PRIMARY_KEY] = $pk;
			$sql = "select * from ".$my::TABLE." where ".$my::PRIMARY_KEY." = '" .$pk."'";
			$data = Core::$_mdb->search($sql);
			$this->data = $data[0];
		}elseif(!$my::$desc){
			$sql = "DESC ".$my::TABLE;
			$my::$desc = Core::$_mdb->search($sql);
			if($my::$desc){
				foreach ($my::$desc as $row){
					$this->data[$row['Field']] = $row['Default'];
				}
			}
			$this->data[$my::PRIMARY_KEY] = NULL ;
		}else{
			foreach ($my::$desc as $row){
					$this->data[$row['Field']] = $row['Default'];
			}
			$this->data[$my::PRIMARY_KEY] = NULL ;
		}
		
	}
	
	/**
	 * 获取一条记录
	 * $pk 主键ID
	 * */
	public static function i($pk){
		$my = self::get_class_name();
		return new $my($pk);
	}
	
	/**
     *  返回当前类名
    * @return 类名
     */
   public static function get_class_name()
    {
        return get_called_class(); //获取静态方法调用的类名
    }
	
   public function __get($field){
    	if(array_key_exists($field,$this->data_ed)){
    		return $this->data_ed[$field];
    	}elseif(array_key_exists($field,$this->data)){
    		return $this->data[$field];
    	}else{
    		return '';
    	}
    }
    
   public function __set($field,$value){
    	$this->data_ed[$field] = $value;
    }
    
    /**
     * 获取修改的数据
     * 
     * */
   private function get_edit(){
		$u = null;
		foreach ($this->data as $k=>$v){
			if($this->data_ed[$k] != $v && ($this->data_ed[$k] || isset($this->data_ed[$k]))){
				$u[$k] = $this->data_ed[$k];
			}
		}
   	return $u;
    }
    
    public static function getOne( $where , $value ,$sort=''){
    	$rtn = self::getList($where, $value,$sort,1,true);
		return $rtn;
	}
    
	public static function getList( $where , $value=null , $sort='' ,$limit=0 , $single=false,$gorup='' ){
    	$my = self::get_class_name();
    	if($limit>0){
            $_limit = " limit $limit";
    	}
    	if($where){
            $_where = " where ".$where;
    	}
	if($sort){
            $_sort = " order by ".$sort;
    	}
        if($gorup){
            $_gorup = " group by ".$gorup;
    	}
	$sql = "select * from ".$my::TABLE.$_where.$_gorup.$_sort.$_limit;
    	if(is_array($value)){
    		$val = $value;
    	}else{
    		$val = array($value);
    	}
    	$rtn = array();
    	$result = Core::$_mdb->search( $sql , $val);
    	if($result){
    		$m = new $my();
    		if($single){
    			$r = clone $m;
    			foreach($result[0] as $k=>$v){
    				$r->data[$k] = $v;
    			}
    			$rtn = $r;
    			unset($r,$k,$v);
    		}else{
				foreach ($result as $row){
					$r = clone $m;
					foreach($row as $k=>$v){
						$r->data[$k] = $v;
					}
					$rtn[] = $r;
					unset($r,$k,$v);
				}
			}
			unset($m,$result);
		}
		unset($my,$sql,$value,$where,$val);
		return $rtn?$rtn:0;
	}
	
        public static function getPage($where, $value, $sort = '', $limit = 10,$toFirstPage=false,$gfields='',$group='',$having='') {
        if ($where) {
            $_where = " where " . $where;
        }
        
        if (is_array($value)) {
            $val = $value;
        } else {
            $val = array($value);
        }

        $my = self::get_class_name();
        $sql = "select count(*) as total from " . $my::TABLE . $_where;
        $dataSet = Core::$_mdb->search($sql, $val);
        $total = $dataSet[0]['total'];
		$pages = ( int )( ( $total - 1 ) / ( $limit ) + 1 );
		if( $pages < 1 ) $pages = 1;
                $currPage = intval(Core::get('page'));
		if( !isset( $currPage ) || $currPage == "" || $currPage < 1 ) {
			$curr = 1;
		} elseif ( $currPage > $pages ) {
			if( $toFirstPage ) {
				$curr = 1;
			} else {
				$curr = $pages;
			}
		} else {
			$curr = ( int )$currPage;
		}
        if($group){
            $_group = ' group by '.$group;
        }
        if($having){
            $_having = ' HAVING '.$having;
        }
        if ($sort) {
            $_sort = " order by " . $sort;
        }
        if ($limit > 0) {
            if ($curr > 1) {
                $rowright = ( $curr - 1 ) * $limit;
                $leftlimit = "$rowright,";
            }
            $_limit = " limit $leftlimit $limit";
        }
        
        $sql = "select * $gfields from " . $my::TABLE . $_where .$_group .$_having . $_sort . $_limit;
        $result = Core::$_mdb->search($sql, $val);

        return array('total' => $total, 'list' => $result ,'curr'=>$curr);
    }
    
     /**
     * 更新数据
     * 
     * */
   protected function update($insert=FALSE){
    	$u = $this->get_edit();
    	if($u){
    		$fields = '';
    		$value = '';
    		foreach ($u as $k=>$v) {
    			if($insert){
    				$fields .= "$k,";
    				$value .="?,";
    			}else{
    				$fields .= "$k = ?,";
    			}
    			$param[] = $v;
    		}
    		 
    		$my = $this->class;
    		if($insert){
    			$sql = "insert ".$my::TABLE." (".rtrim($fields,',').") values(".rtrim($value,',').")";
    		}else{
    			$sql = "update ".$my::TABLE." set ".rtrim($fields,',')." where ".$my::PRIMARY_KEY."='".$this->data[$my::PRIMARY_KEY]."'";
    		}
    		unset($fields,$value,$my);
    		if(Core::$_mdb->execute($sql,$param)){
    			foreach ($u as $k=>$v) {
    				$this->data[$k]=$v;
    			}
    			unset($sql,$u,$k,$v);
    			if($insert){
    				return Core::$_mdb->lastInsertId();
    			}else{
    				return true;
    			}
    		}else{
    			return false;
    		}
    	}else{
    		return true;
    	}
   }
    
    
    /**
     * 保存数据
     * 
     **/
   public function save(){
    	$my = $this->class;
  		if($this->data[$my::PRIMARY_KEY]){
  			return $this->update();
  		}else{
  			return $this->update(true);
  		}
   }
   
/**
     * 删除数据
     * 
     **/
   public function del($where=''){
    	$my = $this->class;
        
  		if($this->data[$my::PRIMARY_KEY]){
                    if($where){
                        $sql = "delete from ".$my::TABLE." where $where";
                    }else{
  			$sql = "delete from ".$my::TABLE." where ".$my::PRIMARY_KEY."='".$this->data[$my::PRIMARY_KEY]."'";
                    }
  			if(Core::$_mdb->execute($sql)){
  				return true;
  			}else{
  				return false;
  			}
  		}else{
  			return false;
  		}
   }
   
	/**
	 * 析构函数
	 * 
	 * @return void
	 */
	public function __destruct(){
		unset( $this->sqlArrs );
	}
}
