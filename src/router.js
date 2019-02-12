import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Settings from './views/Settings.vue'
import About from './views/About.vue'
import Leases from './components/Leases.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/leases',
      name: 'leases',
      component: Leases
    }
  ]
})
