import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/:pizzaId?',
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
  },
  {
    path: '/profile',
    name: 'profile-view',
    component: () => import('@/views/profile-view.vue'),
    redirect: '/profile/user-data',
    meta: { layout: 'app-layout-main' },
    children: [
      {
        path: 'user-data',
        name: 'user-view',
        component: () => import('@/views/user-view.vue')
      },
      {
        path: 'orders',
        name: 'orders-view',
        component: () => import('@/views/orders-view.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
