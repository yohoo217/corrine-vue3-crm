<template>
  <div id="app">
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
  </div>
</template>

<script>
import { ref } from 'vue';
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
}

body {
  margin: 0;
  padding: 0;
}
</style>