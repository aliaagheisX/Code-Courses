const { DBconnection } = require('../config/database');

const ch = str => str.replace(/'/g, "`");

module.exports = {
    getAllLessons: () => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM lesson`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    getLessonById: (l_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM lesson WHERE LID=${l_id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows[0]);
            })
        })
    },
    getLessonsByCourse: (c_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT 
            L.*, A.TITLE AS article_title, Q.TITLE AS quiz_title
            FROM lesson L, element A, element Q 
            WHERE CID=${c_id}  AND Q.ID = L.QID AND A.ID = L.AID `;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows[0]);
            })
        })
    },
    deleteAllLessons: () => {
        return new Promise((resolve, reject) => {
            let queryString = `DELETE FROM lesson`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    postNewLesson: (lesson) => {
        const { name, description, cid, qid, aid } = lesson;

        return new Promise((resolve, reject) => {
            let queryString = `CALL add_lesson (
                '${ch(name)}',
                '${ch(description)}',
                ${cid},
                ${qid},
                ${aid},
                @lesson_id
            );
            SELECT @lesson_id;
            SELECT * FROM lesson WHERE LID=@lesson_id;`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve({
                    id: rows[1][0],
                    newLesson: rows[2],
                });
            })
        })
    },
    editLessonName: (name, id) => {
        name = ch(name);
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE lesson SET NAME='${name}' WHERE LID=${id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    editLessonDescription: (description, id) => {
        description = ch(description);
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE lesson SET DESCRIPTION='${description}' WHERE LID=${id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    editLessonQuestion: (q_id, id) => {
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE lesson SET QID=${q_id} WHERE LID=${id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    editLessonArticle: (a_id, id) => {
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE lesson SET AID=${a_id} WHERE LID=${id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    editLessonCourseId: (cid, id) => {
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE lesson SET CID=${cid} WHERE LID=${id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
}