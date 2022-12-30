const { DBconnection } = require("../config/database");

module.exports = {
  getRepliesToComment: (id) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT * FROM _COMMENT WHERE RID=${id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },

  getCommentsOfArticle: (article_id) => {
    return new Promise((resolve, reject) => {
      let queryString = `SELECT c.*, 
      u._IMAGE, 
      u.USERNAME, 
      u.FNAME, 
      u.SNAME, 
      (SELECT COUNT(*) FROM LIKEONCOMMENT L WHERE c.ID = L.CID) as likes 
      FROM _COMMENT c, _USER u
      WHERE c.AID=${article_id} AND c.UID = u.ID;`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  getCommentByID: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT c.*, 
      u._IMAGE, 
      u.USERNAME, 
      u.FNAME, 
      u.SNAME, 
      (SELECT COUNT(*) FROM LIKEONCOMMENT L WHERE c.ID = L.CID) as likes 
      FROM _COMMENT c, _USER u
      WHERE c.ID=${id} AND c.UID = u.ID;`;
      DBconnection.query(query, (error, rows) => {
        if (error) return reject(error);
        return resolve(rows);
      });
    });
  },
  addComment: (a_id, u_id, r_id, comment) => {
    const comment_body = comment.replace(/'/g, "`");

    return new Promise((resolve, reject) => {
      const query = `INSERT INTO _COMMENT(AID,UID,RID,BODY) VALUES(${a_id},${u_id},${r_id},'${comment_body}')`;
      DBconnection.query(query, (error, rows) => {
        if (error) return reject(error);
        return resolve(rows);
      });
    });
  },
  editComment: (id, body) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE _COMMENT SET BODY = '${body}'  WHERE ID = ${id}`;
      DBconnection.query(query, (error, rows) => {
        if (error) return reject(error);
        return resolve(rows);
      });
    });
  },
  deleteAllComments: () => {
    return new Promise((resolve, reject) => {
      let queryString = `DELETE FROM _COMMENT`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  deleteCommentById: (id) => {
    return new Promise((resolve, reject) => {
      let queryString = `DELETE FROM _COMMENT WHERE ID=${id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  deleteCommentsByUser: (id) => {
    return new Promise((resolve, reject) => {
      let queryString = `DELETE FROM _COMMENT WHERE UID=${id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  deleteCommentsByArticle: (id) => {
    return new Promise((resolve, reject) => {
      let queryString = `DELETE FROM _COMMENT WHERE AID=${id}`;
      DBconnection.query(queryString, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  },
  getLikeOnComment: (c_id, u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT * FROM LIKEONCOMMENT WHERE CID=${c_id} AND UID=${u_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0]);
			})
		})
	},
  dislikeComment: (c_id, u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `DELETE FROM LIKEONCOMMENT WHERE CID=${c_id} AND UID=${u_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
  likeCountComment: (c_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT COUNT(*) AS count FROM LIKEONCOMMENT WHERE CID=${c_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0].count);
			})
		})
	},
  likeComment: (c_id, u_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `INSERT INTO LIKEONCOMMENT (UID, CID) VALUES (${u_id}, ${c_id})`;

			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows);
			})
		})
	},
  likeCountComment: (c_id) => {
		return new Promise((resolve, reject) => {
			let queryString = `SELECT COUNT(*) AS count FROM LIKEONCOMMENT WHERE CID=${c_id}`;
			DBconnection.query(queryString, (err, rows) => {
				if (err) return reject(err);
				return resolve(rows[0].count);
			})
		})
	},
};
