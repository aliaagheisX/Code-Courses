const { DBconnection } = require("../config/database");

module.exports = {
  checkEmailQuery: (email) => {
    return new Promise((resolve, reject) => {
      console.log(email);
      let queryString = `SELECT email FROM _user WHERE email='${email}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) reject(err);
        console.log(rows);
        resolve(rows[0]);
      });
    });
  },
  getUser: (email) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM _user WHERE email='${email}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  getUserPassword: (email) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT _password FROM _user WHERE email='${email}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM _user WHERE ID=${id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  getUserByName: (username) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM _user WHERE USERNAME='${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows[0]);
      });
    });
  },
  createUser: (user_data) => {
    return new Promise((resolve, reject) => {
      let queryString = `INSERT INTO _user (username, fname, sname, email, _password,_image)
      VALUES ('${user_data.username}','${user_data.fname}','${user_data.sname}','${user_data.email}','${user_data.password}}','${user_data.image}}')
      ;`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve({ message: "User created successfully" });
      });
    });
  },
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM _user`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  deleteUserbyID: (id) => {
    return new Promise((resolve, reject) => {
      let queryString = `DELETE  FROM _user WHERE id = ${id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  deleteUserbyusername: (username) => {
    return new Promise((resolve, reject) => {
      let queryString = `DELETE  FROM _user WHERE USERNAME = '${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  editUsername: (username, newUsername) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE _user SET USERNAME = '${newUsername}' WHERE USERNAME = '${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  editfname: (username, fname) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE _user SET FNAME = '${fname}' WHERE USERNAME = '${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  editsname: (username, sname) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE _user SET SNAME = '${sname}' WHERE USERNAME = '${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  editEmail: (username, email) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE _user SET EMAIL = '${email}' WHERE USERNAME = '${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  editPassword: (username, password) => {
    return new Promise((resolve, reject) => {
      let queryString = `UPDATE _user SET _PASSWORD = '${password}' WHERE USERNAME = '${username}'`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  deleteAllUsers: () => {
    return new Promise((resolve, reject) => {
      let queryString = `DELETE FROM _user`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      })
    })
  }
};
