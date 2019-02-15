<template>
  <div>
    <h1>Leases</h1>
    <v-container>
      <v-layout row>
        <v-flex xs12 md6>
          <v-btn outline block>button</v-btn>
          <draggable v-model="events" @start="drag=true" @end="drag=false">
            <v-card v-for="ls in events" :key="ls.id" @drop="renumber(ls)">{{ls.title}}</v-card>
          </draggable>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data() {
    return {
      event: null,
      events: []
    }
  },
  methods: {
    renumber(ls) {
      console.log('renumber me' + ls.id)
    }
  },
  created() {
    EventService.getEventsUnpaginated().then(response => {
      console.log(response.data)
      this.events = response.data
    })
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
