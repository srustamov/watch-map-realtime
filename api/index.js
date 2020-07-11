module.exports = function (app) {

  app.get('/api/areas', (req, res) => {
    res.json([{
        name: "AirPort",
        type: "polygon",
        polygon: [
          [40.465243, 50.050168],
          [40.466957, 50.052108],
          [40.466812, 50.053873],
          [40.464944, 50.054311],
          [40.465243, 50.050168]
        ]
      },
      {
        name: "AirPort",
        type: "circle",
        center: {
          lat: 40.465243,
          lng: 50.050168
        },
        radius: 50
      }
    ]);
    res.end();
  });


  return app;
}
