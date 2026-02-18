const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/auth');

router.post('/signup', [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  body('secretKey').not().isEmpty().withMessage('Secret key is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  const { name, email, password, role, secretKey } = req.body;

  try {
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid secret key. Access denied.' 
      });
    }
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ 
        success: false, 
        message: 'Admin already exists with this email' 
      });
    }

    // Create admin
    admin = await Admin.create({
      name,
      email,
      password,
      role: role || 'admin'
    });

    // Create token
    const token = admin.getSignedJwtToken();

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    };

    res.status(201)
      .cookie('token', token, options)
      .json({
        success: true,
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          company: admin.company
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').not().isEmpty().withMessage('Password is required')
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  const { email, password } = req.body;

  try {
    // Check for admin
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check if password matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Update last login
    admin.lastLogin = Date.now();
    await admin.save();

    // Create token
    const token = admin.getSignedJwtToken();

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    };

    res.status(200)
      .cookie('token', token, options)
      .json({
        success: true,
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          company: admin.company
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

router.get('/logout', protect, (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

router.get('/me', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    res.status(200).json({
      success: true,
      admin
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

module.exports = router;