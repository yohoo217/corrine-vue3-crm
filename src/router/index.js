// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import CourseList from "@/views/CourseList.vue";
import BookingPage from "@/views/BookingPage.vue";
import CourseInfo from "../views/CourseInfo.vue";
import CourseDetail from "../views/CourseDetail.vue";
import NewsPage from "../views/NewsPage.vue";
import UserLogin from "../views/UserLogin.vue";
import UserRegister from "../views/UserRegister.vue";
import CRM from "@/views/CRM.vue";
import store from "../store";
import PersonalInfo from "../views/PersonalInfo.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  { path: "/personal-info", component: PersonalInfo }, // 添加个人资料页面的路由
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
    meta: { requiresAuth: true, role: "admin" }, // 仅 admin 可访问
  },
  {
    path: "/booking",
    name: "Booking",
    component: BookingPage,
    meta: { requiresAuth: true, role: "user" }, // 仅普通用户可访问
  },
  {
    path: "/crm",
    name: "CRM",
    component: CRM,
    meta: { requiresAuth: true, role: "admin" }, // 仅 admin 可访问
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
  {
    path: "/admin/orders",
    name: "AdminOrders",
    component: () => import("@/views/AdminOrders.vue"),
    meta: { requiresAuth: true, requiresAdmin: true },
  }  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  const userRole = store.getters["auth/userRole"];

  // 如果目標路由是首頁，直接允許訪問
  if (to.path === "/") {
    return next();
  }

  // 檢查是否需要身份驗證
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next("/login"); // 如果未登錄，跳轉到登錄頁面
  }
  // 檢查是否需要特定角色
  else if (to.meta.role && to.meta.role !== userRole) {
    return next("/"); // 如果角色不符合，跳轉到首頁或顯示權限不足信息
  }

  // 允許訪問
  next();
});

export default router;
