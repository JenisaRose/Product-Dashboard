const dns = require("dns"); 
dns.setServers(["8.8.8.8", "8.8.4.4"]); 


require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); 
const productRoutes = require("./routes/productRoutes"); // Import all product routes 

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); 

// Product API routes
// Any request starting with /api/products will go to productRoutes.js
app.use("/api/products", productRoutes); 

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 