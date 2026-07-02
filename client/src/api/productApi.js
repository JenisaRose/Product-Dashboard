import axios from "axios";

// Base URL of our Express backend
const API = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

// Fetch all products
export const getProducts = () => API.get("/");

// Create a new product
export const createProduct = (productData) => API.post("/", productData);

// Update an existing product
export const updateProduct = (id, productData) =>
  API.put(`/${id}`, productData);

// Delete a product
export const deleteProduct = (id) => API.delete(`/${id}`); 