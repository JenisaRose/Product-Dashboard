// Import mongoose
const mongoose = require("mongoose");

// Create the schema
const clientProductSchema = new mongoose.Schema(
    {
        // Reference to Client collection
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },

        // Reference to Product collection
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        // Plan or License Name
        planName: {
            type: String,
            required: true,
            trim: true,
        },

        // Monthly / Quarterly / Yearly
        billingCycle: {
            type: String,
            enum: ["Monthly", "Quarterly", "Half Yearly", "Yearly"],
            required: true,
        }, 

        // Subscription Amount
        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        // Total amount received from the client
        paidAmount: {
            type: Number,
            default: 0,
            min: [0, "Paid amount cannot be negative"],
        },

        // Date of the latest payment
        lastPaymentDate: {
            type: Date,
            default: null,
        },

        // Additional notes related to the payment
        paymentRemarks: {
            type: String,
            trim: true,
            default: "",
        },

        // Currency
        currency: {
            type: String,
            default: "INR",
        },

        // Subscription Start Date
        startDate: {
            type: Date,
            required: true,
        },

        // Renewal / Expiry Date
        renewalDate: {
            type: Date,
            required: true,
        },

        // Payment Status
        paymentStatus: {
            type: String,
            enum: ["Paid", "Pending", "Partial", "Overdue"],
            default: "Pending",
        },

        // Current Subscription Status
        currentStatus: {
            type: String,
            enum: ["Active", "Expiring Soon", "Expired"],
            default: "Active",
        },

        // Optional Remarks
        remarks: {
            type: String,
            trim: true,
            default: "",
        },
    },

    // Automatically create createdAt and updatedAt
    {
        timestamps: true,
    }
);

// Export the model
module.exports = mongoose.model("ClientProduct", clientProductSchema); 