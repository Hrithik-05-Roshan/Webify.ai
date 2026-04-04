import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    role:{
        type:String,
        enum:["ai", "user"],
        required:true
    }
},{timestamps:true})

const websiteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        default:"Untitled Website"
    },
    latestCode:{
        type:String,
        required:true
    }
},{timestamps:true})