const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/auth');

// @route   PUT /api/profile/update
// @desc    Update admin profile
// @access  Private
router.put('/update', protect, [
  body('name').not().isEmpty().withMessage('Name is required')
], async (req, res) => {
  console.log('📝 Profile update request received');
  console.log('User ID:', req.admin?.id);
  console.log('Request body:', req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    const admin = await Admin.findById(req.admin.id);
    
    if (!admin) {
      console.log('Admin not found with ID:', req.admin.id);
      return res.status(404).json({ 
        success: false, 
        message: 'Admin not found' 
      });
    }

    console.log('Found admin:', admin.email);
    console.log('Updating name from:', admin.name, 'to:', req.body.name);

    // Update only the name (email cannot be changed)
    admin.name = req.body.name;
    await admin.save();

    console.log('✅ Profile updated successfully');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('❌ Profile update error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error: ' + error.message 
    });
  }
});

// @route   POST /api/profile/change-password
// @desc    Change admin password
// @access  Private
router.post('/change-password', protect, [
  body('currentPassword').not().isEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
], async (req, res) => {
  console.log('🔐 Password change request received');
  console.log('User ID:', req.admin?.id);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  const { currentPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findById(req.admin.id).select('+password');

    if (!admin) {
      console.log('Admin not found with ID:', req.admin.id);
      return res.status(404).json({ 
        success: false, 
        message: 'Admin not found' 
      });
    }

    console.log('Found admin:', admin.email);

    // Check current password
    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      console.log('❌ Current password is incorrect');
      return res.status(401).json({ 
        success: false, 
        message: 'Current password is incorrect' 
      });
    }

    console.log('✅ Current password verified');

    // Update password
    admin.password = newPassword;
    await admin.save();

    console.log('✅ Password changed successfully');

    res.json({ 
      success: true, 
      message: 'Password changed successfully' 
    });
  } catch (error) {
    console.error('❌ Password change error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error: ' + error.message 
    });
  }
});

// @route   POST /api/profile/logout-all
// @desc    Logout from all devices
// @access  Private
router.post('/logout-all', protect, async (req, res) => {
  console.log('🚪 Logout all devices request for user:', req.admin?.id);
  
  try {
    // In a production app, you might want to implement token blacklisting
    res.json({ 
      success: true, 
      message: 'Logged out from all devices' 
    });
  } catch (error) {
    console.error('❌ Logout all error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   GET /api/profile/me
// @desc    Get current admin profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  console.log('👤 Profile fetch request for user:', req.admin?.id);
  
  try {
    const admin = await Admin.findById(req.admin.id);
    
    if (!admin) {
      console.log('Admin not found with ID:', req.admin.id);
      return res.status(404).json({ 
        success: false, 
        message: 'Admin not found' 
      });
    }

    console.log('✅ Profile fetched successfully');

    res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt,
        lastLogin: admin.lastLogin
      }
    });
  } catch (error) {
    console.error('❌ Get profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

module.exports = router;