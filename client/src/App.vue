<template>
    <v-app>
      <v-navigation-drawer v-model="drawer" app>
        <navigator />
      </v-navigation-drawer>
      <v-app-bar app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <!-- <v-toolbar-title v-text="'Geo Location'" /> -->
        <v-spacer />
        <v-btn
          v-if="$route.name=='home'"
          fab
          :color="$store.getters.create_area_dialog.show ? 'red':'success'"
          small
          @click="$store.commit('createAreaDialogToggle')"
        >
          <v-icon color="white" v-if="!$store.getters.create_area_dialog.show">mdi-plus</v-icon>
          <v-icon color="white" v-else>mdi-close</v-icon>
        </v-btn>
        
        <v-btn class="ml-3" fab small @click="changeTheme(!$vuetify.theme.dark)">
          <v-icon color="orange" v-if="$vuetify.theme.dark">mdi-brightness-4</v-icon>
          <v-icon color="grey darken-1" v-else>mdi-brightness-7</v-icon>
        </v-btn>
      </v-app-bar>
      <v-main app>
        <router-view />
      </v-main>
    </v-app>
</template>

<script>
import navigator from "@/components/navigator";

export default {
  components: {
    navigator
  },

  data: () => ({
    drawer: false,
    title: "Geo-location"
  }),
  methods:{
    changeTheme(value) {
      this.$vuetify.theme.dark = value;
      localStorage.setItem('theme',value);
    }
  },
  mounted() {
    let storage = localStorage.getItem('theme');

    this.$vuetify.theme.dark = !storage || storage === 'true';
  }
};
</script>


<style>
html,
body {
  overflow: hidden;
}
.v-navigation-drawer--is-mobile {
  z-index: 10000 !important;
}
</style>
