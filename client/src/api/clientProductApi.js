import api from "./axios";

// Fetch all product assignments
export const getClientProducts = () =>
    api.get("/client-products");

// Create a new product assignment
export const createClientProduct = (assignmentData) =>
    api.post("/client-products", assignmentData);

// Update an existing product assignment
export const updateClientProduct = (id, assignmentData) =>
    api.put(`/client-products/${id}`, assignmentData);

// Delete a product assignment
export const deleteClientProduct = (id) =>
    api.delete(`/client-products/${id}`); 