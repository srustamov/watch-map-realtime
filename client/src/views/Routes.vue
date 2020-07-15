<template>
    <div v-if="!loading">
        <map-component
                v-if="!loading"
                :zoom="map.zoom"
                :center="map.center"
                :routes="routes"
                ref="map"
                @select="clickMapArea"
        />
        <div class="bottom_sheet_class">
            <v-sheet class="" height="100px">
                <div class="pt-3 flex-wrap d-flex align-center justify-lg-space-between">
                    <v-menu
                            v-model="date_menu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px">
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
                    <v-slider
                            v-model="hour"
                            min="1"
                            thumb-label="always"
                            max="24"
                            label="Hour"
                    >
                        <template v-slot:prepend>
                            <v-icon color="info" @click="hour--">
                                mdi-minus
                            </v-icon>
                        </template>

                        <template v-slot:append>
                            <v-icon color="info" @click="hour++">
                                mdi-plus
                            </v-icon>
                        </template>
                    </v-slider>
                    <v-slider
                            v-model="minute"
                            min="0"
                            thumb-label="always"
                            max="60"
                            label="Minute"
                    >
                        <template v-slot:prepend>
                            <v-icon color="info" @click="minute--">
                                mdi-minus
                            </v-icon>
                        </template>

                        <template v-slot:append>
                            <v-icon color="info" @click="minute++">
                                mdi-plus
                            </v-icon>
                        </template>
                    </v-slider>
                </div>
            </v-sheet>
        </div>
    </div>
    <div v-else style="height: 100%" class="pa-9 d-flex flex-column justify-center align-center">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
        <p>loading...</p>
    </div>
</template>

<script>
    import MapComponent from "@/components/routes-map.vue";
    import geometryutil from 'leaflet-geometryutil';
    import moment from 'moment';

    export default {
        components: {MapComponent},
        data: (vm) => ({
            loading: true,
            _map: null,
            selectedMapArea: null,
            date_menu: false,
            date: vm.formatDate(new Date().toLocaleDateString()),
            hour: 1,
            minute: 0,
            routes: [],
            map: {
                center: [40.462964, 50.052201],
                zoom: 10
            }
        }),
        mounted() {
            this._map = this.$refs.map;

            this.getRoutes(this.date);
        },
        methods: {
            getRoutes(date) {
                this.loading = true;
                this.$axios
                    .post("/map/routes", {date})
                    .then(data => (this.routes = data))
                    .finally(() => (this.loading = false));
            },
            clickMapArea(e) {
                this.selectedMapArea = e.latlng;
            },
            formatDate(date) {
                if (!date) return null

                const [month, day, year] = date.split('/')
                return this.parseDate(`${month}/${day}/${year}`)
            },
            parseDate(date) {
                if (!date) return null
                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            updateMarkersFromMinute(value) {
                this.routes.map((route) => {
                    let time = moment(
                        `${this.hour.toString().padStart(2, '0')}:${this.minute.toString().padStart(2, '0')}:00`, "hh:mm:ss"
                    );
                    let minute = value - moment(route.begin_time,'hh:mm:ss').minutes() ;

                    if (minute > 0 && time.isBetween(moment(route.begin_time,"hh:mm:ss"), moment(route.finish_time,"hh:mm:ss"))) {
                        let coords = this.getCoordsFromAngleAndDistance(
                            new L.LatLng(...route.start.split(',')),
                            minute * route.speed,
                            geometryutil.bearing(
                                new L.LatLng(...route.start.split(',')),
                                new L.LatLng(...route.end.split(',')),
                            )
                        );
                        this.$refs.map.createOrUpdateMarker(Object.values(coords), route.id)
                    }


                });
            },
            getCoordsFromAngleAndDistance(coords, distance, angle) {
                let R = 6371000; //earth’s radius in metres
                let bearing = Math.radians(angle); //Bearing is 90 degrees converted to radians.
                let d = distance; //Distance in m

                let lat1 = Math.radians(coords.lat);
                let lng1 = Math.radians(coords.lng);

                let lat2 = Math.asin(Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearing));

                let lng2 = lng1 + Math.atan2(
                    Math.sin(bearing) * Math.sin(d / R) * Math.cos(lat1),
                    Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2)
                );

                return L.latLng(Math.degrees(lat2), Math.degrees(lng2));
            }
        },
        watch: {
            date(val) {
                this.getRoutes(val)
            },
            hour(value) {
                this.updateMarkersFromMinute(value * 60)
            },
            minute(value) {
                this.updateMarkersFromMinute(value)
            }
        },
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
