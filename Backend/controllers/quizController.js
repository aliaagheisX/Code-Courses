const quizRepo = require("../repositories/quizRepository");
const Joi = require("joi");

function quizValidate(columns) {
  const schema = Joi.object({
    I_ID: Joi.number().required().min(0),
    max_score: Joi.number().required().min(0),
  });
  return schema.validate(columns);
}

module.exports = {
  getAllQuizzes: async (req, res) => {
    try {
      let quizzes = await quizRepo.getAllQuizzes();
      if (!quizzes.length) {
        return res
          .status(404)
          .send({ message: "No quizzes found "});
      }
      return res
        .status(200)
        .send({ quizzes: quizzes });
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
      if (!Quiz) {
        return res
          .status(404)
          .send({ message: "Quiz not found" });
      }
      const { quiz, questions, choices, students } = Quiz;
      return res
        .status(200)
        .send({ 
          quiz: quiz,
          questions: questions,
          choices: choices,
          students: students,
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
      const { error } = quizValidate(quiz);
      if (error) {
        return res.status(403).send({ message: "Validation Error:  " + error });
      }
      createQ = await quizRepo.createQuiz(quiz);
      return res.status(201).send({
        message: "quiz Created",
        createdQuiz: createQ,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error getting all lessons " + err });
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
};
