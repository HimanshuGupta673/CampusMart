import { SELL_NEWITEM ,GET_ALLITEMS ,GET_ITEMDETAILS ,GET_CATEGORYITEMDETAILS,ADD_TOCART,GET_CARTITEMS,DELETE_CARTITEM } from "./type";
import axios from 'axios';

const API_URL = 'https://campusmart-lxbl.onrender.com'
// const API_URL = 'http://localhost:8000'

export const sellNewItem = (data) => async(dispatch) => {
    try {
        // console.log("index.ja ke andar",data)
           const res = await axios.post(`${API_URL}/items`,data)
           const resCart = await axios.post(`${API_URL}/cart`,res.data)
        dispatch({ type: SELL_NEWITEM , payload: res.data });  //dispatch karne se res jaayege reducer ke andar and reducer mein bhi do hote hai state and actions..so yha se dispatch karne par reducer ke action mein jata hai
        dispatch({ type: ADD_TOCART , payload: resCart.data });  //dispatch karne se res jaayege reducer ke andar and reducer mein bhi do hote hai state and actions..so yha se dispatch karne par reducer ke action mein jata hai
    } catch (error) {
        console.log('Error while calling sellNewItem API ', error.message);
    }
}
export const getAllItems = () => async(dispatch) => {
    try {
           const res = await axios.get(`${API_URL}/items`)

        dispatch({ type: GET_ALLITEMS , payload: res.data });  
    } catch (error) {
        console.log('Error while calling getAllNewItems API ', error.message);
    }
}
export const getCartItems = () => async(dispatch) => {
    try {
           const res = await axios.get(`${API_URL}/cartitems`)

        dispatch({ type: GET_CARTITEMS , payload: res.data });  
    } catch (error) {
        console.log('Error while calling getCartItems API ', error.message);
    }
}
export const removeCartItem = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`${API_URL}/cartitems/${id}`);

        dispatch({ type: DELETE_CARTITEM , payload: id });
        console.log(res)
    } catch (error) {
        console.log('Error while calling removecartitem API ', error.message);
    }
}
export const getItemDetails = (id) => async(dispatch) => {
    try {
           const res= await axios.get(`${API_URL}/ItemInfo/${id}`)

        dispatch({ type: GET_ITEMDETAILS , payload: res.data });  //dispatch karne se res jaayege reducer ke andar and reducer mein bhi do hote hai state and actions..so yha se dispatch karne par reducer ke action mein jata hai
    } catch (error) {
        console.log('Error while calling getAllNewItems API ', error.message);
    }
}
export const getCategoryItem = (category) => async(dispatch) => {
    
    try {
        console.log(category)
           const res = await axios.get(`${API_URL}/items/${category}`)

        dispatch({ type: GET_CATEGORYITEMDETAILS , payload: res.data });  //dispatch karne se res jaayege reducer ke andar and reducer mein bhi do hote hai state and actions..so yha se dispatch karne par reducer ke action mein jata hai
    } catch (error) {
        console.log('Error while calling getAllNewItems API ', error.message);
    }
}
export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${API_URL}/login`, user)
    } catch (error) {
        console.log('Error while calling login API: ', error);
    }
}
export const authenticateSignUp = async (user) => {
    try {
        return await axios.post(`${API_URL}/signup`, user)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}
export const forgotPassword = async (email) =>{
    try{
        return await axios.put(`${API_URL}/forgot-password`,{email})
    }catch(err){
        console.log("error while forgotting password : ",err.message)
    }
}
export const Otpverify = async ({email,otp}) => {
    try {
      return await axios.post(`${API_URL}/otpVerification`, {email, otp }); // Wrap otp in an object
    } catch (err) {
      console.log("Error while OTP verification: ", err.message);
    }
  };
// export const Otpverify2 = async ({email,otp}) => {
//     try {
//       return await axios.post(`${API_URL}/forgot-password`, { email,otp }); // Wrap otp in an object
//     } catch (err) {
//       console.log("Error while OTP verification: ", err.message);
//     }
//   };
  export const resetPassword = async (data) => {
    console.log(data);
    try {
      return await axios.put(`${API_URL}/reset-password`, data);
    } catch (err) {
      console.log("error while resetting password: ", err.message);
    }
  };
  export const deleteUser = async (email) =>{
    try{
        return await axios.post(`${API_URL}/deleteUser`,email)
    }catch(err){
        console.log("error while deleting user : " ,err.message)
    }
  }
