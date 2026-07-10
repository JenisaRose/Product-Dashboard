/*
=========================================
Calculate Current Subscription Status
=========================================
*/
const calculateCurrentStatus = (renewalDate, billingCycle) => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const expiry = new Date(renewalDate);
    expiry.setHours(0, 0, 0, 0);

    const differenceInDays =
        (expiry - today) / (1000 * 60 * 60 * 24);

    if (differenceInDays < 0) {
        return "Expired";
    }

    let warningDays = 30;

    switch (billingCycle) {
        case "Monthly":
            warningDays = 7;
            break;

        case "Quarterly":
            warningDays = 15;
            break;

        case "Half-Yearly":
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
};

/*
=========================================
Calculate Payment Status
=========================================
*/
const calculatePaymentStatus = (amount, paidAmount) => {
    const pendingAmount = amount - paidAmount;

    if (pendingAmount === amount) {
        return "Pending";
    }

    if (pendingAmount === 0) {
        return "Paid";
    }

    return "Partial";
};

/*
=========================================
Calculate Renewal Window
=========================================
*/
const calculateRenewalWindow = (daysRemaining) => {
    if (daysRemaining < 0) {
        return "Expired";
    }

    if (daysRemaining <= 7) {
        return "7 Days";
    }

    if (daysRemaining <= 15) {
        return "15 Days";
    }

    if (daysRemaining <= 30) {
        return "30 Days";
    }

    return "Upcoming";
};

module.exports = {
    calculateCurrentStatus,
    calculatePaymentStatus,
    calculateRenewalWindow,
}; 