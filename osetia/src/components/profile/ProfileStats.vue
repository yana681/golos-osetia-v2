
<template>
  <div class="stats-container">
    <div class="stat-item">
      <div class="stat-icon-wrapper" style="background: rgba(56, 102, 51, 0.08);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3d5a35" stroke-width="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <line x1="9" y1="10" x2="15" y2="10"/>
        </svg>
      </div>
      <div class="stat-content">
        <h2 class="stat-number">{{ totalReports }}</h2>
        <div class="stat-label">Всего заявок</div>
        <div class="stat-sub">Вы оставили</div>
      </div>
    </div>
    
    <div class="stat-item">
      <div class="stat-icon-wrapper" style="background: rgba(130, 89, 64, 0.08);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#825940" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <div class="stat-content">
        <h2 class="stat-number resolved">{{ resolvedCount }}</h2>
        <div class="stat-label">Решено</div>
        <div class="stat-sub">Спасибо за активность!</div>
      </div>
    </div>
    
    <div class="stat-item">
      <div class="stat-icon-wrapper" style="background: rgba(47, 128, 237, 0.08);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2f80ed" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>
      <div class="stat-content">
        <h2 class="stat-number in-progress">{{ inProgressCount }}</h2>
        <div class="stat-label">В работе</div>
        <div class="stat-sub">Следим за ситуацией</div>
      </div>
    </div>
    
    <div class="stat-item">
      <div class="stat-icon-wrapper" style="background: rgba(235, 87, 87, 0.08);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eb5757" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <div class="stat-content">
        <h2 class="stat-number rejected">{{ rejectedCount }}</h2>
        <div class="stat-label">Отклонено</div>
        <div class="stat-sub">Требуют доработки</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { authService } from '../../services/auth.services.js'

const totalReports = ref(0)
const resolvedCount = ref(0)
const inProgressCount = ref(0)
const rejectedCount = ref(0)
const isLoading = ref(false)

// ✅ Загрузка статистики
const loadStats = async () => {
  isLoading.value = true
  try {
    const response = await authService.getUserReports()
    
    if (response.success) {
      const reports = response.reports
      
      // Подсчитываем статистику
      totalReports.value = reports.length
      resolvedCount.value = reports.filter(r => r.status === 'resolved').length
      inProgressCount.value = reports.filter(r => r.status === 'in-progress').length
      rejectedCount.value = reports.filter(r => r.status === 'rejected').length
    }
  } catch (error) {
    console.error('Ошибка загрузки статистики:', error)
  } finally {
    isLoading.value = false
  }
}

// ✅ Загружаем при монтировании
onMounted(() => {
  loadStats()
})

// ✅ Слушаем событие обновления (если нужно)
// Можно добавить событие, которое будет вызываться при создании новой заявки
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Podkova:wght@400;600;700;800&family=Montserrat:wght@200;300;400;500;600;700&display=swap');

.stats-container {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 28px 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 32px;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
}

.stat-item:last-child {
  border-right: none;
}

.stat-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.stat-item:hover .stat-icon-wrapper {
  transform: scale(1.05);
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-number {
  margin: 0;
  font-family: 'Podkova', serif;
  font-size: 32px;
  font-weight: 700;
  color: #2c3e29;
  line-height: 1.1;
}

.stat-number.resolved {
  color: #825940;
}

.stat-number.in-progress {
  color: #2f80ed;
}

.stat-number.rejected {
  color: #eb5757;
}

.stat-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #2c3e29;
  margin-top: 2px;
}

.stat-sub {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #90a08d;
  margin-top: -2px;
}

@media (max-width: 992px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 24px;
  }
  
  .stat-item {
    border-right: none;
    padding: 0 16px;
  }
  
  .stat-item:nth-child(2) {
    border-right: none;
  }
}

@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .stat-item {
    padding: 0;
  }
}
</style>

