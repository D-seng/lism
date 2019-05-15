<template>
  <div>
    <div>
      <draggable
        class="dragArea"
        animation="250"
        tag="ul"
        :list2="feeder"
        :group="{ name: 'lseAndFeeder', pull: 'clone', put: false }"
        @change="startHandler"
        :key="displayKey"
      >
        <li
          v-for="el in list2"
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
              :list2="el.subsections"
              @update-lse="updateLseHandler('subsequent')"
              @single-element="singleElementX"
              :feederMaster="feederMaster"
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
    list2: {
      required: true,
      type: Array
    },
    feederMaster: {
      required: false,
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
      feederM: this.feederMaster,
      feederH: [],
      id: '',
      content: '',
      evTarget: null,
      singleMode: false,
      sectionToClone: null,
      slicedFeeder: [],
      droppedSections: null,
      displayKey: 0
    }
  },
  methods: {
    sliceOffDblClickSubsections() {},
    cloneHandler(evt) {
      // debugger
      var pos
      var arrSec
      var k
      //RUN A SECTION FINDER, AS ON NESTEDEXAMPLE.VUE.
      console.log('this.feederMaster')
      console.log(this.feederMaster)

      if (this.singleMode) {
        if (this.sectionToClone.indexOf('.') === -1) {
          pos = this.feeder[this.sectionToClone]
        } else {
          k = 0
          arrSec = this.sectionToClone.split('.')
          pos = 'this.feederMaster[' + arrSec[0] + ']'
          for (k = 1; k < arrSec.length; k++) {
            pos = pos + '.subsections[' + (arrSec[k] - 1) + ']'
          }
        }

        // debugger
        console.log(pos)
        var fObj = eval(pos)
        console.log(fObj)

        var newObj = {
          id: fObj.id,
          section: fObj.section,
          verbiage: fObj.verbiage
        }
        if (this.singleMode) {
          newObj.subsections = []
        } else {
          newObj.subsections = fObj.subsections
        }
        // evt.item = this.evTarget
        // evt.dragged = this.evTarget
        // console.log('single mode evt.item')
        // console.log(evt.item)
        // evt.dragged = this.evTarget
        // evt.draggedRect = this.evTarget
        // evt.clone = this.evTarget
        // evt.related = this.evTarget
      }
      console.log(evt.clone)
      evt.clone = newObj
      console.log('evt.clone')
      console.log(evt.clone)
    },
    startHandler(evt) {
      alert('startHandler')
      if (this.singleMode) {
      }

      // alert(ev.item)
      // debugger
      // console.log('evt.item')
      // console.log(evt.item)
      // this.evTarget.className = 'dropTarget'
    },
    setData() {
      alert('set data')
    },
    singleElementX(ev) {
      // debugger
      this.$emit('single-element', ev)
    },
    dblClickHandler(ev) {
      console.log(this.feeder)
      console.log(this.feederMaster)

      ev.stopPropagation()

      var pos
      var arrSec
      var k
      this.singleMode = !this.singleMode

      if (this.singleMode) {
        if (ev.target.id.substring(0, 4) != 'sec-') {
          this.sectionToClone = ev.target.previousElementSibling.innerText
        } else {
          this.sectionToClone = ev.target.innerText
        }

        if (this.sectionToClone.indexOf('.') === -1) {
          pos = this.feeder[this.sectionToClone]
        } else {
          k = 0

          var lastIndex = this.sectionToClone.lastIndexOf('.')
          var secLength = this.sectionToClone.length - lastIndex - 1

          var secClone =
            this.sectionToClone.substr(lastIndex + 1, secLength) - 1

          pos = 'this.feeder[' + secClone + ']'
        }
        this.droppedSections = secClone

        // this.evTarget = ev.target

        ev.target.parentNode.style =
          'background-color: rgba(180, 100, 100, 0.808)'
        debugger
        console.log('this.feeder')
        console.log(this.feeder)
        this.feederH = cloneDeep(this.feeder)
        this.feeder[this.droppedSections].subsections = []
        // elExtra.style = 'background-color: rgba(180, 100, 100, 0.808)'
      } else {
        ev.target.parentNode.style = 'background-color: none'
        debugger
        console.log('this.feederH')
        console.log(this.feederH)
        this.feeder[this.droppedSections].subsections = cloneDeep(
          this.feederH[this.droppedSections].subsections
        )
        console.log(this.feeder)
        this.displayKey += 1
        // elExtra.style = 'background-color: none'
      }

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
      debugger
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
