<?php
/**
 * 生成数据列表类文件
 * To contact the author write to {@link jingyunshan@myce.net.cn}
 * @author 景云山
 */
/**
 * 引用数据集类文件
 *
 */
include 'paginaldataset.class.php';

class PaginalTable extends PaginalDataSet {

	//表格内容字符串
	private $table;

	//表格头部内容数组
	private $arrHeader;

	//表格标签选择(table,ul)
	private $tableTag;

	//表格样式
	private $tableClass;

	//表格行样式
	private $rowClass;
        //表格行序号开始值
	private $rowNumber = 0;
        
	//表格单元格样式
	private $cellClass;

	//每行是否带检查框
	private $checkBox = false;

	//是否显示删除按纽
	private $deleteBut = false;

	//是否显示编辑按纽
	private $editBut = false;

	//是否显示查看按纽
	private $detailBut = false;

	//自定义按纽数组
	private $customButtons;
		
	/**
	 * 生成表头
	 * 
	 * @return void
	 */
	private function tableHeader(){
		$this->table .= '<thead><'.$this->tableTag[1].'  class="'.$this->rowClass.'">';
		if($this->checkBox){
			$this->table .= '<'.$this->tableTag[3].' class="'.$this->cellClass.'"><input type="checkbox" class="_pageinalCheckBoxAll"></'.$this->tableTag[3].'>';
		}
		foreach($this->arrHeader as $cell){
                    if(is_array($cell)){
                        $this->table .= '<'.$this->tableTag[3].' class="'.$this->cellClass.'">'.call_user_func($cell[1],$cell[0]).'</'.$this->tableTag[3].'>';
                    }else{
			$this->table .= '<'.$this->tableTag[3].' class="'.$this->cellClass.'">'.$cell.'</'.$this->tableTag[3].'>';
                    }
		}
		$operatecol = count($this->customButtons);
		if($this->editBut){
			$operatecol += 1;
		}
		if($this->deleteBut){
			$operatecol += 1;
		}
		if($this->detailBut){
			$operatecol += 1;
		}
		if( $operatecol > 0 ) {
			$this->table .= '<'.$this->tableTag[3].' class="'.$this->cellClass.'" colspan="'.$operatecol.'">操作</'.$this->tableTag[3].'>';
		}
		$this->table .= '</'.$this->tableTag[1].'></thead><tbody>';
		unset($cell,$operatecol);
	}

	/**
	 * 生成表头
	 * 
	 * @param integer $primaryId 记录ID
	 * @return void
	 */
	private function createCheckBox($primaryId){
		return '<span><input type="checkbox" class="_pageinalCheckBox" value="'.$primaryId.'"> </span>';
		unset($primaryId);
	}

	/**
	 * 生成编辑按纽
	 * 
	 * @param integer $primaryId 记录ID
	 * @return void
	 */
	private function createEditButton($primaryId){
		$this->table .= '<'.$this->tableTag[2].' class="'.$this->cellClass.'"><a class="_pageinalEditButton" href="javascript:void(1)" xls="'.$primaryId.'" target="_self">编辑</a></'.$this->tableTag[2].'>';
		unset($primaryId);
	}

	/**
	 * 生成查看按纽
	 * 
	 * @param integer $primaryId 记录ID
	 * @return void
	 */
	private function createDetailButton($primaryId){
		$this->table .= '<'.$this->tableTag[2].' class="'.$this->cellClass.'"><a class="_pageinalDetailButton" href="javascript:void(1)" xls="'.$primaryId.'" target="_self">查看</a></'.$this->tableTag[2].'>';
		unset($primaryId);
	}

	/**
	 * 生成删除按纽
	 * 
	 * @param integer $primaryId 记录ID
	 * @return void
	 */
	private function createDeleteButton($primaryId){
		$this->table .= '<'.$this->tableTag[2].' class="'.$this->cellClass.'"><a class="_pageinalDeleteButton" href="javascript:void(1)" xls="'.$primaryId.'" target="_self">删除</a></'.$this->tableTag[2].'>';
		unset($primaryId);
	}

	/**
	 * 生成自定义按纽
	 * 
	 * @param integer $primaryId 记录ID
	 * @return void
	 */
	private function createCustomButton( $primaryId , $row ){
		$i = 0;
		foreach( $this->customButtons as $value ){
			$i++;
			if(is_array($value)){
				$customFunction = current($value);
				$customValue = $row[key($value)];
				if(!empty($customFunction)){
					$this->table .= '<'.$this->tableTag[2].' class="'.$this->cellClass.'"><a class="_pageinalCustomButton'.$i.'" href="javascript:void(1)" xls="'.$primaryId.'&customValue='.$customValue.'" target="_self">'.call_user_func($customFunction,$customValue).'</a></'.$this->tableTag[2].'>';
				}else{
					$this->table .= '<'.$this->tableTag[2].' class="'.$this->cellClass.'"><a class="_pageinalCustomButton'.$i.'" href="javascript:void(1)" xls="'.$primaryId.'" target="_self">'.$customFunction.'</a></'.$this->tableTag[2].'>';
				}
			}else{
				$this->table .= '<'.$this->tableTag[2].' class="'.$this->cellClass.'"><a class="_pageinalCustomButton'.$i.'" href="javascript:void(1)" xls="'.$primaryId.'" target="_self">'.$value.'</a></'.$this->tableTag[2].'>';
			}
		}
		unset($i,$value,$primaryId);
	}

	/**
	 * 生成表格内容
	 * 
	 * @param array $arrData 数据数组
	 * @param array $showFields 需要显示的字段数组
		参数示例：
			$showFields = array(  id , name , type )
	 * @param array $arrFunction 对相应字段处理的回调函数数组
		参数示例：
			$arrFunction = array('name'=>'createName','type'=>'createType');
		回调函数示例：
			function createName( $value ){ }
	 * @return void
	 */
    public function createTable($arrData, $showFields = null, $arrFunction = null, $multFields = null) {
        $this->table = '<' . $this->tableTag[0] . ' id="_paginalDataContainer" class="table">';
        if (isset($this->arrHeader)) {
            $this->tableHeader();
        }
        if (is_array($arrData)) {
            //解析数据集
            $i = $this->rowNumber;
            foreach ($arrData as $row) {
                $i++;
                Core::$object->number = $i;
			//if($i%2 === 0){
			//		$this->table .= '<' . $this->tableTag[1] . ' class="' . $this->rowClass . '" style="background:#edf2fc;">';
			//	}else{
					$this->table .= '<' . $this->tableTag[1] . ' class="' . $this->rowClass . '">';
			//	}                
		$first = true;
                //获取单元格数据
                if ($showFields) {
                    //解析行数据
                    foreach ($showFields as $k) {
                        if ($this->checkBox && $first) {
                            $this->createCheckBox($row[$k]);
                        }
                        if ($first) {
                            $firstvalue = $row[$k];
                            $first = false;
                        }
                            if (array_key_exists($k, $multFields)) {
                                foreach ($multFields[$k] as $fields) {
                                    $cells[] = $row[$fields];
                                }
                                $this->createCell($arrFunction, $k, $cells);
                                unset($cells);
                            } else {
                                $this->createCell($arrFunction, $k,$row[$k]);
                            }
                    }
                } else {
                    //解析行数据
                    foreach ($row as $k => $cell) {
                        if ($this->checkBox && $first) {
                            $this->createCheckBox($cell);
                        }
                        if ($first) {
                            $firstvalue = $cell;
                            $first = false;
                        }
                        $this->createCell($arrFunction, $k, $cell);
                    }
                }
                if ($this->editBut) {
                    $this->createEditButton($firstvalue);
                }
                if ($this->detailBut) {
                    $this->createDetailButton($firstvalue);
                }

                if ($this->deleteBut) {
                    $this->createDeleteButton($firstvalue);
                }

                if ($this->customButtons) {
                    $this->createCustomButton($firstvalue, $row);
                }
                //显示行数据
                $this->table .= '</' . $this->tableTag[1] . '>';
            }
        }
        $this->table .= '</tbody></' . $this->tableTag[0] . '>';
        unset($arrData, $showFields, $arrFunction, $row, $first, $k, $cell, $firstvalue);
        return $this->table;
    }

	/**
	 * 生成单元格内容
	 * 
	 * @param string $k 字段名
	 * @param mixed  $cell 字段值
	 * @param array $arrFunction 对相应字段处理的回调函数数组
		参数示例：
			$arrFunction = array('name'=>'createName','type'=>'createType');
		回调函数示例：
			function createName( $value ){ }
	 * @return void
	 */
	private function createCell( $arrFunction , $k , $cell ){
		if( $arrFunction ){
			if($arrFunction[$k]){
				$this->table .= '<'.$this->tableTag[2].' class="'.$this->cellClass.'">'.call_user_func($arrFunction[$k],$cell).'</'.$this->tableTag[2].'>';
			}else{
				$this->table .= '<'.$this->tableTag[2].' class="'.$this->cellClass.'">'.$cell.'</'.$this->tableTag[2].'>';
			}
		}else{
			$this->table .= '<'.$this->tableTag[2].' class="'.$this->cellClass.'">'.$cell.'</'.$this->tableTag[2].'>';
		}
		unset($arrFunction,$k,$cell);
	}

	/**
	 * 设置表头内容
	 * 
	 * @param array $header 表头内容数组
	 * @return void
	 */
	public function setHeader($header){
		if(is_array($header)){
			$this->arrHeader = $header;
		}else{
			unset($header);
			exit('表头参数应为数组。');
		}
		unset($header);
	}

	/**
	 * 设置表格标签
	 * 
	 * @param bool $isTable 是否使用table标签，否则使用ul标签
	 * @return void
	 */
	public function setTableTag($isTable = true){
		if($isTable){
			$this->tableTag = array('table','tr','td','th');
		}else{
			$this->tableTag = array('ul','li','span','li');
		}
		unset($isTable);
	}

	/**
	 * 设置表格样式
	 * 
	 * @param string $class 样式名称
	 * @return void
	 */
	public function setTableClass($class = ''){
		$this->tableClass = $class;
		unset($class);
	}

	/**
	 * 设置表格行样式
	 * 
	 * @param string $class 样式名称
	 * @return void
	 */
	public function setRowClass($class = ''){
		$this->rowClass = $class;
		unset($class);
	}

	/**
	 * 设置表格单元格样式
	 * 
	 * @param string $class 样式名称
	 * @return void
	 */
	public function setCellClass($class = ''){
		$this->cellClass = $class;
		unset($class);
	}

	/**
	 * 设置选择框
	 * 
	 * @return void
	 */
	public function setCheckBox(){
		$this->checkBox = true;
	}

	/**
	 * 设置删除按纽
	 * 
	 * @return void
	 */
	public function setDeleteButton(){
		$this->deleteBut = true;
	}

	/**
	 * 设置编辑按纽
	 * 
	 * @return void
	 */
	public function setEditButton(){
		$this->editBut = true;
	}

	/**
	 * 设置查看按纽
	 * 
	 * @return void
	 */
	public function setDetailButton(){
		$this->detailBut = true;
	}
        /**
	 * 设置查看按纽
	 * 
	 * @return void
	 */
	public function setRowNumber($value){
		$this->rowNumber = intval($value);
	}

	/**
	 * 设置临时按纽
	 * 
	 * @return void
	 */
	public function setCustomButton($buttons){
		$this->customButtons = $buttons;
		unset($buttons);
	}

	/**
	 * 析构函数
	 * 
	 * @return void
	 */
	function __destruct(){	unset($this->table,$this->arrHeader,$this->tableTag,$this->tableClass,$this->rowClass,$this->cellClass,$this->checkBox,$this->deleteBut,$this->editBut,$this->detailBut,$this->customButtons);
	}
}
?>
