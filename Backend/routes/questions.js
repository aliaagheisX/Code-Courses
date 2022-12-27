const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const { authToken } = require('../middleware/auth');
const { canCreateCourse } = require('../permissions/coursePermissions');

router.post("/create", [authToken, canCreateCourse], questionController.postQuestion);
router.get("/getByQuiz", questionController.getQuestionsByQuiz);

module.exports = router;
