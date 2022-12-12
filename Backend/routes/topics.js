const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const admin = require('../middleware/admin');
const { authToken } = require('../middleware/auth');

router.get('/', topicController.getAllTopics);
router.get('/:t_id', topicController.getTopicById);

router.post('/newTopic', [authToken, admin], topicController.postNewTopic);

router.patch('/editTopic/:t_id', [authToken, admin], topicController.editTopic);

module.exports = router;