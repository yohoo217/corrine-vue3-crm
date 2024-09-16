<template>
  <div class="home-page">
    <p>Debug: HomePage is rendering</p>
    <div class="p-d-flex p-jc-center">
      <div class="p-mr-2">
        <h1>歡迎來到課程管理系統</h1>
        <p>探索我們的課程，進行預約，或查看客戶關係管理系統。</p>
      </div>
    </div>
    <div class="p-grid p-mt-4">
      <div class="p-col-4">
        <Card>
          <template #header>
            <img alt="課程" src="path_to_your_image/courses.jpg" />
          </template>
          <template #title>
            課程列表
          </template>
          <template #content>
            瀏覽我們提供的所有課程。
          </template>
          <template #footer>
            <Button label="查看課程" icon="pi pi-check" @click="$router.push('/courses')" />
          </template>
        </Card>
      </div>
      <div class="p-col-4">
        <Card>
          <template #header>
            <img alt="預約" src="path_to_your_image/booking.jpg" />
          </template>
          <template #title>
            課程預約
          </template>
          <template #content>
            輕鬆預約您感興趣的課程。
          </template>
          <template #footer>
            <Button label="預約課程" icon="pi pi-calendar" @click="$router.push('/booking')" />
          </template>
        </Card>
      </div>
      <div class="p-col-4">
        <Card>
          <template #header>
            <img alt="CRM" src="path_to_your_image/crm.jpg" />
          </template>
          <template #title>
            客戶關係管理
          </template>
          <template #content>
            管理客戶信息和預約統計。
          </template>
          <template #footer>
            <Button label="進入 CRM" icon="pi pi-users" @click="$router.push('/crm')" />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';

export default defineComponent({
  name: 'HomePage',
  components: {
    Card,
    Button
  },
  setup() {
    // 如果需要，可以在這裡添加更多邏輯
    return {};
  }
});
</script>

<style scoped>
.home-page {
  padding: 2rem;
}
</style>