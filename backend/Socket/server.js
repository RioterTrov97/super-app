import app from '../index.js';
import Admin from '../models/AdminModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { createServer } from 'http';

const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: '*',
	},
});

io.use(async (socket, next) => {
	try {
		const token = socket.handshake.query.token;
		const payload = await jwt.verify(token, 'Nepali');
		socket.adminId = payload.id;
		next();
	} catch (err) {}
});

let adminRoomList = [];

io.on('connection', (socket) => {
	console.log('Connected: ' + socket.adminId);

	socket.on('disconnect', () => {
		console.log('Disconnected: ' + socket.adminId);
	});

	socket.on('joinRoom', (callRoomId) => {
		socket.join(callRoomId);
		console.log('An admin joined callroom: ' + callRoomId);
	});

	socket.on('leaveRoom', (callRoomId) => {
		socket.leave(callRoomId);
		console.log('An admin left callroom: ' + callRoomId);
	});

	socket.on('joinCallRoom', (callRoomId) => {
		socket.join(callRoomId);
		adminRoomList.push(callRoomId);
		console.log(`callRoomId`, callRoomId);
		console.log('An admin joined Admincallroom: ' + callRoomId);
	});

	socket.on('leaveCallRoom', (callRoomId) => {
		socket.leave(callRoomId);
		adminRoomList = adminRoomList.filter((item) => item !== callRoomId);
		console.log(`callRoomId`, callRoomId);
		console.log('An admin left Admincallroom: ' + callRoomId);
	});

	socket.on('call', async (roomId, data) => {
		console.log(roomId, data);
		io.to(adminRoomList[0]).emit('newCall', data);
	});
});

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
