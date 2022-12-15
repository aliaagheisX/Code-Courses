const { DBconnection } = require('../config/database');

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
			let queryString = `SELECT * FROM article, element WHERE article.ID=${id} element.ID = article.ID`;
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
			let queryString = `SELECT A.ID, A.BODY, A.INSTRUCTORID 
													FROM article A, article_topic AT 
													WHERE A.ID=AT.AID AND AT.TID=${id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	deleteAllArticles: () => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM article`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	deleteArticleById: (id) => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM article WHERE ID=${id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	createArticle: (article, element_id) => {
		const article_body = article.body;
		const instructor_id = article.instructor_id
		// Creating an element and returning the 
		return new Promise((resolve, reject) => {
			let queryString = `INSERT INTO ARTICLE(ID,BODY,INSTRUCTORID) VALUES(${element_id},'${article_body}',${instructor_id}) `;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})

	},
	editArticleBody: (article) => {
		const body = article.body;
		const id = article.id;
		return new Promise((resolve, reject) => {
			let queryString = `UPDATE ARTICLE SET body = '${body}' WHERE ID = ${id} `;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
}