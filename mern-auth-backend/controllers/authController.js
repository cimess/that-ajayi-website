const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const CLIENT_COOKIE_NAME = 'refreshToken';

// Development cookie options
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: 'Lax',
  path: '/'
};

// ---- LOGIN ----
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: 'Invalid email or password' });

    // Simple JWT token (optional, can skip for minimal)
    const accessToken = jwt.sign(
      { sub: user._id },
      process.env.JWT_ACCESS_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    // Set access token as cookie
    res.cookie('accessToken', accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    res.json({
      accessToken,
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---- LOGOUT ----
exports.logout = async (req, res) => {
  try {
    // Clear access token cookie
    res.clearCookie('accessToken', COOKIE_OPTIONS);
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---- REFRESH TOKEN ----
exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token (even if expired, we'll refresh it)
    try {
      const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'secretkey');

      // Token is still valid, return success
      return res.json({ message: 'Token is valid' });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // Token expired, issue a new one
        const decoded = jwt.decode(token);

        if (!decoded || !decoded.sub) {
          return res.status(401).json({ message: 'Invalid token' });
        }

        // Verify user still exists
        const user = await User.findById(decoded.sub);
        if (!user) {
          return res.status(401).json({ message: 'User not found' });
        }

        // Issue new token
        const newAccessToken = jwt.sign(
          { sub: user._id },
          process.env.JWT_ACCESS_SECRET || 'secretkey',
          { expiresIn: '1h' }
        );

        // Set new cookie
        res.cookie('accessToken', newAccessToken, {
          ...COOKIE_OPTIONS,
          maxAge: 60 * 60 * 1000 // 1 hour
        });

        return res.json({
          message: 'Token refreshed',
          accessToken: newAccessToken
        });
      }

      // Other JWT errors
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (err) {
    console.error('Refresh token error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---- GET CURRENT USER ----
exports.getCurrentUser = async (req, res) => {
  try {
    // User is attached by authenticate middleware
    const user = await User.findById(req.user._id).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error('Get current user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---- PASSWORD RESET ----
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res.status(400).json({ message: 'Email and new password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const salt = await bcrypt.genSalt(12);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

