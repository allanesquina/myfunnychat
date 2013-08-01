var express =  require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var userList = [];

app.use(express.static(__dirname + '/static'));
app.use('/ja', express.static(__dirname + '/static/js'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) { 
  
	socket.on('sendMsg', function(data) {
		io.sockets.emit('wMsg', {
			content: socket.id + " : " + data
		});
		//socket.emit('wMsg', { content: data });
	});

	socket.on('userProfile', function(data) {
		data.id = socket.id;
		userList.push(data);
		console.log(userList);
	});
});

server.listen(8080);