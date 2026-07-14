const express = require("express");

const router = express.Router();

const {
    getPendingPaymentReport,
    getProductWiseReport,
    getClientWiseReport,
    getExpiredReport,
} = require("../controllers/reportControllers"); 

// Pending Payment Report
router.get("/pending-payments", getPendingPaymentReport); 

// Product-wise Report
router.get("/product-wise", getProductWiseReport); 

router.get("/client-wise", getClientWiseReport); 

router.get("/expired", getExpiredReport); 

module.exports = router; 