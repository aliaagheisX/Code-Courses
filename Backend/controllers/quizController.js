const quizRepo = require("../repositories/quizRepository");
const elementRepo = require("../repositories/elementRepository");
const { getUserQuizScore } = require("../helpers/userHelper");
const Joi = require("joi");

function quizValidate(columns) {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    description: Joi.string().required(),
    image: Joi.any(),
    topics: Joi.array().items(Joi.number()).min(1).required(),
    questions: Joi.array().items(Joi.number()).min(1).required(),
    I_ID: Joi.number(),
  });
  return schema.validate(columns);
}
function answerValidate(columns) {
  const schema = Joi.object({
    answers: Joi.array()
      .items(Joi.number().required, Joi.string().required)
      .min(1)
      .required(),
  });
  return schema.validate(columns);
}

module.exports = {
  getAllQuizzes: async (req, res) => {
    try {
      let quizzes = await quizRepo.getAllQuizzes();
      if (!quizzes.length) {
        return res.status(404).send({ message: "No quizzes found " });
      }
      return res.status(200).send({ quizzes: quizzes });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error getting all quizzes " + err });
    }
  },
    getQuizById: async (req, res) => {
    try {
      let q_id = parseInt(req.params.q_id);
      let Quiz = await quizRepo.getQuizById(q_id);
      const { quiz, questions, choices, students, topics } = Quiz;
      if (quiz === undefined) {
        return res.status(404).send({ message: "Quiz not found" });
      }
      const score = await getUserQuizScore(req, q_id);
      return res.status(200).send({
        quiz: quiz,
        questions: questions,
        choices: choices,
        students: students,
        topics: topics,
        score: score,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error getting quiz by id " + err });
    }
  },
  postQuiz: async (req, res) => {
    try {
      let quiz = req.body;
      quiz.topics = JSON.parse(quiz.topics);
      quiz.questions = JSON.parse(quiz.questions);
      const instructor_id = req.user.ID;
      // const instructor_id = quiz.I_ID;
      const { error } = quizValidate(quiz);
      if (error) {
        return res.status(403).send({ message: "Validation Error:  " + error });
      }
      //
      let imagePath = "./4.jpg";
      if (req.file?.path)
        imagePath =
          "https://codecoursesbackend.onrender.com/" +
          imagePath.replace("\\", "/");

      createQ = await quizRepo.createQuiz(quiz, instructor_id, imagePath);

      quiz_id = createQ["@quiz_id"];
      addTopic = await quizRepo.addTopicsToQuiz(
        quiz_id,
        quiz.topics,
        quiz.questions
      );
      return res.status(201).send({
        message: "quiz Created",
        quiz_id: quiz_id,
      });
    } catch (err) {
      return res.status(500).send({ message: "Internal server error " + err });
    }
  },
  getQuizzesByInstructor: async (req, res) => {
    try {
      let I_ID = req.params.i_id;
      if (!I_ID) {
        return res
          .status(403)
          .send({ message: "Pleases Insert the instructor ID as I_ID  " });
      }
      let quizzes = await quizRepo.getQuizzesByInstructor(I_ID);
      if (!quizzes.length) {
        return res
          .status(404)
          .send({ message: "Looks like you have no quizzes" });
      }
      return res.status(201).send({
        message: "quizzes retrieved",
        Quizzes: quizzes,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error getting all lessons " + err });
    }
  },
  getQuizzesByStudent: async (req, res) => {
    try {
      let S_ID = req.params.s_id;
      if (!S_ID) {
        return res.status(403).send({
          message: "Pleases Insert the student id in the url ",
        });
      }
      let quizzes = await quizRepo.getQuizzesByStudent(S_ID);
      if (!quizzes.length) {
        return res
          .status(404)
          .send({ message: "Looks like you have no quizzes" });
      }
      return res.status(201).send({
        message: "quizzes retrieved",
        Quizzes: quizzes,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error getting all lessons " + err });
    }
  },
  takeQuiz: async (req, res) => {
    try {
      const quiz_id = req.params.q_id;
      const student_id = req.user.ID;
      const answers = req.body.answers;
      // const { error } = answerValidate(req.body);
      // if (error)
      //   return res.status(403).send({ message: "Validation Error " + error });
      let score = 0;
      let scores = [];

      answers.forEach(async (ans, ind) => {
        let check = await quizRepo
          .DidHeAnswerCorrect(ans.q_id, ans.body)
          .then((choiceRet) => {
            console.log(choiceRet);
            if (choiceRet) {
              let q_score = quizRepo
                .gwtQuestionScore(ans.q_id)
                .then((questionScore) => {
                  console.log(questionScore);
                  score += questionScore;
                  console.log(score);
                })
                .then(() => {
                  if (ind == answers.length - 1) {
                    let addRecord = quizRepo.addNewScore(
                      quiz_id,
                      student_id,
                      score
                    );
                    return res.status(201).send({
                      message: "quiz Solved! ",
                      QuizScore: score,
                      student_id: student_id,
                    });
                  }
                });
            }
          });
      });
    } catch (err) {
      return res.status(500).send({ message: "Internal server error " + err });
    }
  },
};
