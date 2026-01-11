import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import { sendOtpMail } from "../utils/mail.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    let user = await User.findOne({ email });
    if(user){
        return res.status(400).json({ message: "User already exists" });
    }
    if(password.length < 6){
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    if(mobile.length < 10){
        return res.status(400).json({ message: "Invalid mobile number" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        mobile,
        role
    });

    const token = await genToken(user._id);
    res.cookie("token",token,{
        secure:false,
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
        httpOnly:true
    })

    return res.status(201).json( user );
    //res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const signIn = async (req, res) => {
  try {
    const { email, password, mobile } = req.body;
    const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({ message: "User does not exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await genToken(user._id);
    res.cookie("token",token,{
        secure:false,
        sameSite:"strict",
        maxAge:7*24*60*60*1000,
        httpOnly:true
    })

    return res.status(200).json( user );
  } catch (error) {
    return res.status(500).json({ message: "SignIn error", error: error.message });
  }
}

export const signOut = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Signout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Signout error", error: error.message });
    }
}

export const SendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "User does not exists" });
        }

        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        // Set OTP and expiry in user document
        user.resetOtp = otp;
        user.OtpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes from now
        user.isOtpVerified=false
        await user.save();

        // Send OTP via email
        await sendOtpMail(email, otp);

        return res.status(200).json({ message: "OTP sent to email" });
    } catch (error) {
        return res.status(500).json({ message: "Send OTP error", error: error.message });
    }
}

export const VerifyOtp = async (req, res) => {  
    try {
      const {email,otp}=req.body
      const user=await User.findOne({email})
      if(!user || user.resetOtp!=otp || user.OtpExpires<Date.now()){
        return res.status(400).json({message:"invalid/expired otp"})
      }
      user.isOtpVerified=true
      user.resetOtp=undefined
      user.OtpExpires=undefined
      await user.save()
      return res.status(200).json({message:"otp verified"})
    } catch (error) {
      return res.status(500).json(`verify otp error ${error}`)
    }
}

export const resetPassword = async (req,res) => {
  try {
    const {email,newPassword}=req.body
    const user=await User.findOne({email})
      if(!user || !user.isOtpVerified){
        return res.status(400).json({message:"Otp verification required"})
      }
      const hashedPassword=await bcrypt.hash(newPassword,10)
      user.password=hashedPassword
      user.isOtpVerified=false
      await user.save()
      return res.status(200).json({message:"Password Reset Successfully!"})
  } catch (error) {
    return res.status(500).json(`Reset Password error ${error}`)
  }
}