import Vue from 'vue'
import './plugins/vuetify'
import VueFilter from 'vue-filter'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGripLines,
  faEdit,
  faSave,
  faMinus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Vuetify from 'vuetify'

library.add(faEdit)
library.add(faGripLines)
library.add(faSave)
library.add(faMinus)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Vue.component('modal', {
//   template: '#modal-template'
// })
const persistentList = {
  pList: []
}

Vue.use(Vuetify)
Vue.use(VueFilter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  strict: false,
  data: {
    selectedSection: null,
    persistentList
  },
  methods: {
    onShowModal() {
      this.showModal = true
    }
  },
  render: h => h(App)
}).$mount('#app')
