const express = require('express');
const router = express.Router();

const articleController = require('../controllers/articleController');

router.get('/', articleController.getAllArticles);
router.get('/:a_id', articleController.getArticleById);
router.get('/:username', articleController.getArticlesByAuthorUsername);
router.get('/:c_id', articleController.getArticlesByCourseId);
router.get('/:t_id', articleController.getArticlesByTopicId);