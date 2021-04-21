//Upload parser 
import fs from 'fs';
import csv from 'fast-csv';
import asyncHandler from 'express-async-handler'
import path from 'path';




const __dirname = path.resolve();

  
const getUpload =  asyncHandler(async(req,res) => {
 
    let csvFile = req.file.path.split(`\\`)[1];
    await fs
      .createReadStream(path.resolve(__dirname, 'uploads', csvFile))
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => console.error(error))
      .on('data', (row) => {
        mongoPush(row);
      })
      .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows`));
 
    res.send(`${csvFile} --> file is parsed`);
  
 
})

export  default getUpload


  