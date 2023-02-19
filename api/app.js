const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require('./middleware/error');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

//Config 
dotenv.config({path:"config/config.env"});

app.use(cors());
app.use(express.json({limit: 52428800}));
app.use( bodyParser.json( {parameterLimit: 50000, limit:52428800, type:'application/json'} ) ); 
// app.use(express.json({limit: 1024102420}));
// app.use( bodyParser.json( {parameterLimit: 50000, limit:1024102420, type:'application/json'} ) ); 
app.use(bodyParser.urlencoded({ parameterLimit: 50000, limit: 1024102420, extended: true }));
app.use(cookieParser());
app.use(fileUpload());


//Route Import 
const product = require("./Routes/productRoute");
const user = require('./Routes/userRoute');
const order = require('./Routes/orderRoute');
const payment = require('./Routes/paymentRoute.js');

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//Middleware for error
app.use(errorMiddleware);
     
module.exports = app; 

