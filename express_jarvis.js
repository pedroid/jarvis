var express = require('express')
var http = require('http')
var url = require('url')
var fs = require('fs')
var io = require('socket.io')
var compiler = require('./compiler.js')
var hp = 0;
var message_content;
var app = express();
var server = http.createServer(app);
var qs = require('querystring');
var util = require('util');
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');
format = function() {
    return util.format.apply(null, arguments);
};
app.use(express.static('public'));
app.use('/blog',express.static('blog'));
app.use('/RepeatedCodeInverse',express.static('RepeatedCodeInverse'));
app.get('/users/:userID/books/:bookID',function(req, res){
	res.send(req.params)
})
var formidable = require('formidable');


app.use('/gallery', require('node-gallery')({
  staticFiles : 'resources/photos',
  urlRoot : 'gallery', 
  title : 'Example Gallery'
}));


app.get('/contest/vacation-photo', function(req, res){
    var now = new Date();
    res.render('contest/vacation-photo', {
        year: now.getFullYear(), month: now.getmonth()
    });
});

app.post('/contest/vacation-photo/:year/:month', function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if(err){
            return res.redirect(303, '/error');
        }
        console.log('received fields: ');
        console.log(fields);
        console.log('received files: ');
        console.log(files);
        return res.redirect(303, '/thankyou');
    });
});

app.get('/blog/:article/:assets',function(req, response){
//	console.log('blog/'+req.params['article']+'/'+req.params['assets']);
	

	//response.send(req.params);
	console.log('blog/'+req.params['article']+'/'+req.params['assets']);
	
	fs.readFile('blog/'+req.params['article']+'/'+req.params['assets'], function(error, data){

     	   if (error){
		          response.writeHead(404,{'Content-Type':'text/html'});
	        	  response.write("opps this doesn't exist - 404");
           } else {
		          response.writeHead(200, {"Content-Type": "text/html"});
		          response.write(data, "utf8");
       	   }
	response.end();
		
	});

});
app.get('/blog/:article',function(req, response){
//	console.log('test');
	//res.send(req.params);
	if(req.params['assets']=='woodwork'){
		console.log('woodwork page');
	}else{
		console.log('assets:'+req.params['assets']);
	}
	fs.readFile('blog/'+req.params['article'], function(error, data){
     	   if (error){
		          response.writeHead(404,{'Content-Type':'text/html'});
	        	  response.write("opps this doesn't exist - 404");
           } else {
		          response.writeHead(200, {"Content-Type": "text/html"});
		          response.write(data, "utf8");
       	   }
	response.end();
		
	});
});
app.get('/', function(req, res){
	res.send('Hello World!');
})
app.get('/ui_cmd.html', function(request, response){

	fs.readFile('ui_cmd.html', function(error, data) {
     	   if (error){
		          response.writeHead(404,{'Content-Type':'text/html'});
	        	  response.write("opps this doesn't exist - 404");
           } else {
		          response.writeHead(200, {"Content-Type": "text/html"});
		          response.write(data, "utf8");
       	   }
        response.end();
     });


});

app.get('/youtube.html', function(request, response){
	fs.readFile('youtube.html', function(error, data){
		if(error){

		          response.writeHead(404,{'Content-Type':'text/html'});
	        	  response.write("opps this doesn't exist - 404");
		}else{
		          response.writeHead(200, {"Content-Type": "text/html"});
		          response.write(data, "utf8");

		}
		response.end();
	});
});
app.get('/markdown/markdown.html', function(request, response){
	fs.readFile('markdown/markdown.html', function(error, data){
		if(error){

		          response.writeHead(404,{'Content-Type':'text/html'});
	        	  response.write("opps this doesn't exist - 404");
		}else{
		          response.writeHead(200, {"Content-Type": "text/html"});
		          response.write(data, "utf8");

		}
		response.end();
	});
});

app.get('/form/test.html', function(request, response){
	fs.readFile('form/test.html', function(error, data){
		if(error){

		          response.writeHead(404,{'Content-Type':'text/html'});
	        	  response.write("opps this doesn't exist - 404");
		}else{
		          response.writeHead(200, {"Content-Type": "text/html"});
		          response.write(data, "utf8");

		}
		response.end();
	});
});

app.get('/form/get.html', function(request, response){
	fs.readFile('form/get.html', function(error, data) {
     	   if (error){
		          response.writeHead(404,{'Content-Type':'text/html'});
	        	  response.write("opps this doesn't exist - 404");
           } else {
		          response.writeHead(200, {"Content-Type": "text/html"});
		          response.write(data, "utf8");
       	   }
        	response.end();
     	});

});

app.get('/form/post.html', function(request, response){
	fs.readFile('form/post.html', function(error, data) {
     	   if (error){
		          response.writeHead(404,{'Content-Type':'text/html'});
	        	  response.write("opps this doesn't exist - 404");
           } else {
		          response.writeHead(200, {"Content-Type": "text/html"});
		          response.write(data, "utf8");
       	   }
        response.end();

	});
});

app.get('/form/signup_get', function(request, response){
//	res.send('Hello World!');
	response.writeHead(200, {"Content-Type":"text/html"});
	var path=url.parse(request.url),
		parameter=qs.parse(path.query);
		console.log(parameter);
		response.end();

});

app.get('/songla.html',function(req, res){
	relative_path = current_path.slice(root.length);
	fs.readFile(relative_path+'test.data', 'utf8', function (err, data){
		if(err){
			return console.log(err);
		}
		res.render(
			'blog.ejs', 	
			{blog_content: "<h1>test</h1>"}
		);
	});
});
app.get('/forfun.html',function(req, res){
	res.render(
		'index.ejs', 
		{quotes: 111}
	);
});
app.post('/form/signup_post', function(request, response){
	
	//response.render('pages/test');
	
	formData='';
	request.on("data", function(data){
		//var post = qs.parse(data);
		formData+= data;
		//console.log(post);
//		return formData+= data;
	});
	request.on("end", function(){
		response.writeHead(200, {"Content-Type":"text/html"});
		post = qs.parse(formData);
		user = post.user;
		response.write("user="+user+"<br/>");
		response.end();
	});
	
});
app.post('/form/forfun', function(request, response){
	console.log('form/forfun');
	formData='';
	request.on("data", function(data){
		//var post = qs.parse(data);
		formData+= data;
		//console.log(post);
//		return formData+= data;
		console.log('data:'+data);
	});
	request.on("end", function(){
		response.writeHead(200, {"Content-Type":"text/html"});
		post = qs.parse(formData);
		user = post.user;
		response.write("user="+user+"<br/>");
		response.end();
	});

});

server.listen(9090)
var servo_io = io.listen(server)

var Clients = [];
var path = require('path');
var root = path.dirname(require.main.filename)+'/';
var markdown_root = root+'blog/';
var current_path = markdown_root;
var last_path;
var path_stack=[];
//console.log(current_path);
servo_io.sockets.on('connection', function(socket) {
  Clients.push(socket);

  setInterval(function() {
    socket.emit('date', {'date': new Date()});
  }, 1000);

  socket.on('markdown', function(data){
	switch(data.type){
		case('cmd'):
			if(data.command == 'rm'){
				var filename = data.filename;
				try{
					fs.unlinkSync(current_path+filename);
					console.log('rm '+current_path+filename);
				}catch(err){
					console.log(err.message);
					socket.emit('server_response',{'response_content':err.message});
				}					
				break;
			}
			if(data.command == 'save'){
				relative_pwd = current_path.slice(markdown_root.length);
				var public_html_content = "<!DOCTYPE html>";
				public_html_content += "<html>\n";
				public_html_content += "<head>\n";
    				public_html_content += "<script src='//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'></script>\n"
				public_html_content += "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'>\n"
				public_html_content += "</head>\n";
				public_html_content += "<body>\n";
				public_html_content += "<div class='container'>\n";
				public_html_content += "<div class='row'>\n";
				public_html_content += "<div class='col-lg-12 bg-warning'>\n";
				public_html_content += data.html_content;
				public_html_content += "</div>\n";
				public_html_content += "</div>\n";
				public_html_content += "</div>\n";
				public_html_content += "<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js'></script>\n"
				public_html_content += "</body>\n";
				public_html_content += "</html>\n";
				fs.writeFile('blog/'+ relative_pwd +data.filename+'.html', public_html_content, function(err){}	);
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
				console.log('filename:'+data.filename);
				console.log('current_path:'+current_path);
//				fs.readFile('blog/'+ relative_pwd +data.filename+'.markdown', data.markdown_content, function(err){}	);
				var relative_path = current_path.slice(root.length);
				console.log('path:'+relative_path+data.filename);
				//var tmp = fs.readFile(relative_path+data.filename, function(err){}	);
				fs.readFile(relative_path+data.filename, 'utf8', function (err, data){
					if(err){
						return console.log(err);
					}
					//console.log(data);
					socket.emit('markdown',{
						'command':'edit',
						'data':data	
					});
					console.log('data'+data);
				});
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
			//	console.log('path: '+data.path);
//				var tmp = fs.
				var path = 'blog/';
				relative_pwd = current_path.slice(markdown_root.length);
				if(data.path){
					path+= data.path;
				}
				try{
					var tmp = fs.readdirSync(current_path);
					console.log('ls:'+current_path);

					socket.emit('server_response',{
						'cmd':'ls',
						'response_content':tmp,
						'path':'http://yushengc.twbbs.org:9090/blog/'+relative_pwd});				
				}catch(err){
					console.log(err);
					socket.emit('server_response',{'response_content':err});
				}
				break;
			}
			if(data.command == 'cd'){
				//console.log('path: '+data.path);
				var dir = data.path;
				console.log('dir to move:'+dir);
				if(dir=='..'){
					current_path = path_stack.pop();
					if(current_path){
						//console.log(path_stack);
						socket.emit('markdown',{
							'command':'dir',
							'dir':current_path.slice(markdown_root.length)
						});
						console.log('pwd:'+current_path);
					}else{
						current_path = markdown_root;
						socket.emit('server_response',{
							'response_content':'you are already in root directory'
						});
						
					}
					

				}else{
					var new_path = current_path + dir + '/';
					//console.log('current_path:'+current_path);
					if(!fs.existsSync(new_path)){						
						socket.emit('server_response',{'response_content':'directory not exist'});
					}else{
						//last_path = current_path;
						path_stack.push(current_path);
						console.log(path_stack);
						current_path = new_path;
						socket.emit('markdown',{
							'command':'dir',
							'dir':current_path.slice(markdown_root.length)
						});
						
					}
					console.log('pwd:'+current_path);
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
  socket.on('jarvis', function(data){
	if(data.type == 'command'){
		console.log('command from jarvis:'+ data.command);		
		switch(data.command){
			case('ls'):
				var tmp = fs.readdirSync('share/');
				socket.emit('server_response',{'response_content':tmp});
				console.log(tmp);
				break;
		}
	}
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
