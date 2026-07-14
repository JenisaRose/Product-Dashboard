const ClientProduct = require("../models/ClientProduct");

// Get Pending Payment Report
const getPendingPaymentReport = async (req, res) => {
    try {
        const pendingPayments = await ClientProduct.find({
            paymentStatus: {
                $in: ["Pending", "Partial", "Overdue"],
            },
        })
            .populate("client", "companyName")
            .populate("product", "productName")
            .sort({ renewalDate: 1 });

        res.status(200).json(pendingPayments);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}; 

// Get Product-wise Client Report
const getProductWiseReport = async (req, res) => {
    try {
        const productWiseReport = await ClientProduct.find()
            .populate("product", "productName category")
            .populate("client", "companyName")
            .sort({ "product.productName": 1 });

        res.status(200).json(productWiseReport);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}; 

// Get Client-wise Product Report
const getClientWiseReport = async (req, res) => {
    try {
        const clientWiseReport = await ClientProduct.find()
            .populate("client", "companyName")
            .populate("product", "productName category")
            .sort({ "client.companyName": 1 });

        res.status(200).json(clientWiseReport);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}; 

// Get Expired Subscription Report
const getExpiredReport = async (req, res) => {
    try {
        const expiredReport = await ClientProduct.find({
            currentStatus: "Expired",
        })
            .populate("client", "companyName")
            .populate("product", "productName category")
            .sort({ renewalDate: 1 });

        res.status(200).json(expiredReport);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}; 

module.exports = {
    getPendingPaymentReport,
    getProductWiseReport,
    getClientWiseReport,
    getExpiredReport,
}; 