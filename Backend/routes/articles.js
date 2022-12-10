const express = require('express');
const router = express.Router();

const articleController = require('../controllers/articleController');

router.get('/', articleController.getAllArticles);
router.get('/getbyarticleid/:a_id', articleController.getArticleById);
router.get('/getbyusername/:username', articleController.getArticlesByAuthorUsername);
router.get('/getbytopicid/:t_id', articleController.getArticlesByTopicId);

module.exports = router;