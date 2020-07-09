<template>
<client-only>
  <v-app>
    <v-navigation-drawer v-model="drawer" app> 
      <navigator/>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      
    </v-app-bar>
    <v-main app>
      <nuxt />
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}  ASC</span>
    </v-footer>
  </v-app>
</client-only>
</template>

<script>
import navigator from '~/components/navigator';
export default {
  components:{
    navigator
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  }
};
</script>
<style>
  html,body{
    overflow: auto;
  }
</style>
