const express = require('express');
const router = express.Router();

router.delete('/articles/comments', commentsController.deleteAllComments);
router.delete('/articles/comments')
router.delete('/articles/comments/:c_id', commentsController.deleteCommentById);
router.delete('/articles/comments/:a_id', commentsController.deleteCommentsByArticle);

module.exports = router;