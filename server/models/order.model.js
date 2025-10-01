import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    paymentMethod:{
        type:String,
        enum:['cod', 'online'],
        required:true
    },
    


}, {timestamps: true});