<template>
  <v-list nav>
    <v-subheader>Operation</v-subheader>
    <v-list-item-group v-model="nav" color="primary">
      <v-list-item
        :class="{ 'v-item--active v-list-item--active': $route.name == 'home' }"
        @click="$router.push({ name: 'home' })"
      >
        <v-list-item-icon>
          <v-icon color="success">mdi-map</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>create area</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        :class="{
          'v-item--active v-list-item--active': $route.name == 'routes',
        }"
        @click="$router.push({ name: 'routes' })"
      >
        <v-list-item-icon>
          <v-icon color="success">mdi-map</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>planning</v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar>
          <v-icon color="info">mdi-drone</v-icon>
        </v-list-item-avatar>
      </v-list-item>
    </v-list-item-group>

    <v-list-item>
      <v-list-item-content>
        <v-divider />
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <v-select
          :items="layers"
          :value="layer"
          @change="(value) => $store.commit('selectLayer', value)"
          item-text="name"
          :item-value="(v) => v"
          label="select map type"
          outlined
        ></v-select>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    nav: ""
  }),
  computed: mapGetters(["layers", "layer"])
};
</script>
