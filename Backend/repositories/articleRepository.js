const { DBconnection } = require('../config/database');

module.exports = {
	getAllArticles: () => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT A.AUTHORFNAME, A.AUTHORSNAME, A.INSTRUCTORID, E.*, (SELECT COUNT(L.UID) FROM likeonarticle L WHERE L.AID = A.ID ) as likes FROM article A, element E WHERE E.ID = A.ID;`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	getArticlesOfInstructor: (instructor_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT A.AUTHORFNAME, A.AUTHORSNAME, A.INSTRUCTORID, E.*, (SELECT COUNT(L.UID) FROM likeonarticle L WHERE L.AID = A.ID ) as likes FROM article A, element E, instructor I WHERE E.ID = A.ID AND A.INSTRUCTORID = I.ID AND I.ID = ${instructor_id};`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	getArticleById: (id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT A.*, E.*, COUNT(L.UID) as likes FROM article A, element E, likeonarticle L WHERE A.ID=${id} AND   E.ID = A.ID AND   L.AID =A.ID;`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0]);
			})
		})
	},
	getNumberOfArticlesByAuthor: (id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT COUNT(*) AS count FROM article WHERE INSTRUCTORID=${id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0].count);
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
			let queryString = `SELECT A.AUTHORFNAME, A.AUTHORSNAME, A.INSTRUCTORID, E.*, 
				(SELECT COUNT(L.UID) FROM likeonarticle L WHERE L.AID = A.ID ) as likes 
				FROM article A, article_topic t, element E 
				WHERE A.ID=t.AID AND E.ID = A.ID AND t.TID=${id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	getArticlesByAuthorName: (fname, sname) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT * FROM article, element WHERE element.ID=article.ID AND article.AUTHORFNAME='${fname}' AND article.AUTHORSNAME='${sname}'`;
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
	createArticle: (article, imagePath) => {
		const {
			body,
			instructor_id,
			title,
			description,
			image
		} = article;
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
		const body = article.body.replace(/'/g, "`");
		const id = article.id;
		return new Promise((resolve, reject) => {
			let queryString = `UPDATE ARTICLE SET body = '${body}' WHERE ID = ${id} `;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	addTopicToArticle: (a_id, t_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `INSERT INTO article_topic(AID, TID) VALUES (${a_id}, ${t_id})`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			});
		})
	},
	removeTopicFromArticle: (a_id, t_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM article_topic WHERE AID=${a_id} AND TID=${t_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			});
		})
	},
	getArticleTopics: (a_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT NAME, TID FROM topic, article_topic WHERE TID=ID AND AID=${a_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	deleteArticleTopics: (id) => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM article_topic WHERE AID=${id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	readArticle: (a_id, u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `INSERT INTO readarticle (SID, AID) VALUES (${u_id}, ${a_id})`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	readCountUser: (u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT COUNT(*) AS count FROM readarticle WHERE SID=${u_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0].count);
			})
		})
	},
	readCountArticle: (a_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT COUNT(*) AS count FROM readarticle WHERE AID=${a_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0].count);
			})
		})
	},
	likeArticle: (a_id, u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `INSERT INTO likeonarticle (UID, AID) VALUES (${u_id}, ${a_id})`;

			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	likeCountArticle: (a_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT COUNT(*) AS count FROM likeonarticle WHERE AID=${a_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0].count);
			})
		})
	},
	getLikeOnArticle: (a_id, u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT * FROM likeonarticle WHERE AID=${a_id} AND UID=${u_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0]);
			})
		})
	},
	dislikeArticle: (a_id, u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM likeonarticle WHERE AID=${a_id} AND UID=${u_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	getArticlesLikedByUser: (u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT a.AUTHORFNAME, a.AUTHORSNAME, a.INSTRUCTORID, e.* FROM likeonarticle la, article a, element e WHERE la.AID=a.ID AND a.ID=e.ID AND la.UID=${u_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	getArticlesReadByUser: (u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT a.AUTHORFNAME, a.AUTHORSNAME, a.INSTRUCTORID, e.* FROM readarticle ra, article a, element e WHERE ra.AID=a.ID AND a.ID=e.ID AND ra.SID=${u_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	getArticlesByLesson: (l_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT A.AUTHORFNAME, A.AUTHORSNAME, A.INSTRUCTORID, E.*, 
				(SELECT COUNT(L.UID) FROM likeonarticle L WHERE L.AID = A.ID ) as likes 
				FROM article A, element E 
				WHERE E.ID = A.ID AND A.LID=${l_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	}
}