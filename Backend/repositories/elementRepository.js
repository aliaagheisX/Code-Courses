const { DBconnection } = require('../config/database');

module.exports = {
	createElement: (article, image) => {
		const title = article.title;
		const description = article.description;
		// Creating an element and returning the insertID
		return new Promise((resolve, reject) => {
			let queryString = `INSERT INTO ELEMENT(TITLE,DESCRIPTION,IMAGE) VALUES('${title}','${description}', '${image}')`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) {
					console.log(err)
					return reject(err);
				}
				resolve(rows.insertId);
			})
		});
	},
	editElementTitle: (article) => {
		const title = article.title;
		const id = article.id;
		return new Promise((resolve, reject) => {
			let queryString = `UPDATE ELEMENT SET TITLE = '${title}' WHERE ID = ${id} `;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	editElementDescription: (article) => {
		const description = article.description;
		const id = article.id;
		return new Promise((resolve, reject) => {
			let queryString = `UPDATE ELEMENT SET description = '${description}' WHERE ID = ${id} `;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
	editImage: (id, imagePath) => {
		return new Promise((resolve, reject) => {
			let queryString = `UPDATE ELEMENT SET IMAGE='${imagePath}' WHERE ID=${id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
}