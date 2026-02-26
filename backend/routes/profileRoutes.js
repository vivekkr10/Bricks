const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/auth');

// @route   GET /api/profile/me
// @desc    Get current admin profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }
    res.json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        phone: admin.phone || '',
        dob: admin.dob || '',
        address: admin.address || '',
        district: admin.district || '',
        state: admin.state || '',
        pinCode: admin.pinCode || '',
        country: admin.country || '',
        company: admin.company || '',
        createdAt: admin.createdAt,
        lastLogin: admin.lastLogin
      }
    });
  } catch (error) {
    console.error('❌ Get profile error:', error);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

// @route   PUT /api/profile/update
// @desc    Update admin profile (all fields except email/password)
// @access  Private
router.put('/update', protect, [
  body('name').not().isEmpty().withMessage('Name is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // Update all editable profile fields
    admin.name     = req.body.name     ?? admin.name;
    admin.phone    = req.body.phone    ?? admin.phone;
    admin.dob      = req.body.dob      ?? admin.dob;
    admin.address  = req.body.address  ?? admin.address;
    admin.district = req.body.district ?? admin.district;
    admin.state    = req.body.state    ?? admin.state;
    admin.pinCode  = req.body.pinCode  ?? admin.pinCode;
    admin.country  = req.body.country  ?? admin.country;

    await admin.save();

    console.log('✅ Profile updated successfully for:', admin.email);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        phone: admin.phone,
        dob: admin.dob,
        address: admin.address,
        district: admin.district,
        state: admin.state,
        pinCode: admin.pinCode,
        country: admin.country,
      }
    });
  } catch (error) {
    console.error('❌ Profile update error:', error);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

// @route   POST /api/profile/change-password
// @desc    Change admin password
// @access  Private
router.post('/change-password', protect, [
  body('currentPassword').not().isEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) throw new Error('Passwords do not match');
    return true;
  })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { currentPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findById(req.admin.id).select('+password');
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    console.log('✅ Password changed successfully for:', admin.email);

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('❌ Password change error:', error);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

module.exports = router;