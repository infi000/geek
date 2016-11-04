<?php
/**********
 * 发送邮件 *
 **********/
function SendMail($to,$title,$content)
{
    vendor('PHPMailer.class#phpmailer');
    $mail = new PHPMailer(); //实例化  
    $mail->IsSMTP(); // 启用SMTP  
    $mail->Host=C('MAIL_HOST'); //smtp服务器的名称  
    $mail->SMTPAuth = C('MAIL_SMTPAUTH'); //启用smtp认证  
    $mail->Username = C('MAIL_USERNAME'); //你的邮箱名  
    $mail->Password = C('MAIL_PASSWORD') ; //此处不是邮箱密码，而是你的邮箱开启第三方登录时，设置的验证码  
    $mail->From = C('MAIL_FROM'); //发件人地址（也就是你的邮箱地址）  
    $mail->FromName = C('MAIL_FROMNAME'); //发件人姓名      
    $mail->AddAddress($to,"");   
    $mail->WordWrap = 50; //设置每行字符长度   
    $mail->IsHTML(C('MAIL_ISHTML')); // 是否HTML格式邮件   
    $mail->CharSet=C('MAIL_CHARSET'); //设置邮件编码  
    $mail->Subject =$title; //邮件主题   
    $mail->Body = $content; //邮件内容  
   // $mail->AltBody = "这是一个纯文本的身体在非营利的HTML电子邮件客户端"; //邮件正文不支持HTML的备用显示  
    // 发送邮件。
    return($mail->Send());
}
?>