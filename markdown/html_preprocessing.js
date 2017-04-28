
var StringNode = function(data, property, description){
	        this.data = data;
        	this.property = property;
		this.description = description;
}

var html_preprocessing = function(content){
	var output = "";
	var parse_result=[];
	parse_result.publish = false;
	parse_result.code = [];
	content_array = content.split('\n');
	//console.log(content_array);
        //system_cmd
	var patt_tag = new RegExp("^!tag[ ]*");
	var patt_publish = new RegExp("^!publish[ ]*");
	//html
	var patt_html = new RegExp("^@html[ ]*$");
	var patt_htmll = new RegExp("^@htmll[ ]*$");
	//user defined markdown
	var patt_u2b = new RegExp("^@u2b[ ]*$");
	var patt_u2bee = new RegExp("^@u2bee[ ]*$");
	
	var patt_script = new RegExp("tag");

	var flag_code = false;
	var tmp_html_content = "";
	var tmp_content = "";
        StringSet = [];
	//parse_result.code.push("");
	for(id_content_array in content_array){
		each_content = content_array[id_content_array];
		//console.log(each_content);		
		if(patt_tag.test(each_content)){
			var tag_content = each_content.split('!tag')[1];
			var tag_content_array = tag_content.split(',');
			parse_result.tag_content_array = tag_content_array;
			StringSet.push(StringNode(tag_content_array, "system_cmd", "tag"));
			continue;
		}else if(patt_publish.test(each_content)){ 
			parse_result.publish = true;	
			var tmp = new StringNode(true, "system_cmd", "publish");
			//console.log(tmp);
			StringSet.push(tmp);
			//console.log('publish');
			continue;
		}else if(patt_html.test(each_content)){
			tmp_html_content = "";
			flag_code = true;			
			var tmp = new StringNode(tmp_content, "markdown_input", "");
			if(tmp_content!=""){
				StringSet.push(tmp);
			}
			tmp_content = "";
			continue;
		}else if(patt_htmll.test(each_content)){
			flag_code = false;
			parse_result.code.push(tmp_content);
			if(patt_script.test(tmp_html_content)){
				console.log('script included');		
			}else{
			var tmp = new StringNode(tmp_html_content, "html", "");
			StringSet.push(tmp);
			}
			tmp_content = "";
			continue;
		}
		
		if(flag_code){
			tmp_html_content += each_content;
			console.log('save code:'+tmp_html_content);
		}else{
			output+= each_content + '\n';
			tmp_content += each_content + '\n';
	//		console.log(tmp_content);
		
		}
		
	}
	if(tmp_content!=""){
		var tmp = new StringNode(tmp_content, "markdown_input", "");
		StringSet.push(tmp);
	}
//	console.log('parse_result.code:'+StringSet);
	return [output, parse_result, StringSet]
	//return html_string;
}
