import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    otp :{
        type : Number
    },

    otpExpiration :{
        type : Number
    },

    token :{
        type : String
    },

    privateKey :{
        type : String
    },

    address :{
        type : String
    },

    role: {
        type : String,
        default : 0
    },

    verified : {
        type : Boolean,
        default : false
    }
})

export default mongoose.model('User',userSchema );