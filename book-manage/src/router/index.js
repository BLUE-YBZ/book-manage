import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  // 注册、登录路由
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName:'auth' */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import('../layout/BasicLayout/index.vue'),
    children:[
      {
        path: '/books',
        name: 'Books',
        component: () => import('../views/Books/index.vue'),
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/Users/index.vue'),
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
