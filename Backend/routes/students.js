const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const { authToken } = require('../middleware/auth');

const studentController = require('../controllers/studentController');

/**
 * @swagger
 * components:
 *  schemas:
 *      student:
 *          type: object
 *          required:
 *              - ID
 *          properties:
 *              ID:
 *                  type: int
 *                  description: ID of student
 *              _RANK:
 *                  type: int
 *                  description: rank of student
 *              NUMBEROFENROLLEDCOURSES:
 *                  type: int
 *                  description: number of enrolled courses of student
 *              NUMBEROFREADARTICLES:
 *                  type: int
 *                  description: number of articles read by student
 *              NUMBEROFSOLVEDQUIZZES:
 *                  type: int
 *                  description: number of quizzes solved by student
 *              SCORE:
 *                  type: int
 *                  description: score (rating) of user
*          example:
 *              ID: 1
 *              _RANK: 0
 *              NUMBEROFENROLLEDCOURSES: 0
 *              NUMBEROFREADARTICLES: 0
 *              NUMBEROFSOLVEDQUIZZES: 0
 *              SCORE: 0
 */

/**
 * @swagger
 * tags:
 *  name: students
 *  description: students managing API
 */

/**
 * @swagger
 * /students:
 *  get:
 *      summary: Get all students registered on CodeCourses
 *      tags: [students]
 *      responses:
 *          200:
 *              description: Success message
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              students:
*                               type: array
*                               items:
*                                   $ref: '#/components/schemas/student'
 *                                  
 *          404:
 *              description: students not found
 *              content: 
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: No students found
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

router.get('/', studentController.getAllStudents);

/**
 * @swagger
 * /students/{s_id}:
 *  get:
 *      summary: Get a student by their id
 *      tags: [students]
 *      parameters:
 *          - in: path
 *            name: s_id
 *            schema:
 *              type: integer
 *            required: true
 *            description: The ID of the student to get
 *      responses:
 *          200:
 *              description: Success message
 *              content:
 *                  application/json:
 *                      schema:
*                          $ref: '#/components/schemas/student'                                  
 *          404:
 *              description: student not found
 *              content: 
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: No students found
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

router.get('/:s_id', studentController.getStudentById);

router.delete('/', [authToken, admin], studentController.deleteAllStudents);
router.delete('/:s_id', [authToken, admin], studentController.deleteStudentById);

module.exports = router;