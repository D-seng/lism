<template>
  <div>
    <div>
      <draggable
        class="dragArea"
        dragClasss="chosen"
        ghostClass="dropTarget"
        animation="250"
        tag="ul"
        @start="setDataX"
        :list2="feeder"
        :group="{ name: 'lseAndFeeder', pull: 'clone', put: false }"
      >
        <li
          v-for="el in list2"
          :key="el.section"
          :id="el.id"
          @dblclick="dblClickHandler"
        >
          <div>
            <p :id="'sec-' + el.id"><span></span>{{ el.section }}</p>
            <p v-html="el.verbiage" :id="'v-' + el.id"></p>

            <NestedDraggableFeeder
              :list2="el.subsections"
              @update-lse="updateLseHandler('subsequent')"
              @drag-data="setDataX"
            />
          </div>
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
  name: 'NestedDraggableFeeder',
  display: 'Clone',
  props: {
    list2: {
      required: true,
      type: Array
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
      feeder: this.list2,
      id: '',
      content: ''
    }
  },

  methods: {
    dblClickHandler(evt) {
      evt.stopPropagation()
      console.log('dblClickHandler')
      console.log(evt.target)
    },
    setDataX(evt) {
      // alert('setDataX')
      console.log('setDataX')
      // console.log(evt.clone)
      // console.log(evt.clone.innerText)
      this.$emit('drag-data', evt)
    },
    showSaveIcon(id) {
      // alert(id)
      var el = document.getElementById(id + 'sv')
      console.log(el)
      el.className = '.m-fadeIn'
      console.log(el)
    },

    genUUID() {
      var a = uuidv1()
      console.log(a)
    },
    toggleActive() {
      this.isActive = !this.isActive
    },
    renumberHandler() {
      // alert('renumber-handler')
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
  height: 25px;
  width: 200px;
  color: gray;
  font-style: italic;
}
.dropTarget {
  background-color: rgba(222, 236, 241, 0.808);
}

.listSpan {
  margin-left: 20px;
}
.il {
  display: inline;
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
