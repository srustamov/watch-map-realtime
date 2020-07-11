<template>
  <v-row>
    <v-col cols="12" class="text-center d-flex align-center justify-space-between">
      Positions
      <v-btn fab>
        <v-icon>mdi-map-marker-plus</v-icon>
      </v-btn>
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
      <v-btn color="success" @click="draw">draw</v-btn>
    </v-col>
  </v-row>
</template>
<script>
  import {rectangle,coordinatesRules} from '~/utils/area'
  const clone = object => JSON.parse(JSON.stringify(object));

  export default {
    props:['selectedMapArea'],
    data: () => ({
      form: clone(rectangle),
      coordinatesRules,
    }),
    methods: {
      draw() {
        this.$emit('draw', this.form)
      },
    },
    watch:{
      selectedMapArea(value) {
        if (value) {
          if (String(this.form.coords[0].lat).trim() === "") {
            this.form.coords[0].lat = value.lat;
            this.form.coords[0].lng = value.lng;
          } else if (String(this.form.coords[1].lat).trim() === "") {
            this.form.coords[1].lat = value.lat;
            this.form.coords[1].lng = value.lng;
          } else {
            this.form = clone(rectangle);
          }
        }
      }
    }

  }
</script>
