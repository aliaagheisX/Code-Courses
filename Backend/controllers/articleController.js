const { parse } = require('dotenv');
const articleRepo = require('../repositories/articleRepository');
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
	}
};