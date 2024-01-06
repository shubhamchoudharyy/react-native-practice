import mongoose from 'mongoose'
import colors from 'colors'

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb Connected ${mongoose.connection.host}`.bgBlack.white)
        
    }catch(error){
        console.log(`Mongo error ${error}`.bgRed.white)
    }
}

export default connectDB;