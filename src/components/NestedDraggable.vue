<template>
  <div>
    <div>
      <draggable
        class="dragArea"
        chosenClass="chosen"
        ghostClass="dropTarget"
        animation="250"
        tag="ul"
        handle=".handle"
        :list="lse"
        @change="renumberHandler"
        @end="addToStackHandler"
        @add="addHandler"
        :group="{ name: 'lseAndFeeder', put: true }"
      >
        <li v-for="el in list" :key="el.section">
          <v-card class="handle">
            <font-awesome-icon
              icon="edit"
              class="fas fa-edit fa-lg"
              @click="editX(el.section, el.verbiage, el.id)"
            />
            <div :id="el.id + 'sv'" class="m-fadeOut">
              <font-awesome-icon
                icon="save"
                class="far fa-save fa-lg"
                @click="updateLseHandler(el.id)"
              />
            </div>
            <v-card-title primary-title>{{ el.section }} </v-card-title>
            <span
              v-html="el.verbiage"
              contenteditable="true"
              :id="el.id"
              @input="showSaveIcon(el.id)"
            ></span>
          </v-card>

          <NestedDraggable
            :list="el.subsections"
            @renumber-handler="renumberHandler"
            @add-to-stack="addToStackHandler"
            :ce="ce"
            @show-editor="editX('subsequent')"
            @update-lse="updateLseHandler('subsequent')"
            group="lseAndFeeder"
            @add-feeder="addHandlerX"
          />
        </li>
      </draggable>
    </div>
  </div>
</template>
<script>
// v-bind:class="{ active: isActive }"
import draggable from 'vuedraggable'

const uuidv1 = require('uuid/v1')
var sectionLocked = null
var verbiageLocked = null
var elIdLocked = null

export default {
  name: 'NestedDraggable',
  display: 'Clone',
  props: {
    list: {
      required: true,
      type: Array
    },
    ce: {
      required: true,
      type: Boolean
    }
  },
  components: {
    draggable
  },
  computed: {},
  data() {
    return {
      isActive: false,
      randomId: null,
      lse: this.list,
      id: '',
      content: ''
    }
  },

  methods: {
    showSaveIcon(id) {
      // alert(id)
      var el = document.getElementById(id + 'sv')
      console.log(el)
      el.className = '.m-fadeIn'
      console.log(el)
    },
    addHandlerX(evt) {
      this.$emit('add-feeder', evt)
    },
    addHandler(evt) {
      this.$emit('add-feeder', evt)
      // alert('addHandler')
      // console.log('evt.item')
      // console.log(evt.item)
      // debugger
      // console.log('evt.newIndex')
      // console.log(evt.newIndex)

      // console.log('evt.clone')
      // console.log(evt.clone)
      // console.log('evt.to')
      // console.log(evt.to)

      // If yes, then
      // If index > 0, then getElementById(child n - 1)
      // If index === 0, then getElementById(child n + 1)
      // If children.length === 0,
      // Need to find out how to access parent-like node

      //2. Retrieve section and convert to array index.
      //3. Do the needed splice. Slip into subsections array where needed.
      //If index === 0, then the position must be the first in entire list.

      // console.log(el.parentElement)
      // console.log(el.previousSibling)

      // console.log(el.parent)
      // this.renumberHandler()
    },
    genUUID() {
      var a = uuidv1()
      console.log(a)
    },
    toggleActive() {
      this.isActive = !this.isActive
    },
    renumberHandler() {
      alert('renumber-handler')
      this.$emit('renumber-handler')
    },
    addToStackHandler() {
      this.$emit('add-to-stack')
    },
    updateLseHandler(elId) {
      // alert(elId)
      if (elId !== 'subsequent') {
        elIdLocked = elId
      }

      var el = document.getElementById(elIdLocked)
      var content = el.innerText
      this.$emit('update-lse', elIdLocked, content)
    },

    editX(section, verbiage, elId) {
      if (section !== 'subsequent') {
        sectionLocked = section
        verbiageLocked = verbiage
        elIdLocked = elId
      }
      // else {
      //   id = idLocked
      //   verbiage = verbiageLocked
      // }
      // alert('idLocked ' + id)

      this.$emit('show-editor', sectionLocked, verbiageLocked, elIdLocked)
      this.$emit('force-rerender')
    }
  }
}
</script>
<style scoped>
li {
  list-style-type: none;
  margin-top: 15px;
}
.bulleted {
  list-style-type: disc;
}
.dragArea {
  min-height: 20px;
  border-left: 1px solid lightgray;
}
.chosen {
  background-color: beige;
}
.dropTarget {
  background-color: rgba(222, 236, 241, 0.808);
}
.handle {
}
.listSpan {
  margin-left: 20px;
}
.invisible {
  visibility: hidden;
  transition: visibility 1s;
}
.m-fadeOut {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
}
.m-fadeIn {
  visibility: visible;
  opacity: 1;
  transition: visibility 0s linear 0s, opacity 300ms;
}
</style>
