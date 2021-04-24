import mongoose from 'mongoose'


const PartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required:true,
        trim: true,
    },

    // activation: {
    //     type: String,
    //     required:false,
    //     trim: true,
    //   },
   
    //   activationDate: {
    //     type: Date,
    //     required:false,
    //     trim: true,
    //   },
  
},{timestamp: true})

const Partner = mongoose.models.Partner||mongoose.model('Partner', PartnerSchema)

export default Partner




