const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "db4free.net",
    user: "codecourses",
    password: "codecourses",
    database: "codecourses",
    multipleStatements: true,
});

module.exports = {
    DBconnection: connection,
    connectToDB: () => {
        connection.connect(err => {
            if (err) return console.error('Error connecting to DB\n', err);
            console.log('***DB Connected!***');
        });
    },
    query: (queryString) => {
        connection.query(queryString, (err, rows) => {
            if (err) {
                return console.error('Error executing query\n', err);
            };
            console.log(rows);
            return rows;
        });
    },
    endDBConnection: () => {
        connection.end(err => {
            if (err) return console.error('Error closing connection', err);
        });
    }
};