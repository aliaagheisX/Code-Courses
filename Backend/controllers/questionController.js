const questionRepo = require("../repositories/questionRepository");
const choiceRepo = require("../repositories/choiceRepository");
const Joi = require("joi");

function questionValidate(columns) {
  const schema = Joi.object({
    body: Joi.string().required().min(10).max(500000),
    score: Joi.number().required().min(0),
    choices: Joi.array().required().min(1),
  });
  return schema.validate(columns);
}

module.exports = {
  postQuestion: async (req, res) => {
    try {
      let question = req.body;
      const i_id = req.user.ID;
      const { error } = questionValidate(question);
      if (error) {
        return res.status(403).send({ message: "Validation Error:  " + error });
      }
      const createQ = await questionRepo.createQuestion(question, i_id);
      const question_id = createQ.insertId;
      const choices = await choiceRepo.addChoicesToQuiz(
        question_id,
        question.choices
      );

      return res.status(201).send({
        message: "Question Created",
        question_id: question_id,
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
  getQuestionsByInstructor: async (req, res) => {
    try {
      let I_ID = req.params.id;
      if (!I_ID) {
        return res
          .status(403)
          .send({ message: "Pleases Insert the Instructor ID as I_ID  " });
      }
      let questions = await questionRepo.getQuestionsByInstructor(I_ID);
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
