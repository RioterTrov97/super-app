import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';

let io;

const init = async (httpServer) => {
	io = new Server(httpServer, {
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

	io.on('connection', (socket) => {
		console.log('Connected: ' + socket.adminId);

		socket.join(socket.adminId);

		socket.on('disconnect', () => {
			console.log('Disconnected: ' + socket.adminId);
		});

		socket.on('call', async (data) => {
			io.to(socket.adminId).emit('newCall', data);
		});
	});
};

const getIO = () => {
	if (io == null) {
		console.log('IO not found');
	} else {
		return io;
	}
};

export { init, getIO };
