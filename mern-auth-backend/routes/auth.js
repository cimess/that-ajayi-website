const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const authenticate=require('../middleware/authenticate')
// Login
router.post('/login', authController.login);







// Password Reset
router.post('/reset-password', authenticate, authController.resetPassword);

module.exports = router;
