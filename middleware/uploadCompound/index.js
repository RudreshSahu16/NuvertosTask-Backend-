const multer = require("multer");


// message for upload/multer files
const storage = multer.memoryStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, `${originalname}`);
    },
});

const compoundUpload = multer({ storage });

module.exports = { compoundUpload };
