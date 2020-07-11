<template>
  <div>
    <v-select
      v-model="form.type"
      item-text="name"
      item-value="number"
      :items="form.types"
      :rules="[(v) => !!v || 'type is required']"
      label="coordinate system type"
      required
    ></v-select>
    <v-row>
      <v-col cols="12" class="text-center d-flex align-center justify-space-between">
        Start Position
        <v-btn
          :loading="currentLocationLoading"
          title="get current location"
          fab
          @click="getCurrentPosition"
        >
          <v-icon color="success">mdi-crosshairs-gps</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          v-model="form.coords.start.lat"
          label="Latitude"
          type="number"
          :rules="coordinatesRules.lat"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          type="number"
          v-model="form.coords.start.lng"
          label="Longitude"
          :rules="coordinatesRules.lng"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          type="number"
          v-model="form.width"
          label="Line corridor width"
          :rules="[
            (v) => String(v).trim() !== '' || 'Width is required',
            (v) => v >= 2 || 'Width invalid',
          ]"
          suffix="meter"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="form.type === LINE_AREA_SYSTEM_CARTESIAN">
      <v-col cols="12" class="text-center d-flex align-center justify-space-between">End Position</v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          v-model="form.coords.end.lat"
          label="Latitude"
          type="number"
          :rules="form.rules.lat"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          type="number"
          v-model="form.coords.end.lng"
          label="Longitude"
          :rules="form.rules.lng"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-btn color="success" @click="draw">draw</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="form.type === LINE_AREA_SYSTEM_POLAR">
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          type="number"
          v-model="form.bearing"
          label="Angle from the north"
          :rules="[
            (v) => String(v).trim() !== '' || 'angle is required',
            (v) => (v >= -360 && v <= 360) || 'angle invalid',
          ]"
          append-icon="mdi-angle-acute"
          example="30"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          outlined
          type="number"
          v-model="form.distance"
          label="Distance"
          :rules="[
            (v) => String(v).trim() !== '' || 'distance is required',
            (v) => parseFloat(v) > 0 || 'distance invalid',
          ]"
          suffix="meter"
          hint="example 500"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-btn color="success" @click="draw">draw</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  line,
  coordinatesRules,
  LINE_AREA_SYSTEM_CARTESIAN,
  LINE_AREA_SYSTEM_POLAR
} from "~/utils/area";
const clone = object => JSON.parse(JSON.stringify(object));
export default {
  props: ["selectedMapArea"],
  data: () => ({
    currentLocationLoading: false,
    form: clone(line),
    coordinatesRules,
    LINE_AREA_SYSTEM_CARTESIAN,
    LINE_AREA_SYSTEM_POLAR
  }),
  methods: {
    draw() {
      this.$emit("draw", this.form);
    },
    getCurrentPosition() {
      if (navigator.geolocation) {
        this.currentLocationLoading = true;

        navigator.geolocation.getCurrentPosition(p => {
          this.setCoords({
            lat: p.coords.latitude,
            lng: p.coords.longitude
          });
          this.currentLocationLoading = false;
        });
      }
    },
    setCoords(value) {
      if (this.form.type === LINE_AREA_SYSTEM_CARTESIAN) {
        if (String(this.form.coords.start.lat).trim() === "") {
          this.form.coords.start.lat = value.lat;
          this.form.coords.start.lng = value.lng;
        } else if (String(this.form.coords.end.lat).trim() === "") {
          this.form.coords.end.lat = value.lat;
          this.form.coords.end.lng = value.lng;
        } else {
          this.form.coords = clone(line).coords;
        }
      } else if (this.form.type === LINE_AREA_SYSTEM_POLAR) {
        this.form.coords.start.lat = value.lat;
        this.form.coords.start.lng = value.lng;
      }
    }
  },
  watch: {
    selectedMapArea(value) {
      this.setCoords(value);
    }
  }
};
</script>
