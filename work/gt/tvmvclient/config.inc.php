<?php
/**
 * 配置文件(CMS系统)
 * To contact the author write to {@link jingyunshan@myce.net.cn}
 * @author 景云山
 */

/**
 * 网站根目录
 */
define("ROOT", dirname(__FILE__) . "/" );

/**
 * 项目名称前缀
 */
define("PREFIXPROJECT","tvm");

/**
 * 路由模式:1:Apache重定向设置模式,2:Get参数模式
 */
define("ROUTINGPROJECT",2);

/**
 * Action 参数设置
 */
define("ACTIONPARAM","m");

define("SIGNKEY","M2Q1YzMzMzA4NmQ1NjRiM2JhYjU3M2EwM2FlYjhhMmU=");
define("REQUESTIMEOUT",36000);
define("SERVERHOST",'mv.railtv.cn');
//define("SERVERHOST",'www.test.cn');
/**
 * 文档目录
 */
define("DOCROOT", $_SERVER["DOCUMENT_ROOT"] . "/" );

define("EXECUTIONTIME",false);
define("WRITELOGS",true);   
/**
 * MySql数据库连接信息
 */
$this->dataMysqlWrite = array(
              'host' => "127.0.0.1",
              'user' => "tvmclient",
              'pass' => "tvmclient",
              'dbname' => "tvm_client"
       );
?>

