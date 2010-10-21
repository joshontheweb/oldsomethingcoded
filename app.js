var jimi = require('jimi'),
	sys = require('sys'),
	json = JSON.stringify,
	log = sys.puts

var app = jimi.run({
	url_conf: require('./urls'),
	template_path: __dirname + '/templates',
	public_path: __dirname + '/media',
	debug: true,
	port: 27259,
});

var io = require('socket.io');
var socket = io.listen(app);
log('\n\nTesting...\n\n');
socket.on('connection', function(client){
	log('\n\nClient Connected\n\n');
	client.disconnect();
	client.on('message', function(message){
		log('\n\n Message Recieved\n\n'+ message);
		
		try {
			message = JSON.parse(message);
		} catch (SyntaxError) {
			log('Invalid JSON');
			log(message);
			return false;
		}
		if (message.action != 'close' && message.action != 'move') {
			log('Invalid request:');
			log(message);
			return false;
		}
		
		log('id: '+client.sessionId);
		message.id = client.sessionId;
		client.broadcast(json(message));
		client.send(json(message));
//		try {
//			request = JSON.parse(message);
//		} catch (SyntaxError) {
//			log('Invalid JSON:');
//			log(message);
//			return false;
//		}
//
//		if (request.action != 'close' && request.action != 'move') {
//			log('Invalid request:');
//			log(message);
//			return false;
//		}
//
//		request.id = client.id
//		client.broadcast(JSON.stringify(request));
	});

	client.on('disconnect', function(){
		log('\n\n Disconnected \n\n');
	});
});


//var express = require('express'),
//	app = express.createServer();
//
//app.get('/', function(req, res){
//	res.send('Hello World\n');
//});
//
//app.listen(27259);
//console.log('Express server started on port %s', app.address().port);
//
//var io = require('socket.io');
//var sock = io.listen(app);
//sock.on('connection', function(conn){
//	sock.on('message', function(){
//		try {
//			request = JSON.parse(message);
//		} catch (SyntaxError) {
//			log('Invalid JSON:');
//			log('message');
//			return false;
//		}
//
//		if (request.action != 'close' && request.action != 'move') {
//			log('Invalid request:');
//			log(message);
//			return false;
//		}
//
//		request.id = conn.id
//		conn.broadcast(JSON.stringify(request));
//	});
//});

//var http = require('http'),
//	sys = require('sys'),
//	io = require('socket.io'),
//server = http.createServer(
//	function(req, res){
//		sys.puts('Request!');
//		res.writeHeader(200, {'Content-Type': 'text/plain'});
//		res.writeBody('hello world\n');
//		res.finish();
//	}
//);
//
//var socket = io.listen(server);
//socket.on('connection', function(client){
//	client.on('message', function(){ var pass = 'pass'});
//	client.on('disconnect', function(){ var pass = 'pass' });
//});
//
//
//sys.puts('Server running on port 27259')
