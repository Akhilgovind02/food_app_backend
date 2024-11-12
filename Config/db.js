const mongoose=require("mongoose");

const connectDb=async ()=>{
    url=process.env.MONGODB_URL || ""
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongodb connected succesfully")
}

module.exports=connectDb