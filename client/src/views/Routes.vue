<template>
  <div>
    <map-component
      v-if="!loading"
      :zoom="map.zoom"
      :layer="layer"
      :center="map.center"
      :routes="filteredRoutes"
      ref="map"
      @select="clickMapArea"
    />
    <div v-else style="height: 100%" class="pa-9 d-flex flex-column justify-center align-center">
      <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
      <p>There is no action to be shown</p>
    </div>
    <div class="bottom_sheet_class">
      <v-sheet class height="100px">
        <div class="pt-3 flex-wrap d-flex align-center justify-lg-space-between">
          <v-menu
            v-model="date_menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                picker-date="yyyy-dd-mm"
                style="max-width: 200px;"
                v-model="date"
                label="Date"
                prepend-icon="mdi-event"
                v-bind="attrs"
                outlined
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title @input="date_menu = false"></v-date-picker>
          </v-menu>
          <v-divider vertical class="mx-2"></v-divider>
          <v-range-slider min="1" thumb-label="always" max="24" label="Hour" v-model="hour_range">
            <template class="pink" v-slot:thumb-label="{ value }">
                {{value.toString().padStart(2, '0')}}:00
            </template>
          </v-range-slider>
          <v-divider vertical class="mx-2"></v-divider>
          <v-btn  fab class="mr-1"  @click="prev">
            <v-icon color="success">mdi-arrow-left-drop-circle</v-icon>
          </v-btn>
          <v-btn :disabled="!Boolean(interval)" fab class="mr-1"  @click="stop">
            <v-icon color="red">mdi-stop</v-icon>
          </v-btn>
          <v-btn  fab @click="play">
            <v-icon color="success">mdi-play</v-icon>
          </v-btn>
          <v-divider vertical class="mx-2"></v-divider>

          <v-slider v-model="minute" min="0" thumb-label="always" :max="minute_max" label="Minute">
            <template class="pink" v-slot:thumb-label="{ value }">
                {{hour_range[0].toString().padStart(2, '0')}}:{{value.toString().padStart(2, '0')}}
            </template>
            <template v-slot:prepend>
              <v-btn fab small @click="minute--">
                <v-icon color="info">mdi-minus</v-icon>
              </v-btn>
            </template>
            <template v-slot:append>
              <v-btn fab small @click="minute++">
                <v-icon color="success">mdi-plus</v-icon>
              </v-btn>
            </template>
          </v-slider>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import MapComponent from "@/components/routes-map.vue";
import geometryutil from "leaflet-geometryutil";
import moment from "moment";
import {mapGetters} from "vuex";

export default {
  components: { MapComponent },
  data: vm => ({
    loading: true,
    date_menu: false,
    date: '2020-07-16',
    hour_range: [3, 5],
    minute_max: 120,
    minute: 0,
    interval:null,
    routes: [],
    map: {
      center: [40.462964, 50.052201],
      zoom: 10
    },
  }),
  mounted() {
    this.getRoutes(this.date);
  },
  computed: {
    ...mapGetters(['layer']),
    filteredRoutes() {
      return this.routes.filter(route => {
        return (
          moment(route.begin_time, "hh:mm:ss").hours() >= this.hour_range[0] &&
          moment(route.finish_time, "hh:mm:ss").hours() <= this.hour_range[1]
        );
      });
    }
  },
  methods: {
    getRoutes(date) {
      this.loading = true;
      this.$axios
        .post("/map/routes", { date })
        .then(data => (this.routes = data))
        .finally(() => (this.loading = false));
    },
    clickMapArea(e) {
      console.log(Object.values(e.latlng).join(","));
    },
    formatDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return this.parseDate(`${month}/${day}/${year}`);
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    prev() {
      if(this.interval) {
        clearInterval(this.interval)
      }
      
      this.interval = setInterval(() => {
        this.minute = this.minute-1;
        if(this.minute <= 0) {
          clearInterval(this.interval);
          this.interval = null;
        }

      },200)
    },
    play() {
      if(this.interval) {
        clearInterval(this.interval)
      }
      this.interval = setInterval(() => {
        this.minute+= 0.5;
        if(this.minute >= this.minute_max) {
          clearInterval(this.interval);
          this.interval = null;
        }

      },200)
    },
    stop() {
      clearInterval(this.interval);
      this.interval = null;
    },
    updateMarkersFromMinute(minutes) {
      this.filteredRoutes.forEach(route => {
        let time = moment(`${this.hour_range[0]}:00:00`, "hh:mm:ss").add(minutes, "minutes");
        let minute = time.diff(moment(route.begin_time, "hh:mm:ss"),"minutes");
        if (
          (time.isBetween(
            moment(route.begin_time, "hh:mm:ss"),
            moment(route.finish_time, "hh:mm:ss")
          ) &&
          minute > 0) || minute == 0
        ) {
          let coords = this.getCoordsFromAngleAndDistance(
            new L.LatLng(...route.start.split(",")),
            minute * route.speed,
            geometryutil.bearing(
              new L.LatLng(...route.start.split(",")),
              new L.LatLng(...route.end.split(","))
            )
          );
          this.$refs.map.createOrUpdateMarker(Object.values(coords), route);
        }
      });
    },
    getCoordsFromAngleAndDistance(coords, distance, angle) {
      let R = 6371000; //earth’s radius in metres
      let bearing = Math.radians(angle); //Bearing is 90 degrees converted to radians.
      let d = distance; //Distance in m

      let lat1 = Math.radians(coords.lat);
      let lng1 = Math.radians(coords.lng);

      let lat2 = Math.asin(
        Math.sin(lat1) * Math.cos(d / R) +
          Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearing)
      );

      let lng2 =
        lng1 +
        Math.atan2(
          Math.sin(bearing) * Math.sin(d / R) * Math.cos(lat1),
          Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2)
        );

      return L.latLng(Math.degrees(lat2), Math.degrees(lng2));
    }
  },
  watch: {
    date(val) {
      this.getRoutes(val);
    },
    hour_range: {
      handler(value) {
        this.minute_max = (value[1] - value[0]) * 60;
        this.minute = 0;
      },
      deep: true
    },
    minute(value) {
      this.updateMarkersFromMinute(value);
    }
  }
};
</script>
<style scoped>
.input_area_dialog_card {
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 9997;
  bottom: 0;
  max-width: 450px;
  overflow-y: auto;
}

.bottom_sheet_class {
  height: 100px;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}

</style>
