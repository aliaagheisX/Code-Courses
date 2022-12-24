const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const admin = require('../middleware/admin');
const { authToken } = require('../middleware/auth');
const { canEditLesson, canCreateLesson } = require('../permissions/lessonPermission');

router.get('/getalllessons', lessonController.getAllLessons);
router.get('/getlessonbyid/:l_id', lessonController.getLessonById);
router.get('/getlessonsbycourse/:c_id', lessonController.getLessonsByCourse);

router.post('/newlesson', [authToken, canCreateLesson], lessonController.postNewLesson);
router.patch('/editlesson/:l_id', [authToken, canEditLesson], lessonController.editLesson);

router.delete('/deletealllessons', [authToken, admin], lessonController.deleteAllLessons);
router.delete('/deletelessonbyid/:l_id', [authToken, canEditLesson], lessonController.deleteLessonById);

module.exports = router;