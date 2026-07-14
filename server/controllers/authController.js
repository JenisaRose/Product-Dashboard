const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");

// Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password.",
            });
        }

        // Find admin by email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        // Compare entered password with encrypted password
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        // Login successful
        res.status(200).json({
            message: "Login successful.",
            token: generateToken(admin._id),
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    loginAdmin,
}; 