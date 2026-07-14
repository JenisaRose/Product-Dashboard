const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]); 

require("dotenv").config();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({
            email: "admin@arodek.com",
        });

        if (existingAdmin) {
            console.log("Admin already exists.");
            process.exit();
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash("Admin@123", 10);

        // Create admin
        await Admin.create({
            name: "Admin",
            email: "admin@arodek.com",
            password: hashedPassword,
        });

        console.log("Admin created successfully!");
        console.log("Email: admin@arodek.com");
        console.log("Password: Admin@123");

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin(); 