// Import the ClientProduct model
const ClientProduct = require("../models/ClientProduct");

// Calculates subscription status from the renewal date
// Calculates subscription status based on renewal date and billing cycle
function calculateCurrentStatus(renewalDate, billingCycle) {
    const today = new Date();

    // Compare only dates (ignore time)
    today.setHours(0, 0, 0, 0);

    const expiry = new Date(renewalDate);
    expiry.setHours(0, 0, 0, 0);

    const differenceInDays =
        (expiry - today) / (1000 * 60 * 60 * 24);

    // Subscription already expired
    if (differenceInDays < 0) {
        return "Expired";
    }

    // Default warning period
    let warningDays = 30;

    switch (billingCycle) {
        case "Monthly":
            warningDays = 7;
            break;

        case "Quarterly":
            warningDays = 15;
            break;

        case "Half Yearly":
            warningDays = 20;
            break;

        case "Yearly":
            warningDays = 30;
            break;

        default:
            warningDays = 30;
    }

    if (differenceInDays <= warningDays) {
        return "Expiring Soon";
    }

    return "Active";
} 

// Calculate payment status automatically
function calculatePaymentStatus(amount, paidAmount) {
    const pendingAmount = amount - paidAmount;

    // Nothing has been paid
    if (pendingAmount === amount) {
        return "Pending";
    }

    // Fully paid
    if (pendingAmount === 0) {
        return "Paid";
    }

    // Partially paid
    return "Partial";
} 

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