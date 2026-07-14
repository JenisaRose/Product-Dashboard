const Product = require("../models/Product");
const Client = require("../models/Client");
const ClientProduct = require("../models/ClientProduct"); 

// Get Dashboard Summary
const getDashboardSummary = async (req, res) => {
    try {
        const [
            totalProducts,
            activeProducts,
            inactiveProducts,
            totalClients,
            activeSubscriptions,
            expiredSubscriptions,
            pendingPayments,
        ] = await Promise.all([
            Product.countDocuments(),

            Product.countDocuments({
                status: "Active",
            }),

            Product.countDocuments({
                status: "Inactive",
            }),

            Client.countDocuments(),

            ClientProduct.countDocuments({
                currentStatus: "Active",
            }),

            ClientProduct.countDocuments({
                currentStatus: "Expired",
            }),

            ClientProduct.countDocuments({
                paymentStatus: "Pending",
            }),
        ]);

        res.status(200).json({
            totalProducts,
            activeProducts,
            inactiveProducts,
            totalClients,
            activeSubscriptions,
            expiredSubscriptions,
            pendingPayments,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}; 

// Get Upcoming Renewals (Next 30 Days)
const getUpcomingRenewals = async (req, res) => {
    try {
        const today = new Date();

        const nextThirtyDays = new Date();
        nextThirtyDays.setDate(today.getDate() + 30);

        const upcomingRenewals = await ClientProduct.find({
            renewalDate: {
                $gte: today,
                $lte: nextThirtyDays,
            },
        })
            .populate("client", "companyName")
            .populate("product", "productName")
            .sort({ renewalDate: 1 })
            .limit(5);

        res.status(200).json(upcomingRenewals);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}; 

// Get Recent Client-Product Mappings
const getRecentClientMappings = async (req, res) => {
    try {
        const recentMappings = await ClientProduct.find()
            .populate("client", "companyName")
            .populate("product", "productName")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json(recentMappings);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}; 

// Get dashboard chart data
const getDashboardCharts = async (req, res) => {
    try {
        const activeProducts = await Product.countDocuments({
            status: "Active",
        });

        const inactiveProducts = await Product.countDocuments({
            status: "Inactive",
        });

        const underDevelopmentProducts = await Product.countDocuments({
            status: "Under Development",
        });

        const paidPayments = await ClientProduct.countDocuments({
            paymentStatus: "Paid",
        });

        const pendingPayments = await ClientProduct.countDocuments({
            paymentStatus: "Pending",
        });

        const partialPayments = await ClientProduct.countDocuments({
            paymentStatus: "Partial",
        });

        res.json({
            productDistribution: {
                active: activeProducts,
                inactive: inactiveProducts,
                development: underDevelopmentProducts,
            },

            paymentDistribution: {
                paid: paidPayments,
                pending: pendingPayments,
                partial: partialPayments,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}; 

// Get Pending Payment Notifications
const getPendingPayments = async (req, res) => {
    try {
        const pendingPayments = await ClientProduct.find({
            paymentStatus: "Pending",
        })
            .populate("client", "companyName")
            .populate("product", "productName")
            .sort({ renewalDate: 1 })
            .limit(5);

        res.status(200).json(pendingPayments);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}; 

module.exports = {
    getDashboardSummary,
    getUpcomingRenewals,
    getRecentClientMappings,
    getDashboardCharts, 
    getPendingPayments, 
}; 