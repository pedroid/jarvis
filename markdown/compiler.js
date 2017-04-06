var TOKENTYPENUMBER = 0;
var TOKENTYPEKEYWORD = 1;
var TOKENTYPEIDENTIFIER = 2;
var TOKENTYPEOPENPAR = 3;
var TOKENTYPEVARIABLE = 4;
var TOKENTYPEBR = 5;

var TOKENTYPELIST = {
	0: 'TOKENTYPENUMBER',
	1: 'TOKENTYPEKEYWORK',
	2: 'TOKENTYPEIDENTIFIER',
	3: 'TOKENTYPEOPENPAR',
	4: 'TOKENTYPEVARIABLE',
	5: 'TOKENTYPEBR'
}

//	FORFUN = 1;
var lexical = function(data){
//example: 
		console.log('compiler: lexical analyzing');
		var i;
		var number = 0;
		var constants = [];
//		var index_each_word=0;
		var tokens = [];
		var variables = [];
		var the_variable = [];
		for(i =0; i<data.length; i++){
			if(parseInt(data[i])){ //digit
		//		index_each_word = 0;
				while(parseInt(data[i])){		
					number = 10*number + parseInt(data[i]);
					i++;
				}
				i--
				constants.push(number);
				number = 0;
				tokens.push(TOKENTYPENUMBER);
			}else{//alphabet
				//console.log(data[i]);		
				if(data[i] == '\n'){
					tokens.push(TOKENTYPEBR);
				}
				if(data[i]=='+' || data[i] == '-' || data[i]== '*' || data[i]=='/'){
					tokens.push(TOKENTYPEIDENTIFIER);
				}
				if(data[i] == '{' || data[i] == '}'){
					tokens.push(TOKENTYPEOPENPAR);
				}
				if(data[i].search(/[a-zA-Z]/)!=-1){
					while(data[i].search(/[a-zA-Z_1-9]/)!=-1){
						the_variable.push(data[i]);
						i++;
						if(i==data.length)break;
					}
					variables.push(the_variable);
					the_variable = [];
					i--;
					tokens.push(TOKENTYPEVARIABLE);
				}
			}
		
		}
		/* 
		//information
		console.log('There are '+ constants.length+' NUM:');
		for( each_constant_id in constants){
			console.log(each_constant_id+':'+constants[each_constant_id]);
		}
		console.log('There are '+ variables.length+' VAR:');
		for( each_variable_id in variables){
			console.log(variables[each_variable_id]);
		}
//		console.log('Tokens:');
		for( each_token_id in tokens){
			switch(tokens[each_token_id]){
				case TOKENTYPENUMBER:
			//		console.log('NUM');
					break;
				case TOKENTYPEIDENTIFIER:
			//		console.log('IDEN');
					break;
				case TOKENTYPEKEYWORD:
			//		console.log('KEY');
					break;
				case TOKENTYPEOPENPAR:
			//		console.log('OPER');
					break;
				case TOKENTYPEVARIABLE:
			//		console.log('VAR');
					break;
			}
		}
		*/
		for( each_token_id in tokens){
//			console.log(tokens[each_token_id]);
			console.log(TOKENTYPELIST[tokens[each_token_id]]);
		}
		return [tokens,variables];
	};


/*
if(!module.parent){
	if(process.argv[2]){
		console.log('Testing string is '+process.argv[2]);
		//console.log('there are '+process.argv.length-2+ ' user defined test string');
		var tokens = module.exports.lexical(process.argv[2]);
	}else{
		var tokens = module.exports.lexical('test 3 times');
	}
};
*/
