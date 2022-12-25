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
      let queryString = `
      SELECT E.*, Q.* 
      FROM QUiz Q, element E 
      WHERE Q.INSTRUCTORID = ${I_ID} AND E.ID = Q.ID`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
};
