var socket = io.connect('http://192.168.0.11:9000', {'forceNew': true}); // cambiar la IP
socket.on('messages', function(data){ // lo recoge de emit(messages)
	console.log(data);
	render(data);
});

// función para mostrar array de objetos y mostrarlos en el index.html
function render(data){
	var html = data.map(function(message, index){
		return (`
			<div class="message">
				<strong>${message.nickname}</strong> dice:
				<p>${message.text}</p>
			</div>
		`);
	}).join(' '); // espacio entre elementos

	var div_msgs = document.getElementById('messages');
	div_msgs.innerHTML = html;
	div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
  var message = {
    	nickname: document.getElementById('nickname').value,
			text: document.getElementById('text').value
  };

	document.getElementById('nickname').style.display = 'none';
	// Emitir un evento de cliente a servidor
	socket.emit('add-message', message);
	return false;
}
