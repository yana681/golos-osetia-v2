<template>
  <div class="login-page">
    <div class="login-bg-image"></div>
    <div class="login-overlay"></div>

    <div class="login-form-container">
      <form class="login-form" @submit.prevent>
        <h1 class="form-title">Голос Осетии</h1>
        <p class="form-subtitle">Вход в личный кабинет</p>

        <div class="input-group">
          <input type="email" placeholder="Электронная почта" class="form-input" required />
        </div>

        <div class="input-group">
          <input type="password" placeholder="Пароль" class="form-input" required />
        </div>

        <div class="form-options">
          <a href="#" class="forgot-link">Забыли пароль?</a>
        </div>

        <button type="submit" class="login-btn">Войти</button>

        <div class="register-link">
          Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
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
  /* фон с размытием (Glassmorphism) */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px; 
  padding: 50px 40px;
  z-index: 3;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.form-title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 36px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 8px;
}

.form-subtitle {
  font-family: 'Playfair Display', serif;
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
  font-family: 'Playfair Display', serif;
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
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
}

.login-btn:hover {
  background-color: rgba(120, 63, 28, 1);
}

.register-link {
  margin-top: 25px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.register-link a {
  color: #ffffff;
  font-weight: 700;
  text-decoration: none;
}
</style>