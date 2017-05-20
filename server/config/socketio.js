/**
 * Socket.io configuration
 */
const authConfig  = require('./auth');
const socketioJwt = require('socketio-jwt');

// When the user disconnects.. perform this
function onDisconnect (socket) {
	// console.log(socket.decoded_token.id);
	// console.info('[%s] DISCONNECTED', socket.address);
	socket.disconnect();
}

// When the user connects.. perform this
function onConnect (socket) {
	// When the client emits 'info', this listens and executes
	socket.on('info', function (data) {
		console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
	});

	// Insert sockets below
	require('../api/chat/chat.socket').register(socket);
}

module.exports = function (socketio) {
	// socket.io (v1.x.x) is powered by debug.
	// In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
	//
	// ex: DEBUG: "http*,socket.io:socket"

	//add the authorization service to socket.io
	socketio.use(socketioJwt.authorize({
		secret   : authConfig.jwtSecret,
		handshake: true,
		callback : false
	}));

	socketio.on('connection', function (socket) {
		console.log(`Hello! ${socket.decoded_token.name} (${socket.id})`);

		if (socket.handshake.address !== null) {
			socket.address = `${socket.handshake.address.address}: ${socket.handshake.address.port}`;
		} else {
			socket.address = process.env.DOMAIN;
		}

		socket.connectedAt = new Date();

		socket.on('disconnect', () => onDisconnect(socket));

		// Call onConnect.
		onConnect(socket);
		// console.info('[%s] CONNECTED', socket.address);
	});
};
