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

const getCoordsFromData = (data) => {
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
        marker.setLatLng(getCoordsFromData(data)).update();
        marker.setPopupContent(popUpContent);
    } else {
        let marker = L.marker(getCoordsFromData(data))
            .addTo(map)
            .bindPopup(popUpContent);
        marker._id = data.socket_id;

        markers.push(marker);
    }
};

const clearMarker = (id) => {
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