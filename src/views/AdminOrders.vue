<template>
  <div>
    <h1>訂單管理</h1>
    <table>
      <thead>
        <tr>
          <th>訂單 ID</th>
          <th>客戶名稱</th>
          <th>客戶 Email</th>
          <th>課程名稱</th>
          <th>訂單日期</th>
          <th>付款狀態</th> <!-- 新增的欄位 -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order._id }}</td>
          <td>{{ order.customer.name }}</td>
          <td>{{ order.customer.email }}</td>
          <td>{{ order.course.name }}</td>
          <td>{{ new Date(order.date).toLocaleString() }}</td>
          <td>{{ order.paymentStatus }}</td> <!-- 顯示付款狀態 -->
        </tr>
      </tbody>
    </table>
    <p v-if="orders.length === 0">目前無訂單資料</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "AdminOrders",
  setup() {
    const orders = ref([]);

    onMounted(async () => {
      try {
        // 從 localStorage 中獲取 token
        const token = localStorage.getItem("token");

        // 發送請求，並在 headers 中添加 Authorization
        const response = await axios.get("/bookings/admin/orders", {
          headers: {
            Authorization: `Bearer ${token}`, // 添加 token
          },
        });
        orders.value = response.data;
      } catch (error) {
        console.error("無法獲取訂單數據:", error);
      }
    });

    return {
      orders,
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}
</style>
