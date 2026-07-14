const ActivityLog = require("../models/ActivityLog");

const getActivityLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find()
            .sort({ createdAt: -1 });

        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getActivityLogs,
}; 