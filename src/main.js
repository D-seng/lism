import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGripLines, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Vuetify from 'vuetify'

library.add(faEdit)
library.add(faGripLines)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// Vue.component('modal', {
//   template: '#modal-template'
// })
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  data: {
    selectedSection: null
  },
  methods: {
    onShowModal() {
      this.showModal = true
    }
  },
  render: h => h(App)
}).$mount('#app')
