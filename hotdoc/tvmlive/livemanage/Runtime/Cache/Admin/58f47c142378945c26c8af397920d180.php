<?php if (!defined('THINK_PATH')) exit();?>
    <!-- 模态框（Modal）邮件地址修改-->    
        <div class="modal-dialog">
            <div class="modal-content">
			
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                    请修改当前邮件地址
                </h4>
                </div>
                <form name="fmMailUpdate" id="fmMailUpdate" method="post" action="javascript:void(0)" enctype="multipart/form-data">
                <div class="modal-body">
                   <div class="input-group">
                        <span class="input-group-addon">名字</span>
                        <input type="text" id='sendname' name='sendname' class="form-control" placeholder="名字">
                        <span class="input-group-addon input-group-inport">*</span>
                    </div>
    				<div class="input-group">
                        <span class="input-group-addon">邮件地址</span>
                        <input type="text" id='sendmail' name='sendmail' class="form-control" placeholder="输入合法的邮件地址">
                        <span class="input-group-addon input-group-inport">*</span>
                    </div>
                </div>
                <!-- 表单提交时的验证提示框 -->
				<!-- 
                <div id="myAlert" class="alert alert-danger" style="text-align: left;">
                    <a href="#" class="close" data-dismiss="alert">&times;</a>
                    <strong>警告！</strong>您的网络连接有问题。
                </div>
                -->
                <div class="modal-footer">
	    			<input type="hidden" id="mailtoken" name="mailtoken" >
	    			<input type="hidden" id="mailid" name="mailid" >
                    <button name="btnResetMail" id="btnResetMail" onclick="backMail()" type="button" class="btn btn-default">重置
                    </button>
                    <button name="btnSubmitMail" id="btnSubmitMail" onclick="mailUpdateSummit(this.form)" type="button" class="btn btn-primary">
                        提交更改
                    </button>
                </div>
            </div>
		</form>
            <!-- /.modal-content -->
        </div>