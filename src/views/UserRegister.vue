<template>
  <div class="register-container">
    <h2 class="register-title">{{ $t('user_register.title') }}</h2>
    <form @submit.prevent="register" class="register-form">
      <div class="input-group">
        <label for="username">{{ $t('user_register.username_label') }}</label>
        <InputText
          v-model="username"
          type="text"
          id="username"
          :placeholder="$t('user_register.username_placeholder')"
          required
        />
      </div>
      <div class="input-group">
        <label for="email">{{ $t('user_register.email_label') }}</label>
        <InputText
          v-model="email"
          type="email"
          id="email"
          :placeholder="$t('user_register.email_placeholder')"
          required
        />
      </div>
      <div class="input-group">
        <label for="password">{{ $t('user_register.password_label') }}</label>
        <InputText
          v-model="password"
          type="password"
          id="password"
          :placeholder="$t('user_register.password_placeholder')"
          required
        />
      </div>
      <div class="button-group">
        <Button
          :label="$t('user_register.submit')"
          type="submit"
          icon="pi pi-user-plus"
          class="p-button-primary"
        />
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
import { useI18n } from 'vue-i18n';

export default {
  name: 'UserRegister',
  props: ['onClose'],
  components: {
    InputText,
    Button,
  },
  setup(props) {
    const router = useRouter();
    const { t } = useI18n();

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
        alert(t('user_register.success'));
        props.onClose();
        router.push('/login');
      } catch (error) {
        alert(error.response?.data?.error || t('user_register.error'));
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
