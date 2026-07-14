import api from "./axios"; 


// Fetch all clients
export const getClients = (params) =>
  api.get("/clients", { params });

// Create client
export const createClient = (data) =>
  api.post("/clients", data);

// Update client
export const updateClient = (id, data) =>
  api.put(`/clients/${id}`, data);

// Delete client
export const deleteClient = (id) =>
  api.delete(`/clients/${id}`); 