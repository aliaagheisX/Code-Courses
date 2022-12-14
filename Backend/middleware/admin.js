const userRepo = require('../repositories/userRepository');

module.exports = async (req, res, next) => {
    try {
        if (!req.user.ISADMIN[0]) return res.status(401).send({ message: "Access denied: Not admin" });
        next();
    } catch (err) {
        res.status(500).send({ message: "Internal server error retrieving user\n" + err });
    }
}