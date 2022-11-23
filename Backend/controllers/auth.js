const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const userRepo = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function validateUserLogIn(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity({
      min: 8,
      max: 128,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    }).required(),
  });
  return schema.validate(user);
}

function validateUserRegister(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity({
      min: 8,
      max: 128,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    }).required(),
    confirmPassword: passwordComplexity({
      min: 8,
      max: 128,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    }).required(),
    firstName: Joi.string().pattern(/^[a-zA-Z]+$/).message("fname can only contain letters from the alphabet").min(2).max(32),
    lastName: Joi.string().pattern(/^[a-zA-Z]+$/).message("sname can only contain letters from the alphabet").max(32),
    username: Joi.string().alphanum().message("username can only contain alphanumeric characters").max(32).min(2),
  });
  return schema.validate(user);
}
// const saltRounds = 10;

async function encrypt(password) {
  const saltRounds = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(password, saltRounds);
  return hashedPwd;
}
module.exports = {
  register: async (req, res) => {
    const user_data = req.body;
    const { error } = validateUserRegister(req.body);
    if (error)
      return res.status(403).send({ message: error.details[0].message });
    try {
      let user = await userRepo.getUser(user_data.email);
      if (user) {
        return res.status(403).send({ message: "User already exists" });
      }
    } catch (err) {
      return res.status(500).send({
        message: "Internal server error checking if user exists\n" + err,
      });
    }
    if (user_data.password != user_data.confirmPassword)
      return res.status(403).send({ message: "Passwords do not match" });
    try {
      user_data.password = await encrypt(user_data.password);
      user_data.confirmPassword = "";
      user_data.image =
        "https://7wdata.be/wp-content/uploads/2016/05/icon-user-default.png";
      let message = await userRepo.createUser(user_data);
      let user = await userRepo.getUserByName(user_data.username);
      const token_input = { email: user_data.email };
      const token = jwt.sign({ token_input }, process.env.PRIMARY_KEY);
      return res.status(201).send({
        token: token,
        user: user,
        message,
      });
    } catch (err) {
      return res.status(500).send({ message: " " + err });
    }
  },
  login: async (req, res) => {
    const { error } = validateUserLogIn(req.body);
    if (error)
      return res.status(430).send({ message: error.details[0].message });

    try {
      let userEmail = await userRepo.checkEmailQuery(req.body.email);
      if (!userEmail) return res.status(403).send({ message: "Invalid email" });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error checking email\n" + err });
    }

    try {
      let userPassword = await userRepo.getUserPassword(req.body.email);
      if (userPassword) {
        // console.log(userPassword._password);
        const validPassword = await bcrypt.compare(
          req.body.password,
          userPassword._password
        );
        if (!validPassword)
          return res.status(403).send({ message: "Invalid password" });
      }
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error checking password\n" + err });
    }

    try {
      let user = await userRepo.getUser(req.body.email);
      let payload = { email: user.EMAIL };
      const token = jwt.sign({ payload }, process.env.PRIMARY_KEY);
      return res.status(200).send({
        token: token,
        user: user,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error checking user\n" + err });
    }
  },
};
