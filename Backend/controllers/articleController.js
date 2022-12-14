const { parse } = require('dotenv');
const articleRepo = require('../repositories/articleRepository');
const elementRepo = require('../repositories/elementRepository');

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
      return res.status(200).send({ article: article });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error getting article by id" + err });
    }
	},
	getArticlesByAuthorUsername: async (req, res) => {
		// try {
		// 	let username = req.params.username;
		// 	let author = await userRepo.getUserByName(username);
		// 	if (!author) {
		// 		return res
		// 			.status(404)
		// 			.send({ message: "Author "});
		// 	}
		// 	let articles = articleRepo.getArticlesByAuthorUsername(username);
		// 	if (!articles.length) {
		// 		return res
		// 			.status(404)
		// 			.send({ message: "Th"})
		// 	}
		// 	return res
		// 		.status(200)
		// 		.send({ articles: articles });
		// } catch (err) {

		// }
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
			let element_id = await elementRepo.createElement(article);
			let response  = await articleRepo.createArticle(article,element_id);
			let newArticle = await articleRepo.getArticleById(element_id);
			return res		
				.status(200)
				.send({ 
					message: "Article created successfully",
					article: newArticle,
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
		if(article.title){
			try{
				let edit_title = await elementRepo.editElementTitle(article)
			}catch(err){
				return res
				.status(500)
				.send({ message: "Internal server error posting article " + err });
			}
		}
		if(article.description){
			try{
				let edit_description = await elementRepo.editElementDescription(article)
			}catch(err){
				return res
				.status(500)
				.send({ message: "Internal server error posting article " + err });
			}
		}
		if(article.body){
			try{
				let edit_body = await articleRepo.editArticleBody(article)
			}catch(err){
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
	addTopicToArticle: async (req, res) => {
		try {
			let a_id = req.params.a_id;
			let t_id = req.params.t_id;
			let response = await articleRepo.addTopicToArticle(a_id, t_id);
			let topics = await articleRepo.getArticleTopics(a_id);
			return res
				.status(201)
				.send({
					message: "Topic added to article successfully",
					topics: topics,
				});
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error adding topic to article " + err });
		}
	},
	deleteTopicFromArticle: async (req, res) => {
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
	}
};