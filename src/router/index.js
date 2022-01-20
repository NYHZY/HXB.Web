import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/SysLogin.vue'
import Home from '../views/Home.vue'
import TestHome from '../views/TestHome.vue'
import Utils from '../assets/js/SysUtils.js'
import http from '../network/http.js'
import Test from '../views/Test.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ()=>import('../views/SysHome.vue')
  },
  {
    path:'/table',
    name:'table',
    component:()=>import('../components/DynamicTable/PDataTable.vue')
  },
  {
    path:'/tabs',
    name:'tabs',
    component:()=>import('../components/TestTab.vue')
  },
  {
    path:'/testhome',
    name:'testhome',
    component:TestHome
  }
];

(()=>{
  
})();
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
