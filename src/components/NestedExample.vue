<template>
  <div class="row">
    <div class="col-8">
      <h3>Nested draggable tasks--</h3>
      <NestedDraggable :tasks="list" />
    </div>

    <!-- <div class="col-8">
      <h3>Nested draggable tasks--</h3>
      <NestedDraggable :tasks="menu" />
    </div> -->

    <v-btn @click="stringify">strigify</v-btn>
    <!-- <v-btn @click="put">put</v-btn> -->
    <v-btn @click="put">put</v-btn>
    <v-btn @click="post">post</v-btn>

    <!-- <rawDisplayer class="col-0" :value="list" title="List" /> -->
  </div>
</template>

<script>
import NestedDraggable from '@/components/NestedDraggable'
import EventService from '@/services/EventService.js'
import axios from 'axios'

export default {
  name: 'nested-example',
  display: 'Nested',
  order: 19,

  components: {
    NestedDraggable
  },
  data() {
    return {
      list: [],
      menu: []
    }
  },
  methods: {
    stringify() {
      console.log(JSON.stringify(this.list, null, 2))
      console.log(JSON.stringify(this.menu, null, 2))
    },
    post() {
      // console.log(JSON.stringify(this.list, null, 2))
      var list = JSON.stringify(this.list, null, 2)
      console.log(list)
      axios({
        method: 'post',
        url: 'http://localhost:5000/api/posts',
        data: list
      })
    },
    put() {
      var todos = JSON.stringify(this.list, null, 2)
      console.log(todos)
      todos = JSON.parse(todos)
      // console.log(todos)
      var data = {
        id: 'l5',
        name: 'task 5--',
        tasks: []
      }
      EventService.deleteTodos()
      EventService.postTodos(todos).then(response => {
        console.log(response.status)
      })
    }
  },
  created() {
    EventService.getTodos().then(response => {
      let data = response.data.text
      this.list = data
      console.log(data)
    })
    console.log('created')
    // EventService.getToDonts().then(response => {
    //   this.menu = response.data
    //   console.log(response.data)
    // })
  }
}
</script>
<style scoped></style>
