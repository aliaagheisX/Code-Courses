const { DBconnection } = require('../config/database');

module.exports = {
    getAllLessons: () => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM lesson`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    getLessonById: (l_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM lesson WHERE LID=${l_id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows[0]);
            })
        })
    },
    getLessonsByCourse: (c_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM lesson WHERE CID=${c_id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows[0]);
            })
        })
    },
    deleteAllLessons: () => {
        return new Promise((resolve, reject) => {
            let queryString = `DELETE FROM lesson`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
}