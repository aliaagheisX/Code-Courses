const { DBconnection } = require("../config/database");
const ch = (str) => str.replace(/'/g, "`");

module.exports = {
  getAllQuizzes: () => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT E.CREATIONDATE, E.TITLE, E.IMAGE, E.DESCRIPTION,
        Q.*, (SELECT COUNT(QQT.NID) FROM quiz_question_topic QQT WHERE QQT.QID=Q.ID) as numOfQuestions,
        (SELECT COUNT(STQ.SID) FROM studenttakesquiz STQ WHERE STQ.QID=Q.ID) as numOfStudents FROM quiz Q, element E
        WHERE Q.ID=E.ID`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  getQuizById: (q_id) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT E.TITLE, E.IMAGE, E.CREATIONDATE, E.DESCRIPTION,
        Q.*, (SELECT COUNT(QQT.NID) FROM quiz_question_topic QQT WHERE QQT.QID=Q.ID) as numOfQuestions,
        (SELECT COUNT(STQ.SID) FROM studenttakesquiz STQ WHERE STQ.QID=Q.ID) as numOfStudents
        FROM quiz Q, element E WHERE Q.ID=E.ID AND Q.ID=${q_id};
        
        SELECT QU.* FROM question QU, quiz_question_topic QQT WHERE QQT.NID=QU.ID AND QQT.QID=${q_id};
        
        SELECT CH.* FROM choices CH WHERE CH.ID IN (SELECT QU.ID FROM question QU, quiz_question_topic QQT WHERE QQT.NID=QU.ID AND QQT.QID=${q_id});
        
        SELECT U.* FROM _user U, studenttakesquiz STQ WHERE STQ.SID=U.ID AND STQ.QID=${q_id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve({
          quiz: rows[0][0],
          questions: rows[1],
          choices: rows[2],
          students: rows[3],
        });
      });
    });
  },
  createQuiz: (quiz, instructor_id) => {
    const title = quiz.title;
    const max_score = quiz.max_score;
    const description = quiz.description;
    const imagePath = quiz.image;
    return new Promise((resolve, reject) => {
      let queryString = `CALL add_quiz(
				'${ch(title)}',
				'${ch(description)}',
				'${imagePath}',
				'${max_score}',
				${instructor_id},
				@quiz_id
			); 
			SELECT @quiz_id;`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[1][0]);
      });
    });
  },
  getQuizzesByInstructor: (I_ID) => {
    return new Promise((resolve, reject) => {
      let queryString = `
      SELECT E.*, Q.* 
      FROM quiz Q, element E 
      WHERE Q.INSTRUCTORID = ${I_ID} AND E.ID = Q.ID`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  addTopicsToQuiz: (q_id, topics) => {
    return new Promise((resolve, reject) => {
      let queryString = `INSERT INTO quiz_topic(QID, TID) VALUES `;
      topics.forEach((t_id, ind) => {
        queryString += `(${q_id}, ${t_id})`;
        if (ind < topics.length - 1) queryString += ", ";
      });
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
};
