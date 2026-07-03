const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } 
  catch (error) {
    if (error.code === 11000) {
        return res.status(400).json({
            message: "Product Code already exists."
        });
    }

    res.status(400).json({
        message: error.message
    });
} 
}; 

// Update an existing product
const updateProduct = async (req, res) => {
  try {
    // Find the product using its MongoDB ID
    const product = await Product.findById(req.params.id);

    // If no product exists, return 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product with new values from the request body
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );

    // Send the updated product back
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    // Find the product using its MongoDB ID
    const product = await Product.findById(req.params.id);

    // If product doesn't exist
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the product
    await Product.findByIdAndDelete(req.params.id);

    // Send success message
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 

module.exports = {
  getProducts,
  createProduct, 
  updateProduct, 
  deleteProduct, 
}; 