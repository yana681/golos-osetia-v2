<script setup>
import { useRouter } from 'vue-router'
import ProfileHeader from '../components/profile/ProfileHeader.vue'
import ProfileStats from '../components/profile/ProfileStats.vue'
import ProfileTabs from '../components/profile/ProfileTabs.vue'
import UserReports from '../components/profile/UserReports.vue'

const router = useRouter()

const goToReportProblem = () => {
  router.push({ name: 'report-problem' })
}
</script>

<template>
  <div class="profile-page">
    <div class="profile-container">
      <ProfileHeader />
      <ProfileStats />
      
      <ProfileTabs />
      <UserReports />
      
      <div class="bottom-banner">
        <div class="banner-left">
          <div class="banner-icon">☁️</div>
          <div>
            <h3>Заметили проблему?</h3>
            <p>Сообщите нам – вместе сделаем город лучше!</p>
          </div>
        </div>
        <button class="banner-btn" @click="goToReportProblem">Сообщить о проблеме</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  width: 100%;
  background: #f4f6f3;
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
  color: #2c3e29;
}

.banner-left p {
  margin: 0;
  color: #7a8a77;
  font-size: 14px;
}

.banner-btn {
  background: #4a6b41;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 28px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.banner-btn:hover {
  background: #3b5433;
}
</style>