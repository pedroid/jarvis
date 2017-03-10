var forfun;
function html_advance(html_string){
	forfun = html_string;
//	console.log('html:'+html_string);
	var output = html_string.replace("@u2b","<iframe width='600' height='450' src='").replace('@u2bee',"'></iframe>");
//	html_string = html_string.replace('youtube',"<iframe width='420' height='315' src='");
//	html_string = html_string.replace(/youtubee/g,"'></iframe>");
//	output = html_string;
//	console.log(output);
	return output
	//return html_string;
}
