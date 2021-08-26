import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './network/http.js'
import Element from 'element-ui'
import '../src/assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {AgGridVue} from 'ag-grid-vue'
//全局注册组件
Vue.component("AgGridVue",AgGridVue)


Vue.config.productionTip = false
Vue.prototype.$Http=http
Vue.use(Element);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
