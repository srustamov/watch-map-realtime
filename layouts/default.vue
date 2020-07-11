<template>
  <client-only>
    <v-app>
      <v-navigation-drawer v-model="drawer" app>
        <navigator @open-create-area="inputDialog.show = true" />
      </v-navigation-drawer>
      <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-toolbar-title v-text="title" />
        <v-spacer />
        <v-btn fab color="success" small @click="inputDialog.show = true">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main app>
        <map-component ref="map" @select="clickMapArea" />
        <!-- <nuxt /> -->
        <v-card
          tile
          v-if="inputDialog.show"
          class="input_area_dialog_card"
          :style="`width:${inputDialog.width}`">
          <v-toolbar dense>
            <v-btn icon @click="inputDialogSizeToggle">
              <v-icon color="orange" v-if="inputDialog.width === 'auto'">
                mdi-window-minimize
              </v-icon>
              <v-icon color="orange" v-else>mdi-application</v-icon>
            </v-btn>

            <v-spacer />

            <v-btn icon @click="inputDialog.show = false">
              <v-icon color="red">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <div class="pa-4" :style="inputDialog.width === '50px' ? 'visibility:hidden' : ''">
            <area-forms
              @close="inputDialog.show = false"
              :map="$refs.map"
              :selectedMapArea="selectedMapArea"
              @reset-map-area="selectedMapArea=null"
            />
          </div>
        </v-card>
      </v-main>

      <!-- <v-footer app>
        <span>&copy; {{ new Date().getFullYear() }} ASC</span>
      </v-footer>-->
    </v-app>
  </client-only>
</template>

<script>
import navigator from "~/components/navigator";
import MapComponent from "~/components/map.vue";
import AreaForms from "~/components/area/index";


export default {
  components: {
    navigator,
    MapComponent,
    AreaForms
  },
  head: {
    title: "Geo Location"
  },
  data: () => ({
    drawer: false,
    title: "Geo-location",
    inputDialog: {
      show: true,
      minimize: false,
      width: "auto"
    },
    selectedMapArea: null,
  }),
  methods: {
    inputDialogSizeToggle() {
      this.inputDialog.width =
        this.inputDialog.width === "auto" ? "50px" : "auto";
    },
    clickMapArea(e) {
      this.selectedMapArea = e.latlng;
    },
  }
};
</script>


<style>
html,
body {
  overflow: hidden;
}
.input_area_dialog_card{
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 999;
  bottom: 0;
  max-width: 450px;
  overflow-y: auto;
}
</style>
