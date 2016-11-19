(function(){


	module.exports = {
		parse:function(data){
			console.log('compiler: parse');
		}
	}

	if(!module.parent){
		module.exports.parse('test');
}
})();
