import api from "./axios" 

// Fetch dashboard summary
export const getDashboardSummary = () => 
    api.get("/dashboard/summary"); 

// Fetch upcoming renewals
export const getUpcomingRenewals = () =>
    api.get("/dashboard/upcoming-renewals"); 

// Fetch recent client-product mappings
export const getRecentClientMappings = () =>
    api.get("/dashboard/recent-mappings"); 

// Fetch dashboard chart data
export const getDashboardCharts = () =>
    api.get("/dashboard/charts"); 

// Fetch pending payment notifications
export const getPendingPayments = () =>
    api.get("/dashboard/pending-payments"); 