const express = require("express");
const router = express.Router();
const admin = require('../middleware/admin');
const { authToken } = require('../middleware/auth');
const { canEditProfile } = require('../permissions/userPermissions');

const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/me", [authToken],userController.getUserLoggedIn);
router.get("/:id", userController.getUserById);
router.get("/getbyusername/:username", userController.getUserByUsername);

router.delete("/delete/me", [authToken], userController.deleteSignedInUser);
router.delete("/delete", [authToken, admin], userController.deleteAllUsers);
router.delete("/deletebyid/:id", [authToken, admin], userController.deleteUserbyID);
router.delete("/deletebyusername/:username", [authToken, admin], userController.deleteUserbyName);

router.patch("/:username/edit", [authToken, canEditProfile], userController.editUser);
module.exports = router;
