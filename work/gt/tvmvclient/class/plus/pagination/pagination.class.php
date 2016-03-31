<?php
/**
 * 分页类文件
 * 分页类提供六个显示页码的方法：
			普通的GET方式分页：showGet( $tempPath = '' , $url = '' )
			普通的POST方式分页：showPost( $tempPath = '' , $formName = '' )
			带省略号的GET方式分页：showSuspendPointsGet( $tempPath = '' , $url = '' )
			带省略号的POST方式分页：showSuspendPointsPost( $tempPath = '' , $formName = '' )
			页面无刷新的分页：showUnrefresh( $tempPath = '' , $objectName )
			无刷新的带省略号分页显示函数 showUnrefreshSuspendPoints( $tempPath = '' , $objectName )
 * To contact the author write to {@link jingyunshan@myce.net.cn}
 * @author 景云山
 */

/**
 * 引用生成表格类文件
 *
 */
include 'paginaltable.class.php';

class Pagination extends PaginalTable{
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
	 * 对像静态变量
	 *
	 * @var object
	 */
	static private $_class;
	
	public function __get( $var ){
		if(isset($this->$var)){
			return $this->$var;
		}
	}

	public function __set( $var , $val ){
		if(isset($this->$var)){
			$this->$var = $val;
		}
	}

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
	
	private function __construct(){
		setcookie("PaginalReturn",
		'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].($_SERVER['QUERY_STRING']?'?'.$_SERVER['QUERY_STRING']:''));
	}
	/**
	* @Description pageInit( $tempPath = '' , $recordNumberPrePage , $numberPageTotal , $currPage ,
		$toFirstPage = false )
	* @param  $tempPath	模板地址
	* @param $recordNumberPrePage int       每页的记录数
	* @param $numberPageTotal     int       显示数字页码的总数
	* @param $currPage            int       当前页
	* @param $currPageName        string    当前页参数名称
	* @param $toFirstPage         bool      当前页大于总页数时，是否显示第一页标志，默认显示最后一页:true,false
	*/
	public function pagerInit( $tempPath = '' , $recordNumberPrePage , $numberPageTotal , $currPage ,
		$currPageName , $toFirstPage = false ) {
		if( !file_exists( $tempPath ) )exit( '页码模板文件不存在！' );
		if( $currPageName ){
			$this->currName = $currPageName;
		} else {
			unset($recordNumberPrePage,$numberPageTotal,$currPage,$currPageName,$toFirstPage);
			exit( '请设置当前页参数名称！');
		}
		$this->pageSize = intval( $recordNumberPrePage );
		if( $this->pageSize == 0 ) $this->pageSize = 10;
		$this->showPages = intval( $numberPageTotal );
		$this->rows = intval( $this->dataTotal );
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
		$this->getTemplateContent( $tempPath );
		unset($recordNumberPrePage,$numberPageTotal,$currPage,$currPageName,$toFirstPage);
	}
	
	//析构函数
	public function __destruct( ) {
		unset( $this->pageSize,$this->curr,$this->currName,$this->rows,$this->pages,$this->showPages,$this->startRow
			,$this->endRow,$this->urlstr,$this->url,$this->Content,$this->recont );
	}
	
	/**
	*@Description   获取总页数 getTotalPage()
	*@return int    总页数
	*/
	public function getTotalPage( ) {
            return $this->pages;
	}

	/**
	*@Description   获取当前页码 getCurrentPage()
	*@return int    当前页码
	*/
	public function getCurrentPage( ) {
            return $this->curr;
	}

	/**
	*@Description :urlAddParam($url,$param,$firstParamName) 把参数添加到URL地址中
	*@param  $url 要执行的相对路径地址		如："../include/test.php"
	*@param  $param 需要添加的参数			如："id=12&name=user"
	*@param  $firstParamName 需要添加参数的第一个参数名称	如："id"
	*@return  string 返回添加参数后的URL地址
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
	private function getUrl( $url = '' ) {
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
		unset($url,$parse_url,$url_query,$page);
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
		//return $this->Content;
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
	* GET方式分页显示函数 showGet( $tempPath = '' , $url = '' )
	* @param  $tempPath	模板地址
	* @param  $url	    链接地址 默认为当前页地址
	* @param  $superfluous 每个数字页码后的代码
	* return string		页码字符串
	*/
	public function showGet(  $url = '' , $superfluous = '' ) {
		//获取页码链接的URL
		$url = $this->getUrl( $url );
		$Reg = '|{[^}]+}(.*){/[^}]+}|U';
		//获取模板文件内容
		$Content =  $this->Content;
		preg_match( $Reg , $Content[ 0 ] , $CurrPage );
		preg_match( $Reg , $Content[ 1 ] , $PageLink );
		$this->recont .= $Content[ 2 ];
		//生成首页下一页内容
		if( $this->curr > 1 ) {
			$this->recont.= $Content[ 3 ];
		}else{
			$this->recont .= str_replace( array( '{PAGER_FIRSTURL}' , '{PAGER_PREVIOUSURL}' ) , 'javascript:void(0)' , $Content[ 3 ] );
		}
		$this->recont = rtrim( $this->recont , chr(13).chr(10));
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
			$pos = strrpos( $this->recont , $superfluous );
			$this->recont = substr($this->recont,0,$pos);
		}
		//生成最后一页和上一页内容
		if( $this->curr < $this->pages ) {
			$this->recont .= $Content[ 4 ];
		}else{
			$this->recont .= str_replace( array( '{PAGER_NEXTURL}' , '{PAGER_LASTURL}' ) , 'javascript:void(0)' , $Content[ 4 ] );
		}
		$this->recont = rtrim( $this->recont , chr(13).chr(10));
		//生成其它内容
		$this->recont .= $Content[ 5 ];
		//获取最后生成的页码字符串
		$this->getResult( $Content , $url );
		unset($Content,$url,$Reg,$CurrPage,$PageLink,$showMinPage,$showMaxPage,$i);
		return $this->recont;
	}

	/**
	* POST方式分页显示函数 showPost( $formName )
	* @param  $formName  提交表单名称
	* @param  $tempPath	模板地址
	* return string		页码字符串
	*/
	public function showPost( $formName = '' ) {
		if( !$formName ) {
			exit( '请设置表单名称！' );
		}
		$url = $this->getUrl( );
		$Reg = '|{[^}]+}(.*){/[^}]+}|U';
		$Content = $this->Content;
		preg_match( $Reg , $Content[ 0 ] , $CurrPage );
		preg_match( $Reg , $Content[ 1 ] , $PageLink );
		$this->recont .= $Content[ 2 ];
		if( $this->curr > 1 ) {
			$this->recont.= $Content[ 3 ];
		}
		if ( $this->curr >= 1 && $this->curr <= ceil( $this->showPages / 2 ) ){
			$showMinPage = 1;
			$showMaxPage = ( $this->pages < $this->showPages) ? $this->pages : $this->showPages;
		} elseif ( $this->curr > ceil( $this->showPages / 2 ) && $this->curr < $this->pages - floor( $this->showPages / 2 ) ) {
			$showMinPage = $this->curr - ceil( ( $this->showPages - 1 ) / 2 );
			$showMaxPage = $this->curr + floor( ( $this->showPages - 1 ) / 2 );
		} elseif ( $this->curr >= $this->pages - floor( $this->showPages / 2 ) && $this->curr <= $this->pages ){
			$showMinPage = ( $this->pages < $this->showPages ) ? 1 : ( $this->pages - $this->showPages + 1 );
			$showMaxPage = $this->pages;
		}
		if ( $this->pages > 0 && $PageLink[ 1 ] ) {
			for( $i = $showMinPage ; $i <= $showMaxPage ; $i++ ) {
				if ( $i == $this->curr ) $this->recont .= str_replace( '{PAGER_NUMBER}' , $i , $CurrPage[ 1 ] );
				else $this->recont .= str_replace( array( '{PAGER_LINK}' , '{PAGER_NUMBER}' ) ,
					array( $i , $i ) , $PageLink[ 1 ] );
			}
		}
		if( $this->curr < $this->pages ) {
			$this->recont .= $Content[ 4 ];
		}
		for( $i = 5 ; $i < count( $Content ) ; $i++ ) {
			$this->recont .= $Content[ $i ];
		}
		$TotalVar = array( '{PAGER_ROWTOTAL}' , '{PAGER_PAGETOTAL}' , '{PAGER_STARTROW}' , '{PAGER_ENDROW}' , 
		'{PAGER_FIRSTURL}' , '{PAGER_PREVIOUSURL}' , '{PAGER_NEXTURL}' , '{PAGER_LASTURL}' , '{PAGER_FORMNAME}' , '{PAGER_CURRPAGE}' );
		$TotalRep = array( $this->rows , $this->pages , $this->startRow , $this->endRow , 1 , $this->curr - 1 ,
			$this->curr + 1 , $this->pages , $formName , $this->curr );
		$this->recont = str_replace( $TotalVar , $TotalRep , $this->recont );
		unset($Content,$url,$tempPath,$Reg,$CurrPage,$PageLink,$showMinPage,$showMaxPage,$i,$TotalVar,$TotalRep,$formName);
		return $this->recont;
	}

	/**
	* 带省略号的分页显示函数 showSuspendPointsGet( $url = '')
	* @param  $url	    链接地址 默认为当前页地址
	* return string		页码字符串
	*/
	public function showSuspendPointsGet( $tempPath = '' , $url = '') {
		$url = $this->getUrl( $url );
		$Reg = '|{[^}]+}(.*){/[^}]+}|U';
		$Content = $this->Content;
		preg_match( $Reg , $Content[ 0 ] , $CurrPage );
		preg_match( $Reg , $Content[ 1 ] , $PageLink );
		$this->recont .= $Content[ 2 ];
		if( $this->curr == 1 || $this->pages == 0 ) { 
			$this->recont .= str_replace( '{PAGER_NUMBER}' , $this->curr , $CurrPage[ 1 ] );
		} else {
			$this->recont.= $Content[ 3 ];
			if( $this->curr > ceil( ( $this->showPages - 1 ) / 2 ) ) {
				$this->recont.= $Content[ 5 ];
			}
		}
		if ( $this->curr >= 1 && $this->curr <= ceil( $this->showPages / 2 ) ){
			$showMinPage = 1;
			$showMaxPage = ( $this->pages < $this->showPages) ? $this->pages : $this->showPages;
		} elseif ( $this->curr > ceil( $this->showPages / 2 ) &&
			$this->curr < $this->pages - floor( $this->showPages / 2 ) ) {
			$showMinPage = $this->curr - floor( ( $this->showPages - 1 ) / 2 );
			$showMaxPage = $this->curr + ceil( ( $this->showPages - 1 ) / 2 );
		} elseif ( $this->curr >= $this->pages - floor( $this->showPages / 2 ) &&
			$this->curr <= $this->pages ){
			$showMinPage = ( $this->pages < $this->showPages ) ? 1 : ( $this->pages - $this->showPages + 1 );
			$showMaxPage = $this->pages;
		}
		if ( $this->pages > 0 && $PageLink[ 1 ] ) {
			for( $i = $showMinPage+1 ; $i <= $showMaxPage-1 ; $i++ ) {
				if ( $i == $this->curr ) $this->recont .= str_replace( '{PAGER_NUMBER}' , $i , $CurrPage[ 1 ] );
				else $this->recont .= str_replace( array( '{PAGER_LINK}' , '{PAGER_NUMBER}' ) ,
					array( $url . '=' .$i , $i ) , $PageLink[ 1 ] );
			}
		}
		if( $this->curr == $this->pages || $this->pages == 0) {
			$this->recont .= str_replace( '{PAGER_NUMBER}' , $this->curr , $CurrPage[ 1 ] );
		} else {
			if( $this->curr < ($this->pages - ceil( ( $this->showPages - 1 ) / 2 ) ) ) {
				$this->recont .= $Content[ 5 ];
			}
			$this->recont .= str_replace( array( '{PAGER_LASTNUMBER}' ) , array( $this->pages ) , $Content[ 4 ] );
		}
		$this->getResult( $Content , $url );
		unset($Content,$url,$tempPath,$Reg,$CurrPage,$PageLink,$showMinPage,$showMaxPage,$i);
		return $this->recont;
	}

	/**
	* POST方式分页显示函数 showSuspendPointsPost( $formName )
	* @param  $formName  提交表单名称
	* @param  $tempPath	模板地址
	* return string		页码字符串
	*/
	public function showSuspendPointsPost( $formName = '' ) {
		if( !$formName ) {
			exit( '请设置表单名称！' );
		}
		$url = $this->getUrl( );
		$Reg = '|{[^}]+}(.*){/[^}]+}|U';
		$Content = $this->Content;
		preg_match( $Reg , $Content[ 0 ] , $CurrPage );
		preg_match( $Reg , $Content[ 1 ] , $PageLink );
		$this->recont .= $Content[ 2 ];
		if( $this->curr == 1 || $this->pages == 0 ) { 
			$this->recont .= str_replace( '{PAGER_NUMBER}' , $this->curr , $CurrPage[ 1 ] );
		} else {
			$this->recont.= $Content[ 3 ];
			if( $this->curr > ceil( ( $this->showPages - 1 ) / 2 ) ) {
				$this->recont.= $Content[ 5 ];
			}
		}
		if ( $this->curr >= 1 && $this->curr <= ceil( $this->showPages / 2 ) ){
			$showMinPage = 1;
			$showMaxPage = ( $this->pages < $this->showPages) ? $this->pages : $this->showPages;
		} elseif ( $this->curr > ceil( $this->showPages / 2 ) && $this->curr < $this->pages - floor( $this->showPages / 2 ) ) {
			$showMinPage = $this->curr - ceil( ( $this->showPages - 1 ) / 2 );
			$showMaxPage = $this->curr + floor( ( $this->showPages - 1 ) / 2 );
		} elseif ( $this->curr >= $this->pages - floor( $this->showPages / 2 ) && $this->curr <= $this->pages ){
			$showMinPage = ( $this->pages < $this->showPages ) ? 1 : ( $this->pages - $this->showPages + 1 );
			$showMaxPage = $this->pages;
		}
		if ( $this->pages > 0 && $PageLink[ 1 ] ) {
			for( $i = $showMinPage+1 ; $i <= $showMaxPage-1 ; $i++ ) {
				if ( $i == $this->curr ) $this->recont .= str_replace( '{PAGER_NUMBER}' , $i , $CurrPage[ 1 ] );
				else $this->recont .= str_replace( array( '{PAGER_LINK}' , '{PAGER_NUMBER}' ) ,
					array( $i , $i ) , $PageLink[ 1 ] );
			}
		}
		if( $this->curr == $this->pages || $this->pages == 0) {
			$this->recont .= str_replace( '{PAGER_NUMBER}' , $this->curr , $CurrPage[ 1 ] );
		} else {
			if( $this->curr < ($this->pages - ceil( ( $this->showPages - 1 ) / 2 ) ) ) {
				$this->recont .= $Content[ 5 ];
			}
			$this->recont .= str_replace( array( '{PAGER_LASTNUMBER}' ) , array( $this->pages ) , $Content[ 4 ] );
		}
		for( $i = 6 ; $i < count( $Content ) ; $i++ ) {
			$this->recont .= $Content[ $i ];
		}
		$TotalVar = array( '{PAGER_ROWTOTAL}' , '{PAGER_PAGETOTAL}' , '{PAGER_STARTROW}' , '{PAGER_ENDROW}' , 
		'{PAGER_FIRSTURL}' , '{PAGER_PREVIOUSURL}' , '{PAGER_NEXTURL}' , '{PAGER_LASTURL}' , '{PAGER_FORMNAME}' , '{PAGER_CURRPAGE}' );
		$TotalRep = array( $this->rows , $this->pages , $this->startRow , $this->endRow , 1 , $this->curr - 1 ,
			$this->curr + 1 , $this->pages , $formName , $this->curr );
		$this->recont = str_replace( $TotalVar , $TotalRep , $this->recont );
		unset($Content,$url,$tempPath,$Reg,$CurrPage,$PageLink,$showMinPage,$showMaxPage,$i,$TotalVar,$TotalRep,$formName);
		return $this->recont;
	}

	/**
	* 静态页分页显示函数 showStatic( $url = '' , $superfluous = '' )
	* @param  $url	    链接地址 默认为当前页地址
	* @param  $superfluous 每个数字页码后的代码
	* return string		页码字符串
	*/
	public function showStatic( $superfluous = '' , $url = 'index.html' ) {
		//获取页码链接的URL
		$urls = explode('.',$url);
		$this->recont = '';
		$Reg = '|{[^}]+}(.*){/[^}]+}|U';
		//获取模板文件内容
		$Content =  $this->Content;
		preg_match( $Reg , $Content[ 0 ] , $CurrPage );
		preg_match( $Reg , $Content[ 1 ] , $PageLink );
		$this->recont .= $Content[ 2 ];
		//生成首页下一页内容
		if( $this->curr > 1 ) {
			$this->recont.= $Content[ 3 ];
		}else{
			$this->recont .= str_replace( array( '{PAGER_FIRSTURL}' , '{PAGER_PREVIOUSURL}' ) , 'javascript:void(0)' , $Content[ 3 ] );
		}
		$this->recont = rtrim( $this->recont , chr(13).chr(10));
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
					array( $urls[0] . $i . '.' . $urls[1] , $i ) , $PageLink[ 1 ] );
			}
			$pos = strrpos( $this->recont , $superfluous );
			$this->recont = substr($this->recont,0,$pos);
		}
		//生成最后一页和下一页内容
		if( $this->curr < $this->pages ) {
			$this->recont .= $Content[ 4 ];
		}else{
			$this->recont .= str_replace( array( '{PAGER_NEXTURL}' , '{PAGER_LASTURL}' ) , 'javascript:void(0)' , $Content[ 4 ] );
		}
		$this->recont = rtrim( $this->recont , chr(13).chr(10));
		//生成其它内容
		$this->recont .= $Content[ 5 ];
		//获取最后生成的页码字符串
		$this->getStaticResult( $Content , $urls );
		unset($Content,$url,$tempPath,$Reg,$CurrPage,$PageLink,$showMinPage,$showMaxPage,$i);
		return $this->recont;
	}

	/**
	* 静态页获取最终完成的页码字符串
	* @param  $Content  模板内容数组 
	* @param  $url      页码链接的URL
	* @return string    完成的页码字符串
	*/
	private function getStaticResult( $Content , $urls ) {
		for( $i = 6 ; $i < count( $Content ) ; $i++ ) {
			$this->recont .= $Content[ $i ];
		}
		$TotalVar = array( '{PAGER_ROWTOTAL}' , '{PAGER_PAGETOTAL}' , '{PAGER_STARTROW}' , '{PAGER_ENDROW}' , 
		'{PAGER_FIRSTURL}' , '{PAGER_PREVIOUSURL}' , '{PAGER_NEXTURL}' , '{PAGER_LASTURL}' , '{PAGER_JUMPLINK}' , '{PAGER_CURRPAGE}' );
		$TotalRep = array( $this->rows , $this->pages , $this->startRow , $this->endRow ,
			$urls[0] . '1.' .$urls[1] , $urls[0] . ( $this->curr - 1 ) . '.' . $urls[1] , $urls[0] . ( $this->curr + 1 ) . '.' . $urls[1] ,
			$urls[0] . $this->pages . '.' . $urls[1] , $url , $this->curr );
		$this->recont = str_replace( $TotalVar , $TotalRep , $this->recont );
		unset($Content,$url,$i,$TotalVar,$TotalRep);
	}


	/**
	* 无刷新的分页显示函数 showUnrefresh( $tempPath = '' , $objectName )
	* @param  $tempPath	   模板地址
	* @param  $objectName  静态页js中无刷新对像名称
	* return string		   页码字符串
	*/
	public function showUnrefresh( $tempPath = '' , $objectName ) {
		return $this->showPost( $tempPath , $objectName );
	}

	/**
	* 无刷新的带省略号分页显示函数 showUnrefreshSuspendPoints( $tempPath = '' , $objectName )
	* @param  $tempPath	   模板地址
	* @param  $objectName  静态页js中无刷新对像名称
	* return string		   页码字符串
	*/
	public function showUnrefreshSuspendPoints( $tempPath = '' , $objectName ) {
		return $this->showSuspendPointsPost( $tempPath , $objectName );
	}
        
        public function getPageUrl($value,$remove){
            $url = $this->getUrl().'=1&';
            $pos = strpos($url,$remove);
            if($pos > 0){
                $url = substr($url,0,$pos);
            }
            return $url.$value;
        }
}
?>