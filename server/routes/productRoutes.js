const express = require("express");
const router = express.Router(); // Create a new Express router 
const { protect } = require("../middleware/authMiddleware"); 

// Import controller functions
const {
  getProducts,
  getRecentProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers"); 

// GET  /api/products
// Fetch all products from the database
router.get("/", protect, getProducts); 

// GET /api/products/recent
// Fetch recently added products
router.get("/recent", protect, getRecentProducts); 

// POST /api/products
// Add a new product to the database
router.post("/", protect, createProduct); 

// PUT /api/products/:id
// Update a product using its MongoDB ID
router.put("/:id", protect, updateProduct); 

// DELETE /api/products/:id
// Delete a product using its MongoDB ID
router.delete("/:id", protect, deleteProduct); 

module.exports = router; // Export router so server.js can use it 