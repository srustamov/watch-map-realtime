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
        <v-btn x-small fab @click="removePolygonInput(key)">
          <v-icon color="red">mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <div class="d-flex justify-space-between align-center my-2">
      <v-btn color="info" @click="addPolygonInput">
        add
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn color="success" @click="draw">draw</v-btn>
    </div>
  </div>
</template>
<script>
  import {polygon,coordinatesRules} from '~/utils/area'

  const clone = object => JSON.parse(JSON.stringify(object));
  export default {
    props:['selectedMapArea'],
    data: () => ({
      form: clone(polygon),
      coordinatesRules,
    }),
    methods: {
      draw() {
        this.$emit('draw', this.form)
      },
      addPolygonInput() {
        this.form.inputs.push({
          lat: "",
          lng: ""
        });
      },
      removePolygonInput(key) {
        if (this.form.inputs.length > 3) {
          this.form.inputs.splice(key, 1);
        }
      },
    },
    watch:{
      selectedMapArea(value) {
        if (value) {
          let attach = false;
          for (
            let index = 0;
            index < this.form.inputs.length;
            index++
          ) {
            const i = this.form.inputs[index];
            if (String(i.lat).trim() === "") {
              this.form.inputs[index].lat = value.lat;
              this.form.inputs[index].lng = value.lng;
              attach = true;
              return;
            }
          }

          if (!attach) {
            this.form = clone(polygon);
            this.form.inputs[0].lat = value.lat;
            this.form.inputs[0].lng = value.lng;
          }
        }
      }
    }

  }
</script>
