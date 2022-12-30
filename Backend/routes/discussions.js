const express = require('express');
const { authToken } = require('../middleware/auth');
const { canEnterDiscussion } = require('../permissions/coursePermissions');
const discussionController = require('../controllers/discussionController');
const router = express.Router();

router.get('/getcoursediscussion/:c_id', [authToken, canEnterDiscussion], discussionController.getCourseDiscussion);

module.exports = router;