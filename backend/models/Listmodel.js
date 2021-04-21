import mongoose from 'mongoose';
 
const listSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
 
    userPhoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    partnerName: {
      type: String,
      required: true,
      trim: true,
    },
 
    partnerPhoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
 
    activation: {
      type: String,
      required: true,
      trim: true,
    },
 
    activationDate: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  { timestamp: true }
);
 
const List = mongoose.model('List', listSchema);
 
export default List;
