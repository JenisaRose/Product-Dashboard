const express = require("express");

const {
    getRenewals,
    renewSubscription,
} = require("../controllers/renewalControllers");

const router = express.Router();

/*
=========================================
Get All Renewal Records
=========================================
*/
router.get("/", getRenewals);

/*
=========================================
Renew Subscription
=========================================
*/
router.put("/:id/renew", renewSubscription);

module.exports = router; 