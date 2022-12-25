const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const { authToken } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'images/' });


const courseController = require('../controllers/courseController');
const { canCreateCourse, canControllCourse, canEnroll, canDisenroll, canEditReview, canReview } = require('../permissions/coursePermissions');


router.get('/', courseController.getAllCourses);
router.get('/instructors/:i_id', courseController.getCoursesOfInstructor);

router.get('/:id', courseController.getCourseById);
//delete and edit isAdmin || instructor of course
router.delete('/:c_id', [authToken, canControllCourse], courseController.deleteCourseById);
router.patch('/:c_id', [authToken, canControllCourse], upload.single('image'), courseController.editCourse);

router.post('/create', [authToken, canCreateCourse], upload.single('image'), courseController.createCourse);
router.post('/enroll/:c_id', [authToken, canEnroll], courseController.enrollCourse);
router.post('/disenroll/:c_id', [authToken, canDisenroll], courseController.disenrollCourse);
router.post('/review/:c_id', [authToken, canReview], courseController.createReview);
router.patch('/review/edit/:c_id/:u_id', [authToken, canEditReview], courseController.editReview);

router.delete('/deleteonereview/:c_id/:u_id', [authToken, canEditReview], courseController.deleteOneReview);
router.delete('/deletecoursereviews/:c_id', [authToken, admin], courseController.deleteCourseReviews);

module.exports = router;