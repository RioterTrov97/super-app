import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim: true,
    },

},{timestamp: true})

const User = mongoose.model('User', UserSchema)

export default User

