const { DBconnection } = require("../config/database");

module.exports = {
  getAdmins: () => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM _USER WHERE ISADMIN=(1)`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      })
    })
  },
  checkEmailQuery: (email) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT email FROM _USER WHERE email='${email}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) reject(err);
        return resolve(rows[0]);
      });
    });
  },
  getUser: (email) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM _USER WHERE EMAIL='${email}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  getUserPassword: (email) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT _password FROM _USER WHERE email='${email}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM _USER WHERE ID=${id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  getUserByName: (username) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM _USER WHERE USERNAME='${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  createUser: (user_data) => {
    return new Promise((resolve, reject) => {
      let queryString = `INSERT INTO _USER (username, fname, sname, email, _password,_image)
      VALUES ('${user_data.username}','${user_data.firstName}','${user_data.lastName}','${user_data.email}','${user_data.password}}','${user_data.image}}')
      ;`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve({ 
          message: "User created successfully",
          rows: rows,
        });
      });
    });
  },
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM _USER`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  deleteUserbyID: (id) => {
    return new Promise((resolve, reject) => {
      let queryString = `DELETE  FROM _USER WHERE id = ${id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  deleteUserbyusername: (username) => {
    return new Promise((resolve, reject) => {
      let queryString = `DELETE  FROM _USER WHERE USERNAME = '${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  editUsername: (username, newUsername) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE _USER SET USERNAME = '${newUsername}' WHERE USERNAME = '${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  editfname: (username, fname) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE _USER SET FNAME = '${fname}' WHERE USERNAME = '${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  editsname: (username, sname) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE _USER SET SNAME = '${sname}' WHERE USERNAME = '${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  editAbout: (username, about) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE _USER SET ABOUT = '${about}' WHERE USERNAME = '${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  editEmail: (username, email) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE _USER SET EMAIL = '${email}' WHERE USERNAME = '${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  editPassword: (username, password) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE _USER SET _PASSWORD = '${password}' WHERE USERNAME = '${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  editImage: (username, image) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE _USER SET _IMAGE='${image}' WHERE USERNAME = '${username}'`
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    })
  },
  deleteAllUsers: () => {
    return new Promise((resolve, reject) => {
      let queryString = `DELETE FROM _USER`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  addAdmin: (id) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE _USER SET ISADMIN=1 WHERE ID=${id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      })
    })
  },
  getAdminReport: () => {
    return new Promise((resolve, reject) => {
      let queryString = `
      CALL getTopicsReport();
      CALL getUsersReport();
      CALL TopLikedArticles();
      CALL TopEnrolledCourses();
      CALL TopRatedCourses();
      CALL TopTakenQuizzes();
      CALL activitesReport();
      `;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve({
          TopicsReport: rows[0],
          UsersReport: rows[2][0],
          TopLikedArticles: rows[4],
          TopEnrolledCourses: rows[6],
          TopRatedCourses: rows[8],
          TopTakenQuizzes: rows[10],
          ActivitesReport: rows[12][0],
        });
      });
    });
  },
};
