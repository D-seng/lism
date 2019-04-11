<template>
  <v-combobox
    v-model="model"
    :items="items"
    :search-input.sync="search"
    hide-selected
    hint="Maximum of 5 tags"
    label="Add some tags"
    multiple
    persistent-hint
    small-chips
  >
    <template v-slot:no-data>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            No results matching "<strong>{{ search }}</strong
            >". Press <kbd>enter</kbd> to create a new one
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-combobox>
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
  created() {
    EventServiceAlt.getSnippets().then(response => {
      // console.log('resp.text')
      // console.log(typeof response.data.text)
      // this.id = response.data._id
      // this.lease = response.data.text
      // var respText = response
      console.log('Retrieve leases...')
      console.log(response.data)
      var arrResp = response.data.snippets
      arrResp.forEach(element => {
        console.log(element._id)
        this.items.push(element._id)
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
