const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS  // Your email password or app password
  }
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'VR & SONS - Password Reset OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #7C2F26; font-size: 32px; margin: 0;">VR & SONS</h1>
          <p style="color: #666; font-size: 16px;">Est. 1995</p>
        </div>
        
        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; text-align: center;">
          <h2 style="color: #333; margin-bottom: 20px;">Password Reset OTP</h2>
          <p style="color: #666; font-size: 16px; margin-bottom: 10px;">Your OTP for password reset is:</p>
          <div style="background-color: #7C2F26; color: white; font-size: 36px; font-weight: bold; padding: 15px; border-radius: 8px; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #666; font-size: 14px;">This OTP will expire in 10 minutes.</p>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">If you didn't request this, please ignore this email.</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
          <p style="color: #999; font-size: 12px;">&copy; 2024 VR & SONS. All rights reserved.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
  transporter.verify(function (error, success) {
  if (error) {
    console.log("Transporter error:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
};

module.exports = { sendOTPEmail };