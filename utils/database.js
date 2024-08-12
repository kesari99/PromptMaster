import mongoose from "mongoose";


let isConnected = false;

export const connecToDb = async () => {
    mongoose.set('strictQuery', true)

    if(isConnected){
        console.log('Mongodb is already connected') 
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,

        })

        isConnected = true
        console.log("MongoDb connected")

    } catch(err){
        console.log(err)

    }


}