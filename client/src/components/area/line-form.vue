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
          @click="getCurrentCoords"
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
        <v-btn color="success" @click="$emit('draw', form)">draw</v-btn>
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
        <v-btn color="success" @click="$emit('draw', form)">draw</v-btn>
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
} from "@/utils/area";

import { getCurrentPosition } from "@/utils/client";
import { clone, empty } from "@/utils/helpers";

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
    getCurrentCoords() {
      this.currentLocationLoading = true;

      getCurrentPosition()
        .then(position => {
          this.setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          this.currentLocationLoading = false;
        })
        .catch(() => {
          this.currentLocationLoading = false;
        });
    },
    setCoords(value) {
      if (this.form.type === LINE_AREA_SYSTEM_CARTESIAN) {
        if (empty(this.form.coords.start.lat)) {
          this.$set(this.form.coords, "start", value);
        } else if (empty(this.form.coords.end.lat)) {
          this.$set(this.form.coords, "end", value);
        } else {
          this.form.coords = clone(line).coords;
        }
      } else if (this.form.type === LINE_AREA_SYSTEM_POLAR) {
        this.$set(this.form.coords, "start", value);
      }
    }
  },
  watch: {
    selectedMapArea(value) {
      if (value) this.setCoords(value);
    }
  }
};
</script>
