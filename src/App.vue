<template>
  <div id="app">
    <ErrorBoundary>
    <p>Debug: App.vue is rendering</p>
    <Menubar :model="items">
      <template #start>
        <img alt="Logo" src="@/assets/logo.png" height="40" class="mr-2" />
      </template>
      <template #end>
        <InputText placeholder="Search" type="text" />
      </template>
    </Menubar>
    <router-view></router-view>
    <Toast />  <!-- 添加這行 -->
    <ConfirmDialog></ConfirmDialog>  <!-- 添加這行 -->
  </ErrorBoundary>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'



export default {
  name: 'App',
  components: {
    Menubar,
    Toast,
    ConfirmDialog,
    InputText
  },
  setup() {
    const store = useStore();
    const items = ref([
      {
        label: '首頁',
        icon: 'pi pi-fw pi-home',
        to: '/'
      },
      {
        label: '課程',
        icon: 'pi pi-fw pi-calendar',
        to: '/courses'
      },
      {
        label: '預約',
        icon: 'pi pi-fw pi-pencil',
        to: '/booking'
      },
      {
        label: 'CRM',
        icon: 'pi pi-fw pi-users',
        to: '/crm'
      }
    ]);
    onMounted(() => {
      store.dispatch('courses/fetchCourses');
    });

    return { items };
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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