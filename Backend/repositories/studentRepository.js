const { DBconnection } = require('../config/database');

module.exports = {
    getAllStudents: () => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM STUDENT, _USER WHERE _USER.ID = STUDENT.ID `;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            });
        });
    },
    getStudentById: (id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM STUDENT, _USER WHERE _USER.ID = STUDENT.ID AND _USER.ID=${id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows[0]);
            })
        })
    },
    createStudent: (id) => {
        return new Promise((resolve, reject) => {
            let queryString = `INSERT INTO STUDENT (ID) VALUES (${id})`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    deleteAllStudents: () => {
        return new Promise((resolve, reject) => {
            let queryString = `DELETE FROM STUDENT`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    deleteStudentById: (id) => {
        return new Promise((resolve, reject) => {
            let queryString = `DELETE FROM STUDENT WHERE ID=${id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    }
}