const mysql = require('mysql2');

const connection = () => {
    return (mysql.createConnection({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USERNAME,
        password: process.env.PASSWORD,
        database: process.env.SQL_DATABASE_NAME,
        multipleStatements: true
    })
    )
}


module.exports = connection;

