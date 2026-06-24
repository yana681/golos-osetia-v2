<template>
  <section class="subscribe">
    <div class="container">
      <div class="subscribe-banner">
        <div class="banner-left">
          <div class="icon-frame">
            <img src="/src/assets/icons/bell.png" alt="Уведомления" class="bell-icon" />
          </div>
          <div class="text-content">
            <h2 class="banner-title">Будьте в курсе изменений</h2>
            <p class="banner-text">
              Зарегистрируйтесь и получайте важные новости о проблемах и их решениях
            </p>
          </div>
        </div>

        <form class="banner-form" @submit.prevent="handleRegistration">
          <input 
            type="email" 
            v-model="email"
            placeholder="Ваш e-mail" 
            class="email-input" 
            required
          /> 
          <button type="submit" class="submit-btn">
            {{ isAuthenticated ? 'Подписаться' : 'Регистрация' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const isAuthenticated = ref(false)

onMounted(() => {
  const user = localStorage.getItem('user')
  isAuthenticated.value = !!user
})

const handleRegistration = () => {
  if (!isAuthenticated.value) {
    router.push('/register')
    return
  }
  
  console.log('Подписка на email:', email.value)
  alert('Вы успешно подписались на новости!')
  email.value = ''
}
</script>

<style scoped>
.subscribe {
  padding: 80px 0;
  background-color: #F1DFCB;
}

.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 15px;
}

.subscribe-banner {
  background-color: rgba(52, 103, 50, 1);
  border-radius: 50px;
  height: 268px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}

.banner-left {
  display: flex;
  align-items: center;
  gap: 30px;
}

.icon-frame {
  width: 120px;
  height: 120px;
  background-color: #ffffff;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bell-icon {
  width: 60px;
  height: auto;
}

.banner-title {
  font-family: 'Podkova', serif;
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 10px 0;
}

.banner-text {
  font-family: 'Montserrat', serif;
  font-size: 18px;
  color: #ffffff;
  line-height: 1.2;
  margin: 0;
  font-weight: 200;
  max-width: 337px;
}

.banner-form {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 50px;
  height: 70px;
  width: 500px;
  overflow: hidden;
}

.email-input {
  flex: 1;
  border: none;
  background: none;
  padding: 0 30px;
  font-family: 'Montserrat', serif;
  font-size: 18px;
  outline: none;
}

.submit-btn {
  height: 100%;
  padding: 0 40px;
  background-color: rgba(120, 63, 28, 1);
  color: #ffffff;
  border: none;
  font-family: 'Podkova', serif;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.submit-btn:hover {
  background-color: rgba(100, 50, 20, 1);
}
</style>