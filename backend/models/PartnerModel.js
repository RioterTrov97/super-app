import mongoose from 'mongoose'

const PartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
  
},{timestamp: true})

const Partner = mongoose.model('Partner', PartnerSchema)

export default Partner




