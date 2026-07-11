import axios from "axios";

// Base URL of our Express backend
const API = axios.create({
  baseURL: "http://localhost:5000/api/clients",
});

// Fetch all clients
export const getClients = (params) =>
  API.get("/", { params });

// Create client
export const createClient = (data) =>
  API.post("/", data);

// Update client
export const updateClient = (id, data) =>
  API.put(`/${id}`, data);

// Delete client
export const deleteClient = (id) =>
  API.delete(`/${id}`); 