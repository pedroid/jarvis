function text2UML_in_JSON(text){
	console.log('text:'+ text);
	var compiler = new Compiler();
	var tokens = compiler.lexical(text);
	text_set = text.split('\n');
	
	var output = text_set;
	return output
}
