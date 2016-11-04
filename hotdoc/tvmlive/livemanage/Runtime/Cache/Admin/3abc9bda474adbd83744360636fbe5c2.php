<?php if (!defined('THINK_PATH')) exit();?>
<h2 class="sub-header">添加邮件地址</h2>
	<form name="fmMailInsert" id="fmMailInsert" method="post" action="javascript:void(0)" enctype="multipart/form-data">
                <div class="addBox">
                
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
               
                <div class="modal-footer" style="text-align: center;"s>
	    			<input type="hidden" id="mailtoken" name="mailtoken" >
                    <button name="btnResetMail" id="btnResetMail" onclick="resetMail()" type="button" class="btn btn-default">清空
                    </button>
                    <button name="btnSubmitMail" id="btnSubmitMail" onclick="mailSummit(this.form)" type="button" class="btn btn-primary">
                        添加
                    </button>
                </div>
	</form>
 <!-- /.modal-content -->