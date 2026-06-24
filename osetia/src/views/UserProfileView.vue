<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import ProfileHeader from '../components/profile/ProfileHeader.vue'
import ProfileStats from '../components/profile/ProfileStats.vue'
import ProfileTabs from '../components/profile/ProfileTabs.vue'
import UserReports from '../components/profile/UserReports.vue'

const router = useRouter()

const userData = ref(null)

const isAuthenticated = computed(() => {
  return userData.value !== null
})

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser)
      
      // ✅ Проверяем - если админ, перенаправляем в админ-панель
      if (parsedUser.role === 'admin') {
        router.push('/admin')
        return
      }
      
      userData.value = parsedUser
    } catch (e) {
      console.error('Ошибка парсинга данных пользователя:', e)
      localStorage.removeItem('user')
    }
  }
  
  if (!isAuthenticated.value) {
    router.push('/login')
  }
})

const goToReportProblem = () => {
  router.push({ name: 'report-problem' })
}

const logout = () => {
  localStorage.removeItem('user')
  userData.value = null
  router.push('/login')
}
</script>

<template>
  <div v-if="isAuthenticated" class="profile-page">
    <div class="profile-container">
      <ProfileHeader :user="userData" />
      <ProfileStats />
      
      <div class="tabs-wrapper">
        <ProfileTabs />
      </div>
      
      <UserReports />
      
      <div class="bottom-banner">
        <div class="banner-left">
          <div class="banner-icon-wrapper">
            <span class="banner-icon">🌿</span>
          </div>
          <div>
            <h3 class="banner-title">Заметили проблему?</h3>
            <p class="banner-text">Сообщите нам – вместе сделаем город лучше!</p>
          </div>
        </div>
        <div class="banner-buttons">
          <button class="banner-btn primary" @click="goToReportProblem">
            Сообщить о проблеме
          </button>
          <button class="banner-btn secondary" @click="logout">
            Выйти
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Podkova:wght@400;600;700;800&family=Montserrat:wght@200;300;400;500;600;700&display=swap');

.profile-page {
  width: 100%;
  background: #F1DFCB;
  min-height: 100vh;
  padding: 40px 20px 80px 20px;
  box-sizing: border-box;
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.tabs-wrapper {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 8px 24px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.bottom-banner {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 24px;
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  box-shadow: 0 8px 32px rgba(56, 102, 51, 0.06);
  transition: all 0.3s ease;
}

.bottom-banner:hover {
  box-shadow: 0 12px 40px rgba(56, 102, 51, 0.1);
  transform: translateY(-2px);
}

.banner-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.banner-icon-wrapper {
  width: 64px;
  height: 64px;
  background: rgba(56, 102, 51, 0.12);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.banner-icon {
  font-size: 32px;
}

.banner-title {
  margin: 0 0 6px 0;
  font-family: 'Podkova', serif;
  font-size: 22px;
  font-weight: 700;
  color: #2c3e29;
}

.banner-text {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  color: #6a7a67;
  font-weight: 400;
}

.banner-buttons {
  display: flex;
  gap: 12px;
}

.banner-btn {
  border: none;
  border-radius: 14px;
  padding: 14px 32px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.banner-btn.primary {
  background: #4a6b41;
  color: white;
}

.banner-btn.primary:hover {
  background: #3b5a33;
  transform: scale(1.02);
  box-shadow: 0 4px 16px rgba(74, 107, 65, 0.3);
}

.banner-btn.secondary {
  background: rgba(130, 89, 64, 0.12);
  color: #825940;
}

.banner-btn.secondary:hover {
  background: rgba(130, 89, 64, 0.2);
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .bottom-banner {
    flex-direction: column;
    gap: 20px;
    padding: 24px;
    text-align: center;
  }
  
  .banner-left {
    flex-direction: column;
    text-align: center;
  }
  
  .banner-buttons {
    flex-direction: column;
    width: 100%;
  }
  
  .banner-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>