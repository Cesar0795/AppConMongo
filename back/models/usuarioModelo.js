import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    tipo:{
        type:String,
        default:"Usuario"
    },
    salt:{
        type:String,
        required:true
    }
});

export default mongoose.model('User',userSchema);