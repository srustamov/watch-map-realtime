const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const view = require("express-edge");
const apiRouter = use("routes/api");
const database = use("app/Models");

const app = express();

// app.use(require("cors")({origin: "*",}));

// init sequelize orm
database.sequelize.sync();


view.config({ cache: process.env.NODE_ENV === "production" });
app.use(view.engine);
app.set("views", path.join(__dirname, "app/Views"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index"));
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    if (err.status === 404) {
        res.status(200).render('index')
    } else {
        res.status(err.status || 500);
        res.render("error", {
            error: err,
        });
    }

});

module.exports = app;