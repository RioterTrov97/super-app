import express from 'express';
import connectDB from './config/db.js';
import path from 'path';
import colors from 'colors';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
// import apiroutes from './apiRoute'
<<<<<<< HEAD
import listRoutes from './routes/listRoutes.js'
import logRoutes from './routes/logRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import uploadRoutes from './routes/uploadRoutes.js'
=======
import listRoutes from './routes/listRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js';
>>>>>>> d8ac93342d92d1c0c59654335d6620a19c2d66df

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

connectDB();

app.use(express.json());
// app.use('/api', apiroutes)

<<<<<<< HEAD


app.use('/api/admins', adminRoutes)
app.use('/api/partners', partnerRoutes)
app.use('/api/users', userRoutes)
app.use('/api/lists', listRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/logs', logRoutes)
=======
app.use('/api/admins', adminRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/upload', uploadRoutes);
>>>>>>> d8ac93342d92d1c0c59654335d6620a19c2d66df

const __dirname = path.resolve();
app.use('/upload', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
