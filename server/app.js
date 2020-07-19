const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const view = require("express-edge");
const apiRouter = require("./routes/api");
const cors = require("cors");
const database = require("./models");

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

// init sequelize orm
database.sequelize.sync();

// Configure Edge if need to
view.config({ cache: process.env.NODE_ENV === "production" });
app.use(view.engine);
app.set("views", path.join(__dirname, "views"));

// app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index"));
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;