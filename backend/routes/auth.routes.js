import express from "express";
import { googleAuth, resetPassword, SendOtp, signIn, signOut, signUp, VerifyOtp } from "../controllers/auth.controllers.js";

const authRouter=express.Router();

authRouter.post("/signup",signUp)
authRouter.post("/signin",signIn);
authRouter.get("/signout",signOut);
authRouter.post("/send-otp",SendOtp);
authRouter.post("/verify-otp",VerifyOtp);
authRouter.post("/reset-password",resetPassword);
authRouter.post("/google-auth",googleAuth);

export default authRouter;