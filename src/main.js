// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './Core/App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './Store'
Vue.use(ElementUI)
/* Vue.prototype.$http = axios
axios.defaults.baseURL = 'https://api.example.com'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' */
Vue.config.productionTip = false
Vue.config.debug = true
Vue.prototype.$ajax = axios
window.UpdateServer = process.env.UPLOAD_DOMAIN
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
