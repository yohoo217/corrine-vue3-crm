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

      <!-- Login Dialog -->
      <Dialog :visible="showLoginDialog" @hide="showLoginDialog = false">
        <UserLogin @close="showLoginDialog = false" />
      </Dialog>

      <!-- Register Dialog -->
      <Dialog :visible="showRegisterDialog" @hide="showRegisterDialog = false">
        <UserRegister @close="showRegisterDialog = false" />
      </Dialog>
    </ErrorBoundary>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import SiteFooter from "./components/SiteFooter.vue";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import Dialog from "primevue/dialog";
import UserLogin from "./views/UserLogin.vue";
import UserRegister from "./views/UserRegister.vue";

export default {
  name: "App",
  components: {
    Menubar,
    SiteFooter,
    Toast,
    ConfirmDialog,
    Dialog,
    UserLogin,
    UserRegister,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const showLoginDialog = ref(false);
    const showRegisterDialog = ref(false);

    const isAuthenticated = computed(
      () => store.getters["auth/isAuthenticated"]
    );
    const userRole = computed(() => store.getters["auth/userRole"]);

    const items = computed(() => {
      let menuItems = [
        {
          label: "首頁",
          icon: "pi pi-fw pi-home",
          command: () => router.push("/"),
        },
        {
          label: "最新消息",
          icon: "pi pi-fw pi-info-circle",
          command: () => router.push("/news"),
        },
        {
          label: "課程資訊",
          icon: "pi pi-fw pi-info-circle",
          command: () => router.push("/course-info"),
        },
      ];

      if (!isAuthenticated.value || userRole.value === "guest") {
        menuItems.push(
          {
            label: "登入",
            icon: "pi pi-fw pi-sign-in",
            command: () => (showLoginDialog.value = true),
          },
          {
            label: "註冊",
            icon: "pi pi-fw pi-user-plus",
            command: () => (showRegisterDialog.value = true),
          }
        );
      } else if (userRole.value === "user") {
        menuItems.push(
          {
            label: "預約課程",
            icon: "pi pi-fw pi-pencil",
            command: () => router.push("/booking"),
          },
          {
            label: "個人資訊",
            icon: "pi pi-fw pi-user",
            command: () => router.push("/personal-info"),
          },
          {
            label: "登出",
            icon: "pi pi-fw pi-sign-out",
            command: async () => {
              await store.dispatch("auth/logout");
              router.push("/");
              window.location.reload(); // 加入這行來進行頁面重整
            },
          }
        );
      } else if (userRole.value === "admin") {
        menuItems.push(
          {
            label: "編輯課程",
            icon: "pi pi-fw pi-calendar",
            command: () => router.push("/courses"),
          },
          {
            label: "CRM",
            icon: "pi pi-fw pi-users",
            command: () => router.push("/crm"),
          },
          {
            label: "登出",
            icon: "pi pi-fw pi-sign-out",
            command: async () => {
              await store.dispatch("auth/logout"); // 调用登出
              router.push("/"); // 登出後重定向到首页
            },
          }
        );
      }

      return menuItems;
    });

    return { items, showLoginDialog, showRegisterDialog };
  },
};
</script>
