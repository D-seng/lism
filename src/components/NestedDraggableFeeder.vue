<template>
  <div>
    <div>
      <draggable
        class="dragArea"
        animation="250"
        tag="ul"
        :list="feeder"
        @end="endHandler"
        :clone="cloneHandler"
        :group="{ name: 'lseAndFeeder', pull: 'clone', put: false }"
        :setData="setDataHandler"
        ghostClass="ghost"
      >
        <li
          v-for="el in liveList"
          :key="el.section"
          :id="el.id"
          @dblclick="dblClickHandler"
          @dragstart="dragStartHandler"
        >
          <div style="block" :class="{ hidden: el.hidden }">
            <div>
              <p :id="'sec-' + el.id">
                <span
                  ><font-awesome-icon
                    icon="minus"
                    class="fas fa-minus "
                    @click="fold(el)"/></span
                >{{ el.section }}
              </p>
              <p v-html="el.verbiage"></p>
            </div>
            <NestedDraggableFeeder
              :list1="el.subsections"
              @update-lse="updateLseHandler('subsequent')"
              @single-element="singleElementX"
              @force-renumber="forceRenumberX"
              :key="renderKey"
            />
          </div>
        </li>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import cloneDeep from 'lodash.clonedeep'

var sectionLocked = null
var verbiageLocked = null
var elIdLocked = null

// var currStorage = window.localStorage
// currStorage.setItem('myItem', 'Hello world')

export default {
  name: 'NestedDraggableFeeder',
  display: 'Clone',
  order: 3,
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
      id: '',
      redrawKey: 0,
      evTarget: null,
      inSingleMode: [],
      subjectSection: null,
      droppedSections: null,
      lev1: false,
      alteredList1: [],
      feeder: this.list1,
      renderKey: 0,
      repop: false,
      lastList: [],
      lsTest: 'ls test',
      newClone: null

      //https://www.tutorialsplane.com/vue-js-local-storage/
      // Run the local storage on the create (or similar) event in the
      // Vue life cycle.
    }
  },
  computed: {
    liveList() {
      // debugger
      if (this.singleMode) {
        return this.alteredList1
      } else {
        if (this.repop) {
          return this.lastList
          // return this.alteredList1
        } else {
          return this.list1
          // return this.alteredList1
        }
      }
    }
  },
  methods: {
    startHandler(dataTransfer, dragEl) {
      alert('startHandler')
      console.log('startHandler')
      debugger

      console.log(dataTransfer)
      // console.log(evt.dataTransfer)
      // evt.dataTransfer.setData('text/plain', evt.target.id)
    },
    clearLowTierDrag(evt) {
      // evt.stopPropagation()
      // alert('clearlt')
      debugger
      var dataEl = document.getElementById('empty')
      console.log('evt.dataTransfer')
      console.log(evt.dataTransfer)
      evt.dataTransfer.setDragImage(dataEl, 0, 0)
      console.log(evt.dataTransfer)
      // evt.dataTransfer.setData('Text', 'jake')
    },
    dragStartHandler(evt) {
      // /debugger
      console.log('evt')
      console.log(evt)
      console.log('evt.target')
      console.log(evt)
      // When dragging in single mode, use a this.styleNode approach for all nodes in list
      // except for the one selected.
      // evt.target.classList.add('placeholder')
    },
    setDataHandlerX(dataTransfer, dragEl) {
      debugger
      console.log('dragEl')
      console.log(dragEl)
      console.log('dataTransfer')
      console.log(dataTransfer)
      console.log('DragImage')
      console.log(dataTransfer)

      // dataTransfer.clearData
      // dragEl.classList.add('placeholder')
      // window.dragEl = dragEl
      // dataTransfer.setDragImage(dragEl, 0, 0)
      var dataEl = document.getElementById('empty')
      dataTransfer.setDragImage(dataEl, 0, 0)
    },
    setDataHandler(dataTransfer, dragEl) {
      console.log('dragEl')
      console.log(dragEl)
      console.log('dataTransfer')
      console.log(dataTransfer)
      console.log('DragImage')
      console.log(dataTransfer)

      // dataTransfer.clearData
      // dragEl.classList.add('placeholder')
      // window.dragEl = dragEl
      // dataTransfer.setDragImage(dragEl, 0, 0)
      var dataEl = document.getElementById('empty')
      dataTransfer.setDragImage(dataEl, 0, 0)
    },
    fold(el) {
      // debugger

      el.subsections.forEach(item => {
        item.hidden === true ? (item.hidden = false) : (item.hidden = true)
        console.log(item)
      })
      this.renderKey += 1
    },
    cloneHandler(evt) {
      var elInSingleMode = this.inSingleMode.indexOf(evt.id) != -1
      if (elInSingleMode) {
        var vxClone = {
          id: evt.id,
          verbiage: evt.verbiage,
          section: evt.section,
          subsections: []
        }
        console.log('evt.clone')
        console.log(evt.clone)
        this.$store.dispatch('setNewClone', vxClone)
        return vxClone
      }
    },
    mySetFunction: function() {
      localStorage.setItem('myItem', this.list1)
    },
    endHandler(ev) {
      // debugger
      console.log('ev.item')
      console.log(ev.item)
      debugger
      console.log('ev')
      console.log(ev)
      console.log('ev.clone')
      console.log(ev.clone)
      debugger
      this.stop()
    },
    stop() {
      console.log('stop')
    },
    checkSingleMode(id) {
      return this.singleMode.find(id)
    },
    styleNode(el, addStyle) {
      // let el = document.getElementById(elId)
      if (addStyle) {
        el.children[0].children[0].style =
          'background-color: rgba(180, 100, 100, 0.808)'
      } else {
        el.children[0].children[0].style = 'background-color: none'
      }
    },
    retrieveSubjectSection(ev) {
      if (ev.target.id.substring(0, 4) != 'sec-') {
        return ev.target.previousElementSibling.innerText
      } else {
        return ev.target.innerText
      }
    },
    collapse(ev) {
      // NEED TO PICK OUT WHICH PARTS OF THIS
      // ALLOW FOR DRAGGING SINGLE ELEMENT
      // SHOULD NEED TO SET vxClone.
      this.subjectSection = this.retrieveSubjectSection(ev)

      if (this.subjectSection.indexOf('.') === -1) {
        this.lev1 = true
        var cList = cloneDeep(this.list1)
        cList[this.subjectSection * 1].subsections = []
        this.alteredList1 = cList
        console.log('this.alteredList1')
        console.log(this.alteredList1)
      } else {
        // Refactor alert: Everything in this else block.
        var lastIndex = this.subjectSection.lastIndexOf('.')
        var secLength = this.subjectSection.length - lastIndex - 1

        this.droppedSections =
          this.subjectSection.substr(lastIndex + 1, secLength) * 1 - 1
        var tList = cloneDeep(this.list1)
        this.lastList = cloneDeep(this.list1)
        this.repop = true
        tList[this.droppedSections].subsections = []
        this.alteredList1 = cloneDeep(tList)
      }

      this.$store.dispatch('storeList', this.alteredList1)
      this.renderKey += 1

      //Need to put truncated list into an object for cloning.
      console.log('this.alteredList1')
      console.log(this.alteredList1)
      this.$emit('force-renumber')
    },
    dblClickHandler(ev) {
      ev.stopPropagation()
      var el = ev.target

// Build an array of element ids that corresponde with subsection
// elements (s/b LIs). Store them (probably in vuex) for retrieval
// and use when making subsection nodes invisible when dragging
// single items. 
      // debugger
      do {
        el = el.parentNode
      } while (el.nodeName != 'LI')
      // debugger

      var indexOfId = this.inSingleMode.indexOf(el.id)
      var single
      if (indexOfId === -1) {
        this.inSingleMode.push(el.id)
        single = true
        this.styleNode(el, true)
      } else {
        // debugger
        this.inSingleMode.splice(indexOfId, 1)
        // el = document.getElementById(elId[0])
        single = false
        this.styleNode(el, false)
      }
      // this.singleMode = !this.singleMode
      // debugger
      if (single) {
        this.$emit('single-element', ev)
      }

      // debugger
      // var vxClone = {
      //   id: el.id,
      //   verbiage: el.children[0].children[0].children[1].innerText,
      //   section: el.children[0].children[0].children[0].innerText,
      //   subsections: []
      // }
    },

    singleElementX() {
      // debugger
      this.$emit('single-element')
    },
    forceRenumberX() {
      this.$emit('force-renumber')
    },
    showSaveIcon(id) {
      // alert(id)
      var el = document.getElementById(id + 'sv')
      console.log(el)
      el.className = '.m-fadeIn'
      console.log(el)
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
  },
  mounted() {}
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
.collapser {
  margin-left: -8px;
}
.ghost {
  background-color: orange;
}
.hidden {
  display: none;
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
.sortable-ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.placeholder {
  width: 150px;
  height: 50px;
  background: #000;
  color: #000;
}

.retain {
  width: 100%;
  height: auto;
  background: #fff;
  color: #000;
}
</style>
