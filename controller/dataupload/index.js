
const csv = require("csv-parser");
const fs = require("fs");
const mysql = require('mysql')


const UploadDatatodb = async (req, res, next) => {
    try {
        const connection = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USERNAME,
            password: process.env.PASSWORD,
            database: process.env.SQL_DATABASE_NAME,
            multipleStatements: true
        })

        const results = []

        const readData = fs.createReadStream('compound.csv')
        readData.pipe(csv({})).on('data', (data) => results.push(data))
            .on('end', () => {
                results.forEach(async result => {

                    CompoundId = parseInt(result.id)
                    CompoundName = result.CompoundName
                    CompounrDescription = result.CompounrDescription
                    CompondImageSource = result.strImageSource
                    dateModified = result.dateModified

                    var sql = `INSERT INTO Compound(CompoundName, CompounrDescription, CompondImageSource,dateModified) VALUES  ("${CompoundName}", "${CompounrDescription}", "${CompondImageSource}","${dateModified}")`;

                    connection.query(sql, function (err, resp) {
                        if (err) {
                            const error = {
                                "status": 400,
                                statusCode: "ERROR",
                                "message": err
                            }
                            throw error;
                        }
                    });

                })
            })

    } catch (err) {
        console.log(err);
        next(err)
    }
    res.send({
        status: 200, statusCode: 'SUCCESS', "message": "Successfully Uploaded Data to database."
    });
}

module.exports = UploadDatatodb;