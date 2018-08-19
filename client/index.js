var express = require('express'); // cargar el modulo express
var app = express; // llamo al método express
var server = require('http').Server(app); // Carga el método server http que le pasa app express
var io = require('Socket.io')(server); // Carga la librería Socket.io


server.listen(6677, function(){
	console.log("El servidor está funcionando en http://localhost:6677");
});

