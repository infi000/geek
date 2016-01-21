## shell ##

- alias设置别名：
查看列表：`root@itnms-public:~# alias`；设置别名：`[root@web-1 ~]# alias tomcat='ps -ef | grep tomcat'`；删除别名：`root@itnms-public:~# unalias cls`；
- env查看环境变量:
- 开机运行alias设置的别名：`root@itnms-public:/etc/profile.d#`路径下配置一个.sh的文件，在里面添加需要这设置的别名，这样在下次开机时候别名会自动保存。因为`/etc/profile`文件会在开机的时候自动执行，里面有一句是执行`/etc/profile.d`目录下的*sh文件。
