const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');
const admin = require('../middleware/admin');

router.get('/', instructorController.getAllInstructors);
router.get('/:i_id', instructorController.getInstructorById);

router.post('/newInstructor', instructorController.postNewInstructor);

router.patch('/:i_id', instructorController.editInstructor);

module.exports = router;