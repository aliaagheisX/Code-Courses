const userRepo = require('../repositories/userRepository');
const quizRepo = require("../repositories/quizRepository");
const jwt = require('jsonwebtoken');

module.exports = {
    getUserId: async (req) => {
        const token = req.header('token');
        if (!token) return null;
        try {
            const decoded = jwt.verify(token, process.env.PRIMARY_KEY);
            let email = decoded.payload.email;
            let user = await userRepo.getUser(email);
            return user.ID;
        } catch (err) {
            return null;
        }
    },
    getUserQuizScore: async (req, q_id) => {
        const token = req.header('token');
        if (!token) return null;
        try {
            const decoded = jwt.verify(token, process.env.PRIMARY_KEY);
            let email = decoded.payload.email;
            let user = await userRepo.getUser(email);
            let score = await quizRepo.getScoreStudent(q_id, user.ID);
            return score;
        } catch (err) {
            return null;
        }
    },
}