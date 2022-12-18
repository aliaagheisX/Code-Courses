const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
const { authToken } = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/articles/replies/:c_id", commentsController.getRepliesToComment);
router.get("/articles/:a_id", commentsController.getCommentsOfArticle);
router.get("/:c_id", commentsController.getCommentByID);

router.delete(
  "/articles/comments",
  [authToken, admin],
  commentsController.deleteAllComments
);
router.delete(
  "/articles/comments/:u_id",
  [authToken],
  commentsController.deleteCommentsByUser
);
router.delete(
  "/:c_id",
  [authToken],
  commentsController.deleteCommentById
);
router.delete(
  "/articles/comments/:a_id",
  [authToken /*, canDeleteArticleComments*/],
  commentsController.deleteCommentsByArticle
);

router.post("/create/:a_id", [authToken], commentsController.addCommentToArticle);

router.put("/edit/:c_id", commentsController.editComment);

module.exports = router;
