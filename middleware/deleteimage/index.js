var cloudinary = require('cloudinary').v2;

const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: process.env.CLOUD_SECURE
});



const deleteImage = async (imageurl, foldername) => {
    try {
        // https://res.cloudinary.com/rudratechweb/image/upload/v1674055433/compound/BENZENE.jpg
        var urlArray = imageurl.split(foldername)
        var imagenametype = urlArray[-1]
        var resp = imagenametype.split(".")
        console.log(resp[0])
        // cloudinary.uploader.destroy('zombie', function(result) { console.log(result) });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = { deleteImage }