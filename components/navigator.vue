<template>
  <v-list>
      <v-subheader>Operation</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item @click="$store.commit('createAreaDialogToggle')">
          <v-list-item-icon>
            <v-icon color="success">mdi-map</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>create area</v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar>
          <v-icon color="info">mdi-plus</v-icon>
           </v-list-item-avatar>
        </v-list-item>
      </v-list-item-group>
    </v-list>
</template>

<script>
export default {

}
</script>
