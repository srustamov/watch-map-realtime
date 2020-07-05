"use strict";

var markers = [];

const map = L.map("map").setView([40.3963904, 49.9187712], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; Samir Rustamov",
}).addTo(map);

window.onload = () => {
  const socket = io();

  socket.on("location", (data) => {
    if (data.socket_id) {
      createOrUpdateMarker(data);
    }
  });

  socket.on("leave", (id) => {
    clearMarker(id);
  });
};

const getCoordFromData = (data) => {
  return [data.latitude, data.longitude].map((c) => parseFloat(c));
};

const createOrUpdateMarker = (data) => {
  let popUpContent = `
    imei: ${data.imei} <br/>
    serial: ${data.serial} <br/>
    latitude: ${data.latitude} <br/>
    latitude: ${data.longitude} <br/>
    altitude: ${data.altitude} <br/>`;

  let marker = markers.find((m) => m._id === data.socket_id);

  if (marker) {
    marker.setLatLng(getCoordFromData(data)).update();
    marker.setPopupContent(popUpContent);
  } else {
    let marker = L.marker(getCoordFromData(data))
      .addTo(map)
      .bindPopup(popUpContent);
    marker._id = data.socket_id;

    markers.push(marker);
  }
};

const clearMarker = (id) => {
  let updated = [];

  markers.forEach((marker) => {
    if (marker._id === id) {
      map.removeLayer(marker);
    } else {
      updated.push(marker);
    }
  });

  markers = updated;
};
