const express = require("express");

const router = express.Router();

const { loginAdmin } = require("../controllers/authController");

// Admin Login
router.post("/login", loginAdmin);

module.exports = router; 