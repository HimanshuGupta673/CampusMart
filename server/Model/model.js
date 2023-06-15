import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    sellerName: {
        type: String,
        required: true,
    },
    selectItem: {
        type: String,
        lowercase: true
        // required: true,
    },
    productDetails: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    contactDetails: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    path: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        // required: true
    },
    category:{
        type:String,
        lowercase: true
    }
    
})
const item = mongoose.model('item', itemSchema);

export default item;