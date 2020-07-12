<template>
  <div v-if="!loading">
    <map-component :zoom="map.zoom" :center="map.center" ref="map" @select="clickMapArea" />
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
  <div v-else style="height: 100%" class="pa-9 d-flex flex-column justify-center align-center">
    <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
    <p>loading...</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MapComponent from "~/components/map.vue";
import AreaForms from "~/components/area/index";
export default {
  components: { MapComponent, AreaForms },
  data: () => ({
    loading: true,
    selectedMapArea: null,
    map: {
      center: [40.462964, 50.052201],
      zoom: 10
    }
  }),
  mounted() {
    this.$axios
      .$get("/api/map/configs")
      .then(data => (this.map = data))
      .finally(() => (this.loading = false));
  },
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
