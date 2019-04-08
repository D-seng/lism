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
            @show-editor="edit"
          />
          <!-- <ul>
        <li v-for="(item, index) in list">{{ item }}</li>
      </ul> -->
        </v-flex>
        <v-flex xs6>
          <h3>Clause stack</h3>
          <v-btn @click="undo">Undo</v-btn>
          <v-btn @click="redo">Redo</v-btn>

          <!-- <p>{{ list }}</p> -->
          <NestedDraggable
            :list="lease"
            @renumber-handler="renumberX(lease)"
            @add-to-stack="addToStack"
            :ce="true"
            @show-editor="edit"
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

    <v-btn @click="stringify">stringify</v-btn> -->
    <v-btn @click="put">put</v-btn>

    <v-btn @click="post">post</v-btn>

    <p v-if="showDialog">
      <Editor
        :section="this.section"
        :verbiage="this.content"
        :key="editorKey"
      ></Editor>
      <!-- <p v-if="showDialog">showDialog is true</p> -->
    </p>
    <p v-else>showDialog is false</p>

    <!-- <rawDisplayer class="col-0" :value="list" title="List" /> -->
  </div>
</template>

<script>
import NestedDraggable from '@/components/NestedDraggable'

import EventServiceAlt from '@/services/EventServiceAlt.js'
import cloneDeep from 'lodash.clonedeep'

import Editor from './Editor.vue'

export default {
  name: 'nested-example',
  display: 'Nested',
  order: 19,

  components: {
    NestedDraggable,
    Editor
  },
  data() {
    return {
      feeder: [],
      lease: [],
      stepper: [],
      stepIndex: -1,
      id: null,
      idFeeder: null,
      bulletMode: null,
      showDialog: false,
      section: null,
      content: null,
      editorKey: 0
    }
  },
  methods: {
    edit(id, verbiage) {
      this.showDialog = true
      this.section = id
      this.content = verbiage
      this.editorKey += 1
    },

    stringify() {
      console.log(JSON.stringify(this.feeder, null, 2))
      console.log(JSON.stringify(this.lease, null, 2))
    },

    post() {
      console.log(process.env.USER)
      // console.log(JSON.stringify(this.list, null, 2))
      var list = JSON.stringify(this.lease, null, 2)
      console.log(list)

      // console.log(JSON.stringify(this.list, null, 2))

      EventServiceAlt.postTodos(list).then(response => {
        console.log(response.status)
      })
    },
    put() {
      var snippet = JSON.stringify(this.lease, null, 2)
      console.log(snippet)
      EventServiceAlt.putSnippet(snippet, this.id).then(response => {
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
    }
  },
  beforeCreate() {
    // console.log('beforeCreate')
    // fetch('http://localhost:3000' + '/api/user', {
    //   method: 'GET'
    // }).then(res => {
    //   // console.log(res)
    //   console.log(res.json())
    // })
  },

  created() {
    console.log('created-cc')
    EventServiceAlt.getSnippet('5ca7e9039d9adc52ad09ebc6').then(response => {
      console.log('resp.text')
      console.log(typeof response.data.text)
      this.id = response.data._id
      this.lease = response.data.text
      console.log('created')
      this.addToStack()
    })
    // EventService.getTodo('5c8525bda12257857384470d').then(response => {
    //   this.idMenu = response.data._id
    //   this.feeder = response.data.text
    //   console.log(JSON.stringify(response.data))
    //   console.log('created')
    // })
    // axios
    //   .get('')
    //   .then(response => {
    //     this.lease = response.data
    //   })
    //   .catch(error => {
    //     console.log('There was an error', error.response)
    //   })
  }
}
</script>
<style scoped></style>
