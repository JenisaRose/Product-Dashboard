const ActivityLog = require("../models/ActivityLog");

const logActivity = async ({
    actionType,
    entityName,
    oldValue = null,
    newValue = null,
    admin,
}) => { 
    try {
        await ActivityLog.create({
            actionType,
            entityName,
            oldValue,
            newValue,
            performedBy: admin
                ? {
                    name: admin.name,
                    email: admin.email,
                }
                : {
                    name: "Admin",
                    email: "",
                }, 
        });
    } catch (error) {
        console.error("Activity Log Error:", error.message);
    }
};

module.exports = logActivity; 