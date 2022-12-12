const { DBconnection } = require('../config/database');

module.exports = {
    getAllTopics: () => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM topic`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    getTopicById: (id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM topic WHERE ID=${id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows[0]);
            })
        })
    },
    createTopic: (name) => {
        return new Promise((resolve, reject) => {
            let queryString = `INSERT INTO topic (NAME) VALUES ('${name}')`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    editTopic: (id, name) => {
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE topic SET NAME='${name}' WHERE ID=${id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    }
}