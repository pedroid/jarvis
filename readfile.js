var fs = require('fs');
 
fs.readFile('blog/DATA', 'utf8', function(err, contents) {
	if(contents){
    		console.log(contents);
	}else{
		console.log('file not exist');
	}
});
