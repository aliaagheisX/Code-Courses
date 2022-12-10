const {DBconnection} = require('../config/database');

module.exports = {
	getAllArticles: () => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT * FROM article`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	getArticleById: (id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT * FROM article WHERE ID=${id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0]);
			})
		})
	},
	getArticlesByAuthorUsername: (username) => {
		return new Promise((resolve, reject) => {
				let queryString = ``;
				DBconnection.query(queryString, (err, rows) => {
					if (err) return reject(err);
					return resolve(rows);
				})
		})
	},
	getArticlesByTopicId: (id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT A.ID, A.BODY, A.INSTRUCTORID FROM article A, article_topic AT WHERE A.ID=AT.AID AND AT.TID=${id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	}
}