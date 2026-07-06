const Client = require("../models/Client");

// Get all clients
// Get all clients
const getClients = async (req, res) => {
  try {
    const { search, status } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: "i" } },
        { contactPerson: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    const clients = await Client.find(query).sort({
      createdAt: 1, 
    });

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}; 

// Create client
const createClient = async (req, res) => {
  try {
    const existingClient = await Client.findOne({
      email: req.body.email,
    });

    if (existingClient) {
      return res.status(400).json({
        message: "Client with this email already exists.",
      });
    }

    const client = await Client.create(req.body);

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update client
const updateClient = async (req, res) => {
  try {
    const existingClient = await Client.findOne({
      email: req.body.email,
      _id: { $ne: req.params.id },
    });

    if (existingClient) {
      return res.status(400).json({
        message: "Client with this email already exists.",
      });
    }

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!client) {
      return res.status(404).json({
        message: "Client not found.",
      });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete client
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).json({
        message: "Client not found.",
      });
    }

    res.status(200).json({
      message: "Client deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClients,
  createClient,
  updateClient,
  deleteClient,
}; 