const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require("dotenv").config({ path: "./.env" });

const inquiryRoutes = require("./routes/inquiry.routes");
const ProductRoutes = require("./routes/adminProductAdd.routes");

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// CORS configuration - IMPORTANT: Make sure this matches your frontend port
app.use(cors({
  origin: "http://localhost:5173", // Your Vite frontend port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/products", ProductRoutes);



app.get('/', (req, res) => {
  res.json({ message: 'Welcome to VR & SONS' });
app.use('/api/profile', profileRoutes);

// Test route to check if server is running
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to VR & SONS API' });
});

// Test route for profile
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server only AFTER DB connects
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect DB:", err);
  });
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`📍 Frontend URL: http://localhost:5173`);
      console.log(`📍 Backend URL: http://localhost:${PORT}`);
    });
