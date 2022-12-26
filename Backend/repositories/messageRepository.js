const { DBconnection } = require('../config/database');

module.exports = {
    getDiscussionMessages: (c_id) => {
        return new Promise((resolve, reject) => {
            let queryString = `SELECT * FROM MESSAGES WHERE CID=${c_id}`;
            DBconnection.query(queryString, (err, rows) => {
                if (err) return reject(err);
                return resolve(rows);
            })
        })
    }
}