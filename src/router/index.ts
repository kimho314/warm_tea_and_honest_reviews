import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: () => import('../pages/Reviews.vue')
    },
    {
      path: '/reviews/:slug',
      name: 'review-detail',
      component: () => import('../pages/ReviewDetail.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/About.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
