const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const { authToken } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'images/' });


const courseController = require('../controllers/courseController');
const { canCreateCourse, canEditCourse } = require('../permissions/coursePermissions');


router.post('/create', [authToken, canCreateCourse], upload.single('image'), courseController.createCourse);

router.post('/editcoursetopics/:c_id', [authToken, canEditCourse], courseController.editCourseTopics);

module.exports = router;