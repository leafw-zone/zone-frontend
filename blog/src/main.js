import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import moment from 'vue-moment'

Vue.use(ElementUI, {
  size: 'medium' // set element-ui default size
})

Vue.use(mavonEditor)

Vue.use(moment)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})