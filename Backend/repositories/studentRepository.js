const { DBconnection } = require('../config/database');

module.exports = {
    getAllStudents: () => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM student`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            });
        });
    },
    getStudentById: (id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM student WHERE ID=${id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows[0]);
            })
        })
    }
}