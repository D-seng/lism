<template>
  <div>
    <div>
      <draggable
        class="dragArea"
        animation="250"
        tag="ul"
        :value="feeder"
        :group="{ name: 'lseAndFeeder', pull: 'clone', put: false }"
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
              @force-renumber="forceRenumberX"
              :reset="renderKey"
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

const uuidv1 = require('uuid/v1')
var sectionLocked = null
var verbiageLocked = null
var elIdLocked = null

// var currStorage = window.localStorage
// currStorage.setItem('myItem', 'Hello world')

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

  // TO KEEP ORIGINAL COPY OF THE LIST, TRY SIMPLE STATE MANAGEMENT FROM SCRATCH.
  // THE SEPARATE VUE INSTANCE MAY BE ENOUGHT. MAY NOT NEED VUEX.
  // OR SIMPLY TRY USING A CONST, WHICH WON'T MUTATE. OR DOES VUEDRAGGABLE
  // WHEN IT RE-RENDERS A LIST, ALSO RESET THE CONST IN THE VUE COMPONENT?
  // MAYBE JUST STORE THE LIST ON APP.VUE.
  data() {
    return {
      id: '',
      redrawKey: 0,
      evTarget: null,
      singleMode: false,
      sectionToClone: null,
      droppedSections: null,
      lev1: false,
      alteredList1: [],
      feeder: this.list1,
      renderKey: 0,
      repop: false,
      lastList: [],
      lsTest: 'ls test'

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
        } else {
          return this.list1
        }
      }
    }
  },
  methods: {
    cloneHandler(evt) {
      console.log('evt.clone')
      console.log(evt.clone)
    },
    mySetFunction: function() {
      localStorage.setItem('myItem', this.list1)
    },
    endHandler() {
      // this.$emit('force-renumber')
      // alert('endHandler')
      // this.singleMode = !this.singleMode
      // console.log('this.list1')
      // console.log(this.list1)
      // console.log('this.lastLst')
      // console.log(this.lastList)
      // this.renderKey += 1
    },

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
      ev.stopPropagation()

      ev.clone = 'aaa'
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
          // debugger
          var lastIndex = this.sectionToClone.lastIndexOf('.')
          var secLength = this.sectionToClone.length - lastIndex - 1

          this.droppedSections =
            this.sectionToClone.substr(lastIndex + 1, secLength) * 1 - 1
          var tList = cloneDeep(this.list1)
          this.lastList = cloneDeep(this.list1)
          this.repop = true

          tList[this.droppedSections].subsections = []

          this.alteredList1 = cloneDeep(tList)
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
      } else {
        debugger
        this.$emit('force-renumber')
      }
      // this.redrawKey += 1
      // console.log(this.redrawKey)
      console.log('store.state.list')
      console.log(this.$store.state.list)
      this.$emit('single-element', ev)
    },

    setData() {
      alert('set data')
    },
    singleElementX(ev) {
      // debugger
      this.$emit('single-element', ev)
    },
    forceRenumberX() {},
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
