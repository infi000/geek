<?php
/**
 * 分页类文件
 * 普通的GET方式分页：showGet( $tempPath = '' , $url = '' )
 * To contact the author write to {@link jingyunshan@ceopen.cn}
 * @author 景云山
 */

class Pagination {
	private $pageSize;		//每页显示条数
	private $curr;			//当前页数
	private $currName;	    //当前页数参数名称
	private $rows;			//记录总数
	private $pages;			//总页数
	private $showPages;		//显示页码数
	private $startRow;		//当前页开始记录号
	private $endRow;		//当前页结束记录号
	private $urlstr;        //添加参数后的URL地址
	private $url;			//url字符串
	private $Content;		//模板内容数组
	private $recont;		//页码内容
	
	/**
	* 构造函数
	* @param $recordTotal         int       记录总数
	* @param $rowNumberPrePage    int       每页的记录数
	* @param $pageNumberTotal     int       显示数字页码的总数
	* @param $currPage            int       当前页
	* @param $currPageVarName     string    表示当前页的变量名称
	* @param $toFirstPage         bool      当前页大于总页数时，是否显示第一页:true显示,false不显示，默认显示最后一页
	*/
	public function __construct( $recordTotal , $rowNumberPrePage , $pageNumberTotal , $currPage ,
		$currPageVarName , $toFirstPage = false ) {
		if( $currPageVarName ){
			$this->currName = $currPageVarName;
		} else {
			unset($recordTotal,$rowNumberPrePage,$pageNumberTotal,$currPage,$currPageVarName,$toFirstPage);
			exit( '请设置当前页参数名称！');
		}
		$this->pageSize = intval( $rowNumberPrePage );
		if( $this->pageSize == 0 ) $this->pageSize = 10;
		$this->showPages = intval( $pageNumberTotal );
		$this->rows = intval( $recordTotal );
		$this->pages = ( int )( ( $this->rows - 1 ) / ( $this->pageSize ) + 1 );
		if( $this->pages < 1 ) $this->pages = 1;
		if( !isset( $currPage ) || $currPage == "" || $currPage < 1 ) {
			$this->curr = 1;
		} elseif ( $currPage > $this->pages ) {
			if( $toFirstPage ) {
				$this->curr = 1;
			} else {
				$this->curr = $this->pages;
			}
		} else {
			$this->curr = ( int )$currPage;
		}
		//当前页开始记录号
		$this->startRow = ( $this->curr - 1 ) * $this->pageSize + 1;
		//当前页结束记录号
		$this->endRow = $this->curr * $this->pageSize;
		if( $this->endRow >= $this->rows ) {
			$this->endRow = $this->rows;
		}
		if( $this->startRow > $this->endRow ) {
			$this->startRow = $this->endRow;
		}
		unset($recordTotal,$rowNumberPrePage,$pageNumberTotal,$currPage,$currPageVarName,$toFirstPage);
	}
	
	/**
	 * 析构函数
	 */
	public function __destruct( ) {
		unset( $this->pageSize,$this->curr,$this->currName,$this->rows,$this->pages,$this->showPages,$this->startRow
			,$this->endRow,$this->urlstr,$this->url,$this->Content,$this->recont );
	}
	
	/**
	* 把参数添加到URL地址中
	* @param  $url 要执行的相对路径地址		如："../include/test.php"
	* @param  $param 需要添加的参数			如："id=12&name=user"
	* @param  $firstParamName 需要添加参数的第一个参数名称	如："id"
	* @return  string 返回添加参数后的URL地址
	*/
	private function urlAddParam( $url , $param , $firstParamName ) {
		//判断参数第一个字符是否带有字符 &
		$pos	=	strpos( $param , '&' );
		//如果带有字符 & ，去掉字符 &
		if( $pos === 0 ) $param	=	substr( $param , 1 );
		//获取URL地址中的GET参数字符串
		$getstr = strrchr( $_SERVER[ 'REQUEST_URI' ] , '?' );
		//判断参数字符串中是否含有要添加的参数
		if( strpos( '|' . $getstr , $firstParamName ) > 0 ) {
			//如果有去掉要添加的参数字符串
			$getstr=substr( $getstr , 0 , strpos( '|' . $getstr , $firstParamName ) - 2 );
		}
		if( $url == '' ) $this->urlstr = '?' . $param;
		elseif( $getstr == '' ) $this->urlstr = $url . '?' . $param;
		else $this->urlstr = $url . $getstr . '&' . $param;
		unset($url,$param,$firstParamName,$pos,$getstr,$getstr);
		return $this->urlstr;
	}
		
	/**
	* 获取页码链接的URL参数
	* @param  $tempPath	模板地址
	* @param  $url	    链接地址 默认为当前页地址
	* @return  String   url字符串
	*/
	private function getUrl( $tempPath = '' , $url = '' ) {
		if( !file_exists( $tempPath ) )exit( '页码模板文件不存在！' );
		if( $url == '' ){ 
			$this->url = $_SERVER[ 'REQUEST_URI' ]; 
		} else {
			$this->url = $url;
		}
		$parse_url = parse_url( $this->url );
		$url_query = isset( $parse_url[ 'query' ] ) ? $parse_url[ 'query' ] : null; //单独取出URL的查询字串
		if( $url_query ) {
			//因为URL中可能包含了页码信息，我们要把它去掉，以便加入新的页码信息。
			$page = isset( $this->curr ) ? $this->curr : '';
			$url_query = ereg_replace( '(^|&)' . $this->currName ."=$page" , '' , $url_query );
			$url_query = ereg_replace( '(^|&)' . $this->currName .'=' , '' , $url_query );
			//将处理后的URL的查询字串替换原来的URL的查询字串：
			$this->url = str_replace( $parse_url[ 'query' ] , $url_query , $this->url );
			if( $url_query ) $this->url .= '&' . $this->currName; 
			else $this->url .= $this->currName;
		} else {
			$this->url .= '?' . $this->currName;
		}
		unset($url,$tempPath,$parse_url,$url_query,$page);
		return $this->url;
	}

	/**
	* 获取模板文件内容
	* @param  $tempPath	模板地址
	* @return  array    模板内容数组
	*/
	private function getTemplateContent( $tempPath = '' ) {
		$handle = fopen( $tempPath , 'r' );
		while( !feof( $handle ) ){
			$this->Content[] =  preg_replace( "'<!--[^>]+>'" , '' , fgets( $handle ) );
		}
		fclose( $handle );
		unset( $handle,$tempPath );
		return $this->Content;
	}

	/**
	* 获取最终完成的页码字符串
	* @param  $Content  模板内容数组 
	* @param  $url      页码链接的URL
	* @return string    完成的页码字符串
	*/
	private function getResult( $Content , $url ) {
		for( $i = 6 ; $i < count( $Content ) ; $i++ ) {
			$this->recont .= $Content[ $i ];
		}
		$TotalVar = array( '{PAGER_ROWTOTAL}' , '{PAGER_PAGETOTAL}' , '{PAGER_STARTROW}' , '{PAGER_ENDROW}' , 
		'{PAGER_FIRSTURL}' , '{PAGER_PREVIOUSURL}' , '{PAGER_NEXTURL}' , '{PAGER_LASTURL}' , '{PAGER_JUMPLINK}' , '{PAGER_CURRPAGE}' );
		$TotalRep = array( $this->rows , $this->pages , $this->startRow , $this->endRow ,
			$url . '=1' , $url . '=' . ( $this->curr - 1 ) , $url . '=' . ( $this->curr + 1 ) ,
			$url . '=' . $this->pages , $url , $this->curr );
		$this->recont = str_replace( $TotalVar , $TotalRep , $this->recont );
		unset($Content,$url,$i,$TotalVar,$TotalRep);
	}

	/**
	* GET方式分页显示函数
	* @param  $tempPath	模板地址
	* @param  $url	    链接地址 默认为当前页地址
	* @return string	页码字符串
	*/
	public function showGet( $tempPath = '' , $url = '' ) {
		//获取页码链接的URL
		$url = $this->getUrl( $tempPath , $url );
		$Reg = '|{[^}]+}(.*){/[^}]+}|U';
		//获取模板文件内容
		$Content = $this->getTemplateContent( $tempPath );
		preg_match( $Reg , $Content[ 0 ] , $CurrPage );
		preg_match( $Reg , $Content[ 1 ] , $PageLink );
		$this->recont .= $Content[ 2 ];
		//生成首页下一页内容
		if( $this->curr > 1 ) {
			$this->recont.= $Content[ 3 ];
		}
		//获取数字页码范围
		if ( $this->curr >= 1 && $this->curr <= ceil( $this->showPages / 2 ) ){
			$showMinPage = 1;
			$showMaxPage = ( $this->pages < $this->showPages) ? $this->pages : $this->showPages;
		} elseif ( $this->curr > ceil( $this->showPages / 2 ) &&
			$this->curr < $this->pages - floor( $this->showPages / 2 ) ) {
			$showMinPage = $this->curr - ceil( ( $this->showPages - 1 ) / 2 );
			$showMaxPage = $this->curr + floor( ( $this->showPages - 1 ) / 2 );
		} elseif ( $this->curr >= $this->pages - floor( $this->showPages / 2 ) &&
			$this->curr <= $this->pages ) {
			$showMinPage = ( $this->pages < $this->showPages ) ? 1 : ( $this->pages - $this->showPages + 1 );
			$showMaxPage = $this->pages;
		}
		//生成数字页码
		if ( $this->pages > 0 && $PageLink[ 1 ] ) {
			for( $i = $showMinPage ; $i <= $showMaxPage ; $i++ ) {
				if ( $i == $this->curr ) $this->recont .= str_replace( '{PAGER_NUMBER}' , $i , $CurrPage[ 1 ] );
				else $this->recont .= str_replace( array( '{PAGER_LINK}' , '{PAGER_NUMBER}' ) , 
					array( $url . '=' .$i , $i ) , $PageLink[ 1 ] );
			}
		}
		//生成最后一页和上一页内容
		if( $this->curr < $this->pages ) {
			$this->recont .= $Content[ 4 ];
		}
		//生成其它内容
		$this->recont .= $Content[ 5 ];
		//获取最后生成的页码字符串
		$this->getResult( $Content , $url );
		unset($Content,$url,$tempPath,$Reg,$CurrPage,$PageLink,$showMinPage,$showMaxPage,$i);
		return $this->recont;
	}

	/**
	 * 设置私有属性
	 * @param $attribute 访问属性名称
	 * @return 返回属性名称
	 */
	private function __set( $attribute , $value ){
		$this->attribute = $value;
	}
	
	/**
	 * 访问私有属性
	 * @param $attribute 访问属性名称
	 * @return 返回属性名称
	 */
	private function __get( $attribute ){
		if(isset($this->attribute)){
			return $this->attribute;
		}else{
			return null;
		}
	}
	
	/**
	 * 判断属性是否被设置
	 * @return boolean
	 */
	private function __isset( $attribute ){
		return isset($this->attribute);
	}

	/**
	 * 释放属性内存
	 * @return boolean
	 */
	private function __unset( $attribute ){
		unset($this->attribute);
	}

	/**
	 * 对像引用错误调用方法
	 */
	private function __toString(){
		return '对像不能被直接输出';
	}

	/**
	 * 克隆时调用 
	 */
	public function __clone(){
	
	}

	/**
	 * 调用不存在的方法时
	 */
	private function __call( $function , $args ){
		if($function == 'get'){
			$this->showGet( $args[0] , $args[1] );
		}else{
			print '请调用方法get()或post()显示页码';
		}
	}

	/**
	 * 序列化时私有属性值也被序列化
	 */
	public function __sleep(){
		$serializeTxt = array('pageSize','curr','currName','rows','pages','showPages','startRow','endRow','urlstr','url','Content','recont');
		return($serializeTxt);
	}
	
	/**
	 * 重新生成对象时调用
	 */
	public function __wakeup(){
		
	}
}
?>