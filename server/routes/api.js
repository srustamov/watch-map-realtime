var express = require("express");
var router = express.Router();

const { Route } = require("../models");
const { coordsCovertDistance, angleFromCoordinate } = require("../helpers/map");

router.post("/map/routes", (req, res) => {
    Route.getByDate(req.body.date)
        .then((routes) => {
            res.json(routes).end();
        })
        .catch((error) => {
            res
                .status(500)
                .json({
                    message: error,
                })
                .end();
        });
});

router.get("/map/store", async(req, res) => {
    let routes = [];

    let coords = [{
            start: [40.57406557621749, 49.898185729980476],
            end: [40.5268484330944, 50.05680084228516],
        },
        {
            start: [40.470979694762356, 50.34381866455079],
            end: [40.393888118201176, 50.15430450439453],
        },
    ];

    coords.forEach((value) => {
        let { start, end } = value;
        let speed = 300;
        let begin_date = "2020-07-16";
        let finish_date = "2020-07-16";
        let begin_time = "03:25:00";
        let distance = coordsCovertDistance(...start, ...end);
        routes.push({
            start: start.join(","),
            end: end.join(","),
            speed,
            angle: angleFromCoordinate(...start, ...end),
            distance,
            begin_date,
            begin_time,
            finish_date,
            finish_time: moment(begin_time, "hh:mm:ss")
                .add(distance / speed, "minutes")
                .format("hh:mm:ss"),
        });
    });

    await Route.bulkCreate(routes);

    res.json({ success: true }).end();
});

router.get("/map/configs", function(req, res) {
    res
        .json({
            center: [40.462964, 50.052201],
            zoom: 10,
        })
        .end();
});

module.exports = router;