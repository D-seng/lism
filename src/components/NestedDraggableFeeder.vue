<template>
  <div>
    <div>
      <draggable
        class="dragArea"
        animation="250"
        tag="ul"
        :list1="feeder1"
        :group="{ name: 'lseAndFeeder', pull: 'clone', put: false }"
        :key="redrawKey"
      >
        <li
          v-for="el in liveList"
          :key="el.section"
          :id="el.id"
          @dblclick="dblClickHandler"
        >
          <div style="block">
            <div :id="'p-' + el.id">
              <p :id="'sec-' + el.id"><span></span>{{ el.section }}</p>
              <p v-html="el.verbiage" :id="'v-' + el.id"></p>
            </div>
            <NestedDraggableFeeder
              :list1="el.subsections"
              @update-lse="updateLseHandler('subsequent')"
              @single-element="singleElementX"
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
import cloneDeep from 'lodash.clonedeep'

const uuidv1 = require('uuid/v1')
var sectionLocked = null
var verbiageLocked = null
var elIdLocked = null

export default {
  name: 'NestedDraggableFeeder',
  display: 'Clone',
  props: {
    list1: {
      required: false,
      type: Array
    }
  },
  components: {
    draggable
  },

  data() {
    return {
      isActive: false,
      randomId: null,
      feeder1: this.list1,
      feeder2: this.list2,
      feederHold: [],
      id: '',
      content: '',
      redrawKey: 0,
      evTarget: null,
      singleMode: false,
      sectionToClone: null,
      slicedFeeder: [],
      droppedSections: null,
      displayKey: 0,
      lev1: false,
      alteredList1: []
    }
  },
  computed: {
    liveList() {
      if (this.singleMode) {
        return this.alteredList1
      } else {
        return this.list1
      }
    }
  },
  methods: {
    styleNode(ev) {
      if (this.singleMode) {
        ev.target.parentNode.style =
          'background-color: rgba(180, 100, 100, 0.808)'
      } else {
        ev.target.parentNode.style = 'background-color: none'
      }
    },
    retrieveSecToClone(ev) {
      if (ev.target.id.substring(0, 4) != 'sec-') {
        return ev.target.previousElementSibling.innerText
      } else {
        return ev.target.innerText
      }
    },
    dblClickHandler(ev) {
      alert('dblClickHandler')
      ev.stopPropagation()
      // debugger

      this.singleMode = !this.singleMode

      this.styleNode(ev)

      if (this.singleMode) {
        this.sectionToClone = this.retrieveSecToClone(ev)
        if (this.sectionToClone.indexOf('.') === -1) {
          this.lev1 = true
          // this.feederHold = cloneDeep(this.list1)
          var cList = cloneDeep(this.list1)
          cList[this.sectionToClone * 1].subsections = []
          this.alteredList1 = cList
        } else {
          var lastIndex = this.sectionToClone.lastIndexOf('.')
          var secLength = this.sectionToClone.length - lastIndex - 1
          this.droppedSections =
            this.sectionToClone.substr(lastIndex + 1, secLength) - 1
          this.alteredList1 = this.alteredList1[
            this.droppedSections
          ].subsections = []
        }

        // this.droppedSections = secClone
        // } else {
        //   if (this.lev1) {
        //     this.feeder1 = cloneDeep(this.feederHold)
        //     this.lev1 = false
        //   } else {
        //     this.feeder[this.droppedSections].subsections = cloneDeep(
        //       this.feederHold[this.droppedSections].subsections
        //     )
        //   }
      }
      // this.redrawKey += 1
      // console.log(this.redrawKey)
      this.$emit('single-element', ev)
    },

    setData() {
      alert('set data')
    },
    singleElementX(ev) {
      // debugger
      this.$emit('single-element', ev)
    },

    // setDataX(evt) {
    //   // alert('setDataX')
    //   console.log('setDataX')
    //   // console.log(evt.clone)
    //   // console.log(evt.clone.innerText)
    //   this.$emit('drag-data', evt)
    // },
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
      // debugger
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
