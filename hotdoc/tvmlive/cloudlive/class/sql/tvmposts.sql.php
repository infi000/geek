<?php
/**
 * SQL文件(多维系统)
 * To contact the author write to {@link jingyunshan@ceopen.cn}
 * @author 景云山
 */

class SqlPosts {
	
	public $sqlArrPosts = array(
		'selectTaxonomy' => "SELECT term_taxonomy_id,term_id,taxonomy,description,parent,count FROM blog_dwnews_term_taxonomy ",
		'selectIterm' => "SELECT term_id,name,slug,term_group,user_id FROM blog_dwnews_terms ",
		'selectRelationships' => "SELECT object_id,term_taxonomy_id,term_order FROM blog_dwnews_term_relationships ",
		'selectRelationshipsTotal' => "SELECT count(object_id) as total FROM blog_dwnews_term_relationships ",
		'selectPostsTotal' => "SELECT count(ID) as total FROM blog_dwnews_posts where post_status='publish' and post_type='post' and ",
		'selectPostsObjectId' => "SELECT ID FROM blog_dwnews_posts ",
		'selectPosts' => "SELECT post_date,guid,post_author,ID,post_title,post_name,post_author as post_authorid,post_date_gmt,post_content,post_excerpt,post_status,comment_status,ping_status,post_password,
			to_ping,pinged,post_modified,post_modified_gmt,post_content_filtered,post_parent,menu_order,post_type,post_mime_type,comment_count FROM blog_dwnews_posts where post_status='publish' and post_type='post' and ID in ",
		'selectPostsUser' => "SELECT post_date,guid,post_author,ID,post_title,post_name,post_date_gmt,post_content,post_excerpt,post_status,comment_status FROM blog_dwnews_posts where post_status='publish' and post_type='post' and post_author in ",
		'selectUser' => "SELECT ID,user_login,user_pass,user_nicename,user_email,user_url,user_registered,user_activation_key,user_status,display_name FROM blog_dwnews_users where ID in ",
		'updateRelationships' => "UPDATE blog_dwnews_term_relationships SET term_taxonomy_id = ? WHERE term_taxonomy_id = ? and object_id in ",
		'updateRelationshipsNew' => "UPDATE blog_dwnews_term_relationships SET term_taxonomy_id = ? WHERE term_taxonomy_id = ? and object_id =?",
		'deleteRelationships' => "delete from blog_dwnews_term_relationships WHERE term_taxonomy_id = ? and object_id =?",
		'updateTermTaxonomyCount' => "UPDATE blog_dwnews_term_taxonomy SET count = (count + ?) WhERE term_taxonomy_id = ?",
		'updatePostsDisplayHome' => "UPDATE blog_dwnews_posts SET display_home = IF(display_home,0,1) WHERE ID = ? ",
		'updatePostsDisplayHome' => "UPDATE blog_dwnews_posts SET display_home = IF(display_home,0,1) WHERE ID = ? ",
		'postsfabu' => array('select' =>"SELECT id,title,url,sort,type,comment,img,category,channelid,fabu,delflag FROM postfabu where delflag = 0 and type = ? order by sort asc ",
			'delete' => "UPDATE postfabu SET delflag = 1 where delflag = 0 and type = ?",
			'tempTable' => "create temporary table temp_tbl (title varchar(255),url varchar(255),sort tinyint,type tinyint,comment varchar(255),img varchar(255),category varchar(80),channelid int,fabu tinyint,delflag tinyint)DEFAULT CHARSET=utf8 ",
			'dropTemp' => "DROP TABLE IF EXISTS temp_tbl",
			'insertTemp' =>"insert into temp_tbl( title,url,sort,type,comment,img,category,channelid,fabu,delflag ) values(?,?,?,?,?,?,?,?,?,?)",
			"insert" => "insert into postfabu( title,url,sort,type,comment,img,category,channelid,fabu,delflag )(select title,url,sort,type,comment,img,category,channelid,fabu,delflag from temp_tbl)"
			),
		'author' => array('selectAuthor' => "SELECT ID,user_login,user_pass,ID as joinid,ID as joinid2,user_nicename,user_email,user_url,user_registered,user_activation_key,user_status,display_name FROM blog_dwnews_users WHERE ID in ",
			'selectAuthorTotal' => "SELECT count(ID) as total FROM blog_dwnews_users ",
			'selectAuthorId' => "SELECT ID FROM blog_dwnews_users ",
			'selectAuthorLevel'=>"SELECT user_id FROM blog_dwnews_usermeta WHERE meta_key = 'author_level' and meta_value = ?",
			'selectExpertLevel'=>"SELECT user_id FROM blog_dwnews_usermeta WHERE meta_key = 'expert_level' and meta_value = ?",
			'selectAuthorMeta'=>"SELECT meta_value FROM blog_dwnews_usermeta WHERE user_id = ? and meta_key = ?",
			'selectAllAuthorMeta'=>"SELECT user_id,meta_value FROM blog_dwnews_usermeta WHERE meta_key = ? and user_id in ",
			),
		'termsTaxonomy' => array('selectTerms'=>'SELECT term_id FROM blog_dwnews_terms',
			'selectTaxonomy' => 'SELECT term_taxonomy_id FROM blog_dwnews_term_taxonomy',
			'selectRelationships' => 'SELECT object_id FROM blog_dwnews_term_relationships'
			)
		);

	/**
	 * 析构函数
	 * 
	 * @return void
	 */
	public function __destruct(){
		unset( $this->sqlArrPosts );
	}
}