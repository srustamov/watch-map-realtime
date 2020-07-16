<template>
  <div id="map"></div>
</template>

<script>
import Corridor from "../plugins/map";

export default {
  props: ["center", "zoom", "routes", "layer"],
  data: () => ({
    map: null,
    markers: [],
    icon: null
  }),
  mounted() {
    L.Corridor = L.Polyline.extend(Corridor);
    L.corridor = function(latlngs, options) {
      return new L.Corridor(
        latlngs,
        options || {
          corridor: 100
        }
      );
    };
    this.icon = L.icon({
      iconUrl: "/dron.png",
      iconSize: [40, 40]
    });

    this.initMap();
  },
  methods: {
    initMap() {
      this.map = L.map("map").setView(this.center, this.zoom);
      this.map.on("click", e => this.$emit("select", e));

      if (this.layer.base) {
        L.tileLayer(this.layer.url, {
          attribution: "&copy; ASC"
        }).addTo(this.map);
      } else {
        L.tileLayer(this.layer.url, {
          attribution: "&copy; ASC",
          maxZoom: 20,
          subdomains: ["mt0", "mt1", "mt2", "mt3"]
        }).addTo(this.map);
      }

      this.routes.forEach(route => {
        this.createPoint(route.end.split(","));
        this.createLine(route);
        this.createOrUpdateMarker(route.start.split(","), route);
      });
    },

    createLine(data) {
      let corridor = L.corridor(
        [L.latLng(data.start.split(",")), L.latLng(data.end.split(","))],
        {
          id: data.id,
          corridor: 10,
          className: "route-corridor"
        }
      );
      this.map.fitBounds(corridor.getBounds());
      this.map.addLayer(corridor);
      //this.addDecorator(corridor);
    },

    createPoint(coordinate) {
      let icon = L.icon({
        iconUrl: "/point.gif",
        iconSize: [20, 20]
      });
      L.marker(coordinate, { icon }).addTo(this.map);
    },

    createOrUpdateMarker(coordinate, route) {
      let marker = this.markers.find(m => m._id === route.id);
      if (marker) {
        marker.setLatLng(coordinate).update();
        // marker.setPopupContent('PUA');
      } else {
        let marker = L.marker(coordinate, { icon: this.icon }).addTo(this.map)
          .bindPopup(`
          <div class="pa-3 v-sheet theme--dark d-flex flex-column">
            <button class="v-btn--contained mb-1 pa-1 d-block v-btn primary">
              id    : ${route.id} <br/>
            </button>
            <button class="v-btn--contained mb-1 pa-1 d-block v-btn primary">
              speed : ${route.speed}m/minute
            </button>
            <button class="v-btn--contained mb-1 pa-1 d-block v-btn primary">
              distance : ${route.distance / 1000} km
            </button>
          </div>
          `);
        marker._id = route.id;
        this.markers.push(marker);
      }
    },

    addDecorator(layer) {
      L.polylineDecorator(layer, {
        patterns: [
          {
            offset: 50,
            repeat: 100,
            symbol: L.Symbol.arrowHead({
              pixelSize: 20,
              polygon: false,
              pathOptions: { stroke: true }
            })
          }
        ]
      }).addTo(this.map);
    },
    reload() {
      this.map.off();
      this.map.remove();
      this.markers = [];
      this.initMap();
    }
  },
  watch: {
    routes() {
      this.reload()
    },
    layer() {
      this.reload()
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
  z-index: 9999 !important;
}

.route-corridor {
  stroke: #f20b0b;
}
</style>
