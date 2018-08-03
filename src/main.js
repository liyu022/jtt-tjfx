// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Home from './Home'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import httpUtil from './services/httpUtil'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = httpUtil
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Home },
  template: '<Home/>'
})
