import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
  },
  email:{
    type:String,
  },
  posted:{
    type:String
  },
  price:{
    type:String
  },
  path:{
    type:String
  }
});

const cartItem = mongoose.model('cartItem', cartItemSchema);

export default cartItem;
