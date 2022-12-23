const questionRepo = require("../repositories/questionRepository");
const Joi = require("joi");

function questionValidate(columns) {
  const schema = Joi.object({
    body: Joi.string().required().min(2),
    I_ID: Joi.number().required().min(0),
    score: Joi.number().required().min(0),
  });
  return schema.validate(columns);
}

module.exports = {
  postQuestion: async (req, res) => {
    try {
      let question = req.body;
      const { error } = questionValidate(question);
      if (error) {
        return res.status(403).send({ message: "Validation Error:  " + error });
      }
      createQ = await questionRepo.createQuestion(question);
      return res.status(201).send({
        message: "Question Created",
        createdQuestion: createQ,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error getting all lessons " + err });
    }
  },
  getQuestionsByQuiz: async (req, res) => {
    try {
      let Q_ID = req.body.Q_ID;
      if (!Q_ID) {
        return res
          .status(403)
          .send({ message: "Pleases Insert the QUIZ ID as Q_ID  " });
      }
      let questions = await questionRepo.getQuestionsByQuiz(Q_ID);
      return res.status(201).send({
        message: "questions retrieved",
        Questions: questions,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error getting all lessons " + err });
    }
  },
};
