<?php if (!defined('THINK_PATH')) exit();?>
    <!-- 模态框（Modal） case修改-->    
        <div class="modal-dialog">
            <div class="modal-content">
			
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                    请修改当前案例
                </h4>
                </div>
                <form name="fmCaseUpdate" id="fmCaseUpdate" method="post" action="javascript:void(0)" enctype="multipart/form-data">
                <div class="modal-body">
                    <div class="input-group">
                        <span class="input-group-addon">标题</span>
                        <input type="text" class="form-control" name="casetitle" id="casetitle" placeholder="案例标题">
                        <span class="input-group-addon input-group-inport">*</span>
                    </div>
                    <div class="input-group">
                        <div class="input-group">
                            <span class="input-group-addon">权重</span>
                             <input name="caseweight" id="caseweight"  type="text" class="form-control" value="0" maxlength="7">
                            <span class="input-group-addon input-group-inport">(越小越靠前)</span>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">缩略图</div>
                        <div class="panel-body" style="text-align: center;">
                            <input type="file" name="thumbinalselect" id="thumbinalselect"  onchange="setCaseImageThumbinal()"  style="float:left;margin-bottom:10px;"><span class="input-group-inport" style="float:right">*</span>
                            <div class="clear"></div>
                            <img  name="casethumbinal" id="casethumbinal" alt="" src=""  class="img-thumbnail" width="200">
	    					<input type="hidden" id="casethumbinalpath" name="casethumbinalpath" >
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">二维码</div>
                        <div class="panel-body"  style="text-align: center;">
                            <input type="file" id="qrcodeselect" name="qrcodeselect" onchange="setCaseImageQrcode()" style="float:left;margin-bottom:10px;"><span class="input-group-inport" style="float:right">*</span>
                            <div class="clear"></div>
                            <img name="caseqrcode" id="caseqrcode" alt="" src="" width="200">
	    					<input type="hidden" id="caseqrcodepath" name="caseqrcodepath" >
                        </div>
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
	    			<input type="hidden" id="casetoken" name="casetoken" >
	    			<input type="hidden" id="caseid" name="caseid" >
	    			<input type="hidden" id="caseguid" name="caseguid" >
                    <button name="btnResetCase" id="btnResetCase" onclick="backCase()" type="button" class="btn btn-default">重置
                    </button>
                    <button name="btnSubmitCase" id="btnSubmitCase" onclick="caseUpdateSummit(this.form)" type="button" class="btn btn-primary">
                        提交更改
                    </button>
                </div>
            </div>
		</form>
            <!-- /.modal-content -->
        </div>
<!--
<form name="fmCaseUpdate" id="fmCaseUpdate" method="post" action="javascript:void(0)" enctype="multipart/form-data">
	<table width="Auto" border="1" cellspacing="1" cellpadding="1" style="border-collapse:collapse;">
	  <tr>
	    <td colspan="2" align="center">案例修改</td>
	  </tr>
	  <tr>
	    <td width="100" height="30" align="right">标题：</td>
	    <td  align="left" width="759"><input name="casetitle" type="text" id="casetitle" size="40"><span style="color:red;">*</span></td>
	  </tr>
	  <tr>
	    <td width="100" height="200" align="right">缩略图：</td>
	    <td  align="left" width="759">
	    	<img name="casethumbinal" id="casethumbinal" alt="" src="" width="200" height="200">
	    	<input type="file" name="thumbinalselect" id="thumbinalselect"  onchange="setCaseImageThumbinal()" style="cursor:pointer;">
	    	<input type="hidden" id="casethumbinalpath" name="casethumbinalpath" >
	    	<span style="color:red;">*</span>
	    </td>
	  </tr>
	  <tr>
	    <td width="100" height="200" align="right">二维码：</td>
	    <td  align="left" width="759">
	    	<img name="caseqrcode" type="text" id="caseqrcode" alt="" src="" width="200" height="200">	    	
	    	<input type="file" id="qrcodeselect" name="qrcodeselect" onchange="setCaseImageQrcode()"  style="cursor:pointer;">
	    	<input type="hidden" id="caseqrcodepath" name="caseqrcodepath" >
	    	<span style="color:red;">*</span>
	    </td>
	  </tr>
	  <tr>
	    <td width="100" height="30" align="right">权重：</td>
	    <td  align="left" width="559">    	
	    	<input name="caseweight" id="caseweight" type="text" value="0" >
	    	<span style="color:red;">(越小越靠前)</span>
	    </td>
	  </tr>
	  <tr>
	    <td colspan="2">
	    	<input type="hidden" id="casetoken" name="casetoken" >
	    	<input type="hidden" id="caseid" name="caseid" >
	    	<input type="hidden" id="caseguid" name="caseguid" >
	    	<input type="submit" name="btnSubmitCase" id="btnSubmitCase" onclick="caseUpdateSummit(this.form)" value="修改">
	      	&nbsp;&nbsp;&nbsp;&nbsp;
	      	<input type="reset" name="btnResetCase" id="btnResetCase" onclick="backCase()" value="取消">
	     </td>
	  </tr>
	</table>
</form>
-->