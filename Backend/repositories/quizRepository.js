const { DBconnection } = require("../config/database");
const ch = (str) => str.replace(/'/g, "`");

module.exports = {
  getAllQuizzes: () => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT E.CREATIONDATE, E.TITLE, E.IMAGE, E.DESCRIPTION,
        Q.*, (SELECT COUNT(DISTINCT  QQT.NID) FROM quiz_question_topic QQT WHERE QQT.QID=Q.ID) as numOfQuestions,
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
      let queryString = `
      SELECT E.TITLE, E.IMAGE, E.CREATIONDATE, E.DESCRIPTION, Q.*,
        (SELECT COUNT(STQ.SID) FROM studenttakesquiz STQ WHERE STQ.QID=Q.ID) as numOfStudents
        FROM quiz Q, element E WHERE Q.ID=E.ID AND Q.ID=${q_id};
        
        SELECT DISTINCT QU.BODY, QU.ID, QU.SCORE FROM question QU, quiz_question_topic QQT WHERE QQT.NID=QU.ID AND QQT.QID=${q_id};

        
        SELECT CH.BODY, CH.ID FROM choices CH WHERE CH.ID IN (SELECT QU.ID FROM question QU, quiz_question_topic QQT WHERE QQT.NID=QU.ID AND QQT.QID=${q_id});
        SELECT U.* FROM _user U, studenttakesquiz STQ WHERE STQ.SID=U.ID AND STQ.QID=${q_id};
        SELECT DISTINCT T.* FROM topic T, quiz_question_topic QQT WHERE T.ID=QQT.TID AND QQT.QID=${q_id};
        `;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve({
          quiz: rows[0][0],
          questions: rows[1],
          choices: rows[2],
          students: rows[3],
          topics: rows[4],
        });
      });
    });
  },
  createQuiz: (quiz, instructor_id, imagePath) => {
    const title = quiz.title;
    const max_score = quiz.max_score;
    const description = quiz.description;
    return new Promise((resolve, reject) => {
      let queryString = `CALL add_quiz(
				'${ch(title)}',
				'${ch(description)}',
				'${imagePath}',
				100,
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
      SELECT E.CREATIONDATE, E.TITLE, E.IMAGE, E.DESCRIPTION,
        Q.*, (SELECT COUNT(DISTINCT QQT.NID) FROM quiz_question_topic QQT WHERE QQT.QID=Q.ID) as numOfQuestions,
        (SELECT COUNT(STQ.SID) FROM studenttakesquiz STQ WHERE STQ.QID=Q.ID) as numOfStudents FROM quiz Q, element E
        WHERE Q.INSTRUCTORID = ${I_ID} AND Q.ID=E.ID`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  getQuizzesByStudent: (S_ID) => {
    return new Promise((resolve, reject) => {
      let queryString = `
      SELECT E.CREATIONDATE, E.TITLE, E.IMAGE, E.DESCRIPTION, Q.*, 
      (SELECT COUNT(DISTINCT QQT.NID) FROM quiz_question_topic QQT WHERE QQT.QID=Q.ID) as numOfQuestions,
      (SELECT COUNT(STQ.SID) FROM studenttakesquiz STQ WHERE STQ.QID=Q.ID) as numOfStudents 
      FROM studenttakesquiz STQ, quiz Q, element E
      WHERE STQ.SID =${S_ID} AND STQ.QID = Q.ID AND  Q.ID=E.ID`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  addTopicsToQuiz: (quiz_id, topics, questions) => {
    return new Promise((resolve, reject) => {
      let queryString = `INSERT INTO QUIZ_QUESTION_TOPIC(QID, TID,NID) VALUES `;
      topics.forEach((t_id, ind) => {
        questions.forEach((q_id, idx) => {
          queryString += `(${quiz_id}, ${t_id}, ${q_id}),`;
        });
      });
      queryString = queryString.slice(0, -1);
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  getScoreStudent: (q_id, s_id) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM studenttakesquiz WHERE QID=${q_id} AND SID=${s_id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  addNewScore: (q_id, s_id, score) => {
    return new Promise((resolve, reject) => {
      let queryString = `INSERT INTO STUDENTTAKESQUIZ (QID , SID , SCORE) VALUES(${q_id}  ,${s_id} ,  ${score} )`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  DidHeAnswerCorrect: (q_id, body) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT ISCORRECT FROM CHOICES WHERE QID=${q_id} AND BODY= '${body}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
};
