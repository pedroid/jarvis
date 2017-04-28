var html_preprocessing = function(content){
	var output = "";
	var parse_result=[];
	parse_result.publish = false;
	parse_result.code = [];
	content_array = content.split('\n');
	//console.log(content_array);
        //system_cmd
	var patt_tag = new RegExp("^!tag ");
	var patt_publish = new RegExp("^!publish");
	//html
	var patt_html = new RegExp("^@html$");
	var patt_htmll = new RegExp("^@htmll$");
	//
	var flag_code = false;
	var tmp_content = "";
	//parse_result.code.push("");
	for(id_content_array in content_array){
		each_content = content_array[id_content_array];
		console.log(each_content);		
		if(patt_tag.test(each_content)){
			var tag_content = each_content.split('!tag')[1];
			var tag_content_array = tag_content.split(',');
			parse_result.tag_content_array = tag_content_array;
		//	console.log(tag_content_array);
		}else if(patt_publish.test(each_content)){ 
			parse_result.publish = true;	
		}else if(patt_html.test(each_content)){
			tmp_content = "";
			flag_code = true;			
			continue
		}
		else if(patt_htmll.test(each_content)){
			flag_code = false;
			parse_result.code.push(tmp_content);
			continue;
		}
		
		if(flag_code){
			tmp_content += each_content;
		}else{
			output+= each_content + '\n';
		
		}
		
	}
	console.log('parse_result.code:'+parse_result.code);
	return [output, parse_result]
	//return html_string;
}
