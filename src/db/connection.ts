import mongoose from 'mongoose'

export const connectDB = (url: string) => {
  return mongoose.connect(url)
} 
// mongoose.Promise = Promise;
// mongoose.connect(process.env.MONGO_URI)
// mongoose.connection.on('error', (error: Error) => console.log(error))



exports.default = connectDB;
