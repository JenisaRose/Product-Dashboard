import axios from "axios";

const API_URL = "http://localhost:5000/api/clients";

// Get Clients
export const getClients = (params) =>
  axios.get(API_URL, { params });

// Create Client
export const createClient = (data) =>
  axios.post(API_URL, data);

// Update Client
export const updateClient = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);

// Delete Client
export const deleteClient = (id) =>
  axios.delete(`${API_URL}/${id}`); 