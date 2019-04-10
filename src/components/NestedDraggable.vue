<template>
  <div>
   
  
    <div v-if="ce">
      <draggable
        class="dragArea"
        chosenClass="chosen"
        ghostClass="dropTarget"
        animation="250"
        bubbleScroll="true"
        tag="ul"
        handle=".handle"
        :list="lse"
        :group="{ name: 'clauses' }"
        @change="renumberHandler"
        @end="addToStackHandler"
      >
        <li v-for="el in list" :key="el.section">
          <font-awesome-icon
            icon="grip-lines"
            class="fas fa-grip-lines fa-lg handle"
          />
          <font-awesome-icon
            icon="edit"
            class="fas fa-edit fa-lg"
            @click="editX(el.section, el.verbiage, el.id)"
          />

          <span @click="edit(el.section)" class="listSpan">{{el.section}}</span>
          <span v-html="el.verbiage" contenteditable="true" :id="el.id"></span>

          <NestedDraggable
            :list="el.subsections"
            @renumber-handler="renumberHandler"
            @add-to-stack="addToStackHandler"
            :ce="ce"
            @show-editor="editX('subsequent')"
          />
        </li>
      </draggable>
    </div>

    <div v-else>
      <draggable
        class="dragArea"
        chosenClass="chosen"
        ghostClass="dropTarget"
        animation="250"
        bubbleScroll="true"
        tag="ul"
        handle=".handle"
        :list="lse"
        :group="{ name: 'clauses', pull: 'clone', put: false }"
        @change="renumberHandler"
      >
        <li v-for="el in list" :key="el.section">
          <font-awesome-icon
            icon="grip-lines"
            class="fas fa-grip-lines fa-lg handle"
            @drop="addToStackHandler"
          />
          <font-awesome-icon
            icon="edit"
            class="fas fa-edit fa-lg"
            @click="editX(el.section, el.verbiage, el.id)"
          />
          <span class="listSpan"> {{ el.section }}</span>
          <span @click="getArr(el.id)" id="el.id" contenteditable="false">
            {{ el.verbiage }}
          </span>

          <!-- <div v-if="el.subsections.length > 0"> -->
          <NestedDraggable
            :list="el.subsections"
            @renumber-handler="renumberHandler"
            :ce="false"
            @show-editor="editX('subsequent')"
          />
          <!-- </div> -->
        </li>
      </draggable>
    </div>
  </div>
</template>
<script>
// v-bind:class="{ active: isActive }"
import draggable from 'vuedraggable'
const uuidv1 = require('uuid/v1')
var idLocked = null
var verbiageLocked = null
var elIdLocked = null

export default {
  name: 'NestedDraggable',
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
      lse: this.list,
      htmlContent: "<p><strong>html content goes here</strong></p>"
    }
  },

  methods: {
    // var ind = this.lse.findIndex(x => x.id === elId)
    // alert(ind + ' ' + elId)
    // var matches = []
    // var needle = elId // what to look for

    // var arrTest = [
    //   { id: 'a1', text: 'aas', subsections: [{ id: 'b1' }, { text: 'bbs' }] }
    // ]
    // needle = 'b1'

    //   this.cList.forEach(function(e) {
    //     matches = matches.concat(
    //       e.subsections.filter(function(c) {
    //         return c.id === needle
    //       })
    //     )
    //   })
    //   console.log(this.cList)
    //   console.log(elId)
    //   console.log(matches[0] || 'Not found')
    // },
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
    editX(id, verbiage, elId) {
      if (id !== 'subsequent') {
        idLocked = id
        verbiageLocked = verbiage
        elIdLocked = elId
      }
      // else {
      //   id = idLocked
      //   verbiage = verbiageLocked
      // }
      // alert('idLocked ' + id)

      this.$emit('show-editor', idLocked, verbiageLocked, elIdLocked)
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
  float: left;
}
.listSpan {
  margin-left: 20px;
}
</style>
