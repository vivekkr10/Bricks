require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./.env" });

const inquiryRoutes = require("./routes/inquiry.routes");
const ProductRoutes = require("./routes/adminProductAdd.routes");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "bricks-one.vercel.app",
      "bricks-git-main-vivek-kumars-projects-c1d529b0.vercel.app",
      "bricks-57eppq6no-vivek-kumars-projects-c1d529b0.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/products", ProductRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to VR & SONS" });
});

app.use("/api/profile", profileRoutes);

// Test route for profile
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
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
  .catch((err) => {
    console.error("Failed to connect DB:", err);
  });
