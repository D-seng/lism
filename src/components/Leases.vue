<template>
  <div>
    <h1>Leases</h1>
    <v-container>
      <v-layout row>
        <v-flex xs12 md6>
          <v-btn outline block>button</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
export default {
  data() {
    return {
      event: null,
      events: []
    }
  },
  created() {
    this.event = EventService.getEvent(1)
    console.log(this.event)
    this.events = EventService.getEventsUnpaginated()
    console.log(this.events)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
