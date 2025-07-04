
require('dotenv').config();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie')
const {sendVerificationEmail, 
    sendWelcomeEmail, 
    sendPasswordResetEmail, 
    sendResetSuccessEmail
} = require('../mailtrap/emails')
const User = require('../models/user.model');

const signup = async(req, res) => {
    const {email, password, name} = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error('All fields are required');
        }
        const userAlreadyExists = await User.findOne({email});
        if (userAlreadyExists) {
            return res.status(400).json(
                {
                success:false, 
                message: 'User already exists'
                });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(Math.random() * 1000000).toString(); // generate a random verification token
        const newUser = await User.create({
            email,
            password: hashedPassword,
            name,
            verificationToken: verificationToken,
            verificationExpires: Date.now() + 24 * 60 * 60 * 1000 // 24 hour
        });

        // save the user to the database
        await newUser.save();

        // jwt token generation 
        generateTokenAndSetCookie(res, newUser._id);

        // send verification 
        await sendVerificationEmail(newUser.email, verificationToken)

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                ...newUser._doc, // spread operator to include all user properties
                password: undefined, // exclude password from response
            }
        })

    } catch (error) {
        console.error('Error during signup:', error);
        
    }
}
const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code"
            });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationExpires = undefined;

        await user.save(); // Save to db

        await sendWelcomeEmail(user.email, user.name); // Send a welcome email

        res.status(200).json({
            success: true,
            message: "Email verified",
            user: {
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
        console.error("Error in verifying email:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email}); 
        // if user not found
        if(!user){
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password) //this will compare the user input password to the db password
        // if password is incorrect
        if(!password){
              res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        // save to db
        await user.save();

        // send response back
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Error in login");
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
const logout = async(req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}
const forgotPassword = async(req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({ email });

        if(!user){
            res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiresAt;
        console.log(resetToken)
        // update database
        await user.save();
        
        // send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        // send a response back
        res.status(200).json({
            success: true,
            message: "Password reset link sent to your email."
        })
    } catch (error) {
        console.log(error)
    }
}
const resetPassword = async(req, res)=>{
    try {
        const {token} = req.params;
        const{password} = req.body;
        console.log(token)
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {$gt: Date.now() },
        });
        
        if(!user){
           return res.status(400).json(({
                success:false,
                message: "Invalid or expired reset token"
            }));
        }
        // update password
        const hashedPassword = await bcrypt.hash(password,10);
        
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();// save to db

        await sendResetSuccessEmail(user.email);
        // send response back
        return res.status(200).json(({
            success:true,
            message: "Successfully reset the password"
        }))
    } catch (error) {
            console.error("Error resetting password:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while resetting password",
    });

    }
}
const checkAuth = async(req, res)=>{
    
    try {
        const user = await User.findById(req.userId);
        if(!user){
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            user:{
                ...user._doc,
                password: undefined
            }
        });
    } catch (error) {
          return res.status(500).json({
      success: false,
      message: "Server error",
    });
    }
}
module.exports = {
    signup,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    checkAuth
};