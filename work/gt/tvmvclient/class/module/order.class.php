<?php
class Order extends Orders{
	
	/**
	 * 对像静态变量
	 *
	 * @var object
	 */
	static private $_class;
        
        private $_host = SERVERHOST;
        
         private $_payment = array('1010'=>'sms','2010'=>'alipay','3010'=>'weixin');
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
        
        /**
	 * 功能号：12080
	 * 订单接口
	 * */
	public function order_create(){
		COMFilter::$_jump = false;
                $clientmac = $_COOKIE['CLIENTMAC'];
                if (!$clientmac) {
                    $boxmac = new COMGetmac();
                    // print 'getmac';
                    $clientmac = 'M' . $boxmac->getmac();
                    setcookie("CLIENTMAC", $clientmac);
                }
                // print $clientmac;
                $clientboxid = intval($_COOKIE['CLIENTBOXID']);
                if (!$clientboxid) {
                    $clientbox = new Boxs();
                    $one = $clientbox->getOne("mac=?", $clientmac);
                    if ($one) {
                        $clientboxid = $one->id;
                        setcookie("CLIENTMAC", $clientmac);
                    }
                }
		$phone = Core::$_dataFilter->valueCheck(Core::get("phone"), "Require,Limit", "手机号不能为空,手机号最多11个字符", false, 11);
                $goodsid = 10001;
                if ($phone) {
                    //统计
                    Statistics::hitscounter(intval($clientboxid), "logined", "logined");
                    $user = new Users();
                    $addate = COMCommon::sysTime();
                    $one = $user->getOne('user_name=?', $phone);
                    if (empty($one)) {
                        $id = $user->add($phone, $addate);
                    } else {
                        $id = $one->id;
                    }
                    setcookie("CLIENTPHONE", $phone);
                    $token = new Users_token();
                    //$host = '115.28.92.216';
                    $host = $this->_host;
                    $network = Core::connect_check($host);
                    if ($network) {
                        $param = array("m" => 12080, "phone" => $phone, "goods" => $goodsid);
                        if (!$clientboxid) {
                            $param['mac'] = $clientmac;
                        } else {
                            $param['box'] = $clientboxid;
                        }
                        $param['at'] = $_SERVER['REQUEST_TIME'];
                        $one = $token->getOne("id = ? and end_time - UNIX_TIMESTAMP() > 0", $id);
                        if (empty($one)) {
                            $param['pal'] = 1;
                        }
                        $sign = Core::get_signature($param);
                        $param["sign"] = $sign;
                        $url = "http://$host/tvmv/?m=12080";
                        $temp = Core::request_url($url, $param, 1);
                        $return = json_decode($temp);
                        if ($return->status === 1) {
                            $data = $return->data;
                            if ($data->token) {
                                if (!$data->status) {
                                    $order = new Orders();
                                    $one = $order->getOne("order_sn=?", $data->ordersn, "pay_time desc");
                                    if ($one) {
                                        $one->status = 1;
                                        $one->pay_time = date("Y-m-d H:i:s", $data->start_time);
                                        $flag = $one->save();
                                        if ($flag) {
                                            $one = $token->getOne("id = ?", $id);
                                            if ($one) {
                                                $flag = $token->edit(1, $data->ordersn, $data->token, $data->start_time, $data->end_time, 1,$data->code, $id);
                                            } else {
                                                $flag = $token->add($id, 1, $data->ordersn, $data->token, $data->start_time, $data->end_time, 1,$data->code);
                                            }
                                            if ($flag) {
                                                $this->notify_server($one, $data->token);
                                            }
                                        }
                                    }
                                }
                                setcookie("CLIENTTOKEN", $data->token);
                                $retval['token'] = $data->token;
                                Core::json_result($retval, '已支付');
                            } elseif ($data->ordersn) {
                                $order = new Orders();
                                $one = $order->getOne("order_sn=?", $data->ordersn, "pay_time desc");
                                if (empty($one)) {
                                    $orderid = $order->add($data->ordersn, $id, 0, $clientboxid, 0, "", $goodsid, 0, 0, "", 1);
                                    if ($orderid) {
                                        $ordersn = $data->ordersn;
                                    }
                                } else {
                                    $ordersn = $one->order_sn;
                                }
                                setcookie("CLIENTORDERSN", $ordersn);
                                $retval['ordersn'] = $ordersn;
                                Core::json_result($retval, '订单生成');
                            }
                        } else {
                            $msg = $return->msg;
                            Core::json_error($msg);
                        }
                    } else {
                        $flag = $token->del("id = $id and end_time - UNIX_TIMESTAMP() < 0");
                        $one = $token->getOne("id = ? and end_time - UNIX_TIMESTAMP() > 0", $id);
                        if ($one) {
                            if ($one->status == 1) {
                                $flag = $this->notify_server($one, $one->token_id);
                            }
                            setcookie("CLIENTTOKEN",  $one->token_id);
                            $retval['token'] =  $one->token_id;
                            Core::json_result($retval, '已支付');
                        } else {
                            $msg = "请购买观影服务!";
                            Core::json_error($msg);
                        }
                    }
                }
            
	}
        
        private function notify_server($one,$token){
            $host = $this->_host;
            $param = array("m" => 12082, "tk" => $token);
            $sign = Core::get_signature($param);
            $param["sign"] = $sign;
            $url = "http://$host/tvmv/?m=12082";
            $temp = Core::request_url($url, $param, 1);
            $return = json_decode($temp);
            if ($return->status === 1) {
                $one->status = 2;
                $flag = $one->save();
            }
            return $flag;
        }
                
        /**
	 * 功能号：12070
	 * 客户认证
	 * */
	public function certification(){
            COMFilter::$_jump = false;
            $code = trim(Core::$_dataFilter->valueCheck(Core::get("code"), "Require,Limit", "认证码不能为空,最多6个字符", false, 6));
              
            $clientmac = $_COOKIE['CLIENTMAC'];
            // print $clientmac;
            $clientboxid = intval($_COOKIE['CLIENTBOXID']);
            $clientphone = $_COOKIE['CLIENTPHONE'];
            
            $user = new Users();
            $addate = COMCommon::sysTime();
            $one = $user->getOne('user_name=?', $clientphone);
            if ($one) {
                $id = $one->id;
            }else{
                $msg = '用户不存在';
                Core::json_error($msg);
            }
            
            $token = new Users_token();
            //$host = 'http://115.28.92.216';
            $host = $this->_host;
            $network = Core::check_network($host);
            if ($network) {
                $param = array("m" => 12070, "phone" => $clientphone, "code" => $code);
                $onecert = $token->getOne("id = ? and end_time - UNIX_TIMESTAMP() > 0", $id);
                if (empty($onecert)) {
                    $param['pal'] = 1;
                }else{
                    if($onecert->status > 0 && $onecert->authcode != $code){
                        $onecert->errnum = $onecert->errnum +1;
                        $onecert->save();
                        $msg = '认证码不正确';
                        Core::json_error($msg);
                    }
                }
                $param['at'] = $_SERVER['REQUEST_TIME'];
                $sign = Core::get_signature($param);
                $param["sign"] = $sign;
                $url = "http://$host/tvmv/?m=12070";
                $temp = Core::request_url($url, $param, 1);
                $return = json_decode($temp);
                if ($return->status === 1) {
                    $data = $return->data;
                    if ($data->token) {
                        if (!$data->status) {
                            $order = new Orders();
                            $one = $order->getOne("order_sn=?", $data->ordersn, "pay_time desc");
                            if ($one) {
                                $one->status = 1;
                                $one->pay_time = date("Y-m-d H:i:s", $data->start_time);
                                $flag = $one->save();
                                if ($flag) {
                                    $one = $token->getOne("id = ?", $id);
                                    if ($one) {
                                        $flag = $token->edit(1, $data->ordersn, $data->token, $data->start_time, $data->end_time, 1, $data->code, $id);
                                    } else {
                                        $flag = $token->add($id, 1, $data->ordersn, $data->token, $data->start_time, $data->end_time, 1, $data->code);
                                    }
                                    if ($flag) {
                                        $this->notify_server($one, $data->token);
                                    }
                                }
                            }
                        }
                        $onecert->errnum = 0;
                        $onecert->save();
                        setcookie("CLIENTTOKEN", $data->token);
                        Core::json_result('', '已认证');
                    } 
                } else {
                    $msg = $return->msg;
                    Core::json_error($msg);
                }
            } else {
                $flag = $token->del("id = $id and end_time - UNIX_TIMESTAMP() < 0");
                $one = $token->getOne("id = ? and end_time - UNIX_TIMESTAMP() > 0", $id);
                if ($one) {
                    if($one->status > 0){
                        if($one->authcode != $code){
                            $one->errnum = $one->errnum +1;
                            $one->save();
                            $msg = '认证码不正确';
                            Core::json_error($msg);
                        }else{
                            $one->errnum = 0;
                            $one->save();
                            setcookie("CLIENTTOKEN", $data->token);
                            Core::json_result('', '已认证');
                        }
                    }else{
                         $msg = '网络没有联接,如果没有支付,请支付相关费用!';
                         Core::json_error($msg);
                    }
                } else {
                    $msg = "网络没有联接,如果您没有购买服务,请先购买观影服务!";
                    Core::json_error($msg);
                }
            }
            
        }
        
        
        /**
	 * 功能号：12081
	 * 支付宝支付订单
	 * */
	public function order_alipay(){
            require_once(ROOT ."class/plus/alipay/alipay.config.php");
            COMFilter::$_jump = false;
             // $paymentid = Core::$_dataFilter->valueCheck( Core::get("payment") , "Integer" , "数据非法");
             /* $payment_name = $this->_payment[$paymentid];
                if(empty($payment_name)){
                    Core::json_error('支付方式不合法');
                }*/
           $host = $this->_host;
            //支付类型
            $payment_type = "1";
            //必填，不能修改
            //服务器异步通知页面路径
            $notify_url = "http://$host/tvmv/notify_url.php";
            //需http://格式的完整路径，不能加?id=123这类自定义参数
            //页面跳转同步通知页面路径
            $return_url = "http://$host/tvmv/return_url.php";
            //需http://格式的完整路径，不能加?id=123这类自定义参数，不能写成http://localhost/
            //商户订单号
            $out_trade_no = $_COOKIE['CLIENTORDERSN'];
            if(!self::checkcode($out_trade_no)){
                Core::json_error('订单号不合法');
            }
            //商户网站订单系统中唯一订单号，必填
            //订单名称
            $subject = "TVM-手机电影服务";
            //必填
            //付款金额
            $total_fee = 0.01;
            //必填
            //商品展示地址
            $show_url = $_POST['WIDshow_url'];
            //必填，需以http://开头的完整路径，例如：http://www.商户网址.com/myorder.html
            //订单描述
            $body = " TVM-手机电影服务";
            //选填

            //构造要请求的参数数组，无需改动
            $parameter = array(
                "service" => "alipay.wap.create.direct.pay.by.user",
                "partner" => trim($alipay_config['partner']),
                "seller_id" => trim($alipay_config['seller_id']),
                "payment_type" => $payment_type,
                "notify_url" => $notify_url,
                "return_url" => $return_url,
                "out_trade_no" => $out_trade_no,
                "subject" => $subject,
                "total_fee" => $total_fee,
                "show_url" => $show_url,
                "body" => $body,
                "_input_charset" => trim(strtolower($alipay_config['input_charset']))
            );
            //建立请求
            $alipaySubmit = new Alipay($alipay_config);
            $html_text = $alipaySubmit->buildRequestForm($parameter, "get", "确认");
            
           
            echo $html_text;
	}
	
        /**
	 * 功能号：12083
	 * 短信状态回调接口
	 * */
	public function sms_status_notify(){
		COMFilter::$_jump = false;
                $xmlstring = <<<EDT
<?xml version="1.0" encoding="GBK" ?>
<reports>
<report>
<corp_id>test</corp_id>
<mobile>13810000001</mobile>
<sub_seq>0</sub_seq>
<msg_id>12345asd</msg_id>
<err>2</err>
<fail_desc>undeliver</fail_desc>
<report_time>2010-07-02 00:00:00</report_time>
</report>
<report>
<corp_id>test</corp_id>
<mobile>13810000002</mobile>
<sub_seq>0</sub_seq>
<msg_id>12345asd123</msg_id>
<err>2</err>
<fail_desc>undeliver</fail_desc>
<report_time>2010-07-02 00:00:00</report_time>
</report>
</reports>
EDT;
              $xml = simplexml_load_string($xmlstring);
              if(is_object($xml->report)){
                foreach ($xml->report as $a){
                    print iconv("UTF-8","GBK", $a->msg_id).'<br/>';
                }
              }
              
              
		$ordersn = Core::$_dataFilter->valueCheck( Core::get("sn") , "Require,Limit" , "订单号不能为空,code非法" , false , 17 );
		
                $ip = Core::get_client_ip();
				
		if(!Core::checkcode($ordersn)){
		//	Core::json_error('code 不合法');
		}
		$paydate = COMCommon::sysTime();
               /* $user = new Users();
		$one = $user->getOne('user_name=?',$phone);
		if(empty($one)){
                   $id = $user->add($phone, $addate);
                }else{
                   $id = $one->id;
                }*/
                $order = self::getOne("order_sn=?",$ordersn,"pay_time desc");
                if(empty($order)){
                    Core::print_result("FAIL");
                }else{
                    if($order->status == 1){
                     //   Core::print_result("SUCCESS");
                    }else{
                        $userid = $order->user_id;
                        $order->status = 1;
                        $order->pay_time = $paydate;
                        $flag = $order->save();
                        if($flag){
                          $addate = time();
                          $tokenid = md5($order->order_sn);
                          $etime = $addate + $this->_effective_time * 3600;
                          $token = new Users_token();
                          $one = $token->getOne("id = ?", $userid);print_r($one);
                          if($one){
                              $flag = $token->edit(1, $order->order_sn,$tokenid, $addate, $etime, 1,$userid);
                          }else{
                              $flag = $token->add($userid,1,$order->order_sn, $tokenid, $addate, $etime, 1);
                          }
                          Core::print_result("SUCCESS");
                        }else{
                           Core::print_result("FAIL");
                        }
                    }
                }
	}
        
        
      //检查订单号
    public static function checkcode($code) {
        $reg = "/^A[0-9]{16}$/";
        if (preg_match($reg, $code)) {
            return true;
        } else {
            return false;
        }
    }
	
	
}










