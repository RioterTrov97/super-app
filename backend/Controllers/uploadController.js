// //Upload parser 
// import fs from 'fs';
// import csv from 'fast-csv';
// import asyncHandler from 'express-async-handler'
// import path from 'path';
// import listPush from '../UploadController/list.js'


// const __dirname = path.resolve();

  
// const parseUpload =  asyncHandler(async(req,res) => {
//   // console.log("here",req)
 
//     let csvFile = req.file.path.split(`\\`)[1];
//     await fs
//       .createReadStream(path.resolve(__dirname, 'uploads', csvFile))
//       .pipe(csv.parse({ headers: true }))
//       .on('error', (error) => console.error(error))
//       .on('data', (row) => {
//         console.log(row);
//       //  listPush(row);
//       })
//       .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows`));
 
//     res.send(`${csvFile} --> file is parsed`);
  
 
// })

// export  default parseUpload


  