// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import CourseList from "@/views/CourseList.vue";
import BookingPage from "@/views/BookingPage.vue";
import CourseInfo from "../views/CourseInfo.vue";
import CourseDetail from "../views/CourseDetail.vue";
import NewsPage from '../views/NewsPage.vue';
import UserLogin from '../views/UserLogin.vue';
import UserRegister from '../views/UserRegister.vue';
import CRM from "@/views/CRM.vue";
import store from '../store';
import PersonalInfo from '../views/PersonalInfo.vue';


const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  { path: '/personal-info', component: PersonalInfo }, // 添加个人资料页面的路由
  {
    path: "/course-info",
    name: "CourseInfo",
    component: CourseInfo,
  },
  {
    path: "/course/:id",
    name: "CourseDetail",
    component: CourseDetail,
    meta: { requiresAuth: true }, // 需要登录
  },
  {
    path: "/courses",
    name: "CourseList",
    component: CourseList,
    meta: { requiresAuth: true, role: 'admin' }, // 仅 admin 可访问
  },
  {
    path: "/booking",
    name: "Booking",
    component: BookingPage,
    meta: { requiresAuth: true, role: 'user' }, // 仅普通用户可访问
  },
  {
    path: "/crm",
    name: "CRM",
    component: CRM,
    meta: { requiresAuth: true, role: 'admin' }, // 仅 admin 可访问
  },
  {
    path: "/news",
    name: "News",
    component: NewsPage,
  },
  {
    path: "/login",
    name: "Login",
    component: UserLogin,
  },
  {
    path: "/register",
    name: "Register",
    component: UserRegister,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  const userRole = store.getters['auth/userRole'];

  // 检查是否需要身份验证
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // 如果未登录，跳转到登录页面
  } 
  // 检查是否需要特定角色
  else if (to.meta.role && to.meta.role !== userRole) {
    next('/'); // 如果角色不符合，跳转到首页或显示权限不足信息
  } 
  else {
    next(); // 否则允许访问
  }
});

export default router;
