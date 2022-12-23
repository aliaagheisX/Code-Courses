const { DBconnection } = require("../config/database");

module.exports = {
  createQuiz: (quiz) => {
    return new Promise((resolve, reject) => {
      let queryString = `INSERT INTO QUiz (MAXSCORE,INSTRUCTORID) VALUES(${quiz.max_score},${quiz.I_ID})`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  getQuizzesByInstructor: (I_ID) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM QUiz WHERE INSTRUCTORID = ${I_ID}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
};
