<template>
  <div>
    <v-container grid-list-md text-xs-left>
      <v-layout row wrap>
        <v-flex xs6>
          <!-- <p>{{ list }}</p> -->
          <RetrieveFeeders @get-feeders="getFeeders"></RetrieveFeeders>
          <h4>{{ intent }}</h4>
          <NestedDraggableFeeder
            :list2="feeder"
            :ce="false"
            @show-editor="edit"
            @drag-data="dragData"
          />
        </v-flex>
        <v-flex xs6 :key="listKey">
          <RetrieveLeases @get-lease="getLease"></RetrieveLeases>
          <v-btn @click="undo">Undo</v-btn>
          <v-btn @click="redo">Redo</v-btn>

          <NestedDraggable
            :list="lease"
            @renumber-handler="renumberX(lease)"
            @add-to-stack="addToStack"
            :ce="true"
            @show-editor="edit"
            @update-lse="updateLse"
            @add-feeder="addFeeder"
          />
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn @click="stringify">stringify</v-btn> -->
    <v-btn @click="put">put</v-btn>
    <v-btn @click="post">post</v-btn>

    <p v-if="showDialog">
      showDialog is true
      <Editor
        :section="this.section.toString()"
        :verbiage="this.content"
        :elId="this.elId"
        :key="editorKey"
        @sync-content="syncContent"
        :newContent="content.text"
      ></Editor>
    </p>
    <p v-else>showDialog is false</p>

    <!-- <rawDisplayer class="col-0" :value="list" title="List" /> -->
  </div>
</template>

<script>
import NestedDraggable from '@/components/NestedDraggable'
import NestedDraggableFeeder from '@/components/NestedDraggableFeeder'
import EventServiceAlt from '@/services/EventServiceAlt.js'
import cloneDeep from 'lodash.clonedeep'
import Editor from './Editor.vue'
import RetrieveLeases from './RetrieveLeases.vue'
import RetrieveFeeders from './RetrieveFeeders.vue'

var k = 0
export default {
  name: 'nested-example',
  display: 'Nested',
  order: 19,

  components: {
    NestedDraggable,
    NestedDraggableFeeder,
    Editor,
    RetrieveLeases,
    RetrieveFeeders
  },
  data() {
    return {
      feeder: [],
      intent: '',
      lease: [],
      stepper: [],
      stepIndex: -1,
      id: null,
      idFeeder: null,
      showDialog: false,
      section: null,
      content: null,
      editorKey: 0,
      listKey: 0,
      elId: '',
      lev: null,
      newContent: '',
      cloneText: ''
    }
  },
  computed: {
    bLease() {
      return this.lease
    }
  },
  methods: {
    dragData(evt) {
      console.log('dragData')
      console.log(evt.clone)
      console.log(evt.clone.children[0].children[1].innerText)
      this.cloneText = evt.clone.children[0].children[1].innerText
      // alert('dragData')
    },
    assignSection(sec, mode) {
      // debugger
      var newObj = {
        section: '111',
        verbiage: this.cloneText,
        subsections: []
      }
      var pos
      var arrSec = sec.split('.')
      var k = 0
      if (sec.length > 1) {
        pos = 'this.lease[' + arrSec[0] + ']'
        for (k = 1; k < arrSec.length; k++) {
          pos = pos + '.subsections[' + (arrSec[k] - 1) + ']'
        }
        //Get last occurrence of '[' and lop it and the remaindr of the string off.
        var lastBracket = pos.lastIndexOf('[')
        pos = pos.substring(0, lastBracket)
      } else {
        pos = 'this.lease'
      }
      // debugger
      // console.log(pos)
      // console.log(eval(pos))
      // console.log(el.children)
      // console.log(el.children[0].firstChild.firstChild.innerText)
      console.log(pos)
      // console.log(eval(pos).verbiage)
      // console.log(eval(pos).subsections[0])
      switch (mode) {
        case 'next':
          eval(pos + '.splice(arrSec[k],0, newObj)')
          break
        case 'prev':
          eval(pos + '.splice(arrSec[k],0, newObj)')
          break
        default:
          eval(pos).subsections.push(newObj)
      }

      // console.log(eval(pos).subsections[0].verbiage)
      console.log(this.lease)
    },
    addFeeder(evt) {
      // alert('evt')
      var el = evt.to
      var testNode = 'el'
      var testNodeEl
      var sec
      var mode
      // debugger
      if (el.children.length > 1) {
        if (evt.newIndex === 0) {
          testNodeEl = el.children[evt.newIndex]
          mode = 'next'
          // testNode = testNode + '.parentNode'
        } else {
          testNodeEl = el.children[evt.newIndex + 1]
          mode = 'prev'
          // testNode = testNode + '.childNode'
        }
      } else {
        // debugger
        do {
          testNode = testNode + '.parentNode'
          testNodeEl = eval(testNode)
        } while (testNodeEl.nodeName != 'LI')
        console.log(testNodeEl)
        console.log(
          testNodeEl.children[0].children[1].nextElementSibling.innerText
        )
        mode = 'subsection'
        // REFACTOR: Make this function universally available.
      }
      // debugger
      // Get the span holding the section number.
      sec = testNodeEl.children[0].children[1].nextElementSibling.innerText
      this.assignSection(sec, mode)
      this.renumberX(this.lease)

      // eval(pos).subsections.push(
      //   el.children[0].firstChild.children[0].innerText
      // )
      // eval(pos).subsections[0].verbiage =
      //   el.children[0].firstChild.children[1].innerText

      // console.log(eval(pos))

      // var testEl = el.previousElementSibling
      // Need to find out how to access parent-like node
      // Maybe parent <li>
    },

    getLease(id) {
      EventServiceAlt.getSnippet(id).then(response => {
        this.id = response.data._id
        this.lease = response.data.text
        console.log(JSON.stringify(response.data))

        this.addToStack()
      })
    },
    getFeeders(id) {
      EventServiceAlt.getFeeder(id).then(response => {
        this.idFeeder = response.data._id
        this.feeder = response.data.verbiage
        this.intent = response.data.intent
        console.log(this.intent)
        console.log(JSON.stringify(response.data.verbiage))
      })
    },
    addCloneEl() {},
    updateLse(id, newContent) {
      alert(newContent)
      this.newContent = newContent
      this.elId = id
      this.schArr(this.lease, this.elId)
    },
    syncContent(newCont) {
      // alert(newCont)

      this.newContent = newCont
      this.schArr(this.lease, this.elId)
    },
    schArr(arr, elId) {
      var pos
      // debugger
      console.log(elId)
      var result = arr.filter(item => item.id === elId)
      if (result.length === 0) {
        var ss = arr.filter(item => item.subsections.length > 0)
        if (ss.length > 0) {
          for (var i = 0; i < ss.length; i++) {
            this.schArr(ss[i].subsections, elId)
          }
        }
      } else {
        //tinker with the if-else here to handle the section correctly.
        // debugger
        var sec = result[0].section.toString()
        console.log(sec)
        if (sec.length > 1) {
          var arrSec = sec.split('.')
          pos = 'this.lease[' + arrSec[0] + ']'
          for (k = 1; k < arrSec.length; k++) {
            pos = pos + '.subsections[' + (arrSec[k] - 1) + ']'
          }
        } else {
          pos = 'this.lease[' + sec + ']'
        }
        console.log(pos)
        // console.log(eval(pos))
        var el = eval(pos)
        console.log(el)

        el.verbiage = this.newContent
        // var elDom = document.getElementById(elId)
        // elDom.innerText = this.newContent
        console.log(el)
      }
    },
    edit(id, verbiage, elId) {
      this.showDialog = true
      this.section = id
      this.elId = elId
      this.content = verbiage
      this.editorKey += 1
    },

    stringify() {
      console.log(JSON.stringify(this.feeder, null, 2))
      console.log(JSON.stringify(this.lease, null, 2))
    },

    post() {
      console.log(JSON.stringify(this.bLease))
    },
    put() {
      console.log('put-nested example.vue')
      // var snippet = JSON.stringify(this.lease, null, 2)
      // snippet = JSON.parse(snippet)
      // var lse = {
      //   text = snippet,
      // }

      // console.log(this.lease)
      EventServiceAlt.putSnippet(this.lease, this.id).then(response => {
        console.log(response.data)
        //   console.log(response.status)
        //   console.log(response.statusText)
        //   console.log(response.headers)
        //   console.log(response.config)
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
      this.stepIndex += 1
      this.stepper.splice(this.stepIndex, 1, cloneDeep(this.lease))
      console.log(this.stepper[this.stepIndex])
    },
    undo() {
      console.log(this.stepIndex)
      if (this.stepIndex >= 1) {
        // this.stepForward.push(this.copy(this.lease))
        this.lease = cloneDeep(this.stepper[this.stepIndex - 1])
        console.log(this.stepper[this.stepIndex])
        this.stepIndex -= 1
      }
    },
    redo() {
      console.log('stepIndex: ' + this.stepIndex)
      console.log('stepper length: ' + this.stepper.length)
      // debugger

      if (this.stepper.length >= 0) {
        if (this.stepIndex < this.stepper.length - 1) {
          console.log('aaaa')
          this.lease = cloneDeep(this.stepper[this.stepIndex + 1])

          this.stepIndex += 1
        }
      }
    },
    renumberX(reorder) {
      var subsequent = false
      var prefix = ''
      this.renumber(reorder, subsequent, prefix)
      this.editorKey += 1
      this.listKey += 1
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
    // EventServiceAlt.getSnippet('5caf4c508ab4406e4bf34de3').then(response => {
    //   // console.log('resp.text')
    //   // console.log(typeof response.data.text)
    //   // console.log(response.data.text)
    //   this.id = response.data._id
    //   this.lease = response.data.text
    //   // console.log(JSON.stringify(response.data))
    //   // console.log('created')
    // this.addToStack()
    // })
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
