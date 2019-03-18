<template>
  <div class="row">
    <div class="col-8">
      <h3>Nested draggable tasks--</h3>
      <!-- <p>{{ list }}</p> -->
      <NestedDraggable :tasks="list" @renumber-handler="renumberX" />
      <!-- <ul>
        <li v-for="(item, index) in list">{{ item }}</li>
      </ul> -->
    </div>

    <!-- <div class="col-8">
      <h3>Nested draggable tasks--</h3>
      <NestedDraggable :tasks="menu" />
    </div> -->

    <v-btn @click="stringify">strigify</v-btn>
    <!-- <v-btn @click="put">put</v-btn> -->
    <v-btn @click="put">put</v-btn>
    <v-btn @click="post">post</v-btn>
    <v-btn @click="renumberX">renumber</v-btn>

    <!-- <rawDisplayer class="col-0" :value="list" title="List" /> -->
  </div>
</template>

<script>
import NestedDraggable from '@/components/NestedDraggable'
import EventService from '@/services/EventService.js'
import axios from 'axios'
import { join } from 'path'

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
      menu: [],
      id: null
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
      alert('put')
      var posts = JSON.stringify(this.list, null, 2)
      console.log(posts)
      // console.log(this.id)
      EventService.putTodos(posts, this.id).then(response => {
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        console.log(response.config)
      })
    },
    renumberX() {
      // alert('renumberX')
      var subsequent = false
      var prefix = ''
      this.renumber(this.list, subsequent, prefix)
    },

    renumber(arr, subsequent, prefix) {
      var arrNextLevel = []
      arr.forEach(function(item) {
        if (subsequent === false) {
          item.section = arr.indexOf(item)
          // console.log(item.section)
        } else {
          item.section = prefix + '' + (arr.indexOf(item) + 1) + ''
        }

        if (item.subsections.length > 0) {
          arrNextLevel.push([item.section, item.subsections])
        }
      })
      var arrNextLevelCopy = Array.from(arrNextLevel)
      subsequent = true

      for (var i = 0; i < arrNextLevelCopy.length; i++) {
        prefix = arrNextLevel[i][0] + '.'
        // alert(prefix)
        this.renumber(arrNextLevelCopy[i][1], subsequent, prefix)
      }

      this.list = arr
    }
  },

  created() {
    EventService.getTodos().then(response => {
      this.id = response.data._id
      this.list = response.data.text
      // this.list[0] = response.data
      // var jsonData = response.data.text
      // jsonData.map(item => ({
      //   ...item,
      //   createdAt: new Date(item.createdAt)
      // }))
      // console.log(jsonData.length)
      // for (var i = 0; i < jsonData.length; i++) {
      //   console.log(jsonData[i])
      // }
      console.log(JSON.stringify(response.data))
      console.log('created')
    })
  }
}

// EventService.getToDonts().then(response => {
//   this.menu = response.data
//   console.log(response.data)
// })
// }
</script>
<style scoped></style>
