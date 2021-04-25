
import app from '../index.js'
import Admin from '../models/AdminModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import * as socketio from "socket.io"
import { createServer } from 'http';

const server = createServer(app); 
const io = new socketio.Server(server, {
	cors: {
		origin: '*',
	},

});

const PORT = process.env.PORT|| 4000


server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`)
	})

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

	socket.on('disconnect', () => {
		console.log('Disconnected: ' + socket.adminId);
	})




    socket.on('call', async(data) => {
    
		const admin = await Admin.findOne({ _id: socket.adminId });


		socket.to(admin).emit('call', data)

    })








})


