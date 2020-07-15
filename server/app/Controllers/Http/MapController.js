"use strict";

const Route = use('App/Models/Route')
const {coordsCovertDistance, angleFromCoordinate} = use('App/Helpers/Map')
const moment = require('moment')

class MapController {
  async routes({request,response}) {
    let routes = await Route.query().where('begin_date',request.all().date).fetch();

    return response.json(routes.toJSON())
  }
  async store({request, response}) {

    //return response.send(Math.ceil(coordsCovertDistance(40.44289723682892, 50.00495910644531,40.4712408718256,50.04444122314454)))
    let routes = [];

    let coords = [{
      start: [40.434143560495514, 50.039806365966804],
      end: [40.495395357331105, 49.972343444824226]
    }]

    coords.forEach((value) => {
      let {start, end} = value;
      let speed = 300;
      let begin_date = '2020-07-15';
      let finish_date = '2020-07-15';
      let begin_time = '03:10:00';
      let distance = Math.ceil(coordsCovertDistance(...start, ...end));
      routes.push({
        start: start.join(','),
        end: end.join(','),
        speed,
        angle: angleFromCoordinate(...start, ...end),
        distance: coordsCovertDistance(...start, ...end),
        begin_date,
        begin_time,
        finish_date,
        finish_time: moment(begin_time, "hh:mm:ss")
          .add(distance / speed, 'minutes')
          .format('hh:mm:ss'),
      })
    })


    await Route.createMany(routes)

    response.status(200).json({success: true})
  }

  configs({response}) {
    return response.status(200).json({
      center: [40.462964, 50.052201],
      zoom: 10,
    });
  }
}

module.exports = MapController;
