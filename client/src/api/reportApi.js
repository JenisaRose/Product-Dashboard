import api from "./axios";

// Get Pending Payment Report
export const getPendingPaymentReport = async () => {
    const response = await api.get("/reports/pending-payments");
    return response.data;
};

// Get Product-wise Report
export const getProductWiseReport = async () => {
    const response = await api.get("/reports/product-wise");
    return response.data;
};

// Get Client-wise Report
export const getClientWiseReport = async () => {
    const response = await api.get("/reports/client-wise");
    return response.data;
};

// Get Expired Report
export const getExpiredReport = async () => {
    const response = await api.get("/reports/expired");
    return response.data;
}; 