const UploadDatatodb = require("./dataupload");
const { GetCompounds, AddCompound, UpdateCompound, DeleteCompound } = require("./compound");

module.exports = {
    // upload data routes
    UploadDatatodb,

    // Compound API's
    GetCompounds,
    AddCompound,
    UpdateCompound,
    DeleteCompound
}