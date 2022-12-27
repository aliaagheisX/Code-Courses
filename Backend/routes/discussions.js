const express = require('express');
const { authToken } = require('../middleware/auth');
const { canReview } = require('../permissions/coursePermissions');
const discussionController = require('../controllers/discussionController');
const router = express.Router();

router.get('/getcoursediscussion/:c_id', [authToken, canReview], discussionController.getCourseDiscussion);

module.exports = router;