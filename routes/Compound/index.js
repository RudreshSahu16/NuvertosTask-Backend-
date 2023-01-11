const express = require("express");
const compoundRouter = express.Router();
const { GetCompounds, AddCompound, UpdateCompound, DeleteCompound } = require("../../controller");

compoundRouter.get("/getcompounds", GetCompounds);
compoundRouter.post("/addcompound", AddCompound);
compoundRouter.put("/updatecompound", UpdateCompound);
compoundRouter.delete("/deletecompound", DeleteCompound);





module.exports = compoundRouter;
