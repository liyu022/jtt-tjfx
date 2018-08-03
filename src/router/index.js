import Vue from 'vue'
import Router from 'vue-router'
import Ydpm from '@/components/Ydpm'
import Jtll from '@/components/Jtll'
import ProvinceJtl from '@/components/jtll/ProvinceJtl'
import CityJtl from '@/components/jtll/CityJtl'
import DmJtl from '@/components/jtll/DmJtl'
import PbJtl from '@/components/jtll/ProvinceBoundJtl'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      redirect: '/ydpm'
    },
    {
      path: '/ydpm',
      name: 'Ydpm',
      component: Ydpm
    },
    {
      path: '/jtll',
      name: 'Jtll',
      component: Jtll,
      children: [
        {
          path: '/jtll/provinceJtl',
          component: ProvinceJtl
        },
        {
          path: '/jtll/cityJtl',
          component: CityJtl
        },
        {
          path: '/jtll/dmJtl',
          component: DmJtl
        },
        {
          path: '/jtll/pbJtl',
          component: PbJtl
        }
      ]
    }
  ]
})
