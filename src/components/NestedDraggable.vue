<template>
  <div>
    <draggable
      class="dragArea"
      chosenClass="chosen"
      ghostClass="dropTarget"
      animation="250"
      bubbleScroll="true"
      tag="ul"
      handle=".handle"
      :list="tasks"
      :group="{ name: 'g1' }"
    >
      <li v-for="el in tasks" :key="el.section">
        <font-awesome-icon
          icon="grip-lines"
          class="fas fa-grip-lines fa-lg handle"
        />
        <span class="listSpan">
          {{ el.section }}
          {{ el.verbiage }}
        </span>
        <!-- <div v-if="el.subsections.length > 0"> -->
        <NestedDraggable :tasks="el.subsections" />
        <!-- </div> -->
      </li>
    </draggable>
  </div>
</template>
<script>
// v-bind:class="{ active: isActive }"
import draggable from 'vuedraggable'
export default {
  name: 'NestedDraggable',
  props: {
    tasks: {
      required: true,
      type: Array
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
    }
  }
}
</script>
<style scoped>
li {
  list-style-type: none;
  margin-top: 15px;
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
  padding: 20px;
}
</style>
