import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './network/http.js'
import Element from 'element-ui'
import '../src/assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$Http=http
Vue.use(Element);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
