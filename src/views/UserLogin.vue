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
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'UserLogin',
  props: ['onClose'], // 接收父組件傳遞的關閉方法
  setup(props) {
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
        // 将 token 和 role 传递给 Vuex
        store.dispatch('auth/login', { token: response.data.token, role: response.data.role });
        props.onClose(); // 成功後調用父組件傳遞的 onClose 方法關閉 popup
        router.push('/'); // 登录成功后跳转
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
