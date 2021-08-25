import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/SysLogin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SysLogin',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ()=>import('../views/SysHome.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
