<template>
  <v-app class>
    <NavBar />
    <v-content>
      <Home />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Home
  },
  data() {
    return {
      //
    }
  }
}
</script>
