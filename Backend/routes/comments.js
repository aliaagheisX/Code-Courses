const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.get('/articles/replies/:c_id', commentsController.getRepliesToComment);

router.delete('/articles/comments', commentsController.deleteAllComments);
router.delete('/articles/comments/:u_id', commentsController.deleteCommentsByUser);
router.delete('/articles/comments/:c_id', commentsController.deleteCommentById);
router.delete('/articles/comments/:a_id', commentsController.deleteCommentsByArticle);

module.exports = router;