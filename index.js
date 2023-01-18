const express = require("express");
const createError = require("http-errors");
const cors = require("cors");
const { dataRouter, compoundRouter } = require("./routes");
const { connection } = require("./helper/connections");


// connection with .env
const dotenv = require("dotenv");
dotenv.config();

// connecting SQL db to project
connection().connect(function (err) {
    if (err) {
        console.log(err)
        console.log("error occurred while connecting");
    }
    else {
        console.log("connection created with Mysql successfully");
    }
});



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// putting core origin to be access
app.use(cors({ origin: '*' }));

// checking for health status of webservices
app.get("/", async (req, res, next) => {
    res.send("Welcome to Nuvertos Project :)");
});

// routing 
app.use('/uploadData', dataRouter);
app.use('/compound', compoundRouter);

// managing route handelling
app.use(async (req, res, next) => {
    next(createError.NotFound("This route does not exist"));
});

// Maintaing error handling
app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        statusCode: err.statusCode || "FAILURE",
        status: err.status || 500,
        message: err.message,
    },
    );
});


// for port Listening 
console.log("started")
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log(`Server running onm Port ${Port}`)
});
