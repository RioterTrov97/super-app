import mongoose from 'mongoose'



const URL = 'mongodb+srv://ashish:anger5061@cluster0.zr7ms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB