import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ReviewList from '../pages/ReviewList.vue'
import ReviewDetail from '../pages/ReviewDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/reviews',
    name: 'ReviewList',
    component: ReviewList
  },
  {
    path: '/reviews/:slug',
    name: 'ReviewDetail',
    component: ReviewDetail
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
