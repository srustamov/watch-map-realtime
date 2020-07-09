<template>
  <client-only>
    <v-app>
      <v-navigation-drawer v-model="drawer" app>
        <navigator @open-create-area="inputDialog.show = true" />
      </v-navigation-drawer>
      <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-btn icon @click="">
          <v-icon>mdi-application</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title" />
        <v-spacer />
      </v-app-bar>
      <v-main app>
        <map-component ref="map" @select="clickMapArea" />
        <!-- <nuxt /> -->
        <v-card
          tile
          v-if="inputDialog.show"
          style="
            position: absolute;
            right: 0px;
            top: 0px;
            z-index: 999;
            bottom: 0;
            max-width: 450px;
            overflow-y: auto;
          "
          :style="`width:${inputDialog.width}`"
        >
          <v-toolbar dense>
            <v-btn icon @click="inputDialogSizeToggle">
              <v-icon color="orange" v-if="inputDialog.width === 'auto'"
                >mdi-window-minimize</v-icon
              >
              <v-icon color="orange" v-else>mdi-application</v-icon>
            </v-btn>
            <v-spacer />

            <v-btn icon @click="inputDialog.show = false">
              <v-icon color="red">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <div
            class="pa-4"
            :style="inputDialog.width === '50px' ? 'visibility:hidden' : ''"
          >
            <v-form ref="form" v-model="form.valid" lazy-validation>
              <v-select
                v-model="form.area"
                :items="['Circle', 'Rectangle', 'Navigation Line', 'Polygon']"
                :rules="[(v) => !!v || 'Area Type is required']"
                label="Area type"
                required
              ></v-select>

              <div v-if="form.area == 'Circle'">
                <v-row>
                  <v-col
                    cols="12"
                    class="text-center d-flex align-center justify-space-between"
                  >
                    Center Position
                    <v-btn fab>
                      <v-icon>mdi-map-marker-plus</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      v-model="form.circle.coords.lat"
                      label="Latitude"
                      type="number"
                      :rules="form.rules.lat"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      type="number"
                      v-model="form.circle.coords.lng"
                      label="Longitude"
                      :rules="form.rules.lng"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      type="number"
                      :rules="form.circle.rules.radius"
                      v-model="form.circle.radius"
                      label="Radius"
                      suffix="metr"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn color="success" @click="drawCircleArea">
                      draw
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
              <div v-if="form.area == 'Rectangle'">
                <v-row>
                  <v-col
                    cols="12"
                    class="text-center d-flex align-center justify-space-between"
                  >
                    Positions
                    <v-btn fab>
                      <v-icon>mdi-map-marker-plus</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      v-model="form.rectangle.coords[0].lat"
                      label="Latitude"
                      type="number"
                      :rules="form.rules.lat"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      type="number"
                      v-model="form.rectangle.coords[0].lng"
                      label="Longitude"
                      :rules="form.rules.lng"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      v-model="form.rectangle.coords[1].lat"
                      label="Latitude"
                      type="number"
                      :rules="form.rules.lat"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      type="number"
                      v-model="form.rectangle.coords[1].lng"
                      label="Longitude"
                      :rules="form.rules.lng"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-btn color="success" @click="drawRectangleArea">
                      draw
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
              <div v-if="form.area == 'Navigation Line'">
                <v-row>
                  <v-col
                    cols="12"
                    class="text-center d-flex align-center justify-space-between"
                  >
                    Start Position
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      v-model="form.rectangle.coords[0].lat"
                      label="Latitude"
                      type="number"
                      :rules="form.rules.lat"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      type="number"
                      v-model="form.rectangle.coords[0].lng"
                      label="Longitude"
                      :rules="form.rules.lng"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    class="text-center d-flex align-center justify-space-between"
                  >
                    End Position
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      v-model="form.rectangle.coords[1].lat"
                      label="Latitude"
                      type="number"
                      :rules="form.rules.lat"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      type="number"
                      v-model="form.rectangle.coords[1].lng"
                      label="Longitude"
                      :rules="form.rules.lng"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      type="number"
                      v-model="form.line.width"
                      label="Line Width"
                      :rules="form.line.rules.width"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-btn color="success" @click="drawNavLine">
                      draw
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
              <div v-if="form.area == 'Polygon'">
                <v-row :key="key" v-for="(input, key) in form.polygon.inputs">
                  <v-col cols="12" sm="12" md="5">
                    <v-text-field
                      type="number"
                      v-model="form.polygon.inputs[key].lat"
                      label="Line Width"
                      :rules="form.rules.lat"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="5">
                    <v-text-field
                      type="number"
                      v-model="form.polygon.inputs[key].lng"
                      label="Line Width"
                      :rules="form.rules.lng"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="2">
                    <v-btn x-small fab @click="removePolygonInput(key)">
                      <v-icon color="red">mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <div class="d-flex justify-space-between align-center my-2">
                  <v-btn color="info" @click="addPolygonInput">
                    add <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn color="success" @click="drawPolygon">
                    draw
                  </v-btn>
                </div>
              </div>

              <v-btn color="error" class="mr-4" @click="$refs.form.reset()">
                Reset information
              </v-btn>
            </v-form>
          </div>
        </v-card>
      </v-main>

      <!-- <v-footer app>
        <span>&copy; {{ new Date().getFullYear() }} ASC</span>
      </v-footer> -->
    </v-app>
  </client-only>
</template>

<script>
import navigator from "~/components/navigator";
import MapComponent from "~/components/map.vue";
export default {
  components: {
    navigator,
    MapComponent,
  },
  data() {
    return {
      drawer: false,
      title: "Geo-location",
      inputDialog: {
        show: true,
        minimize: false,
        width: "auto",
      },
      selectedMapArea: [],
      form: {
        valid: true,
        area: null,
        rules: {
          required: (v) => String(v).trim() !== "" || "Field is required",
          lat: [
            (v) => String(v).trim() !== "" || "Latitude is required",
            (v) => (v <= 180 && v >= -180) || "Latitude invalid",
          ],
          lng: [
            (v) => String(v).trim() !== "" || "Longitude is required",
            (v) => (v <= 90 && v >= -90) || "Longitude invalid",
          ],
        },
        circle: {
          coords: {
            lat: "",
            lng: "",
          },
          radius: "",
          rules: {
            radius: [
              (v) => String(v).trim() !== "" || "Radius is required",
              (v) => v > 1 || "Radius invalid",
            ],
          },
        },
        rectangle: {
          coords: [
            {
              lat: "",
              lng: "",
            },
            {
              lat: "",
              lng: "",
            },
          ],
        },
        line: {
          width: "",
          rules: [
            (v) => String(v).trim() !== "" || "Width is required",
            (v) => v > 2 || "Width invalid",
          ],
        },
        polygon: {
          inputs: [
            {
              lat: "",
              lng: "",
            },
            {
              lat: "",
              lng: "",
            },
            {
              lat: "",
              lng: "",
            },
          ],
        },
      },
    };
  },
  methods: {
    inputDialogSizeToggle() {
      this.inputDialog.width =
        this.inputDialog.width === "auto" ? "50px" : "auto";
      console.log(this.inputDialog.height);
    },
    clickMapArea(e) {
      if (this.form.area) {
        this.selectedMapArea.push(e.latlng);
      }
    },
    addPolygonInput() {
      this.form.polygon.inputs.push({
        lat: "",
        lng: "",
      });
    },
    removePolygonInput(key) {
      if (this.form.polygon.inputs.length > 3) {
        this.form.polygon.inputs.splice(key, 1);
      }
    },
    drawPolygon() {
      if (this.$refs.form.validate()) {
        this.$refs.map.createPolygon(
          this.form.polygon.inputs.map((i) => Object.values(i))
        );
        this.inputDialog.show = false;
        this.form.area = "";
        this.form.polygon.inputs = [
          {
            lat: "",
            lng: "",
          },
          {
            lat: "",
            lng: "",
          },
          {
            lat: "",
            lng: "",
          },
        ];
        this.selectedMapArea = [];
      }
    },
    drawCircleArea() {
      if (this.$refs.form.validate()) {
        this.$refs.map.createCircle(
          Object.values(this.form.circle.coords),
          this.form.circle.radius
        );
        this.inputDialog.show = false;
        this.form.area = "";
        this.form.circle.coords = {
          lat: "",
          lng: "",
        };
        this.form.circle.radius = "";
        this.selectedMapArea = [];
      }
    },
    drawRectangleArea() {
      if (this.$refs.form.validate()) {
        this.$refs.map.createRectangle(
          Object.values(this.form.rectangle.coords[0]),
          Object.values(this.form.rectangle.coords[1])
        );
        this.inputDialog.show = false;
        this.form.area = "";
        this.form.circle.coords = {
          lat: "",
          lng: "",
        };
        this.form.rectangle.coords = [
          {
            lat: "",
            lng: "",
          },
          {
            lat: "",
            lng: "",
          },
        ];

        this.selectedMapArea = [];
      }
    },
    drawNavLine() {},
  },
  watch: {
    area() {
      this.selectedMapArea = [];
    },
    selectedMapArea: {
      handler(selectedMapArea) {
        if (this.selectedMapArea.length > 0) {
          switch (this.form.area) {
            case "Circle":
              this.form.circle.coords = selectedMapArea.slice(-1)[0];
              break;
            case "Rectangle":
            case "Navigation Line":
              let value = selectedMapArea.slice(-1)[0];
              if (String(this.form.rectangle.coords[0].lat).trim() === "") {
                this.form.rectangle.coords[0].lat = value.lat;
                this.form.rectangle.coords[0].lng = value.lng;
              } else if (
                String(this.form.rectangle.coords[1].lat).trim() === ""
              ) {
                this.form.rectangle.coords[1].lat = value.lat;
                this.form.rectangle.coords[1].lng = value.lng;
              } else {
                this.form.rectangle.coords = [
                  {
                    lat: "",
                    lng: "",
                  },
                  {
                    lat: "",
                    lng: "",
                  },
                ];
                this.selectedMapArea.shift();
              }

              break;

            case "Polygon":
              let latlng = selectedMapArea.pop();
              let attach = false;
              for (
                let index = 0;
                index < this.form.polygon.inputs.length;
                index++
              ) {
                const i = this.form.polygon.inputs[index];
                if (String(i.lat).trim() === "") {
                  this.form.polygon.inputs[index].lat = latlng.lat;
                  this.form.polygon.inputs[index].lng = latlng.lng;
                  attach = true;
                  return;
                }
              }

              if (!attach) {
                this.form.polygon.inputs = [
                  {
                    lat: "",
                    lng: "",
                  },
                  {
                    lat: "",
                    lng: "",
                  },
                  {
                    lat: "",
                    lng: "",
                  },
                ];
                this.form.polygon.inputs[0].lat = latlng.lat;
                this.form.polygon.inputs[0].lng = latlng.lng;
                this.selectedMapArea = [];
              }
              break;
          }
        }
      },
      deep: true,
    },
  },
};
</script>
<style>
html,
body {
  overflow: auto;
}
</style>
