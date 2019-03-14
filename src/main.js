import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faGripLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Vuetify from 'vuetify'

library.add(faCoffee)
library.add(faGripLines)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
