import http from 'http'
import socketio from 'socket.io'
import app from '../Socket/serverside.js'
import List from '../models/Listmodel.js'
import Admin from '../models/AdminModel.js'
import Partner from '../models/PartnerModel.js'
import  User from '../models/Usermodel.js'
import jwt from 'jsonwebtoken'



const PORT = process.env.PORT|| 4000

const server = http.createServer(app)
const io = socketio(server)


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
        const user = await User.findOne({phoneNumber});
        const partner = await Partner.findOne({phoneNumber});
        const list = await List.findOne({ userPhoneNumber});
		const user = await Admin.findOne({ _id: socket.adminId });


		socket.to(adminId).emit('call', data)

    })








})


