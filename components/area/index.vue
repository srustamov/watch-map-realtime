<template>
  <v-form ref="form" v-model="form.valid" lazy-validation>
    <v-select
      v-model="form.area"
      item-text="name"
      item-value="id"
      :items="areas"
      :rules="[(v) => !!v || 'Area Type is required']"
      label="Area type"
      required
    ></v-select>

    <div v-if="form.area === CIRCLE_AREA">
      <circle-form
        :selectedMapArea="selectedMapArea"
        @draw="drawCircleArea">
      </circle-form>
    </div>
    <div v-if="form.area === POLYGON_AREA">
      <polygon-form
        :selectedMapArea="selectedMapArea"
        @draw="drawPolygon">
      </polygon-form>
    </div>
    <div v-if="form.area === LIEN_AREA">
      <line-form
        :selectedMapArea="selectedMapArea"
        @draw="drawNavLine">
      </line-form>
    </div>
    <div v-if="form.area === RECTANGLE_AREA">
      <rectangle-form
        :selectedMapArea="selectedMapArea"
        @draw="drawRectangleArea">
      </rectangle-form>
    </div>
    <v-btn color="error" class="mr-4" @click="$refs.form.reset()">Reset information</v-btn>
  </v-form>
</template>

<script>
  import {
    areas,
    CIRCLE_AREA,
    LIEN_AREA,
    RECTANGLE_AREA,
    POLYGON_AREA,
  } from "~/utils/area";

  import circleForm from './circle-form'
  import lineForm from './line-form'
  import polygonForm from './polygon-form'
  import rectangleForm from './rectangle-form'


  export default {
    props: ['map','selectedMapArea'],
    components:{
      'circle-form':circleForm,
      'line-form':lineForm,
      'polygon-form':polygonForm,
      'rectangle-form':rectangleForm,
    },
    data: () => ({
      CIRCLE_AREA,
      LIEN_AREA,
      RECTANGLE_AREA,
      POLYGON_AREA,
      areas,
      form: {
        valid: true,
        area: null,
      }
    }),
    methods: {
      drawPolygon(data) {
        if (this.$refs.form.validate()) {
          this.map.createPolygon(
            data.inputs.map(i => Object.values(i))
          );
          this.form.area = "";
          this.resetAndClose()
        }
      },
      drawCircleArea(data) {
        if (this.$refs.form.validate()) {
          this.map.createCircle(
            Object.values(data.coords),
            data.radius
          );
          this.form.area = "";
          this.resetAndClose();
        }
      },
      drawRectangleArea(data) {
        if (this.$refs.form.validate()) {
          this.map.createRectangle(
            Object.values(data.coords[0]),
            Object.values(data.coords[1])
          );
          this.form.area = "";
          this.resetAndClose()
        }
      },
      drawNavLine(data) {
        if (this.$refs.form.validate()) {
          this.map.createLine(data);
          this.resetAndClose()
        }
      },
      resetAndClose() {
        this.$emit('reset-map-area');
        this.$emit('close')
      }
    },
    watch: {
      area() {
        this.$emit('reset-map-area')
      }
    }
  };
</script>
