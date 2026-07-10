import axios from "axios";

// Base URL of our Express backend
const API = axios.create({
    baseURL: "http://localhost:5000/api/renewals",
});

// Fetch all renewal records
export const getRenewals = (filters = {}) => 
    API.get("/", {
        params: filters,
    }); 
// Renew a subscription
export const renewSubscription = (id) =>
    API.put(`/${id}/renew`); 