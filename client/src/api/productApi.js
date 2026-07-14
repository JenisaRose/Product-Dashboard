import api from "./axios";

// Fetch all products
export const getProducts = () => api.get("/products");

// Fetch recently added products
export const getRecentProducts = () => api.get("/products/recent");

// Send a new product to the backend
export const createProduct = (productData) =>
  api.post("/products", productData);

// Update an existing product
export const updateProduct = (id, productData) =>
  api.put(`/products/${id}`, productData);

// Delete a product
export const deleteProduct = (id) =>
  api.delete(`/products/${id}`); 