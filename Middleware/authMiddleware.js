const jwt = require('jsonwebtoken');
const User = require('../Models/user');
require('dotenv').config()
exports.isAuthenticatedUser = (async (req, res, next) => {
    try{
        const { authorization } = await req.headers;
        console.log(req.headers.authorization)
        if (!authorization || authorization == 'null') {
            return res.status(401).json({ message: "You are not authorized to access this route"})
        }
        else{    
        const decodedData = jwt.verify(authorization, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.id);
        next();
        }
    }catch(error){
        console.log(error)
    }
});




exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403));
        }
        next();
    }
}