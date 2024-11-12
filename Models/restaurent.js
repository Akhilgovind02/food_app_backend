const mongoose = require("mongoose");
const restaurantSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,

    },
    pin:{
        type:String,
        required:true
    }
})