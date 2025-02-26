<template>
  <div>
    <div id="map"></div>
    <v-row justify="center">
      <v-dialog ref="remove_layer" max-width="500" v-model="remove_layer_dialog" persistent>
        <v-card tile>
          <v-card-title>remove layer?</v-card-title>
          <v-card-actions class="d-flex justify-space-between">
            <v-btn @click="remove_layer_dialog=false">cancel</v-btn>
            <v-btn color="red" @click="removeLayer(remove_layer_id)">remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
  import {
    ValidateCoords,
    getCoordsFromAngleAndDistance
  } from "@/utils/map";
  import {notifyMe} from '@/utils/client'
  import corridor from '../plugins/map';

  export default {
    props:['center','zoom'],
    data: () => ({
      map: null,
      markers: [],
      layers: [],
      remove_layer_dialog: false,
      remove_layer_id: null,
      safe_areas: [
        {
          id: Date.now(),
          name: "Airport",
          type: "polygon",
          polygon: [
            [40.465243, 50.050168],
            [40.466957, 50.052108],
            [40.466812, 50.053873],
            [40.464944, 50.054311],
            [40.465243, 50.050168]
          ]
        }
      ]
    }),
    mounted() {
      L.Corridor = L.Polyline.extend(corridor);
      L.corridor = function (latlngs, options) {
        return new L.Corridor(latlngs, options || {
          corridor: 100
        });
      }
      this.map = L.map("map").setView(this.center, this.zoom);
      this.map.on("click", e => {
        this.$emit("select", e);
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; Samir Rustamov"
      }).addTo(this.map);

      $socket.on("location", data => {
        if (data.socket_id) {
          let isSafeArea = false;

          for (let index = 0; index < this.safe_areas.length; index++) {
            const p = this.safe_areas[index];
            if (p.type === "polygon") {
              isSafeArea = ValidateCoords.isInsidePitch(
                data.latitude,
                data.longitude,
                p.polygon
              );
            } else if (p.type === "center") {
              isSafeArea = ValidateCoords.isInsideCircle(
                data.latitude,
                data.longitude,
                p.center,
                p.radius
              );
            }

            if (isSafeArea) {
              isSafeArea = p.name || "danger zone";
              break;
            }
          }

          if (isSafeArea) {
            $socket.emit("safe-area", {
              id: data.socket_id,
              name: isSafeArea
            });
            notifyMe("Safe Area");
          }
          this.createOrUpdateMarker(data);
        }
      });

      $socket.on("leave", this.clearMarker);
    },
    methods: {
      createRectangle(a, b) {
        L.rectangle([a, b], {color: "Red", weight: 1}).addTo(this.map);
        notifyMe("Created area");
      },
      createPolygon(coords) {
        let id = Date.now();
        let polygon = L.polygon(coords, {
          color: "#ff7800",
          weight: 3,
          id
        })
          .on("contextmenu", e => {
            this.remove_layer_id = e.target.options.id;
            if (this.remove_layer_id) {
              this.remove_layer_dialog = true;
            }
          })
          .addTo(this.map);
        polygon.id = id;

        this.layers.push(polygon);

        this.safe_areas.push({
          id,
          name: 'safe area',
          polygon: coords,
          type: 'polygon'
        });

        notifyMe("Created area");

      },
      createCircle(center, radius) {
        let id = Date.now();
        let layer = L.circle(center, parseFloat(radius), {
          color: "red",
          fillColor: "#ab5c5c80",
          fillOpacity: 5,
          id
        })
          .on("contextmenu", e => {
            this.remove_layer_id = e.target.options.id;
            if (this.remove_layer_id) {
              this.remove_layer_dialog = true;
            }
          })
          .addTo(this.map);

        layer.id = id;

        this.layers.push(layer);

        this.safe_areas.push({
          id,
          name: 'safe area',
          center: center,
          radius,
          type: 'circle'
        });

        notifyMe("Created area");


      },
      createLine(data) {

        let id = Date.now();

        if (data.type === 2) {
          data.coords.end = getCoordsFromAngleAndDistance(
            ...Object.values(data.coords.start),
            data.distance,
            data.bearing
          );
        }

        let corridor = L.corridor(
          [
            L.latLng(...Object.values(data.coords.start)),
            L.latLng(...Object.values(data.coords.end))
          ],
          {
            id,
            corridor: data.width,
            className: "route-corridor"
          }
        )
          .on("contextmenu", e => {
            this.remove_layer_id = e.target.options.id;
            if (this.remove_layer_id) {
              this.remove_layer_dialog = true;
            }
          });

        corridor.id = id;

        this.map.fitBounds(corridor.getBounds());

        this.map.addLayer(corridor);

        this.layers.push(corridor);

        this.safe_areas.push({
          id,
          name: data.name || "Route line",
          type: "line",
          data
        });
      },
      removeLayer(id) {
        let index = this.layers.findIndex(l => l.id === id);
        if (index > -1) {
          this.map.removeLayer(this.layers[index]);
          this.layers.splice(index, 1);
        }
        this.remove_layer_dialog = false;
        this.remove_layer_id = null;

        index = this.safe_areas.findIndex(l => l.id === id);
        if (index > -1) {
          this.safe_areas.splice(index, 1);
        }
      },
      getCoordsFromData({latitude, longitude}) {
        return [latitude, longitude].map(c => parseFloat(c));
      },
      createOrUpdateMarker(data) {
        let popUpContent = `
          imei:     ${data.imei} <br/>
          serial:   ${data.serial} <br/>
          latitude: ${data.latitude} <br/>
          longitude: ${data.longitude} <br/>
          altitude: ${data.altitude} <br/>
        `;
        let marker = this.markers.find(m => m._id === data.socket_id);
        if (marker) {
          marker.setLatLng(this.getCoordsFromData(data)).update();
          marker.setPopupContent(popUpContent);
        } else {
          let marker = L.marker(this.getCoordsFromData(data)/*, { icon: greenIcon }*/)
            .addTo(this.map)
            .bindPopup(popUpContent);
          marker._id = data.socket_id;
          this.markers.push(marker);
        }
      },
      clearMarker(id) {
        let index = this.markers.findIndex(marker => marker._id === id);

        if (index > -1) {
          this.map.removeLayer(this.markers[index]);
          this.markers.splice(index, 1);
        }
      },
      addDecorator(layer) {
        L.polylineDecorator(layer, {
          patterns: [
            {
              offset: 0,
              repeat: 10,
              symbol: L.Symbol.dash({
                pixelSize: 1
              })
            }
          ]
        }).addTo(this.map);
      }
    }
  };
</script>

<style scoped>
  #map {
    height: calc(100vh - 70px);
    width: 100%;
    overflow: hidden;
  }

  .v-dialog__content--active {
    z-index: 9999 !important
  }

  .route-corridor {
    stroke: #6397bf;
  }
</style>
