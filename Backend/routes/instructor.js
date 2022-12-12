const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');
const admin = require('../middleware/admin');
const { authToken } = require('../middleware/auth');
const { canEditInstructor } = require('../permissions/userPermissions');

router.get('/', instructorController.getAllInstructors);
router.get('/:i_id', instructorController.getInstructorById);

router.post('/newInstructor', [authToken], instructorController.postNewInstructor);

router.patch('/editInstructor/:i_id', [authToken, canEditInstructor], instructorController.editInstructor);

module.exports = router;