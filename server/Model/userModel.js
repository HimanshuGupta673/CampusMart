import mongoose from 'mongoose';
// import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,"Email is required"],
        unique:true  //11000
    },
    password: {
        type: String,
        required: [true,"Password is required"]
    },
    otp:{
        type:String,
        index: {
            expires: '3m' // Set expiration time to 5 minutes
        }
    },
    otpExpiration:{
        type:String,
        index: {
            expires: '3m' 
        }
    }
});
// userSchema.pre("save", async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   });
const User = mongoose.model('User', userSchema);

export default User;