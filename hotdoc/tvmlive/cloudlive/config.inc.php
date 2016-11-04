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

define("SIGNKEY","ZTg0MWU0YmUwMDU0MjAzNjBlM2RiMzk5NzIzZWEyY2MwNjNjYjQyMg==");
define("REQUESTIMEOUT",36000);
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
              'host' => "10.20.20.26",
              'user' => "tvmcluser",
              'pass' => "tvmcluser",
              'dbname' => "cloud_live"
       );

$this->uaserver = array(
        'uahost' => "uaserver.api.tvmining.com",
        'tvmid' => "13521831891",
        'vcode' => "628d51ffe1367d721bf846da26ed392f",
          'app' => "4351bc265f2041ab9f1cfff7838aea90",
          'tid' => 200,
    );

$this->liveserver = array(
        'host' => "live.stream.tvmcloud.com",
        'rate' => "ipad",
    );


