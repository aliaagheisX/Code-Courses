const { DBconnection } = require('../config/database');
const ch = (str) => str.replace(/'/g, "`");
module.exports = {
    getAllCourses: () => {
        return new Promise((resolve, reject) => {
            let queryString = `
            SELECT 
                C.INSTRUCTORFNAME, C.INSTRUCTORSNAME, E.*, 
                (SELECT COUNT(L.SID) FROM enroll L WHERE L.CID = C.ID ) as enrolls_count 
            FROM course C, element E WHERE E.ID = C.ID;`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },

    getCoursesOfInstructor: (id) => {
        return new Promise((resolve, reject) => {
            let queryString = `
            SELECT 
                    C.INSTRUCTORFNAME, C.INSTRUCTORSNAME, E.*, 
                    (SELECT COUNT(L.SID) FROM enroll L WHERE L.CID = C.ID ) as enrolls_count 
            FROM    course C, element E 
            WHERE   C.INSTRUCTORID=${id}  AND E.ID = C.ID;`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },

    getCoursesOfStudent: (id) => {
        return new Promise((resolve, reject) => {
            let queryString = `
            SELECT 
                    C.INSTRUCTORFNAME, C.INSTRUCTORSNAME, E.*, 
                    (SELECT COUNT(L.SID) FROM enroll L WHERE L.CID = C.ID ) as enrolls_count 
            FROM    course C, enroll L, element E 
            WHERE   L.CID=C.ID AND L.SID = ${id} AND   E.ID = C.ID;`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    getCourseById: (id) => {
        return new Promise((resolve, reject) => {
            let queryString = `
            SELECT C.*, E.*, COUNT(S.SID) AS enrolls_count
            FROM course C, element E, enroll S
            WHERE C.ID=${id} AND E.ID = C.ID AND S.CID = C.ID`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows[0]);
            })
        })
    },

    getUserEnrolled: (u_id, c_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM enroll  WHERE SID=${u_id} AND CID=${c_id} ;`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows[0]);
            })
        })
    },

    getCourseRating: (c_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT REVIEWRATING AS rate, COUNT(*) as count 
            FROM enroll 
            WHERE CID = ${c_id} AND REVIEWRATING IS NOT NULL
            GROUP BY REVIEWRATING;`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },

    getCourseReviews: (c_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT E.*, U.USERNAME, U.FNAME, U.SNAME,U._IMAGE, U.EMAIL FROM enroll E, _user U  WHERE E.CID=${c_id} AND REVIEWRATING IS NOT NULL AND U.ID=E.SID;`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },

    getCourseUserReview: (c_id, u_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT E.*, U.USERNAME, U.FNAME, U.SNAME,U._IMAGE, U.EMAIL FROM enroll E, _user U  WHERE E.CID=${c_id} AND E.SID = ${u_id} AND REVIEWRATING IS NOT NULL AND U.ID=E.SID;`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows[0]);
            })
        })
    },

    getReview: (c_id, u_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT E.*, U.USERNAME, U.FNAME, U.SNAME, U._IMAGE, U.EMAIL FROM enroll E, _user U 
                WHERE E.CID=${c_id} AND E.SID=${u_id} AND REVIEWRATING IS NOT NULL AND U.ID=E.SID`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows[0]);
            })
        })
    },

    getCourseTopics: (c_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `
            SELECT NAME, TID 
            FROM course_topic, topic 
            WHERE CID=${c_id} AND TID=ID`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    editCoursePre: (pre, id) => {
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE COURSE SET PREREQUISITES = '${ch(pre)}' WHERE ID = ${id} `;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },

    createCourse: (course, imagePath) => {
        const {
            title,
            description,
            pre,
            instructor_id,
        } = course;

        return new Promise((resolve, reject) => {
            let queryString = `CALL add_course(
				'${ch(title)}',
				'${ch(description)}',
				'${imagePath}',
				'${ch(pre)}',
				${instructor_id},
				@course_id
			); 
			SELECT @course_id;`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows[1][0]);
            })
        })

    },

    enrollCourse: (u_id, c_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `INSERT INTO enroll (SID, CID) VALUES (${u_id}, ${c_id})`;

            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },

    disenrollCourse: (u_id, c_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `DELETE FROM enroll WHERE CID=${c_id} AND SID=${u_id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },

    removeTopicsFromCourse: (c_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `DELETE FROM course_topic WHERE CID=${c_id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            });
        })
    },


    deleteCourseTopics: (id) => {
        return new Promise((resolve, reject) => {
            let queryString = `DELETE FROM course_topic WHERE CID=${id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    addTopicsToCourse: (c_id, topics) => {
        return new Promise((resolve, reject) => {
            let queryString = `INSERT INTO course_topic(CID, TID) VALUES `;
            topics.forEach((t_id, ind) => {
                queryString += `(${c_id}, ${t_id})`
                if (ind < topics.length - 1) queryString += ', '
            });
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            });
        })
    },
    deleteCourseById: (id) => {
        return new Promise((resolve, reject) => {
            let queryString = `DELETE FROM course WHERE ID=${id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    createReview: (c_id, u_id, body, rating) => {
        body = ch(body);
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE enroll SET REVIEWBODY='${body}', REVIEWRATING=${rating}
                WHERE CID=${c_id} AND SID=${u_id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    editReviewBody: (body, c_id, u_id) => {
        body = ch(body);
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE enroll SET REVIEWBODY='${body}' WHERE CID=${c_id} AND SID=${u_id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    editReviewRating: (rating, c_id, u_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE enroll SET REVIEWRATING=${rating} WHERE CID=${c_id} AND SID=${u_id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    deleteOneReview: (c_id, u_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE enroll SET REVIEWBODY=NULL, REVIEWRATING=NULL
                WHERE CID=${c_id} AND SID=${u_id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },
    deleteCourseReviews: (c_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `UPDATE enroll SET REVIEWRATING=NULL, REVIEWBODY=NULL
                WHERE CID=${c_id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    }
}