forfun = require('child_process');

forfun.exec('sh blog/update.sh', function(err, stdout, stderr){
	console.log(err, stdout, stderr);
});
