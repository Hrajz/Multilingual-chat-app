const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/chat", chatRoutes); // Chat routes

module.exports = app;
