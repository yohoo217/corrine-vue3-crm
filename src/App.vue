<template>
  <div id="app">
    <ErrorBoundary>
      <Menubar :model="items" class="menubar">
        <template #start>
          <img
            alt="Logo"
            src="https://static.ottercdn.com/trek/media/8371159a-d4c1-40f3-a413-704b12a2e7b8.png"
            height="40"
            class="mr-2"
          />
        </template>
        <!-- Right-aligned authentication buttons and language selector -->
        <template #end>
          <div class="auth-and-lang">
            <Menubar :model="authItems" class="auth-items" />
            <select @change="changeLanguage($event)" :value="currentLocale" class="language-selector">
              <option value="zh">中文</option>
              <option value="en">English</option>
            </select>
          </div>
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
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import SiteFooter from "./components/SiteFooter.vue";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import Dialog from "primevue/dialog";
import UserLogin from "./views/UserLogin.vue";
import UserRegister from "./views/UserRegister.vue";
import { useI18n } from 'vue-i18n'; // 引入 useI18n

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
    const { locale, t } = useI18n(); // 解构出 locale 和 t

    const showLoginDialog = ref(false);
    const showRegisterDialog = ref(false);

    // Close login dialog
    const closeLoginDialog = () => {
      showLoginDialog.value = false;
    };

    // Close register dialog
    const closeRegisterDialog = () => {
      showRegisterDialog.value = false;
    };

    // Authentication and role information
    const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
    const userRole = computed(() => store.getters["auth/userRole"]);

    // 左侧菜单项
    const items = computed(() => [
      {
        label: t('menu.home'),
        icon: "pi pi-fw pi-home",
        command: () => router.push("/"),
      },
      {
        label: t('menu.news'),
        icon: "pi pi-fw pi-info-circle",
        command: () => router.push("/news"),
      },
      {
        label: t('menu.course_info'),
        icon: "pi pi-fw pi-info-circle",
        command: () => router.push("/course-info"),
      },
    ]);

    // 右侧认证菜单项
    const authItems = computed(() => {
      const menuItems = [];

      if (!isAuthenticated.value || userRole.value === "guest") {
        menuItems.push(
          {
            label: t('menu.login'),
            icon: "pi pi-fw pi-sign-in",
            command: () => (showLoginDialog.value = true),
          },
          {
            label: t('menu.register'),
            icon: "pi pi-fw pi-user-plus",
            command: () => (showRegisterDialog.value = true),
          }
        );
      } else {
        if (userRole.value === "user") {
          menuItems.push(
            { label: t('menu.booking'), icon: "pi pi-fw pi-pencil", command: () => router.push("/booking") },
            { label: t('menu.personal_info'), icon: "pi pi-fw pi-user", command: () => router.push("/personal-info") }
          );
        } else if (userRole.value === "admin") {
          menuItems.push(
            { label: t('menu.edit_courses'), icon: "pi pi-fw pi-calendar", command: () => router.push("/courses") },
            { label: t('menu.crm'), icon: "pi pi-fw pi-users", command: () => router.push("/crm") },
            { label: t('menu.order_management'), icon: "pi pi-fw pi-list", command: () => router.push("/admin/orders") }
          );
        }

        // 添加登出选项给已认证用户
        menuItems.push({
          label: t('menu.logout'),
          icon: "pi pi-fw pi-sign-out",
          command: async () => {
            await store.dispatch("auth/logout");
            router.push("/"); // 登出后重定向
          },
        });
      }

      return menuItems;
    });

    // 当前语言
    const currentLocale = ref(localStorage.getItem('language') || 'zh');

    // 语言切换方法
    const changeLanguage = (event) => {
      const selectedLanguage = event.target.value;
      locale.value = selectedLanguage; // 更新 i18n 的语言
      localStorage.setItem('language', selectedLanguage); // 保存语言到 localStorage
      currentLocale.value = selectedLanguage; // 更新当前语言状态
    };

    // 监听当前语言改变，并保持 localStorage 更新
    watch(locale, (newLocale) => {
      localStorage.setItem('language', newLocale);
    });

    return {
      items,
      authItems,
      showLoginDialog,
      showRegisterDialog,
      closeLoginDialog,
      closeRegisterDialog,
      changeLanguage,
      currentLocale,
    };
  },
};
</script>


<style scoped>
.auth-and-lang {
  display: flex;
  align-items: center;
  gap: 10px; /* 調整按鈕和選擇器之間的距離 */
}

.language-selector {
  padding: 5px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ddd;
}
</style>
