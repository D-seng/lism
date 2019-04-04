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
        :list="list"
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
            @click="editX(el.section, el.verbiage)"
          />

          <span @click="edit(el.section)" class="listSpan">
            {{ el.section }}</span
          >
          <span contenteditable="true">
            {{ el.verbiage }}
          </span>

          <NestedDraggable
            :list="el.subsections"
            @renumber-handler="renumberHandler"
            @add-to-stack="addToStackHandler"
            :ce="ce"
            @show-editor="editX('subsequent', 'subsequent')"
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
        :list="list"
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
            @click="editX(el.section, el.verbiage)"
          />
          <span class="listSpan"> {{ el.section }}</span>
          <span contenteditable="false">
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
var idLocked = null
var verbiageLocked = null

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
  data() {
    return {
      isActive: false
    }
  },

  methods: {
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
    editX(id, verbiage) {
      // alert('editX ' + verbiage)
      if (id !== 'subsequent') {
        idLocked = id
        verbiageLocked = verbiage
      }
      // else {
      //   id = idLocked
      //   verbiage = verbiageLocked
      // }
      // alert('idLocked ' + id)

      this.$emit('show-editor', idLocked, verbiageLocked)
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
