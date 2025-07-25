import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    items : {
        type : Array,
        required : true
    },
    amount : {
        type : Number,
        required : true
    } ,
    address : {
        type : Object,
        required : true
    } , 
    status : {
        type : String,
        default : "Food processing",
        required : true
    },
    date : {
        type : Date,
        default : Date.now(),
    },
    payment : {
        type : Boolean,
        default : false
    }
})

const order = mongoose.model("order", orderSchema)
export default order;