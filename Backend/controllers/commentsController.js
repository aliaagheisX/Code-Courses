const commentsRepo = require('../repositories/commentsRepository');

module.exports = {
	getRepliesToComment: async (req, res) => {
		try {
			let id = parseInt(req.params.c_id);
			let replies = await commentsRepo.getRepliesToComment(id);
			if (!replies.length) {
				return res
					.status(404)
					.send({ message: "Comment has no replies" });
			}
			return res
				.status(200)
				.send({ replies: replies });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error getting replies " + err });
		}
	},
	deleteAllComments: async (req, res) => {
		try {
			let response = await commentsRepo.deleteAllComments();
			if (!response.affectedRows) {
				return res
					.status(404)
					.send({ message: "Looks like there are no comments" });
			}
			return res
				.status(200)
				.send({ message: "Comments deleted successfully" });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error deleting all comments " + err });
		}
	},
	deleteCommentById: async (req, res) => {
		try {
			let id = parseInt(req.params.c_id);
			let response = await commentsRepo.deleteCommentById(id);
			if (!response.affectedRows) {
				return res
					.status(404)
					.send({ message: "Comment not found " });
			}
			return res
				.status(200)
				.send({ message: "Comment deleted successfully" });
		} catch (err) {
			return res	
				.status(500)
				.send({ message: "Internal server error deleting comment by id " + err });
		}
	},
	deleteCommentsByUser: async (req, res) => {
		try {
			let id = parseInt(req.params.u_id);
			let response = await commentsRepo.deleteCommentsByUser(id);
			if (!response.affectedRows) {
				return res	
					.status(404)
					.send({ message: "User has no comments" });
			}
			return res
				.status(200)
				.send({ message: "User comments deleted successfully" });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error deleting user comments " + err });
		}
	},
	deleteCommentsByArticle: async (req, res) => {
		try {
			let id = parseInt(req.params.a_id);
			let response = await commentsRepo.deleteCommentsByArticle(id);
			if (!response.affectedRows) {
				return res
					.status(404)
					.send({ message: "No comments found for article" });
			}
			return res
				.status(200)
				.send({ message: "Article comments deleted successfully" });
		} catch (err) {
			return res
				.status(500)
				.send({ message: "Internal server error deleting comments from article " + err });
		}
	}	
}