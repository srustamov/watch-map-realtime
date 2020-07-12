<template>
  <v-app style="height:100%" class="d-flex flex-column align-center justify-center">
    <h1 class="my-5" v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 class="my-5" v-else>
      {{ otherError }}
    </h1>
    <NuxtLink class="v-btn" to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
