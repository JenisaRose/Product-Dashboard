const express = require("express");
const router = express.Router(); // Create a new Express router

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
router.get("/", getProducts); 

// GET /api/products/recent
// Fetch recently added products
router.get("/recent", getRecentProducts); 

// POST /api/products
// Add a new product to the database
router.post("/", createProduct); 

// PUT /api/products/:id
// Update a product using its MongoDB ID
router.put("/:id", updateProduct); 

// DELETE /api/products/:id
// Delete a product using its MongoDB ID
router.delete("/:id", deleteProduct); 

module.exports = router; // Export router so server.js can use it 