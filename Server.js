require('dotenv').config();
const app =require("./App");

const port = process.env.PORT || 3500;
console.log(port)
app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
})