const catchAsyncErrors = require('./catchAsyncErrors');
const ErrorHandler = require('../utils/errorhander');
const jwt = require('jsonwebtoken');
const User = require('../Modules/userModule')

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const { Token } = req.cookies;
    if (!Token) {
        next(new ErrorHandler("Please login to access this resources", 401));
    }
    const decodeData = jwt.verify(Token, process.env.JWT_SECRET);    
    req.user = await User.findById(decodeData.id);
    next();

});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) =>{
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role ${req.user.role} is not allowed to access this resources`, 403)
            );
        }
        next();
    }
}