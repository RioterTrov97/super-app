import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema({
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
     password: {
        type: String,
        required: true,
        trim: true
    },
    isSuperAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    isActive:{
      type: Boolean,
      required:true,
      default:true

    }

},{timestamp: true})


adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }






// Hash the plain text password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })



const Admin = mongoose.model('Admin', adminSchema)

export default Admin

