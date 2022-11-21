const express = require("express");
const router = express.Router();
const admin = require('../middleware/admin');
const { authToken } = require('../middleware/auth');

const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/me", [authToken],userController.getUserLoggedIn);
router.get("/:id", userController.getUserById);
router.get("/getbyusername/:username", userController.getUserByUsername);

router.delete("/delete/me", /*[auth],*/ userController.deleteSignedInUser);
router.delete("/delete", [admin], userController.deleteAllUsers);
router.delete("/deletebyid/:id", /*[admin],*/ userController.deleteUserbyID);
router.delete("/deletebyusername/:username", [admin], userController.deleteUserbyName);

router.patch("/:username/edit", /*[auth],*/ userController.editUser);
module.exports = router;
