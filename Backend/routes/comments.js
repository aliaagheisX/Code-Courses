const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");
const { authToken } = require("../middleware/auth");
const admin = require("../middleware/admin");
const { canDeleteUserComment, canDeleteArticleComments } = require("../permissions/commentPermissions");

router.get("/articles/replies/:c_id", commentsController.getRepliesToComment);
router.get("/articles/:a_id", commentsController.getCommentsOfArticle);
router.get("/:c_id", commentsController.getCommentByID);

router.delete(
  "/articles/comments",
  [authToken, admin],
  commentsController.deleteAllComments
);
router.delete(
  "/articles/commentsbyuser/:u_id",
  [authToken, admin],
  commentsController.deleteCommentsByUser
);
router.delete(
  "/:c_id",
  [authToken, canDeleteUserComment],
  commentsController.deleteCommentById
);
router.delete(
  "/articles/commentsbyarticle/:a_id",
  [authToken , canDeleteArticleComments],
  commentsController.deleteCommentsByArticle
);

router.post("/create/:a_id", [authToken], commentsController.addCommentToArticle);

router.post("/likecomment/:c_id", [authToken], commentsController.likeComment);

router.put("/edit/:c_id", [authToken, canDeleteUserComment], commentsController.editComment);

module.exports = router;
