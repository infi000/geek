## 什么是cookie? ##
cookie 是存储于访问者的计算机中的变量。每当同一台计算机通过浏览器请求某个页面时，就会发送这个 cookie。你可以使用 JavaScript 来创建和取回 cookie 的值。
## 有关cookie的例子： ##
- 名字 cookie
当访问者首次访问页面时，他或她也许会填写他/她们的名字。名字会存储于 cookie 中。当访问者再次访问网站时，他们会收到类似 "Welcome John Doe!" 的欢迎词。而名字则是从 cookie 中取回的。

- 密码 cookie
当访问者首次访问页面时，他或她也许会填写他/她们的密码。密码也可被存储于 cookie 中。当他们再次访问网站时，密码就会从 cookie 中取回。

- 日期 cookie
当访问者首次访问你的网站时，当前的日期可存储于 cookie 中。当他们再次访问网站时，他们会收到类似这样的一条消息："Your last visit was on Tuesday August 11, 2005!"。日期也是从 cookie 中取回的。

## 创建和存储 cookie ##

在这个例子中我们要创建一个存储访问者名字的 cookie。当访问者首次访问网站时，他们会被要求填写姓名。名字会存储于 cookie 中。当访问者再次访问网站时，他们就会收到欢迎词。

首先，我们会创建一个可在 cookie 变量中存储访问者姓名的函数：
> **function setCookie(c_name,value,expiredays)<br>
{<br>
var exdate=new Date()<br>
exdate.setDate(exdate.getDate()+expiredays)<br>
document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";<br>
expires="+exdate.toGMTString())<br>
}<br>**

上面这个函数中的参数存有 cookie 的名称、值以及过期天数。
在上面的函数中，我们首先将天数转换为有效的日期，然后，我们将 cookie 名称、值及其过期日期存入 document.cookie 对象。

之后，我们要创建另一个函数来检查是否已设置 cookie：
> **function getCookie(c_name)<br>
{<br>
if (document.cookie.length>0)<br>
  {<br>
  c_start=document.cookie.indexOf(c_name + "=")<br>
  if (c_start!=-1)<br>
    { <br>
    c_start=c_start + c_name.length+1 <br>
    c_end=document.cookie.indexOf(";",c_start)<br>
    if (c_end==-1) c_end=document.cookie.length<br>
    return unescape(document.cookie.substring<br>(c_start,c_end))<br>
    } <br>
  }<br>
return ""<br>
}**

上面的函数首先会检查 document.cookie 对象中是否存有 cookie。假如 document.cookie 对象存有某些 cookie，那么会继续检查我们指定的 cookie 是否已储存。如果找到了我们要的 cookie，就返回值，否则返回空字符串。

最后，我们要创建一个函数，这个函数的作用是：如果 cookie 已设置，则显示欢迎词，否则显示提示框来要求用户输入名字。

> **function checkCookie()<br>
{<br>
username=getCookie('username')<br>
if (username!=null && username!="")<br>
  {alert('Welcome again '+username+'!')}<br>
else <br>
  {<br>
  username=prompt('Please enter your name:',"")<br>
  if (username!=null && username!="")<br>
    {<br>
    setCookie('username',username,365)<br>
    }<br>
  }<br>
}<br>**
    
