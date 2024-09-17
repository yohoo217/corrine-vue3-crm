<template>
    <div class="personal-info">
      <h2>個人資料</h2>
      <div v-if="user">
        <p><strong>姓名：</strong> {{ user.username }}</p>
        <p><strong>電子郵件：</strong> {{ user.email }}</p>
        <!-- 可以根据需要添加更多用户信息 -->
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
  
      const fetchUserInfo = async () => {
        try {
          const response = await apiClient.get('/users/me', {
            headers: {
              Authorization: `Bearer ${store.state.auth.token}`, // 添加 token 进行身份验证
            },
          });
          user.value = response.data;
        } catch (error) {
          console.error('Failed to fetch user information:', error);
        }
      };
  
      onMounted(() => {
        fetchUserInfo();
      });
  
      return {
        user,
      };
    },
  };
  </script>
  
  <style scoped>
  .personal-info {
    padding: 20px;
  }
  </style>
  