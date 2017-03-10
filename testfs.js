fs = require('fs');
fs.stat('index.html', function(err, stats){
//	var mtime = new Date(util.inspect(stats.mtime));
//	console.log(mtime);
	console.log(stats.mtime);
	console.log(stats);
});
