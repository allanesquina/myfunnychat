var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var userList = [];

server.listen(8080);

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {

	socket.on('sendMsg', function(data) {
		io.sockets.emit('wMsg', {
			content: userList[socket.id].name + " : " + data
		});
		//socket.emit('wMsg', { content: data });
	});

	socket.on('userProfile', function(data) {
		userList[socket.id] = data;
		console.log(userList);
	});

});