import api from "./axios";

// Fetch all activity logs
export const getActivityLogs = () =>
    api.get("/activity-logs"); 