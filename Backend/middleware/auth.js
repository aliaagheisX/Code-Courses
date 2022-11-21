const jwt = require('jsonwebtoken');

module.exports = {
    authToken: async (req, res, next) => {
        const token = req.body.token;
        if (!token) return res.status(401).send({ message: "Access denied. No token provided" });
    
        try {
            const decoded = jwt.verify(token, process.env.PRIMARY_KEY);
            req.body.user = decoded;
            next();
        } catch (err) {
            res.status(400).send({ message: "Invalid token" });
        }
    },
};