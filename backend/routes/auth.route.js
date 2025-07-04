const express = require('express');
const { signup, login, logout, verifyEmail, forgotPassword, resetPassword} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);
module.exports = router;