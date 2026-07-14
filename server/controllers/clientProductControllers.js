// Import the ClientProduct model
const ClientProduct = require("../models/ClientProduct"); 
// Import shared status calculation utilities
const {
    calculateCurrentStatus,
    calculatePaymentStatus,
} = require("../utils/statusUtils"); 
const logActivity = require("../utils/activityLogger");
const ACTIVITY_ACTIONS = require("../utils/activityActions"); 

/*
=========================================
Create a new Product Assignment
POST /api/client-products
=========================================
*/
const createClientProduct = async (req, res) => {
    try {
        // Calculate current status automatically
        const currentStatus = calculateCurrentStatus(
            req.body.renewalDate, 
            req.body.billingCycle
        ); 
        // Calculate payment status automatically
        const paymentStatus = calculatePaymentStatus(
            req.body.amount,
            req.body.paidAmount ?? 0
        ); 
        /// Check if the client already has an active subscription
        // for the same product and plan
        const existingAssignment = await ClientProduct.findOne({
            client: req.body.client,
            product: req.body.product,
            planName: req.body.planName,
            currentStatus: {
                $in: ["Active", "Expiring Soon"],
            },
        });

        if (existingAssignment) {
            return res.status(400).json({
                message:
                    "This client already has this product assigned with the same plan.",
            });
        }
        // If paidAmount is not provided, use 0
        const paidAmount = req.body.paidAmount ?? 0;

        // Paid amount cannot be negative
        if (paidAmount < 0) {
            return res.status(400).json({
                success: false,
                message: "Paid amount cannot be negative.",
            });
        }

        // Paid amount cannot be greater than the total amount
        if (paidAmount > req.body.amount) {
            return res.status(400).json({
                success: false,
                message: "Paid amount cannot be greater than the total amount.",
            });
        } 

        const clientProduct = await ClientProduct.create({
            ...req.body,

            // Automatically calculated values
            currentStatus,
            paymentStatus,
        }); 
        // Send success response
        res.status(201).json(clientProduct);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
=========================================
Get all Product Assignments
GET /api/client-products
=========================================
*/
const getClientProducts = async (req, res) => {
    try {
        const clientProducts = await ClientProduct.find()
            .populate("client")
            .populate("product")
            .sort({ createdAt: -1 });

        res.status(200).json(clientProducts);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/*
=========================================
Update Product Assignment
PUT /api/client-products/:id
=========================================
*/
const updateClientProduct = async (req, res) => { 
    console.log("===== UPDATE CLIENT PRODUCT CALLED ====="); 
    try {
        // Calculate the current status based on the new renewal date
        const currentStatus = calculateCurrentStatus(
            req.body.renewalDate, 
            req.body.billingCycle
        ); 
    
        // If paidAmount is not provided, use 0
        const paidAmount = req.body.paidAmount ?? 0; 
        // Calculate payment status automatically
        const paymentStatus = calculatePaymentStatus(
            req.body.amount,
            paidAmount
        ); 

        // Paid amount cannot be negative
        if (paidAmount < 0) {
            return res.status(400).json({
                success: false,
                message: "Paid amount cannot be negative.",
            });
        } 

        // Paid amount cannot be greater than the total amount
        if (paidAmount > req.body.amount) {
            return res.status(400).json({
                success: false,
                message: "Paid amount cannot be greater than the total amount.",
            });
        } 

        const oldClientProduct = await ClientProduct.findById(req.params.id);

        if (!oldClientProduct) {
            return res.status(404).json({
                success: false,
                message: "Assignment not found.",
            });
        } 

        const updatedClientProduct =
            await ClientProduct.findByIdAndUpdate(
                req.params.id,
                {
                    ...req.body,

                    // Automatically calculated values
                    currentStatus,
                    paymentStatus,
                }, 
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!updatedClientProduct) {
            return res.status(404).json({
                success: false,
                message: "Assignment not found.",
            });
        } 

        console.log(req.admin); 
        console.log("Controller req.admin:");
        console.log(req.admin); 
        await logActivity({
            actionType: ACTIVITY_ACTIONS.SUBSCRIPTION_RENEWED,
            entityName: updatedClientProduct.planName,
            oldValue: oldClientProduct.toObject(),
            newValue: updatedClientProduct.toObject(),
            admin: req.admin,
        }); 

        if (oldClientProduct.paymentStatus !== updatedClientProduct.paymentStatus) {
            await logActivity({
                actionType: ACTIVITY_ACTIONS.PAYMENT_STATUS_CHANGED,
                entityName: updatedClientProduct.planName,
                oldValue: {
                    paymentStatus: oldClientProduct.paymentStatus,
                },
                newValue: {
                    paymentStatus: updatedClientProduct.paymentStatus,
                },
                admin: req.admin,
            });
        } 

        res.status(200).json(updatedClientProduct);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}; 

/*
=========================================
Delete Product Assignment
DELETE /api/client-products/:id
=========================================
*/
const deleteClientProduct = async (req, res) => {
    try {
        const deletedClientProduct = await ClientProduct.findByIdAndDelete(
            req.params.id
        );

        if (!deletedClientProduct) {
            return res.status(404).json({
                success: false,
                message: "Assignment not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Assignment deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Export all controller functions
module.exports = {
    createClientProduct,
    getClientProducts,
    updateClientProduct,
    deleteClientProduct,
}; 