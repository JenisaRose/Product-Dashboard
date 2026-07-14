const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
    {
        actionType: {
            type: String,
            required: true,
        },

        entityName: {
            type: String,
            required: true,
        },

        oldValue: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },

        newValue: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },

        performedBy: {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                default: "",
            },
        }, 
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "ActivityLog",
    activityLogSchema
); 