const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    getActivityLogs,
} = require("../controllers/activityLogControllers");

router.get("/", protect, getActivityLogs);

module.exports = router; 