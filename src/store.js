import Vue from 'vue'
import Vuex from 'vuex'
import nestedDraggableFeeder from './components/NestedDraggableFeeder.vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    list: []
  },
  mutations: {
    SET_LIST(state, value) {
      state.list = value
    }
  },
  actions: {}
})
