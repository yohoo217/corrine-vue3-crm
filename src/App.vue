<template>
  <div id="app">
    <ErrorBoundary>
      <Menubar :model="items">
        <template #start>
          <img
            alt="Logo"
            src="https://static.ottercdn.com/trek/media/8371159a-d4c1-40f3-a413-704b12a2e7b8.png"
            height="40"
            class="mr-2"
          />
        </template>
      </Menubar>
      <router-view></router-view>
      <SiteFooter />
      <Toast />
      <ConfirmDialog />
    </ErrorBoundary>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import SiteFooter from './components/SiteFooter.vue';
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";

export default {
  name: "App",
  components: {
    Menubar,
    SiteFooter,
    Toast,
    ConfirmDialog,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    // 获取 Vuex 中的登录状态和角色
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
    const userRole = computed(() => store.getters['auth/userRole']);

    // 根据不同状态和角色设置菜单项
    const items = computed(() => {
      let menuItems = [
        { label: "首頁", icon: "pi pi-fw pi-home", command: () => router.push("/") },
        { label: "最新消息", icon: "pi pi-fw pi-info-circle", command: () => router.push("/news") },
        { label: "課程資訊", icon: "pi pi-fw pi-info-circle", command: () => router.push("/course-info") },
      ];

      // 未登录状态或为 guest 时，显示“登入”和“註冊”按钮
      if (!isAuthenticated.value || userRole.value === 'guest') {
        menuItems.push(
          { label: "登入", icon: "pi pi-fw pi-sign-in", command: () => router.push("/login") },
          { label: "註冊", icon: "pi pi-fw pi-user-plus", command: () => router.push("/register") }
        );
      } 
      // 普通用户状态
      else if (userRole.value === 'user') {
        menuItems.push(
          { label: "預約課程", icon: "pi pi-fw pi-pencil", command: () => router.push("/booking") },
          { label: "個人資訊", icon: "pi pi-fw pi-user", command: () => router.push("/personal-info") },
          { label: "登出", icon: "pi pi-fw pi-sign-out", command: async () => {
            await store.dispatch('auth/logout');
            router.push('/');
          }}
        );
      } 
      // 管理员状态
      else if (userRole.value === 'admin') {
        menuItems.push(
          { label: "編輯課程", icon: "pi pi-fw pi-calendar", command: () => router.push("/courses") },
          { label: "CRM", icon: "pi pi-fw pi-users", command: () => router.push("/crm") },
          { label: "登出", icon: "pi pi-fw pi-sign-out", command: async () => {
            await store.dispatch('auth/logout');
            router.push('/');
          }}
        );
      }

      return menuItems;
    });

    onMounted(() => {
      store.dispatch("courses/fetchCourses");
    });

    return { items };
  },
};
</script>
