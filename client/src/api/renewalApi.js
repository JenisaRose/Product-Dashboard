import api from "./axios"; 


// Fetch all renewal records
export const getRenewals = (filters = {}) => 
    api.get("/renewals", {
        params: filters,
    }); 
// Renew a subscription
export const renewSubscription = (id) =>
    api.put(`/renewals${id}/renew`); 