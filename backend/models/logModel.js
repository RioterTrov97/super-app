import mongoose from 'mongoose'


const logSchema = mongoose.Schema(
    {

        from: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Admin',
        },
    
        to: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
              refPath: 'onModel'
        },


        onModel: {
            type: String,
            required: true,
            enum: ['User', 'Partner']
        },
        duration: [
          {
            talktime: { type: Number, required: false },
            holdtime: { type: Number, required:false },
            busytime: { type: Number, required: false },
          },
        ],

        audio: {
          type: String,
          required: true,
        },

        topic: { type: String, required: true },

        details: { type: String, required: true },
        
      
      },
      {timestamp: true}
    )

const Logcall = mongoose.model('Logcall', logSchema )

export default Logcall