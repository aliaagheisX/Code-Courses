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
      let I_ID = req.body.I_ID;
      if (!I_ID) {
        return res
          .status(403)
          .send({ message: "Pleases Insert the instructor ID as I_ID  " });
      }
      let quizzes = await quizRepo.getQuizzesByInstructor(I_ID);
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
