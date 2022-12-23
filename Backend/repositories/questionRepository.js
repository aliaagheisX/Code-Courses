const { DBconnection } = require("../config/database");

module.exports = {
  getQuestionById: () => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM Question WHERE `;
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
  getQuestionsByCourse: () => {
    return new Promise((resolve, reject) => {
      let queryString = ``;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  deleteAllQuestions: () => {
    return new Promise((resolve, reject) => {
      let queryString = ``;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  getQuestionsByQuiz: (Q_ID) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM Question WHERE ID = ${Q_ID}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
};
