import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/AdminExhibition.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AdminExhibition',
    component: Admin
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "Detail" */ '../views/AdminProductDetail.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router