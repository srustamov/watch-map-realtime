<template>
  <v-row>
    <v-col
      cols="12"
      class="text-center d-flex align-center justify-space-between"
    >
      Center Coordinates
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
        v-model="form.coords.lat"
        label="Latitude"
        type="number"
        :rules="coordinatesRules.lat"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-text-field
        type="number"
        v-model="form.coords.lng"
        label="Longitude"
        :rules="coordinatesRules.lng"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field
        type="number"
        :rules="[
          (v) => String(v).trim() !== '' || 'Radius is required',
          (v) => v > 1 || 'Radius invalid',
        ]"
        v-model="form.radius"
        label="Radius"
        suffix="meter"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-btn color="success" @click="$emit('draw', form)">draw</v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { circle, coordinatesRules } from "@/utils/area";
import { clone } from "@/utils/helpers";
import { getCurrentPosition } from "@/utils/client";

export default {
  props: ["selectedMapArea"],
  data: () => ({
    form: clone(circle),
    coordinatesRules,
    currentLocationLoading: false,
  }),
  methods: {
    getCurrentCoords() {
      this.currentLocationLoading = true;

      getCurrentPosition()
        .then((position) => {
          this.$set(this.form, "coords", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          this.currentLocationLoading = false;
        })
        .catch(() => {
          this.currentLocationLoading = false;
        });
    },
  },
  watch: {
    selectedMapArea(value) {
      if (value) {
        this.$set(this.form, "coords", value);
      }
    },
  },
};
</script>
