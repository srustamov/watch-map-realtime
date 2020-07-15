<template>
  <div id="map"></div>
</template>

<script>
  // import {
  //   ValidateCoords,
  //   getCoordsFromAngleAndDistance
  // } from "@/utils/map";
  // import {notifyMe} from '@/utils/client'

  import Corridor from "../plugins/map";

  export default {
    props:['center','zoom','routes'],
    data: () => ({
      map: null,
      markers:[],
      icon:null
    }),
    mounted() {
      L.Corridor = L.Polyline.extend(Corridor);
      L.corridor = function (latlngs, options) {
        return new L.Corridor(latlngs, options || {
          corridor: 100
        });
      }
      this.icon = L.icon({
        iconUrl: '/dron-marker.png',
        iconSize: [60, 60]
      })

      this.initMap();

      this.routes.forEach(route => {
        this.createLine(route);
        this.createOrUpdateMarker(route.start.split(','),route.id)
      })
    },
    methods: {

      initMap() {
        this.map = L.map("map").setView(this.center, this.zoom);
        this.map.on("click", e => {
          this.$emit("select", e);
        });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; ASC"
        }).addTo(this.map);
      },

      createLine(data) {
        let corridor = L.corridor(
          [
            L.latLng(data.start.split(',')),
            L.latLng(data.end.split(','))
          ],
          {
            id:data.id,
            corridor: 10,
            className: "route-corridor"
          }
        );
        this.map.fitBounds(corridor.getBounds());
        this.map.addLayer(corridor);
        this.addDecorator(corridor)
      },

      createOrUpdateMarker(coordinate,id) {
        let marker = this.markers.find(m => m._id === id);
        if (marker) {
          marker.setLatLng(coordinate).update();
          // marker.setPopupContent('PUA');
        } else {
          let marker = L.marker(coordinate,{ icon: this.icon })
            .addTo(this.map)
            .bindPopup('PUA-'+id);
          marker._id = id;
          this.markers.push(marker);
        }
      },

      addDecorator(layer) {
        // L.polylineDecorator(layer, {
        //   patterns: [
        //     {
        //       offset: 50,
        //       repeat: 100,
        //       symbol: L.Symbol.arrowHead({pixelSize: 20, polygon: false, pathOptions: {stroke: true}})
        //     }
        //   ]
        // }).addTo(this.map);
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
