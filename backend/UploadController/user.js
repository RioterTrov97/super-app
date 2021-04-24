import  User from '../models/Usermodel.js'
import asyncHandler from 'express-async-handler';
import parseUpload from '../servicelayer/csv.js';






const userPush = asyncHandler(async (row) => {

  // console.log("row",row);
    const data={
        name: row.name,
        phoneNumber: row.userPhoneNumber,
        // partnerPhoneNumber:row.PartnerPhone,
        // activation: row.Activation,
        // activationDate: row.ActivationDate,
    }

  
    
const phoneNumberExists= await User.findOne({ phoneNumber:row.userPhoneNumber});
if(phoneNumberExists){
  console.log('number duplicate')
  
} else {
  console.log('in post',data)


let doc1 =  new User(data);
doc1.save(function(err, doc) {
    if (err) return console.error(err);
    console.log("Document inserted succussfully!");
  });
}



});

// const __dirname = path.resolve();

  
const userUpload =  asyncHandler(async(req,res) => {

  // console.log("HI");
 
    let csvFile = req.file.path;

    // console.log("Hi",req.file.path);

    // return;
    
    parseUpload(csvFile, (items) =>{
      // console.log("csv", csvFile);
      console.log("items",items);


      items.forEach(element => {
        userPush(element);
      });

      res.send(`${csvFile} --> file is parsed`);
    });
 
})


export default userUpload 