const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
    let token;

    // Check if token exists
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // Extract token
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get admin details (excluding password)
            req.admin = await Admin.findById(decoded.id).select("-password"); 
            console.log("Auth Middleware:");
            console.log(req.admin); 

            next();
        } catch (error) {
            return res.status(401).json({
                message: "Not authorized. Invalid token.",
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "Not authorized. No token provided.",
        });
    }
};

module.exports = {
    protect,
}; 