const mysql = require('mysql')

const DeleteCompound = async (req, res, next) => {
    try {


        const CompoundId = req.query.CompoundId
        if (!CompoundId) {
            const error = {
                "status": 400,
                statusCode: "ERROR",
                "message": "Please Enter CompoundId"
            }
            throw error
        }

        console.log(CompoundId)

        const connection = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USERNAME,
            password: process.env.PASSWORD,
            database: process.env.SQL_DATABASE_NAME,
            multipleStatements: true
        })

        var sql = `DELETE FROM Compound WHERE CompoundId= "${CompoundId}"`


        connection.query(sql, function (err, resp) {
            if (err) {
                const error = {
                    "status": 400,
                    statusCode: "ERROR",
                    "message": err
                }
                throw error;
            }

            res.send({
                "data": [], status: 200,
                statusCode: 'SUCCESS', "message": "Successfully Deleted."
            })
        })


    } catch (error) {
        // debugger
        console.log(error);
        next(error);
    }
}

module.exports = DeleteCompound;