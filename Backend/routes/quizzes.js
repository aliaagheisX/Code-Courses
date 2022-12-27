const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const { authToken } = require("../middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "images/" });
const { canCreateCourse } = require("../permissions/coursePermissions");

router.get("/", quizController.getAllQuizzes);
router.get("/getquizbyid/:q_id", quizController.getQuizById);
router.get("/getByInstructor/:i_id", quizController.getQuizzesByInstructor);
router.get("/getByStudent/:s_id", quizController.getQuizzesByStudent);
router.post("/create", quizController.postQuiz);
router.post("/take", quizController.takeQuiz);

router.post;

module.exports = router;
