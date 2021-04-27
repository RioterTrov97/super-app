import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();
import partnerUpload from '../UploadController/partner.js';
import listUpload from '../UploadController/list.js';
import userUpload from '../UploadController/user.js';

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'uploads/');
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

function checkFileType(file, cb) {
	console.log('hello');
	const filetypes = /csv/;
	const extname = filetypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb('csv only!');
	}
}

const upload = multer({
	storage,
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

const __dirname = path.resolve();

router.post('/list', upload.single('csv'), listUpload);

router.post('/partner', upload.single('csv'), partnerUpload);

router.post('/user', upload.single('csv'), userUpload);

export default router;
