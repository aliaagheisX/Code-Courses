const { DBconnection } = require('../config/database');

module.exports = {
    getAllStudents: () => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM student, _user WHERE _user.ID = student.ID `;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            });
        });
    },
    getStudentById: (id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM student, _user WHERE _user.ID = student.ID AND _user.ID=${id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows[0]);
            })
        })
    },
    createStudent: (id) => {
        return new Promise((resolve, reject) => {
            let queryString = `INSERT INTO student (ID) VALUES (${id})`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    deleteAllStudents: () => {
        return new Promise((resolve, reject) => {
            let queryString = `DELETE FROM student`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    deleteStudentById: (id) => {
        return new Promise((resolve, reject) => {
            let queryString = `DELETE FROM student WHERE ID=${id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    }
}