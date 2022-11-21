module.exports = function(req, res, next) {
    if (!req.body.user.ISADMIN[0]) return res.status(403).send({ message: "Access denied: Not admin" });
    next();
}