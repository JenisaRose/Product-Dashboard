const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true, 
      unique: true, 
      trim: true,
    },

    productCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    version: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Active",
        "Inactive",
        "Under Development",
        "Discontinued",
      ],
      default: "Active",
    },

    ownerTeam: {
      type: String,
      required: true,
    },

    launchDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema); 