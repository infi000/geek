<?php if (!defined('THINK_PATH')) exit();?>
    <!-- 模态框（Modal）banner修改-->    
        <div class="modal-dialog">
            <div class="modal-content">
			
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                    请修改当前Banner
                </h4>
                </div>
                <form name="fmBannerUpdate" id="fmBannerUpdate" method="post" action="javascript:void(0)" enctype="multipart/form-data">
                <div class="modal-body">
    				<div class="input-group">
                        <span class="input-group-addon">相关链接</span>
                        <input type="text" id='bannerurl' name='bannerurl' class="form-control" placeholder="输入需要链接的地址">
                        <span class="input-group-addon input-group-inport">*</span>
                    </div>
                    <div class="input-group">
                        <div class="input-group">
                            <span class="input-group-addon">权重</span>
                             <input name="bannerweight" id="bannerweight"  type="text" class="form-control" value="0" maxlength="7">
                            <span class="input-group-addon input-group-inport">(越小越靠前)</span>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">Banner图</div>
                        <div class="panel-body" style="text-align: center;">
                            <input type="file" name="thumbinalselect" id="thumbinalselect"  onchange="setBannerImageThumbinal()"  style="float:left;margin-bottom:10px;"><span class="input-group-inport" style="float:right">*</span>
                            <div class="clear"></div>
                            <img  name="bannerthumbinal" id="bannerthumbinal" alt="" src=""  class="img-thumbnail" width="200">
	    					<input type="hidden" id="bannerthumbinalpath" name="bannerthumbinalpath" >
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
	    			<input type="hidden" id="bannertoken" name="bannertoken" >
	    			<input type="hidden" id="bannerid" name="bannerid" >
                    <button name="btnResetBanner" id="btnResetBanner" onclick="backBanner()" type="button" class="btn btn-default">重置
                    </button>
                    <button name="btnSubmitBanner" id="btnSubmitBanner" onclick="bannerUpdateSummit(this.form)" type="button" class="btn btn-primary">
                        提交更改
                    </button>
                </div>
            </div>
		</form>
            <!-- /.modal-content -->
        </div>