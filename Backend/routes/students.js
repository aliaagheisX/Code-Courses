const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);
router.get('/:s_id', studentController.getStudentById);

module.exports = router;