var http = require('http')
var url = require('url')
var fs = require('fs')
var io = require('socket.io')
var compiler = require('./compiler.js')
var hp = 0;
var message_content;
var server = http.createServer(function(request, response){
	console.log('Connection');
	var path = url.parse(request.url).pathname;
	var landing_message;
	switch(path){
		case '/':
			response.writeHead(200, {'Content-Type':'text/html'});			
			response.write('hello world');
			response.end();
		default:
			fs.readFile(__dirname + path, function(error, data) {
		        if (error){
		          response.writeHead(404,{'Content-Type':'text/html'});
		          response.write("opps this doesn't exist - 404");
		        } else {
		          response.writeHead(200, {"Content-Type": "text/html"});
		          response.write(data, "utf8");
		        }
		        response.end();
	 	     });
   		   break;


	}

})
server.listen(9090)
var servo_io = io.listen(server)

var Clients = [];
var path = require('path');
var root = path.dirname(require.main.filename)+'/';
var markdown_root = root+'blog/';
var current_path = markdown_root;
//console.log(current_path);
servo_io.sockets.on('connection', function(socket) {
  Clients.push(socket);

  setInterval(function() {
    socket.emit('date', {'date': new Date()});
  }, 1000);

  socket.on('markdown', function(data){
	switch(data.type){
		case('cmd'):
			if(data.command == 'save'){
//				console.log('html_data:'+data.html_content);
//				console.log('markdown_data:'+data.markdown_content);
//				console.log('filename:'+data.filename);
				//console.log('path: '+data.path);
//				if(!fs.existsSync('blog/'+data.path)){
//					fs.mkdirSync('blog/'+data.path);
//				}
//				console.log('pwd:'+current_path);
//				console.log('re:'+current_path.slice(markdown_root.length));
				relative_pwd = current_path.slice(markdown_root.length);
				fs.writeFile('blog/'+ relative_pwd +data.filename+'.html', data.html_content, function(err){}	);
				fs.writeFile('blog/'+ relative_pwd +data.filename+'.markdown', data.markdown_content, function(err){}	);
				socket.emit('server_response',{'response_content':'blog/'+relative_pwd + data.filename+' .html/markdown has been created.'});
				socket.emit('markdown',{'command':'link',
							'link':'http://yushengc.twbbs.org:9090/blog/'+relative_pwd+data.filename+'.html'});				
				//fs.writeFile('blog/'+data.path+data.filename+'.markdown', data.markdown_content, function(err){});
				break;
			}
			if(data.command == 'mkdir'){
				//console.log('mkdir path:'+data.path);	
//				console.log('current_path:'+current_path.slice(root.length));
				var dir_to_create = current_path.slice(root.length)+data.path;
//				console.log('dir_to_create:'+dir_to_create);
				if(!fs.existsSync(dir_to_create)){
					fs.mkdirSync(dir_to_create);
					console.log(dir_to_create+' has been created.');
					socket.emit('server_response',{'response_content':dir_to_create+' has been created.'});
				}else{
					socket.emit('server_response',{'response_content':'the directory is already existed.'});
				}
				break;
			}
			
			if(data.command == 'edit'){
				break;
			}
			/*
			if(data.command == 'pwd'){				
				//var path = require('path');
				//var appDir = path.dirname(require.main.filename);
				console.log('current_path:'+current_path);
				console.log('markdown_root:'+markdown_root);
				console.log(current_path.slice(markdown_root.length));
				var residue_path = current_path.slice(markdown_root.length);
				if(residue_path){
					socket.emit('server_response',{'response_content':residue_path});
				}else{
					socket.emit('server_response',{'response_content':'/'});
				}
			}
			*/
			if(data.command == 'ls'){
//				console.log('path: '+data.path);
//				var tmp = fs.
				var path = 'blog/';
				if(data.path){
					path+= data.path;
				}
				try{
					var tmp = fs.readdirSync(current_path);
					socket.emit('server_response',{'response_content':tmp});
				}catch(err){
					console.log(err);
					socket.emit('server_response',{'response_content':err});
				}
				break;
			}
			if(data.command == 'cd'){
				//console.log('path: '+data.path);
				var dir = data.path;
				if(dir=='..'){

				}else{
					var new_path = current_path + dir + '/';
					console.log('current_path:'+current_path);
					if(!fs.existsSync(new_path)){						
						socket.emit('server_response',{'response_content':'directory not exist'});
					}else{
						current_path = new_path;
						socket.emit('markdown',{
							'command':'dir',
							'dir':current_path.slice(markdown_root.length)
						});
					}
				}
				break;
			}
			socket.emit('server_response',{'response_content':'command not support'});
			break;
	}
  });

var authenticate = false;
  // 接收來自於瀏覽器的資料
  socket.on('client_data', function(data) {
    //process.stdout.write(data.letter);
    hp = hp + 1;
  });
  socket.on('user_command',function(data){
	//process.stdout.write(data.command);
	process.stdout.write('\n');
	console.log('command from user:'+data.command);
	switch(data.command){
		case('apple'):
			socket.emit('server_response',{'response_content':'ball'});
			console.log("ball");
			message_content = "someone hit apple";		
			sendAll(message_content);
			break;
		case('ls'):
			var tmp = fs.readdirSync('.');
			socket.emit('server_response',{'response_content':tmp});
			console.log(tmp);
			break;
		case('mkdir'):
			var tmp = fs.mkdir('songla');
			socket.emit('server_response',{'response_content':tmp});
			console.log(tmp);
			break;
		case('ruby'):
			authenticate = true;
			socket.emit('server_authenticate',{'authenticate':authenticate});
			break;
		case('save'):
			
			break;
		case('edit'):
			fs.readFile('blog/index.html', 'utf8', function(err, contents) {
				if(contents){
    					//console.log(contents);
					socket.emit('server_response',{'response_content':contents});
				}else{
					console.log('file not exist');
				}
			});
			//socket.emit('server_response',{'response_content':contents});
			
			break;
			
		default: //nothing
			socket.emit('server_response',{'response_content':"the command is NOT support."});
	}
	//Leximal Analyzer
	var tokens = compiler.lexical(data.command);
	/*
	if(data.command=='apple'){
    		//socket.emit('server_response',{'response_content': hp});
		socket.emit('server_response',{'response_content':'ball'});
		console.log("ball");
		message_content = "someone hit apple";		
		sendAll(message_content);
	}
	*/
  
  });
});

function sendAll(message){
	for(var i=0; i<Clients.length;i++){
	//	Clients[i].send("Message"+message);
		Clients[i].emit('server_brd_message',{'message_content':message_content});
	}
}
