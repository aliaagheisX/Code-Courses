const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.get('/', quizController.getAllQuizzes);
router.get('/getquizbyid/:q_id', quizController.getQuizById);
router.post("/create", quizController.postQuiz);
router.get("/getByInstructor/:i_id", quizController.getQuizzesByInstructor);


module.exports = router;
