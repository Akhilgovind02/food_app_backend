const express=require("express");
const { requestOtp, otpVerification, register, login,getUserDetails,logoutUser } = require("../Controllers/Auth.controller");
const verifyOtp = require("../Middleware/VerifyOtp");
const {isAuthenticatedUser,authorizeRoles} = require('../Middleware/authMiddleware')
const router=express.Router();

// Otp generation and verification
 router.post("/request-otp",requestOtp);
 router.get('/logout',logoutUser);
 router.get('/me', isAuthenticatedUser, getUserDetails);

//  Registration
 router.post("/register",verifyOtp,register);

 router.post("/login",verifyOtp,login);





 module.exports=router