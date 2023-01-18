const mysql = require('mysql')
const uploadImage = require('../../../middleware');

const AddCompound = async (req, res, next) => {
    try {

        CompoundName = req.body.CompoundName
        CompounrDescription = req.body.CompoundDescription
        CompondImageSource = req.body.CompondImageSource
        dateModified = req.body.dateModified


        if (!CompoundName || !CompounrDescription || !CompondImageSource || !dateModified) {
            const error = {
                "status": 400,
                statusCode: "ERROR",
                "message": "Please Enter All Required Fields."
            }

            throw error
        }

        // uplpoading image to cloudinary
        const dataurl = await uploadImage.uploadImage(CompondImageSource, CompoundName, 'compound')

        const connection = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USERNAME,
            password: process.env.PASSWORD,
            database: process.env.SQL_DATABASE_NAME,
            multipleStatements: true
        })
        var sql = `INSERT INTO Compound(CompoundName, CompounrDescription, CompondImageSource,dateModified) VALUES  ("${CompoundName}", "${CompounrDescription}", "${dataurl}","${dateModified}")`;
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
                statusCode: 'SUCCESS', "message": "Successfully Added ."
            });
        });




    } catch (error) {
        // debugger
        console.log(error);
        next(error);
    }
}

module.exports = AddCompound;