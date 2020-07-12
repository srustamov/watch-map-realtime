<template>
  <div>
    <map-component ref="map" @select="clickMapArea" />
    <v-card
      tile
      v-if="create_area_dialog.show"
      class="input_area_dialog_card"
      :style="`width:${create_area_dialog.width}`"
    >
      <v-toolbar dense>
        <v-btn icon @click="$store.commit('createAreaDialogSizeToggle')">
          <v-icon color="orange" v-if="create_area_dialog.width === 'auto'">mdi-window-minimize</v-icon>
          <v-icon color="orange" v-else>mdi-application</v-icon>
        </v-btn>

        <v-spacer />

        <v-btn icon @click="$store.commit('createAreaDialogToggle')">
          <v-icon color="red">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <div class="pa-4" :style="create_area_dialog.width === '50px' ? 'visibility:hidden' : ''">
        <area-forms
          @close="$store.commit('createAreaDialogToggle')"
          :map="$refs.map"
          :selectedMapArea="selectedMapArea"
          @reset-map-area="selectedMapArea=null"
        />
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MapComponent from "~/components/map.vue";
import AreaForms from "~/components/area/index";
export default {
  components: {
    MapComponent,
    AreaForms
  },
  data: () => ({
    selectedMapArea: null
  }),
  computed: mapGetters(["create_area_dialog"]),
  methods: {
    clickMapArea(e) {
      this.selectedMapArea = e.latlng;
    }
  }
};
</script>
<style scoped>
.input_area_dialog_card {
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 9997;
  bottom: 0;
  max-width: 450px;
  overflow-y: auto;
}
</style>
