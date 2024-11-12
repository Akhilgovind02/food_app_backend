const Otp=require("../Models/otp")

const verifyOtp=async (contact,otp)=>{
   const otpRecord= await Otp.findOne({contact,otp});
   console.log(otpRecord);
return otpRecord!==null
};

module.exports={verifyOtp}