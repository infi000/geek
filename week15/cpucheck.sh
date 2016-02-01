echo "pm2启动中....."
# 设定cpu阀值；
maxCpu=85
# 开启服务
 pm2 start app.js
#得到pid
pid=`ps -ef|grep app.js|grep -v grep|awk '{print $2}'`
#判断服务开启
if [ ! $pid ]
	then
	echo "服务没有开启，请开启服务"
    break
fi
#每隔600s检测一次CPU使用率
while [ true ] 
do
	#statements
#得到cpu使用率
cpu=`ps -p $pid -o pcpu|grep -v CPU|awk -F. '{print $2}'`
#使用率超过预设阀值时，重启
  if [ "$cpu" -gt "$maxCpu" ]
	then
	echo "CPU使用率过多，即将重启服务"
	sleep 2s
	pm2 restart app.js
else
	echo 'cpu='$cpu',cpu正常'
fi
sleep 600s
done
