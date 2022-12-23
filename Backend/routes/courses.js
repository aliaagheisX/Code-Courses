const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const { authToken } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'images/' });


const courseController = require('../controllers/courseController');
const { canCreateCourse, canEditCourse, canEditReview, canReview } = require('../permissions/coursePermissions');


router.get('/:id', courseController.getCourseById);
router.get('/', courseController.getAllCourses);

router.delete('/:id', courseController.deleteCourseById);

router.post('/create', [authToken, canCreateCourse], upload.single('image'), courseController.createCourse);
router.post('/review/:c_id', [authToken, canReview], courseController.createReview);
router.patch('/review/edit/:c_id/:u_id', [authToken, canEditReview], courseController.editReview);

router.delete('/deleteonereview/:c_id/:u_id', [authToken, canEditReview], courseController.deleteOneReview);
router.delete('/deletecoursereviews/:c_id', [authToken, admin], courseController.deleteCourseReviews);

module.exports = router;