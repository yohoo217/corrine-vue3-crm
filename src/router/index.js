//src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import CourseList from "@/views/CourseList.vue";
import BookingPage from "@/views/BookingPage.vue";
import CourseInfo from "../views/CourseInfo.vue";
import CourseDetail from "../views/CourseDetail.vue";
import NewsPage from '../views/NewsPage.vue'; // 修改為新的組件名稱
import UserLogin from '../views/UserLogin.vue';
import UserRegister from '../views/UserRegister.vue';
import CRM from "@/views/CRM.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/course-info", // 新增路由
    name: "CourseInfo",
    component: CourseInfo,
  },
  {
    path: "/course/:id",
    name: "CourseDetail",
    component: CourseDetail,
  },
  {
    path: "/courses",
    name: "CourseList",
    component: CourseList,
  },
  {
    path: "/booking",
    name: "Booking",
    component: BookingPage,
  },
  {
    path: "/crm",
    name: "CRM",
    component: CRM,
  },
  { path: "/news", name: "News", component: NewsPage }, // 新增最新消息的路由
  { path: '/', component: HomePage },
  { path: '/login', component: UserLogin },
  { path: '/register', component: UserRegister },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
