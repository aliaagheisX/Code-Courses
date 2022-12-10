const userRepo = require('../repositories/userRepository');

module.exports = {
    canEditProfile: async (req, res, next) => {
        //console.log(req.user);
        let incomingUsername = req.user.USERNAME;
        let profileUsername = req.params.username;
        //console.log('incoming' + incomingUsername);
        //console.log('profile' + profileUsername);
        if (incomingUsername !== profileUsername)
            return res.status(401).send({ message: "Unauthorized. This isn't your profile." });
        next();
    }
}