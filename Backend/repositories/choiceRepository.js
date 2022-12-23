const { DBconnection } = require("../config/database");

module.exports = {
  createChoice: (choice) => {
    return new Promise((resolve, reject) => {
      let queryString = `INSERT INTO CHOICES (ID,BODY,ISCORRECT) VALUES(${choice.Q_ID},'${choice.body}',${choice.isCorrect})`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  getQuestionsByQuiz: (Q_ID) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM CHOICES WHERE ID = ${Q_ID}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
};
