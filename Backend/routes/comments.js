const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const { authToken } = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/articles/replies/:c_id', commentsController.getRepliesToComment);

router.delete('/articles/comments', [authToken, admin], commentsController.deleteAllComments);
router.delete('/articles/comments/:u_id', [authToken], commentsController.deleteCommentsByUser);
router.delete('/articles/comments/:c_id', [authToken/*, canDeleteUserComment*/], commentsController.deleteCommentById);
router.delete('/articles/comments/:a_id', [authToken/*, canDeleteArticleComments*/], commentsController.deleteCommentsByArticle);

module.exports = router;