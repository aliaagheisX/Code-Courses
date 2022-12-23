const { DBconnection } = require("../config/database");

module.exports = {
  getQuestionById: (l_id) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM Question WHERE LID=${l_id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  createQuestion: (question) => {
    return new Promise((resolve, reject) => {
      let queryString = `INSERT INTO QUESTION (SCORE,BODY,INSTRUCTORID) VALUES(${question.score},'${question.body}',${question.I_ID})`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  getQuestionsByCourse: (c_id) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM Question WHERE CID=${c_id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  deleteAllQuestions: () => {
    return new Promise((resolve, reject) => {
      let queryString = `DELETE FROM Question`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
};
