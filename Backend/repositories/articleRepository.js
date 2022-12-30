const { DBconnection } = require('../config/database');

module.exports = {
	getAllArticles: () => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT A.AUTHORFNAME, A.AUTHORSNAME, A.INSTRUCTORID, E.*, (SELECT COUNT(L.UID) FROM LIKEONARTICLE L WHERE L.AID = A.ID ) as likes FROM ARTICLE A, ELEMENT E WHERE E.ID = A.ID;`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	getArticlesOfInstructor: (instructor_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT A.AUTHORFNAME, A.AUTHORSNAME, A.INSTRUCTORID, E.*, (SELECT COUNT(L.UID) FROM LIKEONARTICLE L WHERE L.AID = A.ID ) as likes FROM ARTICLE A, ELEMENT E, INSTRUCTOR I WHERE E.ID = A.ID AND A.INSTRUCTORID = I.ID AND I.ID = ${instructor_id};`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	getArticleById: (id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT 
			A.*, E.*, 
			(SELECT COUNT(L.UID) FROM LIKEONARTICLE L WHERE L.AID = A.ID ) as likes 
			FROM ARTICLE A, ELEMENT E WHERE A.ID=${id} AND   E.ID = A.ID;`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0]);
			})
		})
	},
	getNumberOfArticlesByAuthor: (id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT COUNT(*) AS count FROM ARTICLE WHERE INSTRUCTORID=${id}`;
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
				(SELECT COUNT(L.UID) FROM LIKEONARTICLE L WHERE L.AID = A.ID ) as likes 
				FROM ARTICLE A, ARTICLE_TOPIC t, ELEMENT E 
				WHERE A.ID=t.AID AND E.ID = A.ID AND t.TID=${id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	getArticlesByAuthorName: (fname, sname) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT * FROM ARTICLE, ELEMENT WHERE ELEMENT.ID=ARTICLE.ID AND ARTICLE.AUTHORFNAME='${fname}' AND ARTICLE.AUTHORSNAME='${sname}'`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	deleteAllArticles: () => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM ARTICLE`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	deleteArticleById: (id) => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM ARTICLE WHERE ID=${id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	createArticle: (article, imagePath) => {
		const {
			title,
			description,
			body,
			instructor_id,
		} = article;
		const ch = (str) => str.replace(/'/g, "`");

		// Creating an ELEMENT and returning the 
		return new Promise((resolve, reject) => {
			let queryString = `CALL add_article(
				'${ch(title)}',
				'${ch(description)}',
				'${imagePath}',
				'${ch(body)}',
				${instructor_id},
				@article_id
			); 
			SELECT @article_id;`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[1][0]);
			})
		})

	},
	editArticleBody: (article, id) => {
		const body = article.body.replace(/'/g, "`");
		return new Promise((resolve, reject) => {
			let queryString = `UPDATE ARTICLE SET BODY = '${body}' WHERE ID = ${id} `;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	addTopicToArticle: (a_id, t_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `INSERT INTO ARTICLE_TOPIC(AID, TID) VALUES (${a_id}, ${t_id})`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			});
		})
	},
	removeTopicFromArticle: (a_id, t_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM ARTICLE_TOPIC WHERE AID=${a_id} AND TID=${t_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			});
		})
	},
	getArticleTopics: (a_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT NAME, TID FROM TOPIC, ARTICLE_TOPIC WHERE TID=ID AND AID=${a_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	deleteArticleTopics: (id) => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM ARTICLE_TOPIC WHERE AID=${id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	readArticle: (a_id, u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `INSERT INTO READARTICLE (SID, AID) VALUES (${u_id}, ${a_id})`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	readCountUser: (u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT COUNT(*) AS count FROM READARTICLE WHERE SID=${u_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0].count);
			})
		})
	},
	readCountArticle: (a_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT COUNT(*) AS count FROM READARTICLE WHERE AID=${a_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0].count);
			})
		})
	},
	likeArticle: (a_id, u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `INSERT INTO LIKEONARTICLE (UID, AID) VALUES (${u_id}, ${a_id})`;

			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	likeCountArticle: (a_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT COUNT(*) AS count FROM LIKEONARTICLE WHERE AID=${a_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0].count);
			})
		})
	},
	getLikeOnArticle: (a_id, u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT * FROM LIKEONARTICLE WHERE AID=${a_id} AND UID=${u_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0]);
			})
		})
	},
	dislikeArticle: (a_id, u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM LIKEONARTICLE WHERE AID=${a_id} AND UID=${u_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	getArticlesLikedByUser: (u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT a.AUTHORFNAME, a.AUTHORSNAME, a.INSTRUCTORID, e.* FROM LIKEONARTICLE la, ARTICLE a, ELEMENT e WHERE la.AID=a.ID AND a.ID=e.ID AND la.UID=${u_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	getArticlesReadByUser: (u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT a.AUTHORFNAME, a.AUTHORSNAME, a.INSTRUCTORID, e.* FROM READARTICLE ra, ARTICLE a, ELEMENT e WHERE ra.AID=a.ID AND a.ID=e.ID AND ra.SID=${u_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	getArticlesByLesson: (l_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT A.AUTHORFNAME, A.AUTHORSNAME, A.INSTRUCTORID, E.*, 
				(SELECT COUNT(L.UID) FROM LIKEONARTICLE L WHERE L.AID = A.ID ) as likes 
				FROM ARTICLE A, ELEMENT E 
				WHERE E.ID = A.ID AND A.LID=${l_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	}
}