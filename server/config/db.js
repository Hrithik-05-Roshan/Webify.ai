import mongoose from "mongoose"

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDb Connected");
        
    } catch (error) {
        console.log("Db Error");
        
    }
}

export default connectDb;