const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorMiddleware = require('./middleware/error');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

//Route Import 
const product = require("./Routes/productRoute");
const user = require('./Routes/userRoute');
const order = require('./Routes/orderRoute');

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//Middleware for error
app.use(errorMiddleware);
     
module.exports = app; 

