<template>
  <div>
    <v-container grid-list-md text-xs-left>
      <v-layout row wrap>
        <v-flex xs6>
          <h3>Clause bucket</h3>
          <!-- <p>{{ list }}</p> -->
          <NestedDraggable
            :list="feeder"
            @renumber-handler="renumberX(feeder)"
            :ce="false"
          />
          <!-- <ul>
        <li v-for="(item, index) in list">{{ item }}</li>
      </ul> -->
        </v-flex>
        <v-flex xs6>
          <h3>Clause stack</h3>
          <v-btn @click="undo">Undo</v-btn>
          <v-btn @click="redo">Redo</v-btn>
          <v-btn @click="bullet">bullet</v-btn>
          <!-- <p>{{ list }}</p> -->
          <NestedDraggable
            :list="lease"
            @renumber-handler="renumberX(lease)"
            @add-to-stack="addToStack"
            :ce="true"
          />
          <!-- <ul>
        <li v-for="(item, index) in list">{{ item }}</li>
      </ul> -->
        </v-flex>
      </v-layout>
    </v-container>

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
import cloneDeep from 'lodash.clonedeep'

export default {
  name: 'nested-example',
  display: 'Nested',
  order: 19,

  components: {
    NestedDraggable
  },
  data() {
    return {
      feeder: [],
      lease: [],
      stepper: [],
      stepIndex: -1,
      id: null,
      idFeeder: null,
      bulletMode: null
    }
  },
  methods: {
    stringify() {
      console.log(JSON.stringify(this.feeder, null, 2))
      console.log(JSON.stringify(this.lease, null, 2))
    },

    post() {
      // console.log(JSON.stringify(this.list, null, 2))
      var list = JSON.stringify(this.lease, null, 2)
      console.log(list)

      // console.log(JSON.stringify(this.list, null, 2))

      EventService.postTodos(list).then(response => {
        console.log(response.status)
      })
    },
    put() {
      var posts = JSON.stringify(this.lease, null, 2)
      console.log(posts)
      EventService.putTodos(posts, this.id).then(response => {
        console.log(response.data)
        console.log(response.status)
        console.log(response.statusText)
        console.log(response.headers)
        console.log(response.config)
      })
    },
    copy(o) {
      var output
      var v
      var key
      output = Array.isArray(o) ? [] : {}
      for (key in o) {
        v = o[key]
        output[key] = typeof v === 'object' ? this.copy(v) : v
      }
      return output
    },
    addToStack() {
      // alert('add to stack')
      // var lse = this.copy(this.lease)
      this.stepIndex += 1
      this.stepper.splice(this.stepIndex, 1, cloneDeep(this.lease))
      console.log(this.stepper[this.stepIndex])

      // console.log()
      // var last = this.stepBack.length - 1
      // console.log(JSON.stringify(this.stepBack[last]))
    },
    undo() {
      console.log(this.stepIndex)
      if (this.stepIndex >= 1) {
        // this.stepForward.push(this.copy(this.lease))
        this.lease = cloneDeep(this.stepper[this.stepIndex - 1])
        console.log(this.stepper[this.stepIndex])
        this.stepIndex -= 1
        // console.log(JSON.stringify(this.stepBack[last]))
        // this.renumberX(this.stepBack[last])
        // this.stepBack.pop()
      }
    },
    redo() {
      // var last = this.stepForward.length - 1
      // console.log(last)
      console.log('stepIndex: ' + this.stepIndex)
      console.log('stepper length: ' + this.stepper.length)
      // debugger

      if (this.stepper.length >= 0) {
        if (this.stepIndex < this.stepper.length - 1) {
          console.log('aaaa')
          this.lease = cloneDeep(this.stepper[this.stepIndex + 1])
          // console.log(JSON.stringify(this.stepForward[last]))
          this.stepIndex += 1
          // this.renumberX(this.stepBack[last])
          // this.stepBack.push(this.copy(this.stepForward[last]))
          // this.stepForward.pop()
        }
      }
    },
    renumberX(reorder) {
      // alert('renumberX')
      // this.addToStack()
      var subsequent = false
      var prefix = ''
      this.renumber(reorder, subsequent, prefix)
    },
    renumber(arr, subsequent, prefix) {
      var arrNextLevel = []
      arr.forEach(function(item) {
        if (subsequent === false) {
          item.section = arr.indexOf(item)
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

      this.reorder = arr
    },
    bullet() {
      var range = document.getSelection().getRangeAt(0)
      console.log(range)
      // var bullet = range.createContextualFragment('abcde')
      // console.log
      document.write('bullet here')
      this.bulletMode = !this.bulletMode
    }
  },

  created() {
    EventService.getTodo('5c8525bda12257857384470d').then(response => {
      this.id = response.data._id
      this.lease = response.data.text
      console.log(JSON.stringify(response.data))
      console.log('created')
      this.addToStack()
    })
    EventService.getTodo('5c8a50b4a12257857384470e').then(response => {
      this.idMenu = response.data._id
      this.feeder = response.data.text
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
