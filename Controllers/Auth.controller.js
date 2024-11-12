const User = require("../Models/user");
const twilio = require("twilio");
const crypto = require("crypto");
const user = require("../Models/user");
const sendToken = require("../Services/sendToken");
// Initialize Twilio client

const requestOtp = async (req, res) => {
  const { contact } = req.body.userData;
  const { is } = req.body;

  async function sendOTP(contact) {
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    // Generate a random 6-digit OTP
    const otp = require("crypto").randomInt(100000, 999999).toString();

    // Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: "+15204413091",
      to: `+91${contact}`,
    });

    // Set OTP in a cookie
    res.cookie("otp", otp, { maxAge: 2 * 60 * 1000, httpOnly: true });

    return { success: true, message: "OTP sent successfully." };
  }

  async function handleRequest(contact, isRegister) {
    const user = await User.find({ contact: contact });

    if (isRegister == "isRegister") {
      if (user.length>0) {
        return { success: false, message: "User already exists." };
      }
    } else {
      if (user.length==0) {
        return { success: false, message: "User does not exist." };
      }
    }

    // If the user existence check passes, send OTP
    try {
      return await sendOTP(contact);
    } catch (error) {
      console.error("Error sending OTP:", error);
      return { success: false, message: "Failed to send OTP." };
    }
  }

  // Handle the request
  handleRequest(contact, is)
    .then((response) => res.send(response))
    .catch((error) => {
      console.error("Error handling request:", error);
      res
        .status(500)
        .send({ success: false, message: "Internal server error." });
    });
};

const register = async (req, res) => {
  const userData = req.body.userData;
  try {
    if (req.otpVerified) {
      const user = await User.create(userData);
      const msg = {
        message: "Registered Successfully" 
      }
      sendToken(user,200,res,msg)
    } else {
      res
        .status(401)
        .send({ success: false, message: "OTP verification failed." });
    }
  } catch (error) {
    console.log("registration failed");
    res.status(500).send({ success: false, message: "Registeration failed" });
  }
};
const login = async (req, res) => {
  const { contact } = req.body.userData;
  
  try {
    const user = await User.find({ contact: contact });
    if (user) {
      if (req.otpVerified) {
        const msg = {
          message: "Login Successfull" 
        }
        sendToken(user[0],200,res,msg)
      } else {
        res
          .status(401)
          .send({ success: false, message: "OTP verification failed." });
      }
    }
    else {
      res.status(401).send({ success: false, message: "Invalid Credentials" });
      }
  } catch (error) {
    console.log("login failed");
    res.status(500).send({ success: false, message: "login failed" });
  }
};
const getUserDetails = async (req, res, next) => {
  try{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user,
    });
  }catch(error){
    res.status(500).json({success: false, message: "Error getting user details"})
  }
};


const logoutUser = async (req, res, next) => {

  res.status(200).json({
      success: true,
      message: "Logged Out",
  });
};

module.exports = { requestOtp, register, login ,getUserDetails, logoutUser };
