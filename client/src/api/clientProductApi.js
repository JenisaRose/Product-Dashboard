import axios from "axios";

// Base URL of our Express backend
const API = axios.create({
  baseURL: "http://localhost:5000/api/client-products", 
});

// Fetch all product assignments
export const getClientProducts = () => API.get("/");

// Create a new product assignment
export const createClientProduct = (assignmentData) =>
  API.post("/", assignmentData);

// Update an existing product assignment
export const updateClientProduct = (id, assignmentData) =>
  API.put(`/${id}`, assignmentData);

// Delete a product assignment
export const deleteClientProduct = (id) =>
  API.delete(`/${id}`); 