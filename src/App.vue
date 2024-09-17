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

    // 检查用户是否已认证
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    // 定义菜单项
    const items = computed(() => {
      const menuItems = [
        {
          label: "首頁",
          icon: "pi pi-fw pi-home",
          command: () => {
            router.push("/");
          },
        },
        {
          label: "最新消息",
          icon: "pi pi-fw pi-info-circle",
          command: () => {
            router.push("/news");
          },
        },
        {
          label: "課程資訊",
          icon: "pi pi-fw pi-info-circle",
          command: () => {
            router.push("/course-info");
          },
        },
        {
          label: "編輯課程",
          icon: "pi pi-fw pi-calendar",
          command: () => {
            router.push("/courses");
          },
        },
        {
          label: "預約課程",
          icon: "pi pi-fw pi-pencil",
          command: () => {
            router.push("/booking");
          },
        },
        {
          label: "CRM",
          icon: "pi pi-fw pi-users",
          command: () => {
            router.push("/crm");
          },
        },
      ];

      // 根据用户认证状态添加“登入/註冊”或“登出”
      if (isAuthenticated.value) {
        menuItems.push({
          label: "登出",
          icon: "pi pi-fw pi-sign-out",
          command: () => {
            store.dispatch("auth/logout");
            router.push("/");
          },
        });
      } else {
        menuItems.push(
          {
            label: "登入",
            icon: "pi pi-fw pi-sign-in",
            command: () => {
              router.push("/login");
            },
          },
          {
            label: "註冊",
            icon: "pi pi-fw pi-user-plus",
            command: () => {
              router.push("/register");
            },
          }
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
