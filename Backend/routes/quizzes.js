const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.get('/', quizController.getAllQuizzes);
router.get('/getquizbyid/:q_id', quizController.getQuizById);
router.get("/getByInstructor/:i_id", quizController.getQuizzesByInstructor);

router.post("/create", quizController.postQuiz);
router.post

module.exports = router;
