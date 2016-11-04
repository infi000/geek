<?php if (!defined('THINK_PATH')) exit();?>
<h2 class="sub-header">添加Banner</h2>
	<form name="fmBannerInsert" id="fmBannerInsert" method="post" action="javascript:void(0)" enctype="multipart/form-data">
                <div class="addBox">
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
               
                <div class="modal-footer" style="text-align: center;"s>
	    			<input type="hidden" id="bannertoken" name="bannertoken" >
                    <button name="btnResetBanner" id="btnResetBanner" onclick="resetBanner()" type="button" class="btn btn-default">清空
                    </button>
                    <button name="btnSubmitBanner" id="btnSubmitBanner" onclick="bannerSummit(this.form)" type="button" class="btn btn-primary">
                        添加
                    </button>
                </div>
	</form>
 <!-- /.modal-content -->