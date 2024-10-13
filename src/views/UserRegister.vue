<template>
  <div class="register-container">
    <h2 class="register-title">註冊</h2>
    <form @submit.prevent="register" class="register-form">
      <div class="input-group">
        <label for="username">用戶名</label>
        <InputText v-model="username" type="text" id="username" placeholder="請輸入您的用戶名" required />
      </div>
      <div class="input-group">
        <label for="email">電子郵件</label>
        <InputText v-model="email" type="email" id="email" placeholder="請輸入您的電子郵件" required />
      </div>
      <div class="input-group">
        <label for="password">密碼</label>
        <InputText v-model="password" type="password" id="password" placeholder="請輸入您的密碼" required />
      </div>
      <div class="button-group">
        <Button label="註冊" type="submit" icon="pi pi-user-plus" class="p-button-primary" />
      </div>
    </form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import apiClient from '../api/config';

export default {
  name: 'UserRegister',
  props: ['onClose'], // 接收父組件傳遞的關閉方法
  components: {
    InputText,
    Button,
  },
  setup(props) {
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
        props.onClose(); // 註冊成功後關閉 popup
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

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.register-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #333;
}

.register-form {
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
