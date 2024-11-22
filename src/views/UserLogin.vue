<!-- src/views/UserLogin.vue -->
<template>
  <div class="login-container">
    <h2 class="login-title">{{ $t("user_login.title") }}</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="input-group">
        <label for="email">{{ $t("user_login.email_label") }}</label>
        <InputText
          v-model="email"
          type="email"
          id="email"
          :placeholder="$t('user_login.email_placeholder')"
          required
        />
      </div>
      <div class="input-group">
        <label for="password">{{ $t("user_login.password_label") }}</label>
        <InputText
          v-model="password"
          type="password"
          id="password"
          :placeholder="$t('user_login.password_placeholder')"
          required
        />
      </div>
      <div class="button-group">
        <Button
          :label="$t('user_login.submit')"
          type="submit"
          icon="pi pi-sign-in"
          class="p-button-primary"
        />
      </div>
      <div class="google-login">
        <Button
          type="button"
          label="Login with Google"
          icon="pi pi-google"
          class="p-button-success"
          @click="loginWithGoogle"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import apiClient from "../api/config";
import { useI18n } from "vue-i18n";
import axios from "axios";

export default {
  name: "UserLogin",
  props: ["onClose"],
  components: {
    InputText,
    Button,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n();

    const email = ref("");
    const password = ref("");

    const login = async () => {
      try {
        const response = await apiClient.post("/users/login", {
          email: email.value,
          password: password.value,
        });
        store.dispatch("auth/login", {
          token: response.data.token,
          role: response.data.role,
        });
        props.onClose();
        router.push("/");
      } catch (error) {
        console.error('Login failed:', error); // 增加詳細日誌
        console.error('Response data:', error.response?.data); // 查看後端返回的錯誤訊息
        alert(t("user_login.login_failed"));
      }
    };

    const loginWithGoogle = async () => {
      try {
        console.log("Login with Google button clicked");
        window.location.href = `${axios.defaults.baseURL}/users/google-login`;
      } catch (error) {
        console.error("Error in loginWithGoogle:", error);
        alert(t("user_login.google_login_failed"));
      }
    };

    return {
      email,
      password,
      login,
      loginWithGoogle,
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
