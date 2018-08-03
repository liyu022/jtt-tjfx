import Vue from 'vue'
import Router from 'vue-router'
import Ydpm from '@/components/Ydpm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Ydpm',
      component: Ydpm
    }
  ]
})
