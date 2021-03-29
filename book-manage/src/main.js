import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';
import spaceBetween from './components/SpaceBetween/index.vue';

// 这个App 指的是 App.vue,即描述vue组件的一个对象
// .use 可以理解成去注册一个插件
// .mount 向某个节点中挂载内容
createApp(App)
  .use(store)
  .use(router)
  .use(Antd) // Antd 作为全局组件使用
  .use(spaceBetween)
  .mount('#app');
