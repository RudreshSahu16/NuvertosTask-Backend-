var cloudinary = require('cloudinary').v2;

const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: process.env.CLOUD_SECURE
});

const uploadImage = async (image, imagename, foldername) => {


    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: foldername,
        public_id: imagename
    };
    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(image, options);
        return result.secure_url;
    } catch (error) {
        console.error(error);
        next(error);
    }
};



module.exports = { uploadImage }