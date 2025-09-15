import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home-view',
    component: () => import('@/views/home-view.vue'),
    meta: { layout: 'app-layout-main' }
  },
  {
    path: '/sign-in',
    name: 'login-view',
    component: () => import('@/views/login-view.vue')
  },
  {
    path: '/cart',
    name: 'cart-view',
    component: () => import('@/views/cart-view.vue'),
    meta: { layout: 'app-layout-main' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
