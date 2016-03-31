<?php
/**
 * ��ҳ���ļ�
 * ��ҳ���ṩ������ʾҳ��ķ�����
			��ͨ��GET��ʽ��ҳ��showGet( $tempPath = '' , $url = '' )
			��ͨ��POST��ʽ��ҳ��showPost( $tempPath = '' , $formName = '' )
			��ʡ�Ժŵ�GET��ʽ��ҳ��showSuspendPointsGet( $tempPath = '' , $url = '' )
			��ʡ�Ժŵ�POST��ʽ��ҳ��showSuspendPointsPost( $tempPath = '' , $formName = '' )
			ҳ����ˢ�µķ�ҳ��showUnrefresh( $tempPath = '' , $objectName )
			��ˢ�µĴ�ʡ�Ժŷ�ҳ��ʾ���� showUnrefreshSuspendPoints( $tempPath = '' , $objectName )
 * To contact the author write to {@link jingyunshan@myce.net.cn}
 * @author ����ɽ
 */

class Pagination {
	private $pageSize;		//ÿҳ��ʾ����
	private $curr;			//��ǰҳ��
	private $currName;	    //��ǰҳ����������
	private $rows;			//��¼����
	private $pages;			//��ҳ��
	private $showPages;		//��ʾҳ����
	private $startRow;		//��ǰҳ��ʼ��¼��
	private $endRow;		//��ǰҳ������¼��
	private $urlstr;        //���Ӳ������URL��ַ
	private $url;			//url�ַ���
	private $Content;		//ģ����������
	private $recont;		//ҳ������
	
	/**
	* @Description ���캯�� __construct( $recordTotal , $recordNumberPrePage , $numberPageTotal , $currPage ,
		$toFirstPage = false )
	* @param $recordTotal         int       ��¼����
	* @param $recordNumberPrePage int       ÿҳ�ļ�¼��
	* @param $numberPageTotal     int       ��ʾ����ҳ�������
	* @param $currPage            int       ��ǰҳ
	* @param $currPageName        string    ��ǰҳ��������
	* @param $toFirstPage         bool      ��ǰҳ������ҳ��ʱ���Ƿ���ʾ��һҳ��־��Ĭ����ʾ���һҳ:true,false
	*/
	public function __construct( $recordTotal , $recordNumberPrePage , $numberPageTotal , $currPage ,
		$currPageName , $toFirstPage = false ) {
		if( $currPageName ){
			$this->currName = $currPageName;
		} else {
			unset($recordTotal,$recordNumberPrePage,$numberPageTotal,$currPage,$currPageName,$toFirstPage);
			exit( '�����õ�ǰҳ�������ƣ�');
		}
		$this->pageSize = intval( $recordNumberPrePage );
		if( $this->pageSize == 0 ) $this->pageSize = 10;
		$this->showPages = intval( $numberPageTotal );
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
		//��ǰҳ��ʼ��¼��
		$this->startRow = ( $this->curr - 1 ) * $this->pageSize + 1;
		//��ǰҳ������¼��
		$this->endRow = $this->curr * $this->pageSize;
		if( $this->endRow >= $this->rows ) {
			$this->endRow = $this->rows;
		}
		if( $this->startRow > $this->endRow ) {
			$this->startRow = $this->endRow;
		}
		unset($recordTotal,$recordNumberPrePage,$numberPageTotal,$currPage,$currPageName,$toFirstPage);
	}
	
	//��������
	public function __destruct( ) {
		unset( $this->pageSize,$this->curr,$this->currName,$this->rows,$this->pages,$this->showPages,$this->startRow
			,$this->endRow,$this->urlstr,$this->url,$this->Content,$this->recont );
	}
	
	/**
	*@Description   ��ȡ��ҳ�� getTotalPage()
	*@return int    ��ҳ��
	*/
	public function getTotalPage( ) {
            return $this->pages;
	}

	/**
	*@Description   ��ȡ��ǰҳ�� getCurrentPage()
	*@return int    ��ǰҳ��
	*/
	public function getCurrentPage( ) {
            return $this->curr;
	}

	/**
	*@Description :urlAddParam($url,$param,$firstParamName) �Ѳ������ӵ�URL��ַ��
	*@param  $url Ҫִ�е����·����ַ		�磺"../include/test.php"
	*@param  $param ��Ҫ���ӵĲ���			�磺"id=12&name=user"
	*@param  $firstParamName ��Ҫ���Ӳ����ĵ�һ����������	�磺"id"
	*@return  string �������Ӳ������URL��ַ
	*/
	private function urlAddParam( $url , $param , $firstParamName ) {
		//�жϲ�����һ���ַ��Ƿ�����ַ� &
		$pos	=	strpos( $param , '&' );
		//��������ַ� & ��ȥ���ַ� &
		if( $pos === 0 ) $param	=	substr( $param , 1 );
		//��ȡURL��ַ�е�GET�����ַ���
		$getstr = strrchr( $_SERVER[ 'REQUEST_URI' ] , '?' );
		//�жϲ����ַ������Ƿ���Ҫ���ӵĲ���
		if( strpos( '|' . $getstr , $firstParamName ) > 0 ) {
			//�����ȥ��Ҫ���ӵĲ����ַ���
			$getstr=substr( $getstr , 0 , strpos( '|' . $getstr , $firstParamName ) - 2 );
		}
		if( $url == '' ) $this->urlstr = '?' . $param;
		elseif( $getstr == '' ) $this->urlstr = $url . '?' . $param;
		else $this->urlstr = $url . $getstr . '&' . $param;
		unset($url,$param,$firstParamName,$pos,$getstr,$getstr);
		return $this->urlstr;
	}
		
	/**
	* ��ȡҳ�����ӵ�URL����
	* @param  $tempPath	ģ���ַ
	* @param  $url	    ���ӵ�ַ Ĭ��Ϊ��ǰҳ��ַ
	* @return  String   url�ַ���
	*/
	private function getUrl( $tempPath = '' , $url = '' ) {
		if( !file_exists( $tempPath ) )exit( 'ҳ��ģ���ļ������ڣ�' );
		if( $url == '' ){ 
			$this->url = $_SERVER[ 'REQUEST_URI' ]; 
		} else {
			$this->url = $url;
		}
		$parse_url = parse_url( $this->url );
		$url_query = isset( $parse_url[ 'query' ] ) ? $parse_url[ 'query' ] : null; //����ȡ��URL�Ĳ�ѯ�ִ�
		if( $url_query ) {
			//��ΪURL�п��ܰ�����ҳ����Ϣ������Ҫ����ȥ�����Ա�����µ�ҳ����Ϣ��
			$page = isset( $this->curr ) ? $this->curr : '';
			$url_query = ereg_replace( '(^|&)' . $this->currName ."=$page" , '' , $url_query );
			$url_query = ereg_replace( '(^|&)' . $this->currName .'=' , '' , $url_query );
			//���������URL�Ĳ�ѯ�ִ��滻ԭ����URL�Ĳ�ѯ�ִ���
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
	* ��ȡģ���ļ�����
	* @param  $tempPath	ģ���ַ
	* @return  array    ģ����������
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
	* ��ȡ������ɵ�ҳ���ַ���
	* @param  $Content  ģ���������� 
	* @param  $url      ҳ�����ӵ�URL
	* @return string    ��ɵ�ҳ���ַ���
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
	* GET��ʽ��ҳ��ʾ���� showGet( $tempPath = '' , $url = '' )
	* @param  $tempPath	ģ���ַ
	* @param  $url	    ���ӵ�ַ Ĭ��Ϊ��ǰҳ��ַ
	* return string		ҳ���ַ���
	*/
	public function showGet( $tempPath = '' , $url = '' ) {
		//��ȡҳ�����ӵ�URL
		$url = $this->getUrl( $tempPath , $url );
		$Reg = '|{[^}]+}(.*){/[^}]+}|U';
		//��ȡģ���ļ�����
		$Content = $this->getTemplateContent( $tempPath );
		preg_match( $Reg , $Content[ 0 ] , $CurrPage );
		preg_match( $Reg , $Content[ 1 ] , $PageLink );
		$this->recont .= $Content[ 2 ];
		//������ҳ��һҳ����
		if( $this->curr > 1 ) {
			$this->recont.= $Content[ 3 ];
		}
		//��ȡ����ҳ�뷶Χ
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
		//��������ҳ��
		if ( $this->pages > 0 && $PageLink[ 1 ] ) {
			for( $i = $showMinPage ; $i <= $showMaxPage ; $i++ ) {
				if ( $i == $this->curr ) $this->recont .= str_replace( '{PAGER_NUMBER}' , $i , $CurrPage[ 1 ] );
				else $this->recont .= str_replace( array( '{PAGER_LINK}' , '{PAGER_NUMBER}' ) , 
					array( $url . '=' .$i , $i ) , $PageLink[ 1 ] );
			}
		}
		//�������һҳ����һҳ����
		if( $this->curr < $this->pages ) {
			$this->recont .= $Content[ 4 ];
		}
		//������������
		$this->recont .= $Content[ 5 ];
		//��ȡ������ɵ�ҳ���ַ���
		$this->getResult( $Content , $url );
		unset($Content,$url,$tempPath,$Reg,$CurrPage,$PageLink,$showMinPage,$showMaxPage,$i);
		return $this->recont;
	}

	/**
	* POST��ʽ��ҳ��ʾ���� showPost( $tempPath = '' , $formName )
	* @param  $formName  �ύ��������
	* @param  $tempPath	ģ���ַ
	* return string		ҳ���ַ���
	*/
	public function showPost( $tempPath = '' , $formName = '' ) {
		if( !$formName ) {
			exit( '�����ñ������ƣ�' );
		}
		$url = $this->getUrl( $tempPath );
		$Reg = '|{[^}]+}(.*){/[^}]+}|U';
		$Content = $this->getTemplateContent( $tempPath );
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
	* ��ʡ�Ժŵķ�ҳ��ʾ���� showSuspendPointsGet( $tempPath = '' , $url = '')
	* @param  $tempPath	ģ���ַ
	* @param  $url	    ���ӵ�ַ Ĭ��Ϊ��ǰҳ��ַ
	* return string		ҳ���ַ���
	*/
	public function showSuspendPointsGet( $tempPath = '' , $url = '') {
		$url = $this->getUrl( $tempPath , $url );
		$Reg = '|{[^}]+}(.*){/[^}]+}|U';
		$Content = $this->getTemplateContent( $tempPath );
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
	* POST��ʽ��ҳ��ʾ���� showSuspendPointsPost( $tempPath = '' , $formName )
	* @param  $formName  �ύ��������
	* @param  $tempPath	ģ���ַ
	* return string		ҳ���ַ���
	*/
	public function showSuspendPointsPost( $tempPath = '' , $formName = '' ) {
		if( !$formName ) {
			exit( '�����ñ������ƣ�' );
		}
		$url = $this->getUrl( $tempPath , $url );
		$Reg = '|{[^}]+}(.*){/[^}]+}|U';
		$Content = $this->getTemplateContent( $tempPath );
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
	* ��ˢ�µķ�ҳ��ʾ���� showUnrefresh( $tempPath = '' , $objectName )
	* @param  $tempPath	   ģ���ַ
	* @param  $objectName  ��̬ҳjs����ˢ�¶�������
	* return string		   ҳ���ַ���
	*/
	public function showUnrefresh( $tempPath = '' , $objectName ) {
		return $this->showPost( $tempPath , $objectName );
	}

	/**
	* ��ˢ�µĴ�ʡ�Ժŷ�ҳ��ʾ���� showUnrefreshSuspendPoints( $tempPath = '' , $objectName )
	* @param  $tempPath	   ģ���ַ
	* @param  $objectName  ��̬ҳjs����ˢ�¶�������
	* return string		   ҳ���ַ���
	*/
	public function showUnrefreshSuspendPoints( $tempPath = '' , $objectName ) {
		return $this->showSuspendPointsPost( $tempPath , $objectName );
	}
	
	/**
	 * ����˽������
	 * @param $attribute ������������
	 * @return ������������
	 */
	private function __set( $attribute , $value ){
		$this->attribute = $value;
	}
	
	/**
	 * ����˽������
	 * @param $attribute ������������
	 * @return ������������
	 */
	private function __get( $attribute ){
		if(isset($this->attribute)){
			return $this->attribute;
		}else{
			return null;
		}
	}
	
	/**
	 * �ж������Ƿ�����
	 * @return boolean
	 */
	private function __isset( $attribute ){
		return isset($this->attribute);
	}

	/**
	 * �ͷ������ڴ�
	 * @return boolean
	 */
	private function __unset( $attribute ){
		unset($this->attribute);
	}

	/**
	 * �������ô�����÷���
	 */
	private function __toString(){
		return '�����ܱ�ֱ�����';
	}

	/**
	 * ��¡ʱ���� 
	 */
	public function __clone(){
		echo '����clone.';
	}

	/**
	 * ���ò����ڵķ���ʱ
	 */
	private function __call( $function , $args ){
		print "�������õĺ�����$function_name(������";
		print_r($args);
		print ")�����ڣ�<br>\n";
	}
}
?>