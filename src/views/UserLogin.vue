<template>
  <div class="login-container">
    <h2 class="login-title">登入</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="input-group">
        <label for="email">電子郵件</label>
        <InputText v-model="email" type="email" id="email" placeholder="請輸入您的電子郵件" required />
      </div>
      <div class="input-group">
        <label for="password">密碼</label>
        <InputText v-model="password" type="password" id="password" placeholder="請輸入您的密碼" required />
      </div>
      <div class="button-group">
        <Button label="登入" type="submit" icon="pi pi-sign-in" class="p-button-primary" />
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import apiClient from '../api/config';

export default {
  name: 'UserLogin',
  props: ['onClose'], // 接收父組件傳遞的關閉方法
  components: {
    InputText,
    Button,
  },
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

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-group label {
  font-weight: bold;
  color: #555;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.p-button-primary {
  width: 100%;
}
</style>
