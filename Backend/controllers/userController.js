const jwt = require('jsonwebtoken');
const userRepo = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const saltRounds = 10;
async function encrypt(password) {
  const hashedPwd = await bcrypt.hash(password, saltRounds);
  return hashedPwd;
}
function patchValidate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email(),
    password: passwordComplexity({
      min: 8,
      max: 128,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    }),
    confirmPassword: passwordComplexity({
      min: 8,
      max: 128,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    }),
    firstName: Joi.string().pattern(/^[a-zA-Z]+$/).message("fname can only contain letters from the alphabet").min(2).max(32),
    lastName: Joi.string().pattern(/^[a-zA-Z]+$/).message("sname can only contain letters from the alphabet").max(32),
    username: Joi.string().alphanum().message("username can only contain alphanumeric characters").max(32).min(2),
    about: Joi.string(),
    image: Joi.any(),
  });
  return schema.validate(user);
}

module.exports = {
  getAdmins: async (req, res) => {
    try {
      let admins = await userRepo.getAdmins();
      if (!admins.length) {
        return res
          .status(404)
          .send({ message: "No admins found" });
      }
      return res
        .status(200)
        .send({ admins: admins });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error getting admins " + err });
    }
  },
  getUserById: async (req, res) => {
    try {
      let id = parseInt(req.params.id);
      let user = await userRepo.getUserById(id);
      if (!user) return res.status(404).send({ message: "User not found" });
      return res.status(200).send({ user: user });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error retrieving user\n" + err });
    }
  },
  getUserByUsername: async (req, res) => {
    try {
      let username = req.params.username;
      let user = await userRepo.getUserByName(username);
      if (!user) return res.status(404).send({ message: "User not found" });
      return res.status(200).send({ user: user });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error retrieving user\n" + err });
    }
  },
  getUserLoggedIn: async (req, res) => {
    try {
      let id = req.user.ID;
      let user = await userRepo.getUserById(id);
      if (!user) return res.status(404).send({ message: "User not found" });
      return res.status(200).send({ user: user });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error retrieving user\n" + err });
    }
  },
  editUser: async (req, res) => {
    try {
      let username = req.params.username;
      let user = await userRepo.getUserByName(username);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      let email = user.EMAIL;
      let payload = { email: email };
      let token = jwt.sign({ payload }, process.env.PRIMARY_KEY);
      let columns = req.body;

      const { error } = patchValidate(columns);
      if (error)
        return res.status(403).send({ message: "Validation error" + error.details[0].message });

      if (columns["firstName"] != null && columns["firstName"] != "") {
        await userRepo.editfname(username, columns["firstName"]);
      }
      if (columns["lastName"] != null && columns["lastName"] != "") {
        await userRepo.editsname(username, columns["lastName"]);
      }
      if (columns["about"] != null && columns["about"] != "") {
        await userRepo.editAbout(username, columns["about"]);
      }
      if (req.file?.path != null && req.file?.path != "") {
        let imagePath = req.file.path
        imagePath = "http://localhost:4000/" + imagePath.replace('\\', '/')
        await userRepo.editImage(username, imagePath);

      }
      if (columns["email"] != null && columns["email"] != "") {
        await userRepo.editEmail(username, columns["email"]);
        email = columns["email"];
        payload = { email: email };
        token = jwt.sign({ payload }, process.env.PRIMARY_KEY);
      }
      if (columns["password"] != null && columns["password"] != "") {
        if (columns["confirmPassword"] == null) {
          return res
            .status(500)
            .send({ message: "Confirm password must be sent \n" });
        }
        if (columns["password"] == columns["confirmPassword"]) {
          let hash = await encrypt(columns["password"]);
          await userRepo.editPassword(username, hash);
        }
      }
      if (columns["username"] != null && columns["username"] != "") {

        // The username should be edited the last because the rest of the queries depend on the username
        await userRepo.editUsername(username, columns["username"]);
        username = columns["username"]
      }
      user = await userRepo.getUserByName(username);
      return res.status(200).send({
        token: token,
        user: user,
      });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Error in editing user \n" + err });
    }
  },
  deleteAllUsers: async (req, res) => {
    try {
      let rows = await userRepo.deleteAllUsers();
      if (!rows.affectedRows) {
        return res
          .status(404)
          .send({ message: "Looks like you have no users" });
      }
      return res.status(200).send({ message: "All users deleted" });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error deleting all users\n" + err });
    }
  },
  deleteUserbyID: async (req, res) => {
    try {
      let id = parseInt(req.params.id);
      let rows = await userRepo.deleteUserbyID(id);
      if (!rows.affectedRows) {
        return res.status(404).send({ message: "User not found" });
      }
      return res.status(200).send({ message: "User deleted successfully" });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error deleting user\n" + err });
    }
  },
  deleteUserbyName: async (req, res) => {
    try {
      let name = req.params.username;
      let rows = await userRepo.deleteUserbyusername(name);
      if (!rows.affectedRows) {
        return res.status(404).send({ message: "User not found" });
      }
      return res.status(200).send({ message: "User deleted successfully" });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error deleting user\n" + err });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      let users = await userRepo.getAllUsers();
      if (!users.length) {
        return res
          .status(404)
          .send({ message: "Looks like you have no users" });
      }
      return res.status(200).send({ users: users });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error getting all users\n" + err });
    }
  },
  deleteSignedInUser: async (req, res) => {
    try {
      let id = req.body.user.ID;
      let rows = await userRepo.deleteUserbyID(id);
      if (!rows.affectedRows) {
        return res.status(404).send({ message: "User not found" });
      }
      return res.status(200).send({ message: "User deleted successfully" });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error deleting user\n" + err });
    }
  },

  getAdminReport: async (req, res) => {
    try {
      let report = await userRepo.getAdminReport();
      if (!report) {
        return res
          .status(404)
          .send({ message: "No report found" });
      }
      return res
        .status(200)
        .send({ report: report });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error getting admins " + err });
    }
  },
};
