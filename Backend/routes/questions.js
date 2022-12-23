const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

router.post("/create", questionController.postQuestion);
router.get("/getByQuiz", questionController.getQuestionsByInstructor);

module.exports = router;
