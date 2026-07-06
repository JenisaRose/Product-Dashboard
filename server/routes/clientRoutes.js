const express = require("express");

const {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientControllers");

const router = express.Router();

router.get("/", getClients);

router.post("/", createClient);

router.put("/:id", updateClient);

router.delete("/:id", deleteClient);

module.exports = router; 