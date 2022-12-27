const { DBconnection } = require("../config/database");
const ch = (str) => str.replace(/'/g, "`");

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

  addChoicesToQuiz: (q_id, choices) => {
    return new Promise((resolve, reject) => {
      let queryString = `INSERT INTO CHOICES (ID, BODY,ISCORRECT) VALUES `;

      choices.forEach(({ body, is_correct }, ind) => {
        queryString += `(${q_id}, '${ch(body)}', ${is_correct})`
        if (ind < choices.length - 1) queryString += ', '
      });

      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    })
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
