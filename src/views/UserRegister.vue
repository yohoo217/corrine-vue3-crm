<template>
    <div>
      <h2>註冊</h2>
      <form @submit.prevent="register">
        <input v-model="username" type="text" placeholder="用戶名" required />
        <input v-model="email" type="email" placeholder="電子郵件" required />
        <input v-model="password" type="password" placeholder="密碼" required />
        <button type="submit">註冊</button>
      </form>
    </div>
  </template>
  
  <script>
import apiClient from '../api/config';
import { useRouter } from 'vue-router';
import { ref } from 'vue';


export default {
  name: 'UserRegister',
  setup() {
    const router = useRouter();

    const username = ref('');
    const email = ref('');
    const password = ref('');

    const register = async () => {
      try {
        await apiClient.post('/users/register', {
          username: username.value,
          email: email.value,
          password: password.value,
        });
        alert('註冊成功，請登入');
        router.push('/login');
      } catch (error) {
        alert(error.response.data.error);
      }
    };

    return {
      username,
      email,
      password,
      register,
    };
  },
};
</script>