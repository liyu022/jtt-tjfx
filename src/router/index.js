import Vue from 'vue'
import Router from 'vue-router'
import Ydpm from '@/components/Ydpm'
import Jtll from '@/components/Jtll'
import ProvinceJtl from '@/components/jtll/ProvinceJtl'
import CityJtl from '@/components/jtll/CityJtl'
import DmJtl from '@/components/jtll/DmJtl'
import PbJtl from '@/components/jtll/ProvinceBoundJtl'
import Hyfx from '@/components/Hyfx'
import MainPeriod from '@/components/hyfx/MaintainPeriod'
import NetorkEffect from '@/components/hyfx/NetWorkEffect'
import CarHomePie from '@/components/hyfx/CarHomePie'
import CaseReasonBar from '@/components/hyfx/CaseReasonBar'
import CaseTypeBar from '@/components/hyfx/CaseTypeBar'
import GoodsTypePie from '@/components/hyfx/GoodsTypePie'
import Zhcx from '@/components/Zhcx'
import LawInfoQuery from '@/components/Zhcx/LawInfoQuery'
import PunishInfoQuery from '@/components/Zhcx/PunishInfoQuery'

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
    },
    {
      path: '/hyfx',
      name: 'Hyfx',
      component: Hyfx,
      children: [
        {
          path: '/hyfx/mainPeriod',
          component: MainPeriod
        },
        {
          path: '/hyfx/networkEffect',
          component: NetorkEffect
        },
        {
          path: '/hyfx/carHomePie',
          component: CarHomePie
        },
        {
          path: '/hyfx/caseReasonBar',
          component: CaseReasonBar
        },
        {
          path: '/hyfx/caseTypeBar',
          component: CaseTypeBar
        },
        {
          path: '/hyfx/goodsTypePie',
          component: GoodsTypePie
        }
      ]
    },
    {
      path: '/zhcx',
      name: 'Zhcx',
      component: Zhcx,
      children: [
        {
          path: '/zhcx/lawInfoQuery',
          component: LawInfoQuery
        },
        {
          path: '/zhcx/punishInfoQuery',
          component: PunishInfoQuery
        }
      ]
    }
  ]
})
