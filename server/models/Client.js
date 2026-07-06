const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    industry: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Prospect"],
      default: "Active",
    },

    internalNotes: {
      type: String,
      trim: true,
    }, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", clientSchema); 