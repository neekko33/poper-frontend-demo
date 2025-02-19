import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('@/layouts/Layout.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
      },
      {
        path: '/list',
        name: 'list',
        meta: {
          keepAlive: true
        },
        component: () => import('@/views/List.vue')
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('@/views/Detail.vue')
      },
      {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/layouts/404.vue')
      }
    ]
  }
]


export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, from) {
    if (from.path === '/list') {
      return {top: 0}
    }
  }
})