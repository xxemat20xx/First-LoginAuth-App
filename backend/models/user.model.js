const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    }
    ,name:{
        type: String,
        required: true,
        trim: true
    },
    lastLogin:{
        type: Date,
        default: Date.now
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verificationToken: String,
    verificationExpires: Date,
},{timestamps: true});

module.exports = mongoose.model('User', UserSchema);
