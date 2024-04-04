import express ,{Router} from  'express';
import { sellNewItem ,getAllItems,getItemDetails,getCategoryItem,addToCart ,getCartItems,removeCartItem,} from '../controller/item-controller.js';
// import multer from 'multer'
import { forgotPassword,resetPassword,deleteUser,loginUser ,signUpUser,otpVerify } from '../controller/user-controller.js';
import upload from '../utils/upload.js';
// const upload = multer({ dest: 'uploads' })
const router = express.Router();

router.post('/items',upload.single('file'),sellNewItem)
router.post('/cart',addToCart)
router.get('/items',getAllItems)
router.get('/cartitems',getCartItems)
router.delete('/cartitems/:id',removeCartItem)
router.get('/ItemInfo/:id',getItemDetails)
router.get('/items/:category',getCategoryItem)
router.post('/login',loginUser)
router.post('/signup',signUpUser)
router.post('/otpVerification',otpVerify)
router.put('/forgot-password',forgotPassword)
// router.post('/forgot-password',otpVerify2)
router.put('/reset-password',resetPassword)
router.post('/deleteUser',deleteUser)

export default router;