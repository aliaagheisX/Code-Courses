const { DBConnection, DBconnection } = require("../config/database");

module.exports = {
  getAllInstructors: () => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM INSTRUCTOR, _USER WHERE INSTRUCTOR.ID=_USER.ID`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  getInstructorById: (id) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM INSTRUCTOR I, _USER U WHERE I.ID=U.ID AND I.ID=${id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  createInstructor: (id) => {
    return new Promise((resolve, reject) => {
      let queryString = `INSERT INTO INSTRUCTOR(ID, RATING) VALUES (${id}, 0)`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  editInstructor: (id, rating) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE INSTRUCTOR SET RATING=${rating} WHERE ID=${id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  deleteInstructorById: (id) => {
    return new Promise((resolve, reject) => {
      let queryString = `DELETE FROM INSTRUCTOR WHERE ID=${id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  deleteAllInstructors: () => {
    return new Promise((resolve, reject) => {
      let queryString = `DELETE FROM INSTRUCTOR;`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) {
          return reject(err);
        }
        return resolve(rows[0]);
      });
    });
  },
};
