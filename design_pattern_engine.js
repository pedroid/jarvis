(function(){

module.exports = {
	fsm:function(state_grp){
		console.log('design pattern engine: fsm');
		console.log('input:'+state_grp);
	}
}

if(!module.parent){
	if(process.argv[2]){
		console.log('Testing string is '+process.argv[2]);
		//console.log('there are '+process.argv.length-2+ ' user defined test string');
		var tokens = module.exports.fsm(process.argv[2]);
	}else{
		var tokens = module.exports.fsm('test 3 times');
	}
}
})();
