const express = require("express");
const dataRouter = express.Router();
const { UploadDatatodb } = require("../../controller");

dataRouter.get("/uploaddatatodb", UploadDatatodb);


module.exports = dataRouter;
