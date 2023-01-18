const mysql = require('mysql')
// const { deleteImage } = require('../../../middleware')
const uploadImage = require('../../../middleware')


const UpdateCompound = async (req, res, next) => {
    try {

        CompoundId = req.body.CompoundId
        CompoundName = req.body.CompoundName
        CompoundDescription = req.body.CompoundDescription
        CompondImageSource = req.body.CompondImageSource
        dateModified = req.body.dateModified
        isimagechange = req.body.isimagechange

        if (!CompoundId) {
            const error = {
                "status": 400,
                statusCode: "ERROR",
                "message": "Please Enter Compound Id"
            }
            throw error
        }

        console.log(CompoundId)

        if (!CompoundName || !CompoundDescription || !CompondImageSource || !dateModified) {
            const error = {
                "status": 400,
                statusCode: "ERROR",
                "message": "Please Enter All Required Fields."
            }
            throw error
        }

        if (isimagechange) {
            const dataurl = await uploadImage.uploadImage(CompondImageSource, CompoundName, 'compound')
            CompondImageSource = dataurl
        }

        const connection = mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USERNAME,
            password: process.env.PASSWORD,
            database: process.env.SQL_DATABASE_NAME,
            multipleStatements: true
        })

        var sql = `UPDATE Compound SET  CompoundName= "${CompoundName}", CompounrDescription="${CompoundDescription}",CompondImageSource="${CompondImageSource}" ,dateModified="${dateModified}" WHERE CompoundId = "${CompoundId}"`;

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
                statusCode: 'SUCCESS', "message": "Successfully Updated ."
            });
        });



    } catch (error) {
        // debugger
        console.log(error);
        next(error);
    }
}

module.exports = UpdateCompound;