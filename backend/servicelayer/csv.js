const __dirname = path.resolve();
import fs from 'fs';
import csv from 'fast-csv';
import path from 'path';

  
const parseUpload =  async(filePath, cb) => {

    let data = [];
    fs
      .createReadStream(path.resolve(__dirname, filePath))
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => console.error(error))
      .on('data', (row) => {
        // console.log(row);
        data.push(row);
      })
      .on('end', (rowCount) => {
          console.log(`Parsed ${rowCount} rows`);
          cb(data);
        });
}

export default  parseUpload
