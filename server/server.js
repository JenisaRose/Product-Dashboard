const dns = require("dns"); 
dns.setServers(["8.8.8.8", "8.8.4.4"]); 


require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); 
const productRoutes = require("./routes/productRoutes"); // Import all product routes 
const clientRoutes = require("./routes/clientRoutes"); 
const clientProductRoutes = require("./routes/clientProductRoutes"); 
const renewalRoutes = require("./routes/renewalRoutes"); 
const dashboardRoutes = require("./routes/dashboardRoutes"); 
const reportRoutes = require("./routes/reportRoutes"); 
const authRoutes = require("./routes/authRoutes"); 
const activityLogRoutes = require("./routes/activityLogRoutes"); 
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); 

// Product API routes
// Any request starting with /api/products will go to productRoutes.js
app.use("/api/products", productRoutes); 
app.use("/api/clients", clientRoutes); 
app.use("/api/client-products", clientProductRoutes); 
app.use("/api/renewals", renewalRoutes); 
app.use("/api/dashboard", dashboardRoutes); 
app.use("/api/reports", reportRoutes); 
app.use("/api/auth", authRoutes); 
app.use("/api/activity-logs", activityLogRoutes); 

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 