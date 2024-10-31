<template>
  <div class="order-management">
    <h1>訂單管理</h1>
    <table class="order-table">
      <thead>
        <tr>
          <th class="header">訂單 ID</th>
          <th class="header">客戶名稱</th>
          <th class="header">客戶 Email</th>
          <th class="header">課程名稱</th>
          <th class="header">訂單日期</th>
          <th class="header">付款狀態</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in sortedOrders" :key="order._id">
          <td>{{ order._id }}</td>
          <td>{{ order.customer.name }}</td>
          <td>{{ order.customer.email }}</td>
          <td>{{ order.course.name }}</td>
          <td>{{ new Date(order.date).toLocaleString() }}</td>
          <td :class="getStatusClass(order.paymentStatus)">
            {{ getStatusText(order.paymentStatus) }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="orders.length === 0" class="no-orders">目前無訂單資料</p>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

export default {
  name: "AdminOrders",
  setup() {
    const orders = ref([]);

    onMounted(async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/bookings/admin/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        orders.value = response.data;
      } catch (error) {
        console.error("無法獲取訂單數據:", error);
      }
    });

    const sortedOrders = computed(() => {
      return [...orders.value].sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    const getStatusClass = (status) => {
      switch (status) {
        case 'paid':
          return 'status-paid';
        case 'pending':
          return 'status-pending';
        case 'failed':
          return 'status-failed';
        default:
          return 'status-unknown';
      }
    };

    const getStatusText = (status) => {
      switch (status) {
        case 'paid':
          return '已付款';
        case 'pending':
          return '待付款';
        default:
          return '未知狀態';
      }
    };

    return {
      orders,
      sortedOrders,
      getStatusClass,
      getStatusText,
    };
  },
};
</script>

<style scoped>
.order-management {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #657366;
  color: white;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

.no-orders {
  text-align: center;
  color: #888;
  font-style: italic;
}

/* 付款狀態樣式 */
.status-paid {
  color: #28a745;
  font-weight: bold;
  background-color: #e6f4ea;
  padding: 6px;
  border-radius: 4px;
}
.status-pending {
  color: #ffc107;
  font-weight: bold;
  background-color: #fff8e5;
  padding: 6px;
  border-radius: 4px;
}
.status-failed {
  color: #dc3545;
  font-weight: bold;
  background-color: #f8d7da;
  padding: 6px;
  border-radius: 4px;
}
.status-unknown {
  color: #6c757d;
  font-weight: bold;
  background-color: #e2e3e5;
  padding: 6px;
  border-radius: 4px;
}
</style>
