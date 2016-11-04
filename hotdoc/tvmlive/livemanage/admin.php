<?php
define('THINK_PATH',realpath('./ThinkPHP') .'/');
define('APP_PATH', './Application/');
define('BIND_MODULE','Admin');
// 绑定访问Index控制器
define('BIND_CONTROLLER','Index');
//define('BIND_ACTION','login');
//define('BUILD_CONTROLLER_LIST','Index,User,Menu');
//define('BUILD_MODEL_LIST','User,Menu');
// 定义运行时目录
 define('RUNTIME_PATH','./Runtime/');
//define('DIR_SECURE_FILENAME', 'default.html');
//D('User'); //实例化UserLogic
//D('User','Model'); //实例化UserModel
//D('User','Service') ;//实例化UserService
//define('CONF_EXT', '.ini');
define('APP_DEBUG', true);
require THINK_PATH.'ThinkPHP.php';
?>
