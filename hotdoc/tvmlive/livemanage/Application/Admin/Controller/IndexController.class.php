<?php
namespace Admin\Controller;
use Think\Controller;
use Think\Model;
use Org\Util\ArrayList;
class IndexController extends Controller {
    public function index(){
        $this->display("login");
    }
    public  function login(){
        $this->display("login");
    }

    public function admin_login()
    {
        Load('@.admin');
        $username = $_POST['text'];
        $password = helper::encrypt($_POST['pwd'], "E", "tvm");
        if ($username != session('ua') || $password != session('us')) {
    
            $this->ajaxReturn("failed");
        } else {
            $token = helper::GUID();
            session("token", $token);
            $this->ajaxReturn($token);
        }
    }
    public function encrypt(){
        $pwd=$_GET['key'];
        if(!$pwd){
            $pwd=$_POST['key'];
            if(!$pwd){
                $this->ajaxReturn("");
            }
        }
        $this->ajaxReturn( helper::encrypt($pwd, "E", "tvm"));
    }
    
    public function admin()
    {
        $token = $_POST['token'];
        if ($token != session('token')||!session('token')) {
            // $this->error('登陆失败！','login',3);
            $this->redirect("/login");
        } else {
            $this->display("admin");
        }
    }
    
    public function  addcase(){
        $token = $_POST['casetoken'];
        if ($token != session('token')) {
//             /$this->redirect("/login");
            //$this->display("login");
           // return;
        }
        $data['case_guid']=  call_user_func_array('uniqid', array(""));
        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize   =     3145728 ;// 设置附件上传大小
        $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg','bmp');// 设置附件上传类型
        $upload->rootPath  =     './Public/Uploads/Case/'; // 设置附件上传根目录
        $upload->savePath  =  $data['case_guid']."/"; // 设置附件上传（子）目录
        // 上传文件 
        $info   =   $upload->upload();
        if(!$info) {// 上传错误提示错误信息
            $this->error($upload->getError());
        }else{// 上传成功

            $thumbinalpath ='/Public/Uploads/Case/'. $info['thumbinalselect']['savepath']. $info['thumbinalselect']['savename'];//获取保存的文件名
            $qrcodepath ='/Public/Uploads/Case/'. $info['qrcodeselect']['savepath']. $info['qrcodeselect']['savename'];//获取保存的文件名
            $data["case_thumbinal"]=$thumbinalpath;
            $data["case_qrcode"]=$qrcodepath;
           // $this->success($data);
        }
        $data['case_title']=$_POST['casetitle'];
        //$data['case_thumbinal']=$_POST['casethumbinalpath'];
        //$data['case_qrcode']=$_POST['caseqrcodepath'];
        $data['case_weight']=$_POST['caseweight'];
        //$data['create_time']=$_POST['create_time'];
        if(  $data['case_title']==null||$data['case_thumbinal']==null||$data['case_qrcode']==null)
        {
            $this->ajaxReturn("参数错误！");
        }
        $case_info=new Model("case_info");
        if($case_info)
        {
           $res=$case_info->add($data);
           if($res==false)
           {
                $this->ajaxReturn("falied");
            } else {
                $this->ajaxReturn("success");
            }
        }
    }

    public function getcase()
    {
        $r_type = $_POST['r_type_link'];
        $page = $_POST['page'];
        $page_count = $_POST['pagecount'];
        $isLimit = true;
        if (! $page) {
            $page = 1;
        }
        if (! $page_count) {
            $page_count = 10;
        } else 
            if ($page_count == - 1) {
                $isLimit = false;
            }
        $case_info = new Model('case_info');
        $count = $case_info->count();
        $page_start = ($page - 1) * $page_count;
        
        if ($isLimit) {
            $case_data = $case_info->order('case_weight asc, createtime desc')
                ->limit($page_start . ',' . $page_count)
                ->select();
        } else {
            $case_data = $case_info->order('case_weight asc, createtime desc')->select();
        }
        if ($case_data) {
            $res_data = array();
            $res_data['data'] = $case_data;
            $res_data['page'] = $page;
            $res_data['total_num'] = $count; // 总记录数
            $res_data['page_size'] = $page_count; // 每页数量
            $res_data['page_cur'] = $page; // 当前页
            $res_data['page_total_num'] = ceil($count / $page_count); // 总页数
            $ress=json_encode($res_data);
            $this->ajaxReturn($ress);
        } else 
            if (count($user_data) == 0) {
                $this->ajaxReturn("");
            } else {
                $this->ajaxReturn("查询失败!");
            }
    }

    public function getcaseById()
    {
        $r_type = $_POST['r_type_link'];
        $id= $_POST['did'];
        $case_info = new Model('case_info');
        $sql="select * from case_info where id='" . $id . "'";
            $case_data = $case_info ->query($sql);
        if ($case_data) {
            $res_data = array();
            $res_data['data'] = $case_data;
            $this->ajaxReturn(json_encode($res_data));
        } else
            if (count($user_data) == 0) {
                $this->ajaxReturn("");
            } else {
                $this->ajaxReturn("查询失败!");
            }
    }

    public function updatecase()
    {
        $token = $_POST['casetoken'];
        if ($token != session('token')) {
            $this->redirect("/login");
            return;
        }
       $data['id']=$_POST['caseid'];
        if(  $data['id']==null){
            $this->ajaxReturn("参数错误！");
        }
        $case_info=new Model("case_info");
        $selectsql="select * from case_info where id='" .  $data['id'] . "'"; 
        if($case_info){
                $seResult=$case_info->query($selectsql);
                if($seResult){
                    if(count($seResult)>0){
                        $data['case_title']=$seResult[0]['case_title'];
                        $data['case_guid']=$seResult[0]['case_guid'];
                        $data['case_weight']=$seResult[0]['case_weight'];
                        $data['case_thumbinal']=$seResult[0]['case_thumbinal'];
                        $data['case_qrcode']=$seResult[0]['case_qrcode'];
                        $data['createtime']=$seResult[0]['createtime'];
                    }
                }
        }
        
       if($_POST['casetitle']!=null){
       $data['case_title']=$_POST['casetitle'];
       }
       if($_POST['caseguid']!=null){
       $data['case_guid']=$_POST['caseguid'];
       }
        //$data['create_time']=$_POST['create_time'];
        //$data['case_thumbinal']=$_POST['casethumbinal'];
        //$data['case_qrcode']=$_POST['caseqrcode'];
        if($_POST['caseweight']!=null){
        $data['case_weight']=$_POST['caseweight'];
        }
        if($_FILES['thumbinalselect']['name']!=""||$_FILES['qrcodeselect']['name']!=""){
            $upload = new \Think\Upload();// 实例化上传类
            $upload->maxSize   =     3145728 ;// 设置附件上传大小
            $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg','bmp');// 设置附件上传类型
            $upload->rootPath  =     './Public/Uploads/Case/'; // 设置附件上传根目录
            $upload->savePath  =      $data['case_guid']."/"; // 设置附件上传（子）目录
            // 上传文件
            $info   =   $upload->upload();
            if(!$info) {// 上传错误提示错误信息
                $this->error($upload->getError());
            }else{// 上传成功            

                if($seResult){
                    for($i=0;$i<count($seResult);$i++){
                        if($info['thumbinalselect']){
                            helper::deleteFile(substr($seResult[$i]["case_thumbinal"],1),true);
                        } 
                        if($info['qrcodeselect']){
                            helper::deleteFile(substr($seResult[$i]["case_qrcode"],1),true);
                        }
                    }
                }
                $thumbinalpath =null;
              if($info['thumbinalselect']){
                $thumbinalpath=  '/Public/Uploads/Case/'. $info['thumbinalselect']['savepath']. $info['thumbinalselect']['savename'];//获取保存的文件名
              }
              $qrcodepath=null;
              if($info['qrcodeselect']){
                $qrcodepath ='/Public/Uploads/Case/'. $info['qrcodeselect']['savepath']. $info['qrcodeselect']['savename'];//获取保存的文件名
              }
               if($thumbinalpath){
                $data["case_thumbinal"]=$thumbinalpath;
               }
               if($qrcodepath){
                $data["case_qrcode"]=$qrcodepath;
               }
                // $this->success($data);
            }
        }
        if($case_info){
            /*
            $sql="update case_info set id=".$data['id'];
            if($data['case_title']!=null){
                $sql=$sql.",case_title='".$data['case_title']."'";
            }
            if($data['case_thumbinal']!=null&&$data['case_thumbinal']!=""){
                $sql=$sql.",case_thumbinal='".$data['case_thumbinal']."'";
            }
            if($data['case_qrcode']!=null&&$data['case_qrcode']!=""){
                $sql=$sql.",case_qrcode='".$data['case_qrcode']."'";
            }
            if($data['case_weight']!=null){
                $sql=$sql.",case_weight='".$data['case_weight']."'";
            }
            $sql=$sql." where id=".$data['id'];
            //判断和原来数据是否一致，不一致的图片上传，一样的不处理
           $res=$case_info->execute($sql);
           */
            $res=$case_info->where('id='.$data['id'])->save($data);
           if($res===false){
               $this->ajaxReturn("falied");
           }
               else{
                   $this->ajaxReturn("success");
               }
        }
    }
    
    public function  addnews(){
        $token = $_POST['token'];
        if ($token != session('token')) {
            //$this->redirect("/login");
           // return;
        }
        $data['news_title']=$_POST['newstitle'];
        $data['news_time']=$_POST['newsdate'];
        //$data['news_thumbinal']=$_POST['newsthumbinal'];
        $data['news_des']=$_POST['newsdescribe'];
        $newsContent=$_POST['newshtmlcontent'];
        //$data['news_html']=$_POST['htmlpath'];
        $data['news_weight']=$_POST['newsweight'];
        $data['news_preview_count']=0;
        //$data['create_time']=$_POST['create_time'];
        if(  $data['news_title']==null||$data['news_time']==null||$data['news_des']==null||$newsContent==null)
        {
            $this->ajaxReturn("参数错误！");
        }
        $data['news_guid']=  call_user_func_array('uniqid', array(""));
        //$newsToken=helper::GUID();
        if(!is_dir('Public/Uploads/News/'.$data['news_guid'].'/')){
            helper::makeDir('Public/Uploads/News/'.$data['news_guid'].'/');
        }
        $imgList=helper::getAllUploadImagePath($newsContent,'Public\/Uploads\/Tmp\/\S{13}\.(png|jpg|bmp|gif|jpeg)');
        if($imgList){
            foreach ($imgList as $value){
                $tmpPath=str_replace("Public/Uploads/Tmp/","Public/Uploads/News/".$data['news_guid'].'/', $value);
                helper::moveFile($value,$tmpPath);
                $newsContent= str_replace($value,"/livemanage/".$tmpPath,$newsContent);
            }
        }
        helper::deleteDir("Public/Uploads/Tmp/",false);
        $newsHtml='Public/Uploads/News/'.$data['news_guid'].'/'. $data['news_guid'].'.html';
        //$newsHtml=$newsToken.'.html';
        if(helper::saveFile('./'.$newsHtml, $newsContent)==false){
            $this->ajaxReturn("保存html文档失败！");
        }
        $data['news_html']=$newsHtml;
        
        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize   =     3145728 ;// 设置附件上传大小
        $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg','bmp');// 设置附件上传类型
        $upload->rootPath  =     './Public/Uploads/News/'; // 设置附件上传根目录
        $upload->savePath  =      $data['news_guid'].'/'; // 设置附件上传（子）目录
        // 上传文件
        $info   =   $upload->upload();
        if(!$info) {// 上传错误提示错误信息
            $this->error($upload->getError());
        }else{// 上传成功
        
            $thumbinalpath ='/Public/Uploads/News/'. $info['newsthumbinalselect']['savepath']. $info['newsthumbinalselect']['savename'];//获取保存的文件名
            $data["news_thumbinal"]=$thumbinalpath;
            // $this->success($data);
        }
        
        
        $news_info=new Model("news_info");
        if($news_info)
        {
            $res=$news_info->add($data);
            if($res==false)
            {
                $this->ajaxReturn("falied");
            }
            else
            {
                $this->ajaxReturn("success");
            }
        }
    }
    
    public function getnews(){
        $r_type = $_POST['r_type_link'];
        $page = $_POST['page'];
        $page_count = $_POST['pagecount'];
        $isLimit = true;
        if (! $page) {
            $page = 1;
        }
        if (! $page_count) {
            $page_count = 10;
        } else
            if ($page_count == - 1) {
                $isLimit = false;
            }
        $news_info = new Model('news_info');
        $count = $news_info->count();
        $page_start = ($page - 1) * $page_count;
        
        if ($isLimit) {
            $news_data = $news_info->order('news_weight asc,news_time desc,create_time desc')
            ->limit($page_start . ','.$page_count)
            ->select();
        } else {
            $news_data = $news_info->order('news_weight asc,news_time desc,create_time desc')->select();
        }
        if ($news_data) {
            $res_data = array();
            $res_data['data'] = $news_data;
            $res_data['page'] = $page;
            $res_data['total_num'] = $count; // 总记录数
            $res_data['page_size'] = $page_count; // 每页数量
            $res_data['page_cur'] = $page; // 当前页
            $res_data['page_total_num'] = ceil($count / $page_count); // 总页数
            $ress=json_encode($res_data);
            $this->ajaxReturn($ress);
        } else
            if (count($user_data) == 0) {
                $this->ajaxReturn("");
            } else {
                $this->ajaxReturn("查询失败!");
            }
    }
    
    public  function getNewsById(){
        $r_type = $_POST['r_type_link'];
        $id= $_POST['did'];
        $news_info = new Model('news_info');
        $sql="select * from news_info where id='" . $id . "'";
        $news_data = $news_info ->query($sql);
        if ($news_data) {
            $res_data = array();
            $news_data[0]['news_html_content']=helper::readFile($news_data[0]['news_html']);
            $res_data['data'] = $news_data;
            $this->ajaxReturn(json_encode($res_data));
        } else
            if (count($user_data) == 0) {
                $this->ajaxReturn("");
            } else {
                $this->ajaxReturn("查询失败!");
            }
    }
    
    public function  updatenews(){
        $token = $_POST['newstoken'];
        if ($token != session('token')) {
            $this->redirect("/login");
            return;
        }
        $data['id']=$_POST['newsid'];
        if(  $data['id']==null){
            $this->ajaxReturn("参数错误！");
        } 

        $news_info=new Model("news_info");
        $seResult;
        $selectsql="select * from news_info where id='" .  $data['id'] . "'";
        if($news_info){
            $seResult=$news_info->query($selectsql);
            if($seResult){
                if(count($seResult)>0){
                        $data['news_title']=$seResult[0]['news_title'];
                        $data['news_guid']=$seResult[0]['news_guid'];
                        $data['news_time']=$seResult[0]['news_time'];
                        $data['news_thumbinal']=$seResult[0]['news_thumbinal'];
                        $data['news_des']=$seResult[0]['news_des'];
                        $data['news_html']=$seResult[0]['news_html'];
                        $data['news_weight']=$seResult[0]['news_weight'];
                        $data['news_preview_count']=$seResult[0]['news_preview_count'];
                        $data['create_time']=$seResult[0]['create_time'];
                }
            }
        }
        if($_POST['newsguid']!=null){
        $data['news_guid']=$_POST['newsguid'];
        }
        if($_POST['newstitle']!=null){
        $data['news_title']=$_POST['newstitle'];
        }
        if($_POST['newsdate']!=null){
        $data['news_time']=$_POST['newsdate'];
        }
        //$data['news_thumbinal']=$_POST['newsthumbinal'];
        if($_POST['newsdescribe']!=null){
        $data['news_des']=$_POST['newsdescribe'];
        }
        $newsContent=$_POST['newshtmlcontent'];
        //$data['news_html']=$_POST['newshtmlcontent'];
        if($_POST['weight']!=null){
        $data['news_weight']=$_POST['weight'];
        }
        //$data['create_time']=$_POST['create_time'];
        
                if($news_info){
                    if($newsContent!=null&&$newsContent!=""){
                    if(count($seResult)>0){
                        $imgList=helper::getAllUploadImagePath($newsContent,'Public\/Uploads\/Tmp\/\S{13}\.(png|jpg|bmp|gif|jpeg)');
                        if($imgList){
                            foreach ($imgList as $value){
                                $tmpPath=str_replace("Public/Uploads/Tmp/","Public/Uploads/News/".$data['news_guid'].'/', $value);
                                //helper::moveFile(substr($value,3),substr($tmpPath,3));
                                helper::moveFile($value,$tmpPath);
                                $newsContent= str_replace($value,"/livemanage/".$tmpPath,$newsContent);
                            }
                        }
                        $content=helper::readFile($seResult[0]['news_html']);
                        $oldimgList;
                        $newimgList;
                        if($content){
                            $oldimgList= helper::getAllUploadImagePath($content);
                         if($oldimgList){
                             $newimgList=helper::getAllUploadImagePath($newsContent);
                             if($newimgList){
                                foreach ($oldimgList as $value){
                                    $isFind=false;
                                    foreach ($newimgList as $newvalue){
                                         if(str_replace('/livemanage/', '', $value)==str_replace('/livemanage/', '',$newvalue)){
                                             $isFind=true;
                                             break;
                                         }
                                    }
                                    if($isFind===false){
                                        //helper::deleteFile(substr($value, 3));
                                        
                                        helper::deleteFile(str_replace('/livemanage/','',$value),true);
                                    }
                                }
                             }
                             else{
                                 foreach ($oldimgList as $value){
                                     //helper::deleteFile(substr($value, 3));
                                     helper::deleteFile(str_replace('/livemanage/','',$value),true);
                                 }
                             }
                        }
                        }
                        if($newimgList){
                            foreach ($newimgList as $newvalue){
                                if(strpos($newvalue, '/livemanage/')===false){
                                    $newsContent= str_replace($newvalue,"/livemanage/".$newvalue,$newsContent);
                                }
                            }
                        }
                        if(helper::saveFile('./'.$seResult[0]['news_html'], $newsContent)==false){
                            $this->ajaxReturn("保存html文档失败！");
                        }
                    }
                    }
                }
        //$data['news_html']=$newsHtml;
         if($_FILES['newsthumbinalselect']['name']!=""){
                $upload = new \Think\Upload();// 实例化上传类
                $upload->maxSize   =     3145728 ;// 设置附件上传大小
                $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg','bmp');// 设置附件上传类型
                $upload->rootPath  =     './Public/Uploads/News/'; // 设置附件上传根目录
                $upload->savePath  =       $data['news_guid'].'/'; // 设置附件上传（子）目录
                // 上传文件
                $info   =   $upload->upload();
                if(!$info) {// 上传错误提示错误信息
                    $this->error($upload->getError());
                }else{// 上传成功
                    if($seResult&&count($seResult)>0){
                        helper::deleteFile(substr($seResult[0]['news_thumbinal'],1),true);
                    }
                    $thumbinalpath ='/Public/Uploads/News/'. $info['newsthumbinalselect']['savepath']. $info['newsthumbinalselect']['savename'];//获取保存的文件名
                    if($thumbinalpath){
                        $data["news_thumbinal"]=$thumbinalpath;
                    }
                    // $this->success($data);
                }
        }
       helper::deleteDir("Public/Uploads/Tmp/",false);
        if($news_info){
            /*
            $sql="update news_info set id=".$data['id'];
            if($data['news_title']!=null){
                $sql=$sql.",news_title='".$data['news_title']."'";
            }
            if($data['news_time']!=null){
                $sql=$sql.",news_time='".$data['news_time']."'";
            }
            if($data['news_thumbinal']!=null){
                $sql=$sql.",news_thumbinal='".$data['news_thumbinal']."'";
            }
            if($data['news_des']!=null){
                $sql=$sql.",news_des='".$data['news_des']."'";
            }
            if($data['news_html']!=null){
                $sql=$sql.",news_html='".$data['news_html']."'";
            }
            if($data['news_weight']!=null){
                $sql=$sql.",news_weight='".$data['news_weight']."'";
            }
            if($data['news_preview_count']!=null){
                $sql=$sql.",news_preview_count='".$data['news_preview_count']."'";
            }
            $sql=$sql." where id=".$data['id'];
            $res=$news_info->execute($sql);
            */
            $res=$news_info->where('id='.$data['id'])->save($data);
            if($res===false){
                $this->ajaxReturn("falied");
            }
            else{
                $this->ajaxReturn("success");
            }
        }
    }
    /**
     * 浏览动态，动态浏览量+1
     */   
    public  function viewNews(){
        $data['id']=$_GET['id'];
        if(! $data['id']){
            $data['id']=$_POST['id'];
        }
        $news_info=new Model("news_info");
        $selectsql="select news_preview_count from news_info where id='" . $data['id'] . "'";
        $seResult=$news_info->query($selectsql);
        if($seResult!=false){
                if(count($seResult)>0){
                    $previewCount=$seResult[0]["news_preview_count"];
                    $updateSql="update news_info set news_preview_count=".($previewCount+1)." where id=".$data['id'];
                    if($news_info->execute($selectsql)==false){
                        $this->ajaxReturn("falied");
                    }
                    else{
                        $this->ajaxReturn("success");
                    }
                }
            }
           $this->ajaxReturn("falied");
    }

    public function  addbanner(){
        $token = $_POST['bannertoken'];
        if ($token != session('token')) {
            //             /$this->redirect("/login");
            //$this->display("login");
            // return;
        }
        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize   =     3145728 ;// 设置附件上传大小
        $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg','bmp');// 设置附件上传类型
        $upload->rootPath  =     './Public/Uploads/Banner/'; // 设置附件上传根目录
        $upload->savePath  =  ''; // 设置附件上传（子）目录
        // 上传文件
        helper::makeDir('Public/Uploads/Banner');
        $info   =   $upload->upload();
        if(!$info) {// 上传错误提示错误信息
            $this->error($upload->getError());
        }else{// 上传成功
        
            $thumbinalpath ='/Public/Uploads/Banner/'. $info['thumbinalselect']['savepath']. $info['thumbinalselect']['savename'];//获取保存的文件名
            $data["banner_thumbinal"]=$thumbinalpath;
            // $this->success($data);
        }
        $data['banner_url']=$_POST['bannerurl'];
        $data['banner_weight']=$_POST['bannerweight'];
        //$data['create_time']=$_POST['create_time'];
        if(  $data['banner_url']==null||$data['banner_thumbinal']==null)
        {
            $this->ajaxReturn("参数错误！");
        }
        $banner_info=new Model("banner_info");
        if($banner_info)
        {
            $res=$banner_info->add($data);
            if($res==false)
            {
                $this->ajaxReturn("falied");
            } else {
                $this->ajaxReturn("success");
            }
        }
    }
    public function  getbanner(){
        $r_type = $_POST['r_type_link'];
        $page = $_POST['page'];
        $page_count = $_POST['pagecount'];
        $isLimit = true;
        if (! $page) {
            $page = 1;
        }
        if (! $page_count) {
            $page_count = 10;
        } else
            if ($page_count == - 1) {
                $isLimit = false;
            }
        $banner_info = new Model('banner_info');
        $count = $banner_info->count();
        $page_start = ($page - 1) * $page_count;
        
        if ($isLimit) {
            $banner_data = $banner_info->order('banner_weight asc')
            ->limit($page_start . ',' . $page_count)
            ->select();
        } else {
            $banner_data = $banner_info->order('banner_weight asc')->select();
        }
        if ($banner_data) {
            $res_data = array();
            $res_data['data'] = $banner_data;
            $res_data['page'] = $page;
            $res_data['total_num'] = $count; // 总记录数
            $res_data['page_size'] = $page_count; // 每页数量
            $res_data['page_cur'] = $page; // 当前页
            $res_data['page_total_num'] = ceil($count / $page_count); // 总页数
            $ress=json_encode($res_data);
            $this->ajaxReturn($ress);
        } else
            if (count($user_data) == 0) {
                $this->ajaxReturn("");
            } else {
                $this->ajaxReturn("查询失败!");
            }
    }
    public function  getbannerById(){
        $r_type = $_POST['r_type_link'];
        $id= $_POST['did'];
        $banner_info = new Model('banner_info');
        $sql="select * from banner_info where banner_id='" . $id . "'";
        $banner_data = $banner_info ->query($sql);
        if ($banner_data) {
            $res_data = array();
            $res_data['data'] = $banner_data;
            $this->ajaxReturn(json_encode($res_data));
        } else
            if (count($user_data) == 0) {
                $this->ajaxReturn("");
            } else {
                $this->ajaxReturn("查询失败!");
            }
    }
    public function  updatebanner(){
        $token = $_POST['bannertoken'];
        if ($token != session('token')) {
            $this->redirect("/login");
            return;
        }
        $data['banner_id']=$_POST['bannerid'];
        if(  $data['banner_id']==null){
            $this->ajaxReturn("参数错误！");
        }
        $banner_info=new Model("banner_info");
        $selectsql="select * from banner_info where banner_id='" .  $data['banner_id'] . "'";
        if($banner_info){
            $seResult=$banner_info->query($selectsql);
            if($seResult){
                if(count($seResult)>0){
                    $data['banner_thumbinal']=$seResult[0]['banner_thumbinal'];
                    $data['banner_url']=$seResult[0]['banner_url'];
                    $data['banner_weight']=$seResult[0]['banner_weight'];
                    $data['banner_isuse']=$seResult[0]['banner_isuse'];
                }
            }
        }
        
        if($_POST['bannerurl']!=null){
            $data['banner_url']=$_POST['bannerurl'];
        }
        if($_POST['bannerweight']!=null){
            $data['banner_weight']=$_POST['bannerweight'];
        }
        if($_FILES['thumbinalselect']['name']!=""){
            $upload = new \Think\Upload();// 实例化上传类
            $upload->maxSize   =     3145728 ;// 设置附件上传大小
            $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg','bmp');// 设置附件上传类型
            $upload->rootPath  =     './Public/Uploads/Banner/'; // 设置附件上传根目录
            $upload->savePath  =     ''; // 设置附件上传（子）目录
            // 上传文件
            $info   =   $upload->upload();
            if(!$info) {// 上传错误提示错误信息
                $this->error($upload->getError());
            }else{// 上传成功
        
                if($seResult){
                    for($i=0;$i<count($seResult);$i++){
                        if($info['thumbinalselect']){
                            helper::deleteFile(substr($seResult[$i]["banner_thumbinal"],1),true);
                        }
                    }
                }
                $thumbinalpath =null;
                if($info['thumbinalselect']){
                    $thumbinalpath=  '/Public/Uploads/Banner/'. $info['thumbinalselect']['savepath']. $info['thumbinalselect']['savename'];//获取保存的文件名
                }
                if($thumbinalpath){
                    $data["banner_thumbinal"]=$thumbinalpath;
                }
                // $this->success($data);
            }
        }
        if($banner_info){
            $res=$banner_info->where('banner_id='.$data['banner_id'])->save($data);
            if($res===false){
                $this->ajaxReturn("falied");
            }
            else{
                $this->ajaxReturn("success");
            }
        }
    } 

    public function  addapplyuser(){
        $token = $_POST['usertoken'];
        if ($token != session('token')) {
            //             /$this->redirect("/login");
            //$this->display("login");
            // return;
        }
        $data['apply_user_company']=$_POST['usercompany'];
        $data['apply_user_name']=$_POST['username'];
        $data['apply_user_phone']=$_POST['userphone'];
        $data['apply_user_mail']=$_POST['usermail'];
        //$data['create_time']=$_POST['create_time'];
        if(  $data['apply_user_name']==null||$data['apply_user_phone']==null)
        {
            $this->ajaxReturn("参数错误！");
        }
        $apply_user_info=new Model("apply_user_info");
        if($apply_user_info)
        {
            $res=$apply_user_info->add($data);
            if($res==false)
            {
                $this->ajaxReturn("falied");
            } else {
                $title="小脉直播新收到申请人：".$data['apply_user_name'];
                $content="收到一个申请人：<br/>公司：".$data['apply_user_company']."<br/>名字：".$data['apply_user_name']."<br/>电话：".$data['apply_user_phone']."<br/>邮箱：".$data['apply_user_mail'];
                try{
                    $mail_info=new Model("sendmail_info");
                    if($mail_info){
                        $mail_data = $mail_info->order('create_time desc')->select();
                        if ($mail_data) {
                            for($i=0;$i<count($mail_data);$i++){
                                SendMail($mail_data[$i]['s_mail'],$title,$content);
                            }
                        }
                    }
                }
                catch (Exception $e) {
                }
                $this->ajaxReturn("success");
            }
        }
    }
    public function  getapplyuser(){
        $r_type = $_POST['r_type_link'];
        $page = $_POST['page'];
        $page_count = $_POST['pagecount'];
        $isLimit = true;
        if (! $page) {
            $page = 1;
        }
        if (! $page_count) {
            $page_count = 10;
        } else
            if ($page_count == - 1) {
                $isLimit = false;
            }
        $apply_user_info = new Model('apply_user_info');
        $count = $apply_user_info->count();
        $page_start = ($page - 1) * $page_count;
        
        if ($isLimit) {
            $apply_user_data = $apply_user_info->order('apply_time desc')
            ->limit($page_start . ',' . $page_count)
            ->select();
        } else {
            $apply_user_data = $apply_user_info->order('apply_time desc')->select();
        }
        if ($apply_user_data) {
            $res_data = array();
            $res_data['data'] = $apply_user_data;
            $res_data['page'] = $page;
            $res_data['total_num'] = $count; // 总记录数
            $res_data['page_size'] = $page_count; // 每页数量
            $res_data['page_cur'] = $page; // 当前页
            $res_data['page_total_num'] = ceil($count / $page_count); // 总页数
            $ress=json_encode($res_data);
            $this->ajaxReturn($ress);
        } else
            if (count($user_data) == 0) {
                $this->ajaxReturn("");
            } else {
                $this->ajaxReturn("查询失败!");
            }
    }
    public function  getapplyuserById(){
        $r_type = $_POST['r_type_link'];
        $id= $_POST['did'];
        $apply_user_info = new Model('apply_user_info');
        $sql="select * from apply_user_info where apply_user_id='" . $id . "'";
        $apply_user_data = $apply_user_info ->query($sql);
        if ($apply_user_data) {
            $res_data = array();
            $res_data['data'] = $apply_user_data;
            $this->ajaxReturn(json_encode($res_data));
        } else
            if (count($user_data) == 0) {
                $this->ajaxReturn("");
            } else {
                $this->ajaxReturn("查询失败!");
            }
    }
    public function  updateapplyuser(){
        $token = $_POST['usertoken'];
        if ($token != session('token')) {
            $this->redirect("/login");
            return;
        }
        $data['apply_user_id']=$_POST['userid'];
        if(  $data['apply_user_id']==null){
            $this->ajaxReturn("参数错误！");
        }
        $apply_user_info=new Model("apply_user_info");
        $selectsql="select * from apply_user_info where apply_user_id='" .  $data['apply_user_id'] . "'";
        if($apply_user_info){
            $seResult=$apply_user_info->query($selectsql);
            if($seResult){
                if(count($seResult)>0){
                    $data['apply_user_company']=$seResult[0]['banner_thumbinal'];
                    $data['apply_user_name']=$seResult[0]['apply_user_name'];
                    $data['apply_user_phone']=$seResult[0]['apply_user_phone'];
                    $data['apply_user_mail']=$seResult[0]['apply_user_mail'];
                    $data['apply_time']=$seResult[0]['apply_time'];
                }
            }
        }
        
        if($_POST['usercompany']!=null){
            $data['apply_user_company']=$_POST['usercompany'];
        }
        if($_POST['username']!=null){
            $data['apply_user_name']=$_POST['username'];
        }
        if($_POST['userphone']!=null){
            $data['apply_user_phone']=$_POST['userphone'];
        }
        if($_POST['usermail']!=null){
            $data['apply_user_mail']=$_POST['usermail'];
        }
        if($apply_user_info){
            $res=$apply_user_info->where('apply_user_id='.$data['apply_user_id'])->save($data);
            if($res===false){
                $this->ajaxReturn("falied");
            }
            else{
                $this->ajaxReturn("success");
            }
        }
    }
    
    public function delete()
    {
        try {
            $token = $_POST['token'];
            if ($token != session('token')) {
                $this->redirect("login");
                return;
            }
            $r_type = $_POST['dtype'];
            $id = $_POST['did'];
            $res = "failed"; // alter table apartment_info FOREIGN key (user_id) REFERENCES user_info(userid) ON DELETE CASCADE;
            $deletesql = "";
            $selectsql = "";
            $table_connect;
            if ($r_type == "case") {
                $deletesql = "delete from case_info where id='" . $id . "'";
                $selectsql="select * from case_info where id='" . $id . "'";
                $table_connect = new Model("case_info");
            }
            else if ($r_type == "news") {
                    $deletesql = "delete from news_info where id='" . $id . "'";
                    $selectsql="select * from news_info where id='" . $id . "'";
                    $table_connect = new Model("news_info");
            }
            else if ($r_type == "banner") {
                    $deletesql = "delete from banner_info where banner_id='" . $id . "'";
                    $selectsql="select * from banner_info where banner_id='" . $id . "'";
                    $table_connect = new Model("banner_info");
            }
            else if ($r_type == "apply") {
                    $deletesql = "delete from apply_user_info where apply_user_id='" . $id . "'";
                    $selectsql="select * from apply_user_info where apply_user_id='" . $id . "'";
                    $table_connect = new Model("apply_user_info");
            }
            else if ($r_type == "mail") {
                    $deletesql = "delete from sendmail_info where id='" . $id . "'";
                    $selectsql="select * from sendmail_info where id='" . $id . "'";
                    $table_connect = new Model("apply_user_info");
            }
            $seResult=$table_connect->query($selectsql);
            if($seResult!=false){ 
              if ($r_type == "case") {
                    for($i=0;$i<count($seResult);$i++){
                        helper::deleteFile(substr($seResult[$i]["case_thumbinal"],1),true);
                        helper::deleteFile(substr($seResult[$i]["case_qrcode"],1),true);
                    }
                }
               else if ($r_type == "news") {
                    for($i=0;$i<count($seResult);$i++){
                        helper::deleteFile(substr($seResult[$i]["news_thumbinal"],1),true);
                        helper::deleteImgFromNewsHtml($seResult[$i]["news_html"]);
                        helper::deleteFile($seResult[$i]["news_html"],true);
                    }
                }
               else if ($r_type == "banner") {
                    for($i=0;$i<count($seResult);$i++){
                        helper::deleteFile(substr($seResult[$i]["banner_thumbinal"],1),false);
                    }
                }
               else if ($r_type == "apply") {
                }
            }
                        $result = $table_connect->execute($deletesql);
                        if ($result > 0) {
                            $res = "success";
                        }
                        else{
                            $res="falied";
                        }
                        $this->ajaxReturn($res);
        } catch (Exception $e) {
            $this->ajaxReturn($e->__toString());
        }
    }
    
    public  function deleteImage(){
        try {
            $token = $_POST['token'];
            if ($token != session('token')) {
               // $this->redirect("login");
              //  return;
            }
            $imageList = $_POST['imagelist'];
            if($imageList){
            foreach ($imageList as $value){
                //helper::deleteFile(substr($value, 3));
                helper::deleteFile(str_replace('/livemanage/', '', $value),true);
            }
            }
            $res = "success";             
            $this->ajaxReturn($res);
        } catch (Exception $e) {
            $this->ajaxReturn($e->__toString());
        }
    }

    public  function addmail(){
        $token = $_POST['mailtoken'];
        if ($token != session('token')) {
            //             /$this->redirect("/login");
            $this->display("login");
             return;
        }
        $data['mailname']=$_POST['sendname'];
        $data['s_mail']=$_POST['sendmail'];
        if(  $data['s_mail']==null)
        {
            $this->ajaxReturn("参数错误！");
        }
        $mail_info=new Model("sendmail_info");
        if($mail_info)
        {
            $res=$mail_info->add($data);
            if($res==false)
            {
                $this->ajaxReturn("falied");
            } else {
                $this->ajaxReturn("success");
            }
        }
    }
    public  function getmail(){
        $r_type = $_POST['r_type_link'];
        $page = $_POST['page'];
        $page_count = $_POST['pagecount'];
        $isLimit = true;
        if (! $page) {
            $page = 1;
        }
        if (! $page_count) {
            $page_count = 10;
        } else
            if ($page_count == - 1) {
                $isLimit = false;
            }
        $mail_info = new Model('sendmail_info');
        $count = $mail_info->count();
        $page_start = ($page - 1) * $page_count;
        
        if ($isLimit) {
            $mail_data = $mail_info->order('create_time desc')
            ->limit($page_start . ',' . $page_count)
            ->select();
        } else {
            $mail_data = $mail_info->order('create_time desc')->select();
        }
        if ($mail_data) {
            $res_data = array();
            $res_data['data'] = $mail_data;
            $res_data['page'] = $page;
            $res_data['total_num'] = $count; // 总记录数
            $res_data['page_size'] = $page_count; // 每页数量
            $res_data['page_cur'] = $page; // 当前页
            $res_data['page_total_num'] = ceil($count / $page_count); // 总页数
            $ress=json_encode($res_data);
            $this->ajaxReturn($ress);
        } else
            if (count($user_data) == 0) {
                $this->ajaxReturn("");
            } else {
                $this->ajaxReturn("查询失败!");
            }
    }
    public function  getmailById(){
        $r_type = $_POST['r_type_link'];
        $id= $_POST['did'];
        $mail_info = new Model('sendmail_info');
        $sql="select * from sendmail_info where id='" . $id . "'";
        $mail_data = $mail_info ->query($sql);
        if ($mail_data) {
            $res_data = array();
            $res_data['data'] = $mail_data;
            $this->ajaxReturn(json_encode($res_data));
        } else
            if (count($user_data) == 0) {
                $this->ajaxReturn("");
            } else {
                $this->ajaxReturn("查询失败!");
            }
    }
    public  function updatemail(){
        $token = $_POST['mailtoken'];
        if ($token != session('token')) {
            $this->redirect("/login");
            return;
        }
        $data['id']=$_POST['mailid'];
        if(  $data['id']==null){
            $this->ajaxReturn("参数错误！");
        }
        $mail_info=new Model("sendmail_info");
        $selectsql="select * from sendmail_info where id='" .  $data['id'] . "'";
        if($mail_info){
            $seResult=$mail_info->query($selectsql);
            if($seResult){
                if(count($seResult)>0){
                    $data['mailname']=$seResult[0]['mailname'];
                    $data['s_mail']=$seResult[0]['s_mail'];
                    $data['create_time']=$seResult[0]['create_time'];
                }
            }
        }

        if($_POST['sendname']!=null){
            $data['mailname']=$_POST['sendname'];
        }
        if($_POST['sendmail']!=null){
            $data['s_mail']=$_POST['sendmail'];
        }
        if($mail_info){
            $res=$mail_info->where('id='.$data['id'])->save($data);
            if($res===false){
                $this->ajaxReturn("falied");
            }
            else{
                $this->ajaxReturn("success");
            }
        }
    }
}


class helper{
    public static  function deleteImgFromNewsHtml($filePath){
        $content=helper::readFile($filePath);
        if($content){
        $res=    helper::getAllUploadImagePath($content);
        if($res!=null){
        foreach ($res as $value){
            //helper::deleteFile(substr($value, 3));
            helper::deleteFile(str_replace('/livemanage/', '', $value),true);
        }
        }
        }
    }
    /**
     * 保存文件
     *
     * @param string $fileName 文件名（含相对路径）
     * @param string $text 文件内容
     * @return boolean
     */
   public static  function saveFile($fileName, $data) {
        if (!$fileName || !$data)
            return false;
    
            //if (makeDir(dirname($fileName))) {
                if ($fp = fopen($fileName, "w")) {
                    if (@fwrite($fp, $data)) {
                        fclose($fp);
                        return true;
                    } else {
                        fclose($fp);
                        return false;
                    }
                }
           // }
            return false;
    }

    public static  function deleteFile($fileName,$isdeldir) {
        if (!$fileName)
            return false;
    
            //if (makeDir(dirname($fileName))) {
            if (is_file($fileName)) {
                if (unlink($fileName)) {
                    if($isdeldir===true){
                        rmdir(dirname($fileName));//删除空文件夹
                    }
                    return true;
                } else {
                    return false;
                }
           // }
             }
            return false;
    }

    public  static  function readFile($fileName){
        $content="";
        if( $fileHandle = fopen($fileName, "r+")){
            $fileSize = filesize($fileName);
            $content=  fread($fileHandle, $fileSize);
            fclose($fileHandle);
        }
        return $content;
    } 
    public  static  function moveFile($fileName,$newFileName){
       $content="";
       if (!file_exists($fileName)) {
           return false;
       }
       if(!is_dir(dirname($newFileName))){
       if(makeDir( dirname($newFileName))){
           return fasle;
       }
       }
       if (file_exists($newFileName)){
           unlink($newFileName);
       }
       rename($fileName, $newFileName);
       return true;
    }
    /**
     * 清空目录
     * @param string $dir 目录
     * @param boolean $isDDir 是否删除目录本身，true删除
     * @return boolean
     */
    public  static function deleteDir($dir,$isDDir){
        @$dh=opendir($dir);            //打开目录流
        while(!!$file=@readdir($dh)){
            if($file!='.' && $file!='..'){
                $fullpath=$dir.'/'.$file;
                if(!is_dir($fullpath)){        //如果是文件直接删除
                    unlink($fullpath);
                }else{                                //如果是目录 递归调用本身
                    helper::deleteDir($fullpath,true);
                }
            }
        }
        @closedir($dh);        //关闭目录流
        if($isDDir===true){
            if(@rmdir($dir)){        //删除目录本身
                return true;
            }else{
                return false;
            }
        }
        else{
            return true;
        }
    }
    /**
     * 连续创建目录
     *
     * @param string $dir 目录字符串
     * @param int $mode 权限数字
     * @return boolean
     */
   public static function makeDir($dir, $mode = 0777) {
        if (!dir) return false;
    
        if(!file_exists($dir)) {
            return mkdir($dir,$mode,true);
        } else {
            return true;
        }
         
    }
    public static function GUID(){
        $charid = strtoupper(md5(uniqid(mt_rand(), true)));
        $hyphen = chr(45);// "-"
        $uuid =// chr(123)// "{"
        substr($charid, 0, 8).$hyphen
        .substr($charid, 8, 4).$hyphen
        .substr($charid,12, 4).$hyphen
        .substr($charid,16, 4).$hyphen
        .substr($charid,20,12);
        //.chr(125);// "}"
        return $uuid;
    }
    public static function encrypt($string,$operation,$key=''){
        $key=md5($key);
        $key_length=strlen($key);
        $string=$operation=='D'?base64_decode($string):substr(md5($string.$key),0,8).$string;
        $string_length=strlen($string);
        $rndkey=$box=array();
        $result='';
        for($i=0;$i<=255;$i++){
            $rndkey[$i]=ord($key[$i%$key_length]);
            $box[$i]=$i;
        }
        for($j=$i=0;$i<256;$i++){
            $j=($j+$box[$i]+$rndkey[$i])%256;
            $tmp=$box[$i];
            $box[$i]=$box[$j];
            $box[$j]=$tmp;
        }
        for($a=$j=$i=0;$i<$string_length;$i++){
            $a=($a+1)%256;
            $j=($j+$box[$a])%256;
            $tmp=$box[$a];
            $box[$a]=$box[$j];
            $box[$j]=$tmp;
            $result.=chr(ord($string[$i])^($box[($box[$a]+$box[$j])%256]));
        }
        if($operation=='D'){
            if(substr($result,0,8)==substr(md5(substr($result,8).$key),0,8)){
                return substr($result,8);
            }else{
                return'';
            }
        }else{
            return str_replace('=','',base64_encode($result));
        }
    }
    public static function getAllUploadImagePath($data,$regStr=''){      
      $result=array();
        //$reg='/\.\.\/Public\/Uploads\/News\/\d{8}\/\d{14}_\d{5}\.(png|jpg|bmp|gif|jpeg)/g';
      //$reg='/\.\.\/Public\/Uploads\/News\/\d{8}\/\d{14}_\d{5}\.(png|jpg|bmp|gif|jpeg)/';
      if($regStr==''){
         $reg='/(\/livemanage\/){0,1}Public\/Uploads\/News\/\S{13}\/\S{13}\.(png|jpg|bmp|gif|jpeg)/';
      }
      else {
          $reg='/'.$regStr.'/';          
      }
        $matches = array();
        if(preg_match_all($reg, $data, $matches)){
            foreach ($matches as $value){
                if(count($value)>0){
                    foreach ($value as $item){
                        if(strlen($item)>4){
                            $result[]=$item;
                        }
                    }
                }
            }
            return $result;
        }
        return null;
    }
}