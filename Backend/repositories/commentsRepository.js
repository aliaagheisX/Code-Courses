const { DBconnection } = require('../config/database');

module.exports = {
	getRepliesToComment: (id) => {
		return new Promise((resolve, reject) => {
				let queryString = `SELECT * FROM _comment WHERE RID=${id}`;
				DBconnection.query(queryString, (err, rows) => {
					if (err) return reject(err);
					return resolve(rows);
				})
		})
	},
	deleteAllComments: () => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM _comment`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	deleteCommentById: (id) => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM _comment WHERE ID=${id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	deleteCommentsByUser: (id) => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM _comment WHERE UID=${id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	deleteCommentsByArticle: (id) => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM _comment WHERE AID=${id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	}
}