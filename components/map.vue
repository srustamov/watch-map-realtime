<template>
  <div id="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { ValidateCoords, notifyMe } from "~/utils/map";
import $socket from "~/plugins/socket";
export default {
  components: {},
  data: () => ({
    center: [40.462964, 50.052201],
    zoom: 15,
    map: null,
    markers: [],
    polygons: [
      {
        name: "AirPort",
        latitudes: [
          40.465243,
          40.466957,
          40.466812,
          40.464944,
          40.461626,
          40.459649,
          40.46345409436718
        ],
        longitudes: [
          50.050168,
          50.052108,
          50.053873,
          50.054311,
          50.054544,
          50.052609,
          50.04817485809327
        ]
      }
    ]
  }),
  mounted() {
    this.map = L.map("map").setView(this.center, this.zoom);
    this.map.on("click", e => {
      this.$emit("select", e);
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; ASC"
    }).addTo(this.map);

    //this.initPolygons();

    $socket.on("location", data => {
      if (data.socket_id) {
        let isSafeArea = ValidateCoords.isInsidePitch(
          data.latitude,
          data.longitude,
          polygons[0].latitudes,
          polygons[0].longitudes
        );
        if (isSafeArea) {
          socket.emit("safe-area", {
            id: data.socket_id,
            name: polygons[0].name
          });
          notifyMe("Safe Area");
        }
        createOrUpdateMarker(data);
      }
    });

    $socket.on("leave", id => {
      clearMarker(id);
    });
  },
  methods: {
    coordsCovertDistance(lat1, lon1, lat2, lon2) {
      //1° of latitude = always 111.32 km
      //1° of longitude = 40075 km * cos( latitude ) / 360
      //eart radius
      let R = 6378.137;
      let dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
      let dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;
      return d * 1000;
    },


    createRectangle(a, b) {
      L.rectangle([a, b], { color: "Red", weight: 1 }).addTo(this.map);
      notifyMe("Created area");
    },
    createCircle(center, radius) {
      L.circle(center, radius, {
        color: "green",
        fillColor: "#f03",
        fillOpacity: 0
      }).addTo(this.map);
      notifyMe("Created area");
    },

    getCoordsFromData(data) {
      return [data.latitude, data.longitude].map(c => parseFloat(c));
    },

    createOrUpdateMarker(data) {
      let popUpContent = `
    imei: ${data.imei} <br/>
    serial: ${data.serial} <br/>
    latitude: ${data.latitude} <br/>
    latitude: ${data.longitude} <br/>
    altitude: ${data.altitude} <br/>`;

      let marker = this.markers.find(m => m._id === data.socket_id);

      if (marker) {
        marker.setLatLng(getCoordsFromData(data)).update();
        marker.setPopupContent(popUpContent);
      } else {
        let marker = L.marker(getCoordsFromData(data))
          .addTo(map)
          .bindPopup(popUpContent);
        marker._id = data.socket_id;
        this.markers.push(marker);
      }
    },

    clearMarker(id) {
      let index = this.markers.findIndex(marker => marker._id === id);

      if (index > -1) {
        map.removeLayer(markers[index]);
        this.markers.splice(index, 1);
      }
    },
    createPolygon(coords) {
      let polygon = L.polygon(coords,
        {
          color: "#ff7800",
          weight: 3
        }
      ).addTo(this.map);

      L.polylineDecorator(polygon, {
        patterns: [
          {
            offset: 0,
            repeat: 10,
            symbol: L.Symbol.dash({
              pixelSize: 0
            })
          }
        ]
      }).addTo(this.map);
    },
    initPolygons() {
      let polygonCoords = [];
      this.polygons.forEach(polygon => {
        polygon.latitudes.forEach((latitude, index) => {
          polygonCoords.push([latitude, polygon.longitudes[index]]);
        });
      });
      let polygon = L.polygon(
        [
          polygonCoords,
          [
            [40.4632581889531, 50.049483776092536],
            [40.46833521978792, 50.04008531570435]
          ]
        ],
        {
          color: "#ff7800",
          weight: 3
        }
      ).addTo(this.map);

      L.polylineDecorator(polygon, {
        patterns: [
          {
            offset: 0,
            repeat: 10,
            symbol: L.Symbol.dash({
              pixelSize: 0
            })
          }
        ]
      }).addTo(this.map);
    }
  }
};
</script>

<style>
#map {
  height: calc(100vh - 70px);
  width: 100%;
  overflow: hidden;
}
</style>
