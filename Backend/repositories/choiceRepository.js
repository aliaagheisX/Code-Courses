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
};
