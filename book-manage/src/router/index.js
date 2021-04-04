import { createRouter, createWebHashHistory } from 'vue-router';
import { character } from '@/service';
import store from '../store';
const routes = [
  // 注册、登录路由
  {
    path: '/auth',
    name: 'Auth',
    component: () => import( '../views/Auth/index.vue'),
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
// to表示到哪个页面去，from从哪个页面来，next可以进入到下一步了
router.beforeEach((to, from, next) => {
  // if(!window.characterInfo) {
  //   const res = await character.list();
  //   window.characterInfo = res.data;
  // }
  // next();
  if(!window.characterInfo) {
    store.dispatch('getCharacterInfo');
  }
  store.dispatch('getUserInfo');
  next();

});

export default router;
