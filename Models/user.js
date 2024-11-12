const mongoose=require("mongoose");
const jwt = require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    pincode:{
        type:String,
        required:true
    }
})


// userSchema.pre("save", async function (next) {

//     if (!this.isModified("password")) {
//         next();
//     }

//     this.password = await bcrypt.hash(this.password, 10);
// });

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

// userSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// }

// userSchema.methods.getResetPasswordToken = async function () {

//     // generate token
//     const resetToken = crypto.randomBytes(20).toString("hex");

//     // generate hash token and add to db
//     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

//     return resetToken;
// }




module.exports=mongoose.model("user",userSchema);
