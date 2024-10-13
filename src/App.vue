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
        <!-- Right-aligned authentication buttons -->
        <template #end>
          <Menubar :model="authItems" />
        </template>
      </Menubar>
      <router-view></router-view>
      <SiteFooter />
      <Toast />
      <ConfirmDialog />

      <!-- Login Dialog -->
      <Dialog v-model:visible="showLoginDialog">
        <UserLogin @close="closeLoginDialog" />
      </Dialog>

      <!-- Register Dialog -->
      <Dialog v-model:visible="showRegisterDialog">
        <UserRegister @close="closeRegisterDialog" />
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

    // 關閉登入彈窗
    const closeLoginDialog = () => {
      setTimeout(() => {
        showLoginDialog.value = false;
      }, 0);
    };

    // 關閉註冊彈窗
    const closeRegisterDialog = () => {
      setTimeout(() => {
        showRegisterDialog.value = false;
      }, 0);
    };

    const isAuthenticated = computed(
      () => store.getters["auth/isAuthenticated"]
    );
    const userRole = computed(() => store.getters["auth/userRole"]);

    // 左側菜單項目
    const items = computed(() => [
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
    ]);

    // 右側身份驗證項目
    const authItems = computed(() => {
      let menuItems = [];
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
      } else if (userRole.value === "user" || userRole.value === "admin") {
        // 用戶和管理員的菜單項
        const roleSpecificItems =
          userRole.value === "user"
            ? [
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
              ]
            : [
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
              ];

        menuItems.push(...roleSpecificItems);

        // 添加登出選項
        menuItems.push({
          label: "登出",
          icon: "pi pi-fw pi-sign-out",
          command: async () => {
            await store.dispatch("auth/logout");
            // 登出後的路由跳轉現在由 Vuex action 處理
          },
        });
      }

      return menuItems;
    });

    return {
      items,
      authItems,
      showLoginDialog,
      showRegisterDialog,
      closeLoginDialog,
      closeRegisterDialog,
    };
  },
};
</script>
