const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const { authToken } = require('../middleware/auth');

const articleController = require('../controllers/articleController');

router.get('/', articleController.getAllArticles);
router.get('/getbyarticleid/:a_id', articleController.getArticleById);
router.get('/getbyusername/:username', articleController.getArticlesByAuthorUsername);
router.get('/getbytopicid/:t_id', articleController.getArticlesByTopicId);

router.delete('/', [admin], articleController.deleteAllArticles);
router.delete('/:a_id', [admin], articleController.deleteArticleById);

router.post('/create', articleController.createArticle);

module.exports = router;