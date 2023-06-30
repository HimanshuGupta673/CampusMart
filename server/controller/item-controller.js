import item from "../Model/model.js";
import User from "../Model/userModel.js";
import cartItem from "../Model/cartModel.js";
import nodemailer from "nodemailer"
import randomstring from "randomstring"
export const sellNewItem = async (request, response) => {

  try {
    const { sellerName, selectItem, productDetails, email, contactNo,contactDetails, price,category } = request.body;
    const { path, originalname } = request.file;

let newItemData = {
  sellerName,
  selectItem,
  productDetails,
  email,
  contactNo,
  contactDetails,
  price,
  createdAt: Date.now(),
  path,
  name: originalname,
  category
};
    const newItems = await item.create(newItemData);
    await newItems.save();
    console.log('Saved successfully');
    return response.status(200).json(newItems);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: error.message });
  }
}
  
export const addToCart = async (request, response) => {
  try {
    const { _id,email,createdAt,price,path,category } = request.body; // Assuming productId is a property in the request body

    const newCartItem = await cartItem.create({
      productId: _id,
      email:email,
      posted:createdAt,
      price:price,
      path:path,
      category:category
    });

    return response.status(200).json(newCartItem);
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
};
export const removeCartItem = async (request, response) => {
  try {
    const itemId = request.params.id;

    const deletedCartItem = await cartItem.findByIdAndDelete(itemId);

     await item.findByIdAndDelete(deletedCartItem.productId);
    

    return response.status(200).json(deletedCartItem);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};




export const getAllItems = async (request, response) => {
  try {
    const allItems = await item.find({}).sort({ 'createdAt': -1 })
    return response.status(200).json(allItems)

  } catch (error) {
    return response.status(500).json(error.message);
  }
}
export const getCartItems = async (request, response) => {
  try {
    const allItems = await cartItem.find({}).sort({ 'createdAt': -1 })
    return response.status(200).json(allItems)

  } catch (error) {
    return response.status(500).json(error.message);
  }
}
export const getItemDetails = async (request, response) => {
  try {
    const product = await item.findById(request.params.id)
    return response.status(200).json(product)

  } catch (error) {
    return response.status(500).json(error.message);
  }
}
export const getCategoryItem = async (request, response) => {
  try {
    let products = await item.find({ 'selectItem': request.params.category.toLowerCase() })
    if(products.length==0){
      products = await item.find({ 'category': request.params.category.toLowerCase() })
    }
    return response.status(200).json(products)

  } catch (error) {
    return response.status(500).json(error.message);
  }
}

