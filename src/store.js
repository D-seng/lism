import Vue from 'vue'
import Vuex from 'vuex'
import nestedDraggableFeeder from './components/NestedDraggableFeeder.vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    list: [],
    vxClone: null
  },
  mutations: {
    SET_LIST(state, value) {
      state.list = value
    },
    SET_CLONE(state, value) {
      // debugger
      state.vxClone = value
    }
  },
  actions: {
    storeList({ state, commit }, value) {
      commit('SET_LIST', value)
    },
    setNewClone({ state, commit }, value) {
      // debugger
      commit('SET_CLONE', value)
    }
  }
})
