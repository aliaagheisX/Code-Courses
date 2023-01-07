const articleRepo = require('../repositories/articleRepository');
const elementRepo = require('../repositories/elementRepository');
const topicRepo = require('../repositories/topicRepository');
const Joi = require('joi');

function topicListValidate(columns) {
	const schema = Joi.object({
		topics: Joi.array().items(Joi.number()).min(1).required(),
	});
	return schema.validate(columns);
}

const userRepo = require('../repositories/userRepository');

module.exports = {
	getAllArticles: async (req, res) => {
		try {
			let articles = await articleRepo.getAllArticles();
			if (!articles.length) {
				return res
					.status(404)
					.send({ message: "Looks like you have no articles" });
			}
			return res.status(200).send({ articles: articles });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting all articles" + err });
		}
	},
	getArticleById: async (req, res) => {
		try {
			let id = parseInt(req.params.a_id);
			let article = await articleRepo.getArticleById(id);
			if (!article) {
				return res
					.status(404)
					.send({ message: "Article not found" });
			}
			let numOfArticleReads = await articleRepo.readCountArticle(id);
			let numOfArticleLikes = await articleRepo.likeCountArticle(id);
			return res.status(200).send({
				article: article,
				articleReadCount: numOfArticleReads,
				likes: numOfArticleLikes,
			});
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting article by id" + err });
		}
	},
	getArticlesByAuthorName: async (req, res) => {
		try {
			let fname = req.params.fname;
			let sname = req.params.sname;
			let articles = articleRepo.getArticlesByAuthorName(fname, sname);
			if (!articles.length) {
				return res
					.status(404)
					.send({ message: "Instructor has no articles" });
			}
			return res
				.status(200)
				.send({ articles: articles });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting articles by author name " + err });
		}
	},
	getArticlesOfInstructor: async (req, res) => {
		try {
			const instructor_id = req.params.i_id;
			let articles = await articleRepo.getArticlesOfInstructor(instructor_id);
			if (!articles.length) {
				return res
					.status(404)
					.send({ message: "Looks like you have no articles" });
			}
			return res.status(200).send({ articles: articles });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting all articles" + err });
		}
	},
	getArticlesByTopicId: async (req, res) => {
		try {
			let id = parseInt(req.params.t_id);
			let articles = await articleRepo.getArticlesByTopicId(id);
			if (!articles.length) {
				return res
					.status(404)
					.send({ message: "No articles in this topic" });
			}
			return res
				.status(200)
				.send({ articles: articles });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting articles by topic id" + err });
		}
	},
	deleteAllArticles: async (req, res) => {
		try {
			let rows = await articleRepo.deleteAllArticles();
			if (!rows.affectedRows) {
				return res
					.status(404)
					.send({ message: "Looks like there are no articles" });
			}
			return res
				.status(200)
				.send({ message: "Articles deleted successfully" });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error deleting all articles" + err });
		}
	},
	deleteArticleById: async (req, res) => {
		try {
			let id = parseInt(req.params.a_id);
			let rows = await articleRepo.deleteArticleById(id);
			if (!rows.affectedRows) {
				return res
					.status(404)
					.send({ message: "Article not found" });
			}
			return res
				.status(200)
				.send({ message: "Article deleted successfully" });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error deleting article by id" + err });
		}
	},
	createArticle: async (req, res) => {
		try {
			let article = req.body;
			///// image /////
			let imagePath = req.file?.path || "./images/4.jpg";
			imagePath = "http://localhost:4000/" + imagePath.replace('\\', '/');

			let response = await articleRepo.createArticle(article, imagePath);
			return res
				.status(200)
				.send({
					message: "Article created successfully",
					id: response,
				});
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error posting article " + err });
		}
	},
	editArticle: async (req, res) => {
		const article = req.body;
		let id = req.params.a_id;
		if (article.title !== '') {
			try {
				let edit_title = await elementRepo.editElementTitle(article, id)
			} catch (err) {
				return res
					.status(500)
					.send({ message: "Internal server error posting article " + err });
			}
		}
		if (article.description !== '') {
			try {
				let edit_description = await elementRepo.editElementDescription(article, id)
			} catch (err) {
				return res
					.status(500)
					.send({ message: "Internal server error posting article " + err });
			}
		}
		if (article.body !== '') {
			try {
				let edit_body = await articleRepo.editArticleBody(article, id)
			} catch (err) {
				return res
					.status(500)
					.send({ message: "Internal server error posting article " + err });
			}
		}
		if (req.file?.path != null) {
			let imagePath = req.file.path
			imagePath = "http://localhost:4000/" + imagePath.replace('\\', '/')
			try {
				await elementRepo.editImage(id, imagePath);
			} catch (err) {
				return res
					.status(500)
					.send({ message: "Internal server error editing article " + err });
			}

		}
		let newArticle = await articleRepo.getArticleById(id);
		return res
			.status(200)
			.send({
				message: "Article edited successfully",
				article: newArticle,
			});
	},
	editArticleTopics: async (req, res) => {
		try {
			let a_id = req.params.a_id;
			let columns = req.body;
			const { error } = topicListValidate(columns);
			if (error) {
				return res
					.status(403)
					.send({ message: "Validation error " + error.details[0].message });
			}
			await articleRepo.deleteArticleTopics(a_id);
			for (let index in columns.topics) {
				//let topic = await topicRepo.getTopicByName(topicName);
				let t_id = columns.topics[index];
				await articleRepo.addTopicToArticle(a_id, t_id);
			}
			let topics = await articleRepo.getArticleTopics(a_id);
			return res
				.status(201)
				.send({
					message: "Article topics edited successfully",
					topics: topics,
				});
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error adding topic to article " + err });
		}
	},
	removeTopicFromArticle: async (req, res) => {
		try {
			let a_id = req.params.a_id;
			let t_id = req.params.t_id;
			let response = await articleRepo.deleteTopicFromArticle(a_id, t_id);
			if (!response.affectedRows) {
				return res
					.status(404)
					.send({ message: "Topic or article not found" });
			}
			return res
				.status(200)
				.send({ message: "Topic removed successfully from article" });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error removing topic from article " + err });
		}
	},
	getArticleTopics: async (req, res) => {
		try {
			let a_id = req.params.a_id;
			let topics = await articleRepo.getArticleTopics(a_id);
			if (!topics.length) {
				return res
					.status(404)
					.send({ message: "No topics found for this article" });
			}
			return res
				.status(200)
				.send({
					topics: topics,
				});
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting article topics " + err });
		}
	},
	readArticle: async (req, res) => {
		try {
			let a_id = parseInt(req.params.a_id);
			let u_id = req.user.ID;
			let response = await articleRepo.readArticle(a_id, u_id);
			let numOfArticlesReadByStudent = await articleRepo.readCountUser(u_id);
			let numOfArticleReads = await articleRepo.readCountArticle(a_id);
			return res
				.status(200)
				.send({
					message: "Student has read article",
					userReadCount: numOfArticlesReadByStudent,
					articleReadCount: numOfArticleReads,
				});
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error reading article " + err });
		}
	},
	likeArticle: async (req, res) => {
		try {
			let a_id = parseInt(req.params.a_id);
			let u_id = req.user.ID;
			let row = await articleRepo.getLikeOnArticle(a_id, u_id);
			if (row) {
				await articleRepo.dislikeArticle(a_id, u_id);
				let likeCount = await articleRepo.likeCountArticle(a_id);
				return res
					.status(200)
					.send({
						message: "Student disliked article",
						likeCount: likeCount,
					});
			}
			let response = await articleRepo.likeArticle(a_id, u_id);
			let likeCount = await articleRepo.likeCountArticle(a_id);
			return res
				.status(200)
				.send({
					message: "Student liked article",
					likeCount: likeCount,
				});
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error liking article " + err });
		}
	},
};