<?php 
    /**
    获取网卡的MAC地址原码；目前支持WIN/LINUX系统 
    获取机器网卡的物理（MAC）地址 
    **/
    class COMGetmac{ 
         
            var $return_array = array(); // 返回带有MAC地址的字串数组 
            var $mac_addr; 
         
            function __construct(){ 
              /*  $os_type = strtoupper(substr(PHP_OS, 0, 3));
                 switch ( strtolower($os_type) ){ 
                          case 'win': 
                              $this->forWindows(); 
                              break; 
                           default: 
                              $this->forLinux(); 
                              break; 
                  } 
          
                     
                  $temp_array = array(); 
                  foreach ( $this->return_array as $value ){ 
                            if ( 
    preg_match("/[0-9a-f][0-9a-f][:-]"."[0-9a-f][0-9a-f][:-]"."[0-9a-f][0-9a-f][:-]"."[0-9a-f][0-9a-f][:-]"."[0-9a-f][0-9a-f][:-]"."[0-9a-f][0-9a-f]/i",$value, 
    $temp_array ) ){ 
                                     $this->mac_addr = $temp_array[0]; 
                                     break; 
                           } 
          
                  } 
                  unset($temp_array); 
                  return $this->mac_addr; */
             } 
          
          
             function forWindows(){ 
                  @exec("ipconfig /all", $this->return_array);
                  if ( $this->return_array ) 
                           return $this->return_array; 
                  else{ 
                           $ipconfig = $_SERVER["WINDIR"]."\system32\ipconfig.exe"; 
                           if ( is_file($ipconfig) ) 
                              @exec($ipconfig." /all", $this->return_array); 
                           else 
                              @exec($_SERVER["WINDIR"]."\system\ipconfig.exe /all", $this->return_array); 
                           return $this->return_array; 
                  } 
             } 
          
          
          
             function forLinux(){ 
                  @exec("ifconfig -a", $this->return_array); 
                  return $this->return_array; 
             } 
          function getmac(){
              $config = parse_ini_file("/var/tvmlinked-in/config.conf",true);
              $mac = $config['CLIENT_CODE']['CODE'];
              return $mac;
          }          
    } 
