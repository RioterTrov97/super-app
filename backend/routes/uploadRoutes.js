import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();
import asyncHandler from 'express-async-handler';
import getUpload from '../Controllers/uploadController.js'
 
// import fs from 'fs';
// import csv from 'fast-csv';
import List from '../models/Listmodel.js';
 
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
 
const mongoPush = asyncHandler(async (row) => {
  const list = await List.create({
    userName: row.Username,
    userPhoneNumber: row.UserPhone,
    partnerName: row.PartnerName,
    partnerPhoneNumber: row.PartnerPhone,
    activation: row.Activation,
    activationDate: row.ActivationDate,
  });
 
  if (list) {
    console.log('success');
  } else {
    console.log('fail');
  }
});
 
router.post(
  '/list',
  upload.single('csv'),getUpload
  // asyncHandler(async (req, res) => {
  //   let csvFile = req.file.path.split(`\\`)[1];

  //   await fs
  //     .createReadStream(path.resolve(__dirname, 'uploads', csvFile))
  //     .pipe(csv.parse({ headers: true }))
  //     .on('error', (error) => console.error(error))
  //     .on('data', (row) => {
  //       mongoPush(row);
  //     })
  //     .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows`));
 
  //   res.send(`${csvFile} --> file is parsed`);
  // })
  );
 
router.post('/partner', upload.single('csv'), (req, res) => {
  res.send(`/${req.file.path}`);
});
 
router.post('/user', upload.single('csv'), (req, res) => {
  res.send(`/${req.file.path}`);
});
 
export default router;
