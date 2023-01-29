const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary = require("cloudinary");

//Handle uncouth Error 
process.on("uncoughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Sutting down the server due to Uncought Rejection`);
    process.exit(1);
});

//Config 
dotenv.config({path:"config/config.env"});

//Connecting to database 
connectDatabase();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})


//Unhandled Promises Rejection 
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Sutting down the server due to unhandled promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});