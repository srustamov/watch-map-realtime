<template>
  <v-row>
    <v-col cols="12" class="text-center d-flex align-center justify-center">
      Positions
    </v-col>

    <v-col cols="12" sm="12" md="6">
      <v-text-field
        v-model="form.coords[0].lat"
        label="Latitude"
        type="number"
        :rules="coordinatesRules.lat"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-text-field
        type="number"
        v-model="form.coords[0].lng"
        label="Longitude"
        :rules="coordinatesRules.lng"
      ></v-text-field>
    </v-col>

    <v-col cols="12" sm="12" md="6">
      <v-text-field
        v-model="form.coords[1].lat"
        label="Latitude"
        type="number"
        :rules="coordinatesRules.lat"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" md="6">
      <v-text-field
        type="number"
        v-model="form.coords[1].lng"
        label="Longitude"
        :rules="coordinatesRules.lng"
      ></v-text-field>
    </v-col>

    <v-col cols="12">
      <v-btn color="success" @click="$emit('draw', form)">draw</v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { rectangle, coordinatesRules } from "@/utils/area";
import { empty, clone } from "@/utils/helpers";

export default {
  props: ["selectedMapArea"],
  data: () => ({
    form: clone(rectangle),
    coordinatesRules,
  }),
  watch: {
    selectedMapArea(value) {
      if (value) {
        if (empty(this.form.coords[0].lat)) {
          this.$set(this.form.coords, 0, value);
        } else if (empty(this.form.coords[1].lat)) {
          this.$set(this.form.coords, 1, value);
        } else {
          this.form = clone(rectangle);
        }
      }
    },
  },
};
</script>
