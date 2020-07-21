const moment = require("moment");

const { Route } = use("app/Models");

const { coordsCovertDistance, angleFromCoordinate } = use("app/Helpers/map");

class MapController {



    routes(request, response) {
        Route.getByDate(request.body.date)
            .then((routes) => {
                response.json(routes).end();
            })
            .catch((error) => {
                response
                    .status(500)
                    .json({
                        message: error,
                    })
                    .end();
            });
    }

    async store(request, response) {
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

        response.json({ success: true }).end();
    }

    configs(req, response) {
        response
            .json({
                center: [40.462964, 50.052201],
                zoom: 10,
            })
            .end();
    }
}



module.exports = new MapController