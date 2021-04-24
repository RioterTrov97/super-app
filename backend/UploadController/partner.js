import Partner from '../models/Partnermodel.js'
import asyncHandler from 'express-async-handler';
import parseUpload from '../servicelayer/csv.js';


const partnerPush = asyncHandler(async (row) => {

 
    const data={
        name: row.name,
        phoneNumber: row.userPhoneNumber,
        // partnerPhoneNumber:row.PartnerPhone,
        // activation: row.Activation,
        // activationDate: row.ActivationDate,
    }

  
    
const phoneNumberExists= await Partner.findOne({ phoneNumber:row.userPhoneNumber});
if(phoneNumberExists){
  console.log('number duplicate')
  
} else {
 
let doc1 = new Partner(data);
 doc1.save(function(err, doc) {
    if (err) return console.error(err);
    console.log("Document inserted succussfully!");
  });
}



});

// const __dirname = path.resolve();

  
const partnerUpload =  asyncHandler(async(req,res) => {

  // console.log("HI");
 
    let csvFile = req.file.path;

    // console.log("Hi",req.file.path);

    // return;
    
    parseUpload(csvFile, (items) =>{
      // console.log("csv", csvFile);
      console.log("items",items);


      items.forEach(element => {
        partnerPush(element);
      });

      res.send(`${csvFile} --> file is parsed`);
    });
 
})


export default  partnerUpload