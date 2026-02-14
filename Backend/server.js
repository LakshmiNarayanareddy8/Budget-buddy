  require("dotenv").config();
  const express = require("express");
  const cors = require("cors");
  const path = require("path");
  const connectDB = require("./config/db");
  const authRoutes = require("./routes/authRoutes");
  const incomeRoutes = require("./routes/incomeRoutes");
  const expenseRoutes = require("./routes/expenseRoutes");
  const dashboardRoutes = require("./routes/dashboardRoutes");

  const app = express();

  // Middleware to handle CORS
  app.use(
    cors({
      // origin: process.env.CLIENT_URL || "http://localhost:5173",
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Middleware to parse JSON
  app.use(express.json());

  connectDB();

  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/income", incomeRoutes);
  app.use("/api/v1/expense",expenseRoutes);
  app.use("/api/v1/dashboard",dashboardRoutes);


  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  // Port configuration
  const PORT = process.env.PORT || 8000;

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }); 