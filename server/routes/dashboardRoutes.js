const express = require("express");
const router = express.Router();

// Import controller function
const {
    getDashboardSummary,
    getUpcomingRenewals,
    getRecentClientMappings,
    getDashboardCharts,
} = require("../controllers/dashboardControllers"); 

// GET /api/dashboard/summary
// Fetch dashboard summary data
router.get("/summary", getDashboardSummary); 

// GET /api/dashboard/upcoming-renewals
// Fetch the next 5 upcoming renewals
router.get("/upcoming-renewals", getUpcomingRenewals); 

// GET /api/dashboard/recent-mappings
// Fetch the latest client-product mappings
router.get("/recent-mappings", getRecentClientMappings); 

router.get("/charts", getDashboardCharts); 

module.exports = router; 