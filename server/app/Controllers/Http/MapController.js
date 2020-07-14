"use strict";

const Route = use('App/Models/Route')
const { coordsCovertDistance } = use('App/Helpers/Map')
const moment = require('moment')

class MapController {
    async index({ request, response }) {
        let routes = [];

        let coords = [{
            start: [40.44668578807542, 49.97268676757813],
            end: [40.51562620688753, 50.09353637695313]
        }]

        coords.forEach(())

        Array(10).keys().map((n) => {
            routes.push({
                start: "40.44668578807542,49.97268676757813",
                end: "40.51562620688753,50.09353637695313",
                speed: 300,
                begin_date: "2020-07-15",
                begin_time: "10:00:00",
                finish_date: "2020-07-15",
                finish_time: moment('10:00:00', "hh:mm:ss").add(Math.round(coordsCovertDistance(
                    40.44668578807542, 49.97268676757813,
                    40.51562620688753, 50.09353637695313
                )) / 300, 'minutes').format('hh:mm:ss'),
            })
        })


        await Route.createMany(routes)

        response.status(200).json(route.toJSON())
    }
    configs({ response }) {
        return response.status(200).json({
            center: [40.462964, 50.052201],
            zoom: 10,
        });
    }
}

module.exports = MapController;