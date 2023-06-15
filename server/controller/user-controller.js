import User from "../Model/userModel.js";
import nodemailer from "nodemailer"
import randomstring from "randomstring"
import bcrypt from 'bcrypt'

export const forgotPassword = async (request,response)=>{
    try{
        const {email} = request.body;
        const oldUser =await User.findOne({email:email})
        
        if(!oldUser){
            return response.status(400).json('user not exist!')
        }
        const otp = randomstring.generate({
            length: 4,
            charset: 'numeric'
        });
        const otpExpiration = new Date();
        otpExpiration.setMinutes(otpExpiration.getMinutes() + 3);
        const newUser = await User.findOneAndUpdate(
            { email: email },
            { $set: { otp: otp, otpExpiration: otpExpiration } },
            { new: true }
          );
        await sendOTP2(email,otp);
        return response.status(200).json(newUser);
    }catch(err){
        return response.status(500).json(err.message);
    }
}
async function sendOTP2(email, otp) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'himanshuu673@gmail.com',
          pass: 'czegrvgvwyugpekx'
        }
      });
  
      // Compose the email message
      const mailOptions = {
        from: 'himanshuu673@gmail.com',
        to: email,
        subject: 'Forgot-Password',
        text: `Your OTP: ${otp}`
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
      response.json('OTP sent successfully');
    } catch (error) {
      response.json('Error sending OTP:', error);
    }
}
export const otpVerify2 = async (request, response) => {
    try {
      const { otp } = request.body;
      const verify = await User.findOne({ otp: otp });
      const currTime = new Date();
      if (verify && verify.otpExpiration && new Date(verify.otpExpiration) > currTime) {
        await deleteOTP2(verify.email);
        return response.status(200).json(verify); // Return the `verify` object
      } else {
        return response.status(400).json({ error: "Invalid OTP" });
      }
    } catch (error) {
      response.json({ error: "   An error occurred" });
    }
  };
  async function deleteOTP2(email) {
    try {
      await User.updateOne({ email: email }, { $unset: { otp: 1, otpExpiration: 1 } });
      response.json("OTP deleted successfully");
    } catch (error) {
      response.json({ error:'Error deleting OTP:'});
    }
  }
export const resetPassword = async(request,response)=>{
  const {email,password} = request.body;
  const user = await User.findOneAndUpdate()
  try{
    const newUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { password: password} },
      { new: true }
    );
     return response.status(200).json("password successfully reset")
  }catch(err){
    return response.json({error:"an error occured"})
  }
}
export const deleteUser = async(request,response)=>{
  try {
    const cursor = await User.collection.find({});

     let lastUser;
     while (await cursor.hasNext()) {
       lastUser = await cursor.next();
     }

     if (lastUser) {
       await User.collection.deleteOne({ _id: lastUser._id });
        return response.status(200).json("user deleted successfully")
     } else {
      return response.json("no user found")
     }
  } catch (error) {
    return response.json({"error while deleting user : " : error})
  }
}
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "Please enter a valid email";
  } else if (err.message === "incorrect password") {
    errors.password = "Password is incorrect";
  } else if (err.message === "user already exists") {
    errors.email = "Email is already registered";
    return errors;
  }
  else if (err.errors) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  } else {
    errors.email = "Registration failed";
  }

  return errors;
};

export const loginUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const auth =await bcrypt.compare(password,user.password)
      if (auth===true) {        
        return response.status(200).json("login successful");
      } else {
        throw Error("incorrect password");
      }
    } else {
      throw Error("incorrect email");    
    }
  } catch (err) {
    console.log(err)
    const errors = handleErrors(err);
    console.log(errors)
    response.status(201).json({ errors, status: false });
  }
};
export const signUpUser = async (request, response) => {
  try {
    let { email, password } = request.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      throw Error("user already exists");
    }
    const otp = randomstring.generate({
      length: 4,
      charset: 'numeric'
    });

    // Calculate the OTP expiration time
    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 3); // Set the expiration time to 3 minutes from now

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password,salt)
    const newUser = new User({ email, password, otp, otpExpiration });

    await newUser.save();
    await sendOTP(email, otp);
    return response.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    console.log(errors);
    response.json({ errors, created: false });
  }
};

async function sendOTP(email, otp) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'himanshuu673@gmail.com',
        pass: 'czegrvgvwyugpekx'
      }
    });

    // Compose the email message
    const mailOptions = {
      from: 'himanshuu673@gmail.com',
      to: email,
      subject: 'Email Verification - OTP',
      text: `Your OTP: ${otp}`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully');
  } catch (error) {
    console.log('Error sending OTP:', error);
  }
}
async function sendGreetings(email,password) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'himanshuu673@gmail.com',
        pass: 'czegrvgvwyugpekx'
      }
    });

    // Compose the email message
    const mailOptions = {
      from: 'himanshuu673@gmail.com',
      to: email,
      subject: 'Welcome to CAMPUSmart!',
      text: `Welcome to CAMPUSmart!
Thank you for registering on CAMPUSmart! We're thrilled to have you join us. Here are a few details to help you get started:
Username: ${email}
If you have any questions or need assistance, please don't hesitate to reach out to our support team at 12114002@nitkkr.ac.in. We're here to assist you!
    
Welcome aboard, and enjoy your learning journey with CAMPUSmart!
    
Best regards,
The CAMPUSmart Team`,
    };
    

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully');
  } catch (error) {
    console.log('Error sending OTP:', error);
  }
}
export const otpVerify = async (request, response) => {
  try {
    const { otp } = request.body;
    const verify = await User.findOne({ otp: otp });
    console.log(verify);
    const currTime = new Date();
    if (verify && verify.otpExpiration && new Date(verify.otpExpiration) > currTime) {
      await sendGreetings(verify.email,verify.password);
      await deleteOTP(otp);
      return response.status(200).json(verify); // Return the `verify` object
    } else {
      return response.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error);
    response.json({ error: "An error occurred in otp verify" });
  }
};

async function deleteOTP(otp) {
  try {
    await User.updateOne({ otp: otp }, { $unset: { otp: 1, otpExpiration: 1 } });
    console.log('OTP deleted successfully');
  } catch (error) {
    console.log('Error deleting OTP:', error);
  }
}