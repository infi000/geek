<?php if (!defined('THINK_PATH')) exit();?><h2 class="sub-header">添加最新动态</h2>
<form name="fmNewsInsert" id="fmNewsInsert" method="post" action="javascript:void(0)" enctype="multipart/form-data">
 <div class="addBox" style="width:820px;">
                    <div class="input-group">
                        <span class="input-group-addon">标题</span>
                        <input name="newstitle" type="text" id="newstitle" class="form-control" placeholder="动态标题">
                        <span class="input-group-addon input-group-inport">*</span>
                    </div>
                    <div>
                        <div class="input-group" style="width:300px;float: left">
                            <span class="input-group-addon">时间</span>
                            <input type="date"  id="newsdate" name="newsdate" class="form-control">
                            <span class="input-group-addon input-group-inport">*</span>
                        </div>
                        <div class="input-group" style="width:240px;float: right;">
                            <span class="input-group-addon">权重</span>
                            <input name="newsweight" id="newsweight"  type="text" class="form-control" value="0" maxlength="7">
                            <span class="input-group-addon input-group-inport">(越小越靠前)</span>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">缩略图</div>
                        <div class="panel-body" style="text-align: center;">
                            <input type="file" name="newsthumbinalselect" id="newsthumbinalselect"  onchange="setNewsImageThumbinal()" style="float:left;margin-bottom:10px;"><span class="input-group-inport" style="float:right">*</span>
                            <div class="clear"></div>
                            <img  name="newsthumbinal" id="newsthumbinal" alt="" src="" class="img-thumbnail" width="200">
	    					<input type="hidden" id="newsthumbinalpath" name="newsthumbinalpath" >
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">简介</div>
                        <div class="panel-body">
                            <textarea name="newsdescribe" id="newsdescribe"  rows="10" style="width: 100%;height: 100px; resize: none"> </textarea>
                        </div>
                    </div>
                    
                    <div class="panel panel-default" style="height:650px;">
                        <div class="panel-heading">动态页面</div>
                        <div class="panel-body" style="padding:0px;height:615px;">
                            <div id="edit" style="height:615px;">
                                <!-- 这里加载你得编辑组件 -->
                                <!-- 这里加载你得编辑组件 -->
                                <!-- 这里加载你得编辑组件 -->
                                <iframe src="admin.php?s=editor.html" width="99%" height="100%" name="newsiframe" frameborder="0" scrolling="no"></iframe>
                            </div>
                        </div>
                    </div>
                    <div class="button-group" style="text-align: center;">
	    				<input type="hidden" id="newstoken" name="newstoken" >
	    				<input type="hidden" id="newshtmlcontent" name="newshtmlcontent" >
                        <button type="button" name="btnResetNews" id="btnResetNews" onclick="resetNewsAdd(true)"  class="btn btn-default">清空
                        </button>
                        <button type="button" name="btnSubmitNews" id="btnSubmitNews" onclick="newsSummit(this.form)" class="btn btn-primary">
                            添加
                        </button>
                    </div>
                </div>
</form>


<!-- 
<form name="fmNewsInsert" id="fmNewsInsert" method="post" action="javascript:void(0)" enctype="multipart/form-data">
	<table width="Auto" border="1" cellspacing="1" cellpadding="1" style="border-collapse:collapse;">
	  <tr>
	    <td colspan="2" align="center">动态添加</td>
	  </tr>
	  <tr>
	    <td width="100" height="30" align="right">标题：</td>
	    <td  align="left" width="759"><input name="newstitle" type="text" id="newstitle" size="40"><span style="color:red;">*</span></td>
	  </tr>
	  <tr>	   
	    <td width="100" height="30" align="right">时间：</td>
	    <td  align="left" width="759"> 
	       	<input type="date" id="newsdate" name="newsdate"/>
	    	<span style="color:red;">*</span>
	    </td>
	  </tr>
	  <tr>
	    <td width="100" height="200" align="right">缩略图：</td>
	    <td  align="left" width="759">
	    	<img name="newsthumbinal" id="newsthumbinal" alt="" src="" width="200" height="200">
	    	<input type="file" name="newsthumbinalselect" id="newsthumbinalselect"  onchange="setNewsImageThumbinal()" style="cursor:pointer;">
	    	<input type="hidden" id="newsthumbinalpath" name="newsthumbinalpath" >
	    	<span style="color:red;">*</span>
	    </td>
	  </tr>
	  <tr>
	    <td width="100" height="200" align="right">简介：</td>
	    <td  align="left" width="759"> 
	       	<textarea name="newsdescribe" id="newsdescribe" style="width:700px;height:180px"></textarea>
	    	<span style="color:red;">*</span>
	    </td>
	  </tr>
	  <tr>
	    <td width="100" height="30" align="right">权重：</td>
	    <td  align="left" width="759">    	
	    	<input name="newsweight" id="newsweight" type="text" value="0" >
	    	<span style="color:red;">(越小越靠前)</span>
	    </td>
	  </tr>
	  <tr>
	    <td width="auto" height="600" align="center" colspan="2">  
	     <iframe src="editor.html" width="99%" height="99%" name="newsiframe" frameborder= scrolling=NO></iframe>
	    </td>
	  </tr>
	  <tr>
	    <td colspan="2">
	    	<input type="hidden" id="newstoken" name="newstoken" >
	    	<input type="hidden" id="newshtmlcontent" name="newshtmlcontent" >
	    	<input type="submit" name="btnSubmitNews" id="btnSubmitNews" onclick="newsSummit(this.form)" value="保存">
	      	&nbsp;&nbsp;&nbsp;&nbsp;
	      	<input type="reset" name="btnResetNews" id="btnResetNews" onclick="resetNewsAdd(true)" value="清空">
	     </td>
	  </tr>
	</table>
</form>
 -->