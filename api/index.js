

module.exports = function (app) {
  app.get('/api/map/configs',(req,response) => {
    response.json({
      center: [40.462964, 50.052201],
      zoom: 10,
    });
    response.end();
  });

  app.get('/api/areas', (req, response) => {
    response.json([{
        name: "AirPort",
        type: "polygon",
        polygon: [
          [40.465243, 50.050168],
          [40.466957, 50.052108],
          [40.466812, 50.053873],
          [40.464944, 50.054311],
          [40.465243, 50.050168]
        ]
      }
    ]);
    response.end();
  });

  return app;
}
