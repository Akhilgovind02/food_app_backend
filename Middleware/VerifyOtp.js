// const verifyOtp = (req, res, next) => {
//     const otp  = req.body.otp;
  
//     // Retrieve OTP from cookies
//     const storedOtp = req.cookies.otp;
//     console.log(storedOtp,req.body.otp)

//     if (!storedOtp) {
//       return res.status(400).send({ success: false, message: 'No OTP found. Please request a new OTP.' });
//     }
//     // Compare the provided OTP with the stored OTP
//     if (otp == storedOtp) {
//       // OTP is correct
//       res.clearCookie('otp'); // Clear the OTP cookie
//       req.otpVerified = true;
//       next();
//     } else {
//       // OTP is incorrect
//       return res.status(401).send({ success: false, message: 'Invalid OTP. Please try again.' });
//     }
//   };
  
//   module.exports = verifyOtp;
  


const verifyOtp = (req, res, next) => {
  const otp = req.body.otp;

  // Retrieve OTP from cookies
  const storedOtp = req.cookies.otp; 
  console.log('Stored OTP:', storedOtp, 'Provided OTP:', otp);

  if (!storedOtp) {
    return res.status(400).send({ success: false, message: 'No OTP found. Please request a new OTP.' });
  }

  // Compare the provided OTP with the stored OTP
  if (otp === storedOtp) {
    // OTP is correct
    res.clearCookie('otp'); // Clear the OTP cookie
    req.otpVerified = true;
    next();
  } else {
    // OTP is incorrect
    return res.status(401).send({ success: false, message: 'Invalid OTP. Please try again.' });
  }
};
