const ErrorHandler = require('../utils/errorhander');

module.exports = (err,req,res,next)=>{ 
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    
    //Wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Resources not found. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //Duplicate key error handle
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }

    //Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is Invalid, Try again`;
        err = new ErrorHandler(message, 400);
    }

    //JWT Expire token error.
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, Try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });

};