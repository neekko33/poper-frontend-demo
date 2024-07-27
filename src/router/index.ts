import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/Login/index.vue')
      },
      {
        path: '/list',
        name: 'list',
        component: () => import('@/pages/List/index.vue')
      },
      {
        path: '/detail',
        name: 'detail',
        component: () => import('@/pages/Detail/index.vue')
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/pages/404.vue')
      }
    ]
  },
]


export default createRouter({
  history: createWebHistory(),
  routes
})