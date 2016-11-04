<?php
/**
 * 获取数据集类文件
 * To contact the author write to {@link jingyunshan@myce.net.cn}
 * @author 景云山
 */
class PaginalDataSet {
	public $dataTotal;
	
	public function getDataSet( $sql , $curr = 1 , $pageSize = 10 , $param = null ) {
		$rowright = ( $curr - 1 ) * $pageSize;
		$sql = "$sql limit $rowright,$pageSize";
		$dataSet = Core::$_mdb->search( $sql , $param );
		return $dataSet;
	}
	
	public function getDataTotal( $sql , $param = null ){
		$dataSet = Core::$_mdb->search( $sql , $param );
		$this->dataTotal = $dataSet[0]['total'];
	}
}
?>