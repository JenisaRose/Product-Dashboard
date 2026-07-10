const ClientProduct = require("../models/ClientProduct");

const {
    calculateCurrentStatus,
    calculateRenewalWindow,
} = require("../utils/statusUtils"); 
/*
=========================================
Get All Renewal Records
GET /api/renewals
=========================================
*/
const getRenewals = async (req, res) => {
    try {
        const {
            window,
            product,
            client,
            paymentStatus,
            fromDate,
            toDate,
        } = req.query; 

        // Build MongoDB filter
        const filter = {};

        if (product) {
            filter.product = product;
        }

        if (client) {
            filter.client = client;
        }

        if (paymentStatus) {
            filter.paymentStatus = paymentStatus;
        }

        if (fromDate || toDate) {
            filter.renewalDate = {};

            if (fromDate) {
                filter.renewalDate.$gte = new Date(fromDate);
            }

            if (toDate) {
                filter.renewalDate.$lte = new Date(toDate);
            }
        }

        // Fetch matching assignments
        const renewals = await ClientProduct.find(filter)
            .populate("client")
            .populate("product")
            .sort({ renewalDate: 1 });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const renewalData = renewals.map((renewal) => { 
            const renewalDate = new Date(renewal.renewalDate);
            renewalDate.setHours(0, 0, 0, 0);

            const daysRemaining = Math.ceil(
                (renewalDate - today) / (1000 * 60 * 60 * 24)
            );

            return {
                ...renewal.toObject(),
                daysRemaining,
                currentStatus: calculateCurrentStatus(
                    renewal.renewalDate,
                    renewal.billingCycle
                ),
                renewalWindow: calculateRenewalWindow(daysRemaining),
            }; 
        }); 

        // Filter by renewal window
        let filteredRenewals = renewalData;

        if (window) {
            filteredRenewals = renewalData.filter((item) => {
                switch (window) {
                    case "7":
                        return (
                            item.daysRemaining >= 0 &&
                            item.daysRemaining <= 7
                        );

                    case "15":
                        return (
                            item.daysRemaining > 7 &&
                            item.daysRemaining <= 15
                        );

                    case "30":
                        return (
                            item.daysRemaining > 15 &&
                            item.daysRemaining <= 30
                        );

                    case "expired":
                        return item.daysRemaining < 0;

                    default:
                        return true;
                }
            });
        } 

        res.status(200).json(filteredRenewals); 

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}; 

/*
=========================================
Renew Subscription
PUT /api/renewals/:id/renew
=========================================
*/
const renewSubscription = async (req, res) => {

    try {

        const renewal = await ClientProduct.findById(req.params.id);

        if (!renewal) {
            return res.status(404).json({
                success: false,
                message: "Subscription not found.",
            });
        }

        // Calculate the new renewal date automatically
        const newRenewalDate = new Date(renewal.renewalDate);

        switch (renewal.billingCycle) {

            case "Monthly":
                newRenewalDate.setMonth(
                    newRenewalDate.getMonth() + 1
                );
                break;

            case "Quarterly":
                newRenewalDate.setMonth(
                    newRenewalDate.getMonth() + 3
                );
                break;

            case "Half-Yearly":
                newRenewalDate.setMonth(
                    newRenewalDate.getMonth() + 6
                );
                break;

            case "Yearly":
                newRenewalDate.setFullYear(
                    newRenewalDate.getFullYear() + 1
                );
                break;
        }

        renewal.renewalDate = newRenewalDate; 

        // Recalculate current status
        renewal.currentStatus = calculateCurrentStatus(
            renewal.renewalDate,
            renewal.billingCycle
        );

        await renewal.save();

        res.status(200).json({
            success: true,
            message: "Subscription renewed successfully.",
            renewal,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}; 

module.exports = {
    getRenewals,
    renewSubscription,
}; 