<template>
  <div>
    <v-row :key="key" v-for="(input, key) in form.inputs">
      <v-col cols="12" sm="12" md="5" class="d-flex align-center">
        <v-text-field
          outlined
          type="number"
          v-model="form.inputs[key].lat"
          label="Latitude"
          :rules="coordinatesRules.lat"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="5" class="d-flex align-center">
        <v-text-field
          outlined
          type="number"
          v-model="form.inputs[key].lng"
          label="Longitude"
          :rules="coordinatesRules.lng"
        ></v-text-field>
      </v-col>
      <v-col v-if="key > 2" class="d-flex align-start" cols="12" sm="12" md="2">
        <v-btn x-small fab @click="removeInput(key)">
          <v-icon color="red">mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <div class="d-flex justify-space-between align-center my-2">
      <v-btn color="info" @click="addInput">
        add
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn color="success" @click="$emit('draw', form)">draw</v-btn>
    </div>
  </div>
</template>
<script>
import { polygon, coordinatesRules } from "@/utils/area";
import { clone, empty } from "@/utils/helpers";

export default {
  props: ["selectedMapArea"],
  data: () => ({
    form: clone(polygon),
    coordinatesRules
  }),
  methods: {
    addInput() {
      this.form.inputs.push({
        lat: "",
        lng: ""
      });
    },
    removeInput(key) {
      if (this.form.inputs.length > 3) {
        this.form.inputs.splice(key, 1);
      }
    }
  },
  watch: {
    selectedMapArea(value) {
      if (value) {
        let count = this.form.inputs.length;
        for (let i = 0; i < count; i++) {
          const input = this.form.inputs[i];
          if (empty(input.lat)) {
            return this.$set(this.form.inputs, i, value);
          }
        }
        this.form = clone(polygon);
        this.$set(this.form.inputs, 0, value);
      }
    }
  }
};
</script>
