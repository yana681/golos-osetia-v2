<template>
  <div class="register-page">
    <div class="register-bg-image"></div>
    <div class="register-overlay"></div>

    <div class="register-form-container">
      <form class="register-form" @submit.prevent="handleSubmit">
        <h1 class="form-title">Голос Осетии</h1>
        <p class="form-subtitle">Создание нового аккаунта</p>

        <!-- Сообщение об успехе -->
        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <!-- Сообщение об ошибке -->
        <div v-if="auth.error.value" class="error-message">
          {{ auth.error.value }}
        </div>

        <div class="input-group">
          <input
            type="text"
            placeholder="Имя и фамилия"
            class="form-input"
            v-model="form.username"
            required
          />
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

        <div class="password-row">
          <div class="input-group">
            <input
              type="password"
              placeholder="Пароль"
              class="form-input"
              v-model="form.password"
              required
            />
          </div>
          <div class="input-group">
            <input
              type="password"
              placeholder="Повторите пароль"
              class="form-input"
              v-model="form.passwordConfirm"
              required
            />
          </div>
        </div>

        <div class="form-terms">
          <label class="terms-label">
            <input type="checkbox" required class="terms-checkbox" />
            <span>Я согласен с <a href="#">условиями использования</a></span>
          </label>
        </div>

        <button type="submit" class="register-btn" :disabled="auth.loading.value">
          {{ auth.loading.value ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>

        <div class="login-link">
          Уже есть аккаунт? <router-link to="/login">Войти</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const auth = useAuth();
const successMessage = ref("");

const form = reactive({
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
});

const handleSubmit = async () => {
  auth.clearError();
  successMessage.value = "";

  if (form.password !== form.passwordConfirm) {
    auth.error.value = "Пароли не совпадают";
    return;
  }

  if (form.username.length < 3) {
    auth.error.value = "Имя пользователя должно быть минимум 3 символа";
    return;
  }

  try {
    const response = await auth.register({
      username: form.username,
      email: form.email,
      password: form.password,
    });

    successMessage.value = "Регистрация успешна! Сейчас вы будете перенаправлены на страницу входа...";

    // Очищаем форму
    Object.assign(form, {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });

    // ✅ Перенаправляем на страницу входа через 2 секунды
    setTimeout(() => {
      router.push('/login');
    }, 2000);

  } catch (error) {
    console.error("Ошибка:", error);
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,300..700;1,300..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Pochaevsk&family=Podkova:wght@400..800&family=Poiret+One&display=swap");

.register-page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.register-bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/src/assets/vladikavkaz.jpg");
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.register-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.register-form-container {
  position: relative;
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 45px 40px;
  z-index: 3;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.form-title {
  font-family: "Podkova", serif;
  font-weight: 700;
  font-size: 36px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 8px;
}

.form-subtitle {
  font-family: "Montserrat", serif;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 35px;
}

.input-group {
  margin-bottom: 18px;
}

.form-input {
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 0 15px;
  color: #fff;
  font-family: "Montserrat", serif;
  font-size: 15px;
  outline: none;
  transition: 0.3s;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.password-row {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 18px;
  width: 100%;
}

.password-row .input-group {
  flex: 1;
  margin-bottom: 0;
  min-width: 0;
}

.form-terms {
  margin-bottom: 25px;
}

.terms-label {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  cursor: pointer;
  font-family: "Montserrat";
}

.terms-checkbox {
  cursor: pointer;
}

.terms-label a {
  color: #ffffff;
  text-decoration: underline;
}

.register-btn {
  width: 100%;
  height: 51px;
  background-color: rgba(130, 89, 64, 1);
  border: none;
  border-radius: 20px;
  color: #ffffff;
  font-family: "Montserrat", serif;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 20px;
}

.register-btn:hover {
  background-color: rgba(120, 63, 28, 1);
}

.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-family: "montserrat";
}

.login-link a {
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

.success-message {
  background-color: rgba(46, 204, 113, 0.9);
  color: white;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Montserrat', serif;
  font-size: 14px;
}

@media (max-width: 480px) {
  .password-row {
    flex-direction: column;
    gap: 10px;
  }
}
</style>