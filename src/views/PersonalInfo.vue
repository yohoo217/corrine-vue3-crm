<template>
  <div class="personal-info">
    <h2>個人資料</h2>
    <div v-if="user">
      <p><strong>姓名：</strong> {{ user.username }}</p>
      <p><strong>電子郵件：</strong> {{ user.email }}</p>

      <!-- 顯示用戶訂的課程 -->
      <h3>已訂課程：</h3>
      <ul v-if="bookings.length > 0">
        <li v-for="booking in bookings" :key="booking._id">
          課程名稱：{{ booking.course?.name }} (預約日期：{{ new Date(booking.date).toLocaleString() }})
        </li>
      </ul>
      <p v-else>尚無預約課程。</p>
    </div>
    <div v-else>
      <p>正在加载用户资料...</p>
    </div>
  </div>
</template>

<script>
import apiClient from '../api/config';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
name: 'PersonalInfo',
setup() {
  const store = useStore();
  const user = ref(null);
  const bookings = ref([]);

  const fetchUserInfo = async () => {
    try {
      const response = await apiClient.get('/users/me', {
        headers: {
          Authorization: `Bearer ${store.state.auth.token}`,
        },
      });
      user.value = response.data;

      // Fetch bookings for the user
      const bookingResponse = await apiClient.get(`/bookings/user/${response.data._id}`, {
        headers: {
          Authorization: `Bearer ${store.state.auth.token}`,
        },
      });
      bookings.value = bookingResponse.data;
    } catch (error) {
      console.error('Failed to fetch user information or bookings:', error);
    }
  };

  onMounted(() => {
    fetchUserInfo();
  });

  return {
    user,
    bookings,
  };
},
};
</script>

<style scoped>
.personal-info {
padding: 20px;
}
</style>
