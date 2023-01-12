const User = require('../Modules/userModule');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto");
const { findOne } = require('../Modules/userModule');
const cloudinary = require("cloudinary");

//User Register Fuction
exports.registerUser = catchAsyncErrors(async(req, res) =>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width:150,
        crop: "scale",
    });
   
    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password, avatar:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    sendToken(user, 201, res);
    // const token = user.getJWTToken();
    // res.status(201).json({ success:true, token });
    // res.status(201).json({ success:true, body });

});

//User Login 
exports.loginUser = catchAsyncErrors(async(req, res, next) =>{
    const { email, password } = req.body;
    
    //Checking if user has given password and email both 

    if (!email || !password) {
        return next(new ErrorHander("Please enter email or password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid email or password", 401));
    }
    
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
    // const token = user.getJWTToken();
    // res.status(200).json({ success:true, token });

});

//User Logout
exports.logoutUser = catchAsyncErrors(async(req, res, next) =>{    
    res.cookie('Token', null, {
        expires:new Date(Date.now()),
        httpOnly:true,
    });        
    res.status(200).json({ success:true, message:"Logout successfully" });
});

//Forget Password 
exports.forgetPassword = catchAsyncErrors(async(req, res, next) =>{    
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return next(new ErrorHander("User not found", 404));
    }
    //get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave:false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then, Please ignore it`;

    try {
        await sendEmail({
            email:user.email,
            subject:"Ecommerce Password Recovery Mail",
            message
        });
        res.status(200).json({
            success:true,
            message: `Email send to ${user.email} successfullty`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave:false });
        return next(new ErrorHander(error.message, 500));
    }

    res.status(200).json({ success:true, message:"Logout successfully" });
});

//Reset Password 
exports.resetPassword = catchAsyncErrors(async(req, res, next) =>{    

    //Creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHander("Reset password token is invalid or has been expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander("Password doen not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

});


//Get user detail by User
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
});


//Update password by user
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHander("Old password is incorrent", 400));
    }

    if (req.body.newPassword !== req.body.comfirmPassword) {
        return next(new ErrorHander("Password does not matched", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
    
});

//User Update Profile ---- User
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    };
    if (req.body.avatar !== "") {

        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width:150,
            crop: "scale",
        });
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
        
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({success:true, message:"Profile has been updated"});
    
});

//Get all Users ---admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {

    const users = await User.find();
    res.status(200).json({success:true, users });
    
});

//Get Single Users ---admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return ErrorHander(`User does not exits with Id: ${req.params.id}`, 404);
    }

    res.status(200).json({success:true, user });
    
});

//Update User Role ---- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({success:true});
    
});

//Delete user ---- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHander(`User does not exits with Id:${req.params.id}`));
    }
    user.remove();
    res.status(200).json({success:true});
    
});

