import axios from "axios";

// Base URL of our Express backend
const API = axios.create({
    baseURL: "http://localhost:5000/api/dashboard", 
});

// Fetch dashboard summary
export const getDashboardSummary = () => 
    API.get("/summary"); 

// Fetch upcoming renewals
export const getUpcomingRenewals = () =>
    API.get("/upcoming-renewals"); 

// Fetch recent client-product mappings
export const getRecentClientMappings = () =>
    API.get("/recent-mappings"); 

// Fetch dashboard chart data
export const getDashboardCharts = () =>
    API.get("/charts"); 