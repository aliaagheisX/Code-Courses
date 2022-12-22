const { DBconnection } = require('../config/database');
module.exports = {
    getCourseById: (id) => {
        return new Promise((resolve, reject) => {
            let queryString = `
            SELECT C.*, E.* 
            FROM course C, element E
            WHERE C.ID=${id} AND E.ID = C.ID`;
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
            let queryString = `SELECT REVIEWRATING, COUNT(*) 
            FROM enroll 
            WHERE CID = ${c_id}
            GROUP BY REVIEWRATING;`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },

    getCourseEnrolls: (c_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM enroll  WHERE CID=${c_id} ;`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    },

    createCourse: (course, element_id, fname, lname) => {
        const course_pre = course.pre.replace(/'/g, "`");
        const instructor_id = course.instructor_id
        // Creating an element and returning the 
        return new Promise((resolve, reject) => {
            let queryString = `
            INSERT INTO course(ID,INSTRUCTORID, INSTRUCTORFNAME, INSTRUCTORSNAME, PREREQUISITES) 
            VALUES(${element_id},${instructor_id}, '${fname}', '${lname}', '${course_pre}') 
            `;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
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
}