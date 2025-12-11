const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const authenticate = require('../middleware/authenticate');

// Login
router.post('/login', authController.login);

// Logout
router.post('/logout', authController.logout);

// Refresh Token
router.post('/refresh-token', authController.refreshToken);

// Get Current User
router.get('/me', authenticate, authController.getCurrentUser);

// Password Reset
router.post('/reset-password', authenticate, authController.resetPassword);

module.exports = router;
