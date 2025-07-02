const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie')
const {sendVerificationEmail, sendWelcomeEmail} = require('../mailtrap/emails')
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
    res.send('User login endpoint');
}
const logout = async(req, res) => {
    res.send('User logout endpoint');
}
module.exports = {
    signup,
    login,
    logout,
    verifyEmail
};