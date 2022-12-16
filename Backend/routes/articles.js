const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const { authToken } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'images/' });


const articleController = require('../controllers/articleController');
const { canCreateArticle, canAddTopic, canEditArticle } = require('../permissions/articlePermissions');

router.get('/', articleController.getAllArticles);
router.get('/getbyarticleid/:a_id', articleController.getArticleById);
router.get('/getbyname/:fname/:sname', articleController.getArticlesByAuthorName);
router.get('/getbytopicid/:t_id', articleController.getArticlesByTopicId);
router.get('/getarticletopics/:a_id', articleController.getArticleTopics);

router.delete('/', [authToken, admin], articleController.deleteAllArticles);
router.delete('/:a_id', [authToken, canEditArticle], articleController.deleteArticleById);
// router.delete('/removetopicfromarticle/:a_id/:t_id', [authToken, admin], articleController.removeTopicFromArticle);
/**
 * @swagger
 * /articles/create:
 *  post:
 *      summary: Creates a new article
 *      tags: [articles]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/article'
 *      parameters:
 *      - in: path
 *        name: instructor_id
 *        schema:
 *            type: integer
 *        required: true
 *        description: The article writer 
*      - in: path
 *        name: title
 *        schema:
 *            type: string
 *        required: true
 *        description: element title
 *      - in: path
 *        name: description
 *        schema:
 *            type: string
 *        required: true
 *        description: element description
 *      - in: path
 *        name: body
 *        schema:
 *            type: string
 *        required: true
 *        description: article body
 *      responses:
 *          200:
 *              description: Success message
 *              
 *          403:
 *              description: validation error
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              message:
 *                                  type: string 
 *                                  description: validation error + error
 *          401:
 *              description: Unauthorized
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Unauthorized + reason
 *          500:
 *              description: error with query
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: internal server error + error
 */
router.post('/create', [authToken, canCreateArticle], upload.single('image'), articleController.createArticle);

router.post('/editarticletopics/:a_id', [authToken, canEditArticle], articleController.editArticleTopics);

router.patch('/edit/:a_id', [authToken, canEditArticle], upload.single('image'), articleController.editArticle);

module.exports = router;