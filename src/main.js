import Vue from 'vue'
import App from './App.vue'
// 路由
import router from './router'
// vuex
import store from './store'
// 网络请求
import http from './network/http.js'
// 时间处理js
import dayjs from 'dayjs'
// elementui组件
import Element from 'element-ui'
import components from './common/globalcmpregister.js'
// 全局css
import '../src/assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/ag-grid-community.min.noStyle.js'
import Qs from 'qs'
// 代码编辑器
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
// 通用工具类
import common from './common/tool.js'
import {AgGridVue} from 'ag-grid-vue'

import './assets/js/SysConfig.js';
//全局注册组件
Vue.component("AgGridVue",AgGridVue);
Vue.config.productionTip = false;
Vue.prototype.$Http=http;
Vue.prototype.$Vue=Vue;
Vue.prototype.$monaco=monaco;
Vue.prototype.$common=common;
Vue.prototype.$dayjs=dayjs;
Vue.prototype.$Qs=Qs;

Vue.use(Element);

new Vue({
  router,
  store,
  render: h=>h(App)
}).$mount('#app')
