<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import ProfileHeader from '../components/profile/ProfileHeader.vue'
import ProfileStats from '../components/profile/ProfileStats.vue'
import ProfileTabs from '../components/profile/ProfileTabs.vue'
import UserReports from '../components/profile/UserReports.vue'

const router = useRouter()

// ✅ Данные пользователя из localStorage
const userData = ref(null)

// Проверяем, авторизован ли пользователь
const isAuthenticated = computed(() => {
  return userData.value !== null
})

// Загружаем данные из localStorage при монтировании
onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      userData.value = JSON.parse(storedUser)
    } catch (e) {
      console.error('Ошибка парсинга данных пользователя:', e)
      localStorage.removeItem('user')
    }
  }
  
  // Если пользователь не авторизован - перенаправляем на страницу входа
  if (!isAuthenticated.value) {
    router.push('/login')
  }
})

const goToReportProblem = () => {
  router.push({ name: 'report-problem' })
}

// Функция для выхода из системы
const logout = () => {
  localStorage.removeItem('user')
  userData.value = null
  router.push('/login')
}
</script>

<template>
  <div v-if="isAuthenticated" class="profile-page">
    <div class="profile-container">
      <!-- Передаём данные пользователя в ProfileHeader -->
      <ProfileHeader :user="userData" />
      <ProfileStats />
      
      <ProfileTabs />
      <UserReports />
      
      <div class="bottom-banner">
        <div class="banner-left">
          <div class="banner-icon">🌿</div>
          <div>
            <h3>Заметили проблему?</h3>
            <p>Сообщите нам – вместе сделаем город лучше!</p>
          </div>
        </div>
        <div class="banner-buttons">
          <button class="banner-btn" @click="goToReportProblem">Сообщить о проблеме</button>
          <button class="banner-btn logout-btn" @click="logout">Выйти</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  width: 100%;
  background-color: #F1DFCB;;
  min-height: 100vh;
  padding: 40px 20px;
  box-sizing: border-box;
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.bottom-banner {
  background: #fdfcf9;
  border: 2px dashed #d1ded0;
  border-radius: 20px;
  padding: 25px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.banner-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.banner-icon {
  font-size: 35px;
  color: #4d7c3f;
}

.banner-left h3 {
  margin: 0 0 5px 0;
  font-size: 20px;
  margin-top: 20px;
  font-family: "Montserrat";
  color: #2c3e29;
}

.banner-left p {
  margin-top: -5px;
  color: #7a8a77;
  font-size: 14px;
  font-family: "montserrat";
}

.banner-buttons {
  display: flex;
  gap: 12px;
}

.banner-btn {
  background: #386633;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 5px 28px;
  font-weight: 600;
  cursor: pointer;
  font-family: "Montserrat";
  transition: 0.2s;
}

.banner-btn:hover {
  background: #386633;
}

.logout-btn {
  background: #ee4836;
}

.logout-btn:hover {
  background: #f1685b;
}
</style>