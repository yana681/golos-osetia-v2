<template>
  <div class="login-page">
    <div class="login-bg-image"></div>
    <div class="login-overlay"></div>

    <div class="login-form-container">
      <form class="login-form" @submit.prevent="handleLogin">
        <h1 class="form-title">Голос Осетии</h1>
        <p class="form-subtitle">Вход в личный кабинет</p>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div class="input-group">
          <input 
            type="email" 
            placeholder="Электронная почта" 
            class="form-input" 
            v-model="form.email"
            required 
          />
        </div>

        <div class="input-group">
          <input 
            type="password" 
            placeholder="Пароль" 
            class="form-input" 
            v-model="form.password"
            required 
          />
        </div>

        <div class="form-options">
          <a href="#" class="forgot-link">Забыли пароль?</a>
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>

        <div class="register-link">
          Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const auth = useAuth();
const loading = ref(false);
const errorMessage = ref("");

const form = reactive({
  email: "",
  password: ""
});

const handleLogin = async () => {
  errorMessage.value = "";
  loading.value = true;

  try {
    const response = await auth.login({
      email: form.email,
      password: form.password
    });

    if (response.success) {
      localStorage.setItem('user', JSON.stringify(response.user));
      
      // ✅ Проверяем, есть ли сохранённый URL для редиректа
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin')
      
      if (redirectUrl) {
        sessionStorage.removeItem('redirectAfterLogin')
        router.push(redirectUrl)
      } else if (response.user.role === 'admin') {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    } else {
      errorMessage.value = response.error || "Ошибка при входе";
    }
  } catch (error) {
    console.error("Ошибка входа:", error);
    errorMessage.value = error.message || "Произошла ошибка при входе";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.login-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/src/assets/vladikavkaz.jpg');
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.login-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 2;
}

.login-form-container {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 50px 40px;
  z-index: 3;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.form-title {
  font-family: 'Podkova', serif;
  font-weight: 700;
  font-size: 36px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 8px;
}

.form-subtitle {
  font-family: 'Montserrat', serif;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 40px;
}

.input-group {
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  height: 52px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 0 15px;
  color: #fff;
  font-family: 'Montserrat', serif;
  font-size: 16px;
  outline: none;
  transition: 0.3s;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-input:focus {
  background: rgba(255, 255, 255, 0.25);
  border-color: #ffffff;
}

.form-options {
  text-align: right;
  margin-bottom: 30px;
  font-family: "montserrat";
}

.forgot-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
}

.login-btn {
  width: 100%;
  height: 51px;
  background-color: rgba(130, 89, 64, 1);
  border: none;
  border-radius: 20px;
  color: #ffffff;
  font-family: 'Montserrat', serif;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
}

.login-btn:hover {
  background-color: rgba(120, 63, 28, 1);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.register-link {
  margin-top: 25px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-family: "Montserrat";
}

.register-link a {
  color: #ffffff;
  font-weight: 500;
  text-decoration: none;
}

.error-message {
  background-color: rgba(220, 53, 69, 0.9);
  color: white;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Montserrat', serif;
  font-size: 14px;
}
</style>