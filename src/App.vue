<template>
  <div id="app">
    <ErrorBoundary>
      <p>Debug: App.vue is rendering</p>
      <Menubar :model="items">
        <template #start>
          <img
            alt="Logo"
            src="https://static.ottercdn.com/trek/media/8371159a-d4c1-40f3-a413-704b12a2e7b8.png"
            height="40"
            class="mr-2"
          />
        </template>
        <!-- <template #end>輸入欄好像用不到
          <InputText placeholder="Search" type="text" />
        </template> -->
      </Menubar>
      <router-view></router-view>
      <SiteFooter /> <!-- 使用 SiteFooter 組件 -->
      <Toast />
      <!-- 添加這行 -->
      <ConfirmDialog></ConfirmDialog>
      <!-- 添加這行 -->
    </ErrorBoundary>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import Menubar from "primevue/menubar";
import SiteFooter from './components/SiteFooter.vue';
// import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import { useRouter } from "vue-router";

export default {
  name: "App",
  components: {
    Menubar,
    SiteFooter,
    Toast,
    ConfirmDialog,
    // InputText,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const items = ref([
      {
        label: "首頁",
        icon: "pi pi-fw pi-home",
        command: () => {
          router.push("/");
        },
      },
      {
        label: '最新消息',  // 新增最新消息的選項
        icon: 'pi pi-fw pi-info-circle',
        command: () => {
          router.push('/news'); // 指定導向的路徑
        },
      },
      {
        label: "課程資訊", // 新增的選項
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
    ]);

    onMounted(() => {
      store.dispatch("courses/fetchCourses");
    });

    return { items };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

/* 添加这些样式 */
.booking-page {
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
}

body {
  margin: 0;
  padding: 0;
}

.p-field {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}
</style>
