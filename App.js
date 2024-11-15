// const express = require("express");
// const bodyParser = require("body-parser");
// const cors=require("cors");
// const connectDb = require("./Config/db");
// const cookieParser=require("cookie-parser");
// const session= require("cookie-session")
// const app = express();

// connectDb().catch((err) => console.log(err));

// const corsOptions = {
//   origin:'http://localhost:3000',
//   credentials: true,
// };

// app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Set your frontend origin
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
//   // Handle preflight requests
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200); // Respond with OK for preflight
//   }
  
//   next();
// });

// app.use(cookieParser());
// app.use(
//   session({
//     name: 'session',
//     keys: ['123', '321'],
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours
//   })
// );

// app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/api/auth", require("./Routes/authRoutes"));

// module.exports = app;



const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDb = require("./Config/db");
const cookieParser = require("cookie-parser");
const app = express();

connectDb().catch((err) => console.log(err));

// Dynamic CORS configuration based on environment
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware setup
app.use(cookieParser());

// Set cookie options directly instead of using `cookie-session`
app.use((req, res, next) => {
  res.cookie('session', 'session_data', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
    sameSite: 'None', // Required for cross-origin cookies
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });
  next();
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./Routes/authRoutes"));

module.exports = app;
