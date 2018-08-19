var express = require('express'); // cargar el modulo express
var app = express(); // llamo al método express
var server = require('http').Server(app); // Carga el método server http que le pasa app express
var io = require('socket.io')(server); // Carga la librería Socket.io

app.use(express.static('client')); // midleware : vista estática por defecto (index.html)

app.get('/hola-mundo', function(req, res){
	res.status(200).send('Hola mundo desde una ruta');
});

var messages = [{
	id: 1,
	text: 'Bienvenido al chat',
	nickname: 'LeugimBot'
}]

io.on('connection', function(socket){ // Método on permite lanzar eventos. Se encarga de recibir las conexiones de los clientes
	console.log('El cliente con IP ' + socket.handshake.address + ' se ha conectado...');
	socket.emit('messages', messages);

	socket.on('add-message', function(data){
		messages.push(data);
		io.sockets.emit('messages', messages);
	});
});

server.listen(9000, function(){
	console.log('El servidor está funcionando en http://localhost:9000');
});
