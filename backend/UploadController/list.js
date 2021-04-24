import List from '../models/Listmodel.js'
import asyncHandler from 'express-async-handler';
import parseUpload from '../servicelayer/csv.js';



const listPush = asyncHandler(async (row) => {

    const data={
        userName: row.name,
        userPhoneNumber: row.userPhoneNumber,
        partnerName: row.PartnerName,
        // partnerPhoneNumber:row.PartnerPhone,
        // activation: row.Activation,
        // activationDate: row.ActivationDate,
    }
    
const phoneNumberExists= await List.findOne({ userPhoneNumber:row.userPhoneNumber});
if(phoneNumberExists){
  console.log('number duplicate')
  
} else {
let doc1 = new List(data);
doc1.save(function(err, doc) {
    if (err) return console.error(err);
    console.log("Document inserted succussfully!");
  });

}



});

// const __dirname = path.resolve();

  
const listUpload =  asyncHandler(async(req,res) => {

  // console.log("HI");
 
    let csvFile = req.file.path;

    // console.log("Hi",req.file.path);

    // return;
    
    parseUpload(csvFile, (items) =>{
      // console.log("csv", csvFile);
      // console.log("items",items);


      items.forEach(element => {
        listPush(element);
      });

      res.send(`${csvFile} --> file is parsed`);
    });
 
})


export default listUpload