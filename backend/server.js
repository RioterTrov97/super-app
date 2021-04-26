// import app from '../index.js';
// import Admin from '../models/AdminModel.js';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import { Server } from 'socket.io';
// import { createServer } from 'http';




// let io;

// const init = async(httpServer) => {
     
// 		io = new Server(httpServer, {
// 		cors: {
// 			origin: '*',
// 		},
// 	});




// 	io.use(async (socket, next) => {
// 		try {
// 			const token = socket.handshake.query.token;
// 			const payload = await jwt.verify(token, 'Nepali');
// 			socket.adminId = payload.id;
// 			socket.join()
// 			next();
// 		} catch (err) {}
// 	});

// 	// let adminRoomList = [];

// 	io.on('connection', (socket) => {
// 		console.log('Connected: ' + socket.adminId);

// 		socket.on('disconnect', () => {
// 			console.log('Disconnected: ' + socket.adminId);
// 		});

// 		socket.on('joinRoom', (adminRoomId) => {
// 			socket.join(adminRoomId);
// 			console.log('An admin joined callroom: ' + adminRoomId);
// 		});

// 		socket.on('leaveRoom', (adminRoomId) => {
// 			socket.leave(adminRoomId);
// 			console.log('An admin left callroom: ' + adminRoomId);
// 		});



// 		socket.on('call',(data) => {
// 			console.log(data);
// 			io.to(adminRoomId).emit('newCall', data);
// 		});
// 	});



// }

// const getIO = () => {
// 	if(io == null) {

// 	console.log("not found")

// 	}else{
// 	return io
// 	}

// }




// // const PORT = process.env.PORT || 4000;

// // httpServer.listen(PORT, () => {
// // 	console.log(`listening on port ${PORT}`);
// // });


// export {
// 	init,
// 	getIO
// }