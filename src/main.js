import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 导入路由配置

createApp(App)
  .use(router) // 使用 Vue Router
  .mount('#app');