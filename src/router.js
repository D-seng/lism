import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Settings from './views/Settings.vue'
import About from './views/About.vue'
import Leases from './components/Leases.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/settings',
      name: Settings
    },
    {
      path: '/about',
      name: About
    },
    {
      path: '/leases',
      name: Leases
    }
  ]
})
