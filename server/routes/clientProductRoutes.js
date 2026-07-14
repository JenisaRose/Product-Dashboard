const { protect } = require("../middleware/authMiddleware"); 

// Import Express
const express = require("express");

// Create Router
const router = express.Router();

// Import Controller Functions
const {
  createClientProduct,
  getClientProducts,
  updateClientProduct,
  deleteClientProduct,
} = require("../controllers/clientProductControllers"); 

/*
=========================================
GET    /api/client-products
POST   /api/client-products
=========================================
*/

router
    .route("/")
    .get(protect, getClientProducts)
    .post(protect, createClientProduct); 
 

/*
=========================================
PUT    /api/client-products/:id
DELETE /api/client-products/:id
=========================================
*/

router
    .route("/:id")
    .put(protect, updateClientProduct)
    .delete(protect, deleteClientProduct); 

// Export Router
module.exports = router; 