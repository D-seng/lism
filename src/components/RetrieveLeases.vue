<template>
  <v-select v-on:change="selectLease" :items="items" label="Leases"></v-select>
</template>

<script>
import EventServiceAlt from '@/services/EventServiceAlt.js'

export default {
  data() {
    return {
      items: [],
      itemIds: [],
      model: ['Leases'],
      search: null
    }
  },
  methods: {
    selectLease(a) {
      var idIndex = this.items.indexOf(a)
      var id = this.itemIds[idIndex]
      this.$emit('get-lease', id)
    }
  },
  created() {
    EventServiceAlt.getSnippets().then(response => {
      var arrResp = response.data.snippets
      arrResp.forEach(element => {
        console.log(element._id)
        this.itemIds.push(element._id)

        this.items.push(element.tenant + ' | ' + element.property)
      })

      // this.addToStack()
    })
  },
  watch: {
    model(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop())
      }
    }
  }
}
</script>
