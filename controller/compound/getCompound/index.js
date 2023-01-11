const { result } = require('@hapi/joi/lib/base')
const mysql = require('mysql')

const GetCompounds = async (req, res, next) => {
    try {


        const pageNumber = req.query.pageNumber
        if (!pageNumber) {
            const error = {
                "status": 400,
                statusCode: "ERROR",
                "message": "Please Enter Page Number"
            }
            throw error
        }

        const connection = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USERNAME,
            password: process.env.PASSWORD,
            database: process.env.SQL_DATABASE_NAME,
            multipleStatements: true
        })
        indexcount = (pageNumber - 1) * 10 + 1
        var sql = `SELECT * FROM Compound WHERE CompoundId >= "${indexcount}" LIMIT ${10};  SELECT COUNT(*) FROM Compound`


        connection.query(sql, function (err, resp) {
            if (err) {
                const error = {
                    "status": 400,
                    statusCode: "ERROR",
                    "message": err
                }
                throw error;
            }

            var size = resp[1][0]
            res.send({
                "data": resp[0], "size": size["COUNT(*)"], status: 200,
                statusCode: 'SUCCESS', "message": "Successfully Fetched."
            })
        });

    } catch (error) {
        // debugger
        console.log(error);
        next(error);
    }
}

module.exports = GetCompounds;