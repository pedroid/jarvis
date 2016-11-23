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


servo_io.sockets.on('connection', function(socket) {
  Clients.push(socket);

  setInterval(function() {
    socket.emit('date', {'date': new Date()});
  }, 1000);



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
