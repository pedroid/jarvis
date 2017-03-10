function html_preprocessing(content){
	var output = "";
	var parse_result=[];
	parse_result.publish = false;
	content_array = content.split('\n');
	console.log(content_array);
        var patt_tag = new RegExp("^!tag ");
	var patt_publish = new RegExp("^!publish");
	for(id_content_array in content_array){
		each_content = content_array[id_content_array];
		if(patt_tag.test(each_content)){
			var tag_content = each_content.split('!tag')[1];
			var tag_content_array = tag_content.split(',');
			parse_result.tag_content_array = tag_content_array;
		//	console.log(tag_content_array);
		}else if(patt_publish.test(each_content)){ 
			parse_result.publish = true;	
		}else{
			output+= each_content+'\n';
		}
	}
	return [output,parse_result]
	//return html_string;
}
