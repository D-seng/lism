<template>
  <div class="row">
    <div class="col-8">
      <h3>Nested draggable tasks--</h3>
      <NestedDraggable :tasks="list" />
    </div>

    <div class="col-8">
      <h3>Nested draggable tasks--</h3>
      <NestedDraggable :tasks="menu" />
    </div>

    <v-btn @click="stringify">strigify</v-btn>
    <v-btn @click="save">save</v-btn>

    <!-- <rawDisplayer class="col-0" :value="list" title="List" /> -->
  </div>
</template>

<script>
import NestedDraggable from '@/components/NestedDraggable'
import EventService from '@/services/EventService.js'
export default {
  name: 'nested-example',
  display: 'Nested',
  order: 19,
  components: {
    NestedDraggable
  },
  data() {
    return {
      list: [],
      menu: []
    }
  },
  methods: {
    stringify() {
      console.log(JSON.stringify(this.list, null, 2))
      console.log(JSON.stringify(this.menu, null, 2))
    },
    save() {
      EventService.putList().then(response => {
        console.log(response.data)
        this.list = response.data
      })
    }
  },
  created() {
    EventService.getList().then(response => {
      this.list = response.data
    }),
      EventService.getMenu().then(response => {
        this.menu = response.data
      })
  }
}
</script>
<style scoped></style>
