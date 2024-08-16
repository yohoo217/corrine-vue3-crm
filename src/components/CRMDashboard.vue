<!-- src/components/CRMDashboard.vue -->
<template>
    <div class="crm-dashboard">
      <h2>客戶關係管理</h2>
      <TabView>
        <TabPanel header="客戶列表">
          <DataTable :value="customers" :paginator="true" :rows="10">
            <Column field="id" header="ID"></Column>
            <Column field="name" header="姓名"></Column>
            <Column field="email" header="電子郵件"></Column>
            <Column field="phone" header="電話"></Column>
            <Column field="lastContact" header="最後聯繫"></Column>
          </DataTable>
        </TabPanel>
        <TabPanel header="預約統計">
          <Chart type="bar" :data="bookingStats" :options="chartOptions" />
        </TabPanel>
      </TabView>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import TabView from 'primevue/tabview';
  import TabPanel from 'primevue/tabpanel';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Chart from 'primevue/chart';
  
  export default {
    name: 'CRMDashboard',
    components: {
      TabView,
      TabPanel,
      DataTable,
      Column,
      Chart
    },
    setup() {
      const customers = ref([
        { id: 1, name: '王小明', email: 'wang@example.com', phone: '1234567890', lastContact: '2024-08-01' },
        { id: 2, name: '李小花', email: 'li@example.com', phone: '0987654321', lastContact: '2024-08-05' },
        // 添加更多客戶...
      ]);
  
      const bookingStats = ref({
        labels: ['Vue.js 基礎', 'React 進階', 'Python 入門', 'Java 大師班'],
        datasets: [
          {
            label: '預約人數',
            data: [65, 59, 80, 81],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
          }
        ]
      });
  
      const chartOptions = ref({
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '課程預約統計'
          }
        }
      });
  
      return {
        customers,
        bookingStats,
        chartOptions
      };
    }
  }
  </script>