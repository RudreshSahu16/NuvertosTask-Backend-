const { compoundUpload } = require('./uploadCompound');
const { uploadImage } = require("./uploadImage");
const { deleteImage } = require('./deleteimage');

module.exports = { compoundUpload, uploadImage, deleteImage };