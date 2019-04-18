<template>
  <div>
    <div>
      <draggable
        class="dragArea"
        chosenClass="chosen"
        ghostClass="dropTarget"
        animation="250"
        tag="ul"
        :list2="feeder"
      >
        <li v-for="el in list2" :key="el.section">
          <span v-html="el.section" :id="el.id"></span>
          <span v-html="el.verbiage" :id="el.id + 'v'"></span>

          <NestedDraggableFeeder
            :list2="el.subsections"
            @update-lse="updateLseHandler('subsequent')"
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
  name: 'NestedDraggableFeeder',
  props: {
    list2: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  },
  computed: {
    cList() {
      return JSON.parse(JSON.stringify(this.list))
      // return this.list
    }
  },
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
