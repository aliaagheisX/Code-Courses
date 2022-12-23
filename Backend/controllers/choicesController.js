const choiceRepo = require("../repositories/choiceRepository");
const Joi = require("joi");

function choiceValidate(columns) {
  const schema = Joi.object({
    body: Joi.string().required().min(2),
    Q_ID: Joi.number().required().min(0), // Question ID
    isCorrect: Joi.boolean().required(),
  });
  return schema.validate(columns);
}

module.exports = {
  postChoice: async (req, res) => {
    try {
      let choice = req.body;
      const { error } = choiceValidate(choice);
      if (error) {
        return res.status(403).send({ message: "Validation Error:  " + error });
      }
      createChoice = await choiceRepo.createChoice(choice);
      return res.status(201).send({
        message: "choice Created",
        createdChoice: createChoice,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error getting all lessons " + err });
    }
  },
};
