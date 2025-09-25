import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true

    },
    password:{
        type: String,

    },
    mobile:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:["User", "Owner", "Rider"],
        required: true
    },
    resetOtp:{
        type:String

    },
    isOtpVerified:{
        type:Boolean,
        default:false
    },
    otpExpires:{
        type:Date
    }
}, {timestamps: true})

const User=mongoose.model("User", userSchema)
export default User