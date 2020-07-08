"use strict";

const PI = 3.14159265;
const TWO_PI = 2 * PI;

var markers = [];

const polygons = [
  {
    name: "AirPort",
    latitudes: [
      40.465243,
      40.466957,
      40.466812,
      40.464944,
      40.461626,
      40.459649,
    ],
    longitudes: [
      50.050168,
      50.052108,
      50.053873,
      50.054311,
      50.054544,
      50.052609,
    ],
  },
];

const polygonCoords = [];

polygons.forEach((polygon) => {
  polygon.latitudes.forEach((latitude, index) => {
    polygonCoords.push([latitude, polygon.longitudes[index]]);
  });
});

const map = L.map("map").setView([40.462964, 50.052201], 15);

map.on("click", function (e) {
  console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; Samir Rustamov",
}).addTo(map);

window.onload = () => {
<<<<<<< HEAD
    const socket = io();

    socket.on("location", (data) => {
        if (data.socket_id) {
            createOrUpdateMarker(data);
        }
    });
=======
  initPolygons();

  const socket = io();

  socket.on("location", (data) => {
    if (data.socket_id) {
      let isSafeArea = ValidateCoords.isInsidePitch(
        data.latitude,
        data.longitude,
        polygons[0].latitudes,
        polygons[0].longitudes
      );
      if (isSafeArea) {
        socket.emit('safe-area',{id:data.socket_id,name:polygons[0].name})
        notifyMe("Safe Area");
      }
      createOrUpdateMarker(data);
    }
  });
>>>>>>> 6c6d8c76a1d0caca1687708b2c218ba8f75d13c9

    socket.on("leave", (id) => {
        clearMarker(id);
    });
};

const getCoordsFromData = (data) => {
<<<<<<< HEAD
    return [data.latitude, data.longitude].map((c) => parseFloat(c));
=======
  return [data.latitude, data.longitude].map((c) => parseFloat(c));
>>>>>>> 6c6d8c76a1d0caca1687708b2c218ba8f75d13c9
};

const createOrUpdateMarker = (data) => {
    let popUpContent = `
    imei: ${data.imei} <br/>
    serial: ${data.serial} <br/>
    latitude: ${data.latitude} <br/>
    latitude: ${data.longitude} <br/>
    altitude: ${data.altitude} <br/>`;

    let marker = markers.find((m) => m._id === data.socket_id);

<<<<<<< HEAD
    if (marker) {
        marker.setLatLng(getCoordsFromData(data)).update();
        marker.setPopupContent(popUpContent);
    } else {
        let marker = L.marker(getCoordsFromData(data))
            .addTo(map)
            .bindPopup(popUpContent);
        marker._id = data.socket_id;
=======
  if (marker) {
    marker.setLatLng(getCoordsFromData(data)).update();
    marker.setPopupContent(popUpContent);
  } else {
    let marker = L.marker(getCoordsFromData(data))
      .addTo(map)
      .bindPopup(popUpContent);
    marker._id = data.socket_id;
>>>>>>> 6c6d8c76a1d0caca1687708b2c218ba8f75d13c9

        markers.push(marker);
    }
};

const clearMarker = (id) => {
<<<<<<< HEAD
    let index = markers.findIndex((marker) => marker._id === id);

    if (index > -1) {
        map.removeLayer(markers[index]);
        markers.splice(index, 1);
    }
};

class Marker {
    centerCoords = [40.3963904, 49.9187712];

    zoom = 10;

    markers = [];

    setBuilder = (builder) => {
        this.builder = builder;

        return this;
    };

    setZoom = (zoom) => {
        this.zoom = zoom;

        return this;
    };

    setCenter = (coords) => {
        this.centerCoords = coords;

        return this;
    };

    init = (el) => {
        this.map = this.builder.map(el).setView(this.centerCoords, this.zoom);
        this.builder
            .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; Samir Rustamov",
            })
            .addTo(this.map);

        return this;
    };

    getCoordsFromData = (data) => {
        return [data.latitude, data.longitude].map((c) => parseFloat(c));
    };

    createPopUp = (data) => {
        return `
        imei: ${data.imei} <br/>
        serial: ${data.serial} <br/>
        latitude: ${data.latitude} <br/>
        longitude: ${data.longitude} <br/>
        altitude: ${data.altitude} <br/>`;
    };

    create = () => {
        let marker = this.builder
            .marker(this.getCoordsFromData(data))
            .addTo(this.map)
            .bindPopup(this.createPopUp(data));
        marker._id = data.socket_id;

        this.markers.push(marker);
    };

    update = (marker, data) => {
        marker.setLatLng(this.getCoordsFromData(data)).update();
        marker.setPopupContent(this.createPopUp(data));
    };

    createOrUpdate = (data) => {
        let popUpContent = this.createPopUp(data);

        let marker = this.markers.find((m) => m._id === data.socket_id);

        if (marker) {
            marker.setLatLng(this.getCoordsFromData(data)).update();
            marker.setPopupContent(popUpContent);
        } else {
            let marker = L.marker(this.getCoordsFromData(data))
                .addTo(this.map)
                .bindPopup(popUpContent);
            marker._id = data.socket_id;

            this.markers.push(marker);
        }
    };

    clear = (id) => {
        let index = this.markers.findIndex((marker) => marker._id === id);

        if (index > -1) {
            this.map.removeLayer(this.markers[index]);
            this.markers.splice(index, 1);
        }
    };
}
=======
  let index = markers.findIndex((marker) => marker._id === id);

  if (index > -1) {
    map.removeLayer(markers[index]);
    markers.splice(index, 1);
  }
};

const initPolygons = () => {
  let polygon = L.polygon([polygonCoords], {
    color: "#ff7800",
    weight: 3,
  }).addTo(map);

  L.polylineDecorator(polygon, {
    patterns: [
      {
        offset: 0,
        repeat: 10,
        symbol: L.Symbol.dash({
          pixelSize: 0,
        }),
      },
    ],
  }).addTo(map);
};

const notifyMe = (message) => {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(message);
      }
    });
  }
};

class ValidateCoords {
  static isInsidePitch = (latitude, longitude, latArray, longArray) => {
    let angle = 0;
    let p1Lat;
    let p1Long;
    let p2Lat;
    let p2Long;
    let n = latArray.length;

    for (let i = 0; i < n; i++) {
      p1Lat = latArray[i] - latitude;
      p1Long = longArray[i] - longitude;
      p2Lat = latArray[(i + 1) % n] - latitude;
      p2Long = longArray[(i + 1) % n] - longitude;
      angle += ValidateCoords.angle2D(p1Lat, p1Long, p2Lat, p2Long);
    }

    return !(Math.abs(angle) < PI);
  };

  static angle2D = (y1, x1, y2, x2) => {
    let dtheta, theta1, theta2;

    theta1 = Math.atan2(y1, x1);
    theta2 = Math.atan2(y2, x2);
    dtheta = theta2 - theta1;
    while (dtheta > PI) dtheta -= TWO_PI;
    while (dtheta < -PI) dtheta += TWO_PI;

    return dtheta;
  };

  static isValidCoordinate = (latitude, longitude) => {
    return (
      latitude !== "" &&
      longitude !== "" &&
      !isNaN(latitude) &&
      !isNaN(longitude) &&
      latitude > -90 &&
      latitude < 90 &&
      longitude > -180 &&
      longitude < 180
    );
  };
}

class Marker {
  centerCoords = [40.3963904, 49.9187712];

  zoom = 10;

  markers = [];

  setBuilder = (builder) => {
    this.builder = builder;

    return this;
  };

  setZoom = (zoom) => {
    this.zoom = zoom;

    return this;
  };

  setCenter = (coords) => {
    this.centerCoords = coords;

    return this;
  };

  init = (el) => {
    this.map = this.builder.map(el).setView(this.centerCoords, this.zoom);
    this.builder
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; Samir Rustamov",
      })
      .addTo(this.map);

    return this;
  };

  getCoordsFromData = (data) => {
    return [data.latitude, data.longitude].map((c) => parseFloat(c));
  };

  createPopUp = (data) => {
    return `
        imei: ${data.imei} <br/>
        serial: ${data.serial} <br/>
        latitude: ${data.latitude} <br/>
        longitude: ${data.longitude} <br/>
        altitude: ${data.altitude} <br/>`;
  };

  create = () => {
    let marker = this.builder
      .marker(this.getCoordsFromData(data))
      .addTo(this.map)
      .bindPopup(this.createPopUp(data));
    marker._id = data.socket_id;

    this.markers.push(marker);
  };

  update = (marker, data) => {
    marker.setLatLng(this.getCoordsFromData(data)).update();
    marker.setPopupContent(this.createPopUp(data));
  };

  createOrUpdate = (data) => {
    let popUpContent = this.createPopUp(data);

    let marker = this.markers.find((m) => m._id === data.socket_id);

    if (marker) {
      marker.setLatLng(this.getCoordsFromData(data)).update();
      marker.setPopupContent(popUpContent);
    } else {
      let marker = L.marker(this.getCoordsFromData(data))
        .addTo(this.map)
        .bindPopup(popUpContent);
      marker._id = data.socket_id;

      this.markers.push(marker);
    }
  };

  clear = (id) => {
    let index = this.markers.findIndex((marker) => marker._id === id);

    if (index > -1) {
      this.map.removeLayer(this.markers[index]);
      this.markers.splice(index, 1);
    }
  };
}
>>>>>>> 6c6d8c76a1d0caca1687708b2c218ba8f75d13c9
