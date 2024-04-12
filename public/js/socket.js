const socket = io();

socket.on("connection", () => {
	console.log("Cliente conectado");

	//enviar un mensaje al servidor
	socket.emit("mensaje", "nuevo cliente conectado");
});

//escuchar el evento "mensaje" desde el servidor
socket.on("mensaje", (message) => {
	const messageList = document.getElementById("message-list");
	const messageItem = document.createElement("li");
	messageItem.textContent = message;
	messageList.appendChild(messageItem);
});

const input = document.getElementById("message-input");
const buttonSocket = document.getElementById("send-button");

//enviar mensaje al hacer clic en el botón 'Enviar'
buttonSocket.addEventListener("click", () => {
	const message = input.value;
	if (message) {
		socket.emit("mensaje", message); // Enviar el mensaje al servidor
		input.value = "";
	}
});
