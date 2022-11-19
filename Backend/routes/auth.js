const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const db = require("../config/database");
const userRepo = require("../repositories/userRepository");
const authController = require("../controllers/auth");

function validateUser(user) {
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

router.post("/login", authController.login);

router.post("/register/", authController.register);

module.exports = router;
