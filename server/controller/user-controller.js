import User from "../Model/userModel.js";
import nodemailer from "nodemailer"
import randomstring from "randomstring"
import bcrypt from 'bcrypt'

export const forgotPassword = async (request, response) => {
  try {
    const { email } = request.body;
    const oldUser = await User.findOne({ email: email })

    if (!oldUser) {
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
    let sub = "Forgot-Password"
    let text = `Your OTP: ${otp}`
    await sendOTP(email, sub,text);
    return response.status(200).json(newUser);
  } catch (err) {
    return response.status(500).json(err.message);
  }
}
export const otpVerify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("In backend, email and OTP received:", email, otp);

    const user = await User.findOne({ email: email });
    console.log("In backend, user found:", user);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const currTime = new Date();
    const isOTPValid = user.otp === otp && new Date(user.otpExpiration) > currTime;

    if (isOTPValid) {
      await deleteOTP2(user.email);
      return res.status(200).json(user); 
    } else {
      return res.status(400).json({ error: "Invalid OTP or OTP expired" });
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    return res.status(500).json({ error: "An internal server error occurred" });
  }
};


async function deleteOTP2(email) {
  try {
    await User.updateOne({ email: email }, { $unset: { otp: 1, otpExpiration: 1 } });
    return "OTP deleted successfully";
  } catch (error) {
    throw new Error('Error deleting OTP');
  }
}
export const resetPassword = async (request, response) => {
  const { email, password } = request.body;
  console.log(email,password,"in reset password")
  // const user = await User.findOneAndUpdate()
  try {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt)
    const newUser = await User.findOneAndUpdate(

      { email: email },
      { $set: { password: newPassword } },
      { new: true }
    );
    return response.status(200).json("password successfully reset")
  } catch (err) {
    return response.json({ error: "an error occured" })
  }
}
export const deleteUser = async (request, response) => {
  try {
    const { email } = request.body;

    const userToDelete = await User.findOne({ email });

    if (userToDelete) {
      await User.deleteOne({ _id: userToDelete._id });
      return response.status(200).json("User deleted successfully");
    } else {
      return response.json("No user found with the provided email");
    }
  } catch (error) {
    return response.status(500).json({ error: "Error while deleting user", message: error.message });
  }
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  // //console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "Please enter a valid email";
  } else if (err.message === "incorrect password") {
    errors.password = "Password is incorrect";
  } else if (err.message === "user already exists") {
    errors.email = "Email is already registered";
    // return errors;
  } else if (err.errors) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    // Object.values() is a method that returns an array of the object's own enumerable property values.
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
      const auth = await bcrypt.compare(password, user.password)
      if (auth === true) {
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
    // //console.log(errors)
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
    password = await bcrypt.hash(password, salt)
    const newUser = new User({ email, password, otp, otpExpiration });

    await newUser.save();

    let sub = "Email Verification - OTP"
    let text = `Your OTP: ${otp}`

    await sendOTP(email, sub, text);
    newUser.password = undefined
    return response.status(200).json(newUser);
  } catch (error) {
    //console.log(error);
    const errors = handleErrors(error);
    //console.log(errors);
    response.json({ errors, created: false });
  }
};

async function sendOTP(email, sub, text) {
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
      subject: sub,
      text: text
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    //console.log('OTP sent successfully');
  } catch (error) {
    console.log('Error sending OTP:', error);
  }
}
async function sendGreetings(email, password) {
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
    //console.log('OTP sent successfully');
  } catch (error) {
    //console.log('Error sending OTP:', error);
  }
}
async function deleteOTP(email) {
  try {
    await User.updateOne({ email: email }, { $unset: { otp: 1, otpExpiration: 1 } });
    console.log('OTP deleted successfully');
  } catch (error) {
    console.log('Error deleting OTP:', error);
  }
}