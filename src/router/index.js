import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue'; // 确保路径正确
import ChatPage from '../pages/ChatPage.vue'; // 确保路径正确
import Profile from '../pages/Personal.vue';  // 个人中心页面组件
const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatPage
  },
  {
    path: '/profile',  // 新增路由
    name: 'Profile',
    component: Profile  // 个人中心组件
  }
];

const router = createRouter({
  history: createWebHistory(), // ✅ 这里直接使用 createWebHistory()，避免 BASE_URL 问题
  routes
});

export default router;       