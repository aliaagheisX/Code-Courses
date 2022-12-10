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
	getArticlesByِAuthorUsername: async (req, res) => {
		try {
			let username = req.params.username;
			let author = await userRepo.getUserByName(username);
			if (!author) {
				return res
					.status(404)
					.send({ message: "Author "});
			}
			let articles = articleRepo.getArticlesByAuthorUsername(username);
			if (!articles.length) {
				return res
					.status(404)
					.send({ message: "Th"})
			}
		} catch (err) {

		}
	},
	getArticlesByCourseId: async (req, res) => {
		
	},
	getArticlesByTopicId: async (req, res) => {

	}
}