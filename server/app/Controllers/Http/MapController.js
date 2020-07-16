"use strict";

const Route = use('App/Models/Route')
const { coordsCovertDistance, angleFromCoordinate } = use('App/Helpers/Map')
const moment = require('moment')

class MapController {
    async routes({ request, response }) {
        let routes = await Route.query().where('begin_date', request.all().date).fetch();

        return response.json(routes.toJSON())
    }
    async store({ request, response }) {

        let routes = [];

        let coords = [{
            start: [40.57406557621749, 49.898185729980476],
            end: [40.5268484330944, 50.05680084228516]
        }, {
            start: [40.470979694762356, 50.34381866455079],
            end: [40.393888118201176, 50.15430450439453]
        }]

        coords.forEach((value) => {
            let { start, end } = value;
            let speed = 300;
            let begin_date = '2020-07-16';
            let finish_date = '2020-07-16';
            let begin_time = '03:25:00';
            let distance = coordsCovertDistance(...start, ...end);
            routes.push({
                start: start.join(','),
                end: end.join(','),
                speed,
                angle: angleFromCoordinate(...start, ...end),
                distance,
                begin_date,
                begin_time,
                finish_date,
                finish_time: moment(begin_time, "hh:mm:ss")
                    .add(distance / speed, 'minutes')
                    .format('hh:mm:ss'),
            })
        })


        await Route.createMany(routes)

        response.status(200).json({ success: true })
    }

    configs({ response }) {
        return response.status(200).json({
            center: [40.462964, 50.052201],
            zoom: 10,
        });
    }
}

module.exports = MapController;