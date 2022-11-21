const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepository');

module.exports = {
    authToken: async (req, res, next) => {
        const token = req.header('token');
        if (!token) return res.status(401).send({ message: "Unauthorized. No token provided" });
        try {
            const decoded = jwt.verify(token, process.env.PRIMARY_KEY);
            let email = decoded.payload.email;
            let user = await userRepo.getUser(email);
            req.user = user;
            console.log(user);
            next();
        } catch (err) {
            res.status(400).send({ message: "Unauthorized. Invalid token" });
        }
    },
};