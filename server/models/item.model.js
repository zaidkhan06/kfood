import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop"
    },
    category:{
        type:String,
        enum:["Snacks", "Main Course", "Desserts", "Pizza", "Burgers", "Sandwiches", "South Indian", "North Indian", "Chinese", "Fast Food", "Others"],
        required:true

    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    foodType:{
        type:String,
        enum:["Veg", "Non Veg"],
        required:true
    }
}, {timestamps: true})

const Item = mongoose.model("Item", itemsSchema)
export default Item