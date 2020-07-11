<template>
  <v-row>
    <v-col cols="12" class="text-center d-flex align-center justify-space-between">
      Center Position
      <v-btn fab>
        <v-icon>mdi-map-marker-plus</v-icon>
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
      <v-btn color="success" @click="draw">draw</v-btn>
    </v-col>
  </v-row>
</template>
<script>
  import {circle,coordinatesRules} from '~/utils/area'

  const clone = object => JSON.parse(JSON.stringify(object));
  export default {
    props:['selectedMapArea'],
    data: () => ({
      form: clone(circle),
      coordinatesRules,
    }),
    methods: {
      draw() {
        this.$emit('draw', this.form)
      }
    },
    watch:{
      selectedMapArea(value) {
        if (value) {
          this.form.coords = value;
        }
      }
    }

  }
</script>
