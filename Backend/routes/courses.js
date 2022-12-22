const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const { authToken } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'images/' });


const courseController = require('../controllers/courseController');
const { canCreateCourse, canEditCourse } = require('../permissions/coursePermissions');


router.get('/:id', courseController.getCourseById);
router.delete('/:id', courseController.deleteCourseById);

router.post('/create', [authToken, canCreateCourse], upload.single('image'), courseController.createCourse);

module.exports = router;