var TOKENTYPENUMBER = 0;
var TOKENTYPEKEYWORD = 1;
var TOKENTYPEIDENTIFIER = 2;
var TOKENTYPEOPENPAR = 3;
var TOKENTYPEVARIABLE = 4;
var TOKENTYPEVARTYPE = 5;
var TOKENTYPEFUNCTION = 6;

function Compiler(){

};

Compiler.prototype.lexical = function(data){
		console.log('compiler: lexical analyzing');
		var i;
		var number = 0;
		var constants = [];
//		var index_each_word=0;
		var tokens = [];
		var variables = [];
		var the_variable = [];
		var identifier = [];
		var openpar = [];
		var func = [];
		var type = [];
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
				if(data[i]=='+' || data[i] == '-' || data[i]== '*' || data[i]=='/' ){
					tokens.push(TOKENTYPEIDENTIFIER);
					identifier.push(data[i]);
				}
				if(data[i] == '[' || data[i] == ']'){
					tokens.push(TOKENTYPEOPENPAR);
					openpar.push(data[i]);
				}
				if(data[i] == ':'){
					tokens.push(TOKENTYPEVARTYPE);
					type.push(data[i]);
				}
				if(data[i] == '(' || data[i] == ')'){
					tokens.push(TOKENTYPEFUNCTION);
					func.push(data[i]);
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
		console.log('There are '+ constants.length+' NUM:');
		for( each_constant_id in constants){
			console.log(each_constant_id+':'+constants[each_constant_id]);
		}
		console.log('There are '+ variables.length+' VAR:');
		for( each_variable_id in variables){
			console.log(variables[each_variable_id]);
		}
		console.log('There are '+ identifier.length+' IDEN:');
		for( each_identifier_id in identifier){
			console.log(each_identifier_id+':'+identifier[each_identifier_id]);
		}
		console.log('There are '+ openpar.length+' PAR:');
		for( each_openpar_id in openpar){
			console.log(each_openpar_id+':'+openpar[each_openpar_id]);
		}
		console.log('Tokens:');
		for( each_token_id in tokens){
			switch(tokens[each_token_id]){
				case TOKENTYPENUMBER:
					console.log('NUM');
					break;
				case TOKENTYPEIDENTIFIER:
					console.log('IDEN');
					break;
				case TOKENTYPEKEYWORD:
					console.log('KEY');
					break;
				case TOKENTYPEOPENPAR:
					console.log('OPER');
					break;
				case TOKENTYPEVARIABLE:
					console.log('VAR');
					break;
				case TOKENTYPEVARTYPE:
					console.log('VARTYPE');
					break;
				case TOKENTYPEFUNCTION:
					console.log('FUNC');
					break;
			}
		}
		return tokens;

}

