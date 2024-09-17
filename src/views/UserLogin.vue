<template>
    <div>
      <h2>登入</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="電子郵件" required />
        <input v-model="password" type="password" placeholder="密碼" required />
        <button type="submit">登入</button>
      </form>
    </div>
  </template>
  
  <script>
import apiClient from '../api/config';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  name: 'UserLogin',
  setup() {
    const store = useStore();
    const router = useRouter();

    const email = ref('');
    const password = ref('');

    const login = async () => {
      try {
        const response = await apiClient.post('/users/login', {
          email: email.value,
          password: password.value,
        });
        store.dispatch('auth/login', response.data.token);
        router.push('/');
      } catch (error) {
        alert(error.response.data.error);
      }
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>
  