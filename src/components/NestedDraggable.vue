<template>
  <div>
    <draggable
      class="dragArea"
      chosenClass="chosen"
      ghostClass="dropTarget"
      animation="250"
      tag="ul"
      :list="tasks"
      :group="{ name: 'g1' }"
    >
      <li v-for="el in tasks" :key="el.name">
        <p v-bind:class="{ active: isActive }">
          {{ el.name }}
        </p>
        <NestedDraggable :tasks="el.tasks" />
      </li>
    </draggable>
  </div>
</template>
<script>
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
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
.chosen {
  background-color: beige;
}
.dropTarget {
  background-color: darkgoldenrod;
}
</style>
