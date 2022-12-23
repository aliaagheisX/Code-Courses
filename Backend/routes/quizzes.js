const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.post("/create", quizController.postQuiz);

module.exports = router;
