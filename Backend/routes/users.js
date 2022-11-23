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


/**
 * @swagger
 * components:
 *  schemas:
 *      _user:
 *          type: object
 *          required:
 *              - ID
 *              - USERNAME
 *              - FNAME
 *              - SNAME
 *              - EMAIL
 *              - _PASSWORD
 *          properties:
 *              ID:
 *                  type: int
 *                  description: ID of user
 *              USERNAME:
 *                  type: varchar(20)
 *                  description: username of user
 *              FNAME:
 *                  type: varchar(32)
 *                  description: first name of user
 *              SNAME:
 *                  type: varchar(32)
 *                  description: last name of user
 *              EMAIL:
 *                  type: varchar(32)
 *                  description: email with which the user registered their account
 *              JOINDATE:
 *                  type: date
 *                  description: date user joined CodeCourses
 *              ABOUT:
 *                  type: mediumtext
 *                  description: user's bio
 *              ARTICLESWRITTENCOUNT:
 *                  type: int
 *                  description: number of articles written by user (as an instructor)
 *              ISADMIN:
 *                  type: bit
 *                  description: Whether user is an admin
 *              _PASSWORD:
 *                  type: varchar(60)
 *                  description: user's password
 *              _IMAGE:
 *                  type: varchar(400)
 *                  description: link to user's profile image
 *          example:
 *              ID: 1
 *              USERNAME: ahmedr2001
 *              FNAME: Ahmed
 *              SNAME: Abdelatty
 *              EMAIL: ahmed@ahmed.com
 *              JOINDATE: 23/11/2022
 *              ABOUT: Computer Engineering Student
 *              ARTICLESWRITTENCOUNT: 12
 *              ISADMIN: 0
 *              _PASSWORD: <hash generated by bcrypt of length 60 characters>
 *              _IMAGE: https://7wdata.be/wp-content/uploads/2016/05/icon-user-default.png
 */

/**
 * @swagger
 * tags:
 *  name: users
 *  description: user managing API
 */

/**
 * @swagger
 * /users/{username}/edit:
 *  patch:
 *      summary: Edit the profile of user specified
 *      tags: [users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/_user'
 *      parameters:
 *      - in: path
 *        name: username
 *        schema:
 *            type: string
 *        required: true
 *        description: The user's username
 *      - in: header
 *        name: token
 *        schema:
 *           type: string
 *        required: true
 *        description: jwt token of logged in user
 *      responses:
 *          200:
 *              description: Success message
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              token:
 *                                  type: string
 *                                  description: user updated jwt token
 *                              message:
 *                                  type: string
 *                                  description: success message
 *          404:
 *              description: user not found
 *              content: 
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: user not found
 *          403:
 *              description: validation error
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              message:
 *                                  type: string 
 *                                  description: validation error + error
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Unauthorized + reason
 *          500:
 *              description: error with query
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: internal server error + error
 */
router.patch("/:username/edit", [authToken, canEditProfile], userController.editUser);
module.exports = router;
