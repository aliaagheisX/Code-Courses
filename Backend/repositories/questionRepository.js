const { DBconnection } = require("../config/database");
const ch = (str) => str.replace(/'/g, "`");

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
  createQuestion: (question, i_id) => {
    return new Promise((resolve, reject) => {
      let queryString = `INSERT INTO QUESTION (SCORE,BODY,INSTRUCTORID) VALUES(${question.score},'${ch(question.body)}',${i_id})`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
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
