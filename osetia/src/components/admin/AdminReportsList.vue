<template>
  <div>
    <div v-if="isLoading" class="loading-state">
      <p>Загрузка заявок...</p>
    </div>

    <div v-else-if="reports.length > 0" class="admin-grid">
      <div v-for="report in reports" :key="report.id" class="admin-card">
        <div class="card-image-box">
          <img 
            :src="report.photo_url || '/src/assets/placeholder.jpg'" 
            alt="Фото проблемы"
            @error="handleImageError($event, report)"
          >
          <span class="status-badge" :class="report.statusClass">{{ report.statusText }}</span>
        </div>
        
        <div class="card-content">
          <div class="card-meta">
            👤 {{ report.user_name || 'Пользователь' }} | 📍 {{ report.location || 'Адрес не указан' }} | 📅 {{ report.date || 'Дата не указана' }}
          </div>
          <h3>{{ report.title || 'Без названия' }}</h3>
          <p class="description">{{ report.description || 'Описание отсутствует' }}</p>
          
          <div class="admin-actions">
            <label class="action-label">Изменить статус:</label>
            <select 
              :value="report.statusClass" 
              @change="updateStatus(report.id, $event.target.value)" 
              class="status-select"
            >
              <option value="checking">На проверке</option>
              <option value="in-progress">В работе</option>
              <option value="resolved">Решено</option>
              <option value="rejected">Отклонено</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="no-reports" v-else>
      🔎 Заявок по вашему запросу не найдено.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { authService } from '../../services/auth.services.js'

const props = defineProps({
  reports: { type: Array, required: true }
})

const emit = defineEmits(['update-status'])
const isLoading = ref(false)

// ✅ Обработчик ошибки загрузки фото
const handleImageError = (event, report) => {
  console.warn('❌ Ошибка загрузки фото для заявки', report.id, 'URL:', report.photo_url)
  event.target.src = '/src/assets/placeholder.jpg'
}

const updateStatus = async (reportId, newStatus) => {
  try {
    const response = await authService.updateReportStatus(reportId, newStatus)
    if (response.success) {
      const report = props.reports.find(r => r.id === reportId)
      if (report) {
        report.statusClass = newStatus
        const statusMap = {
          'checking': 'На проверке',
          'in-progress': 'В работе',
          'resolved': 'Решено',
          'rejected': 'Отклонено'
        }
        report.statusText = statusMap[newStatus] || newStatus
      }
      emit('update-status', { reportId, newStatus })
    }
  } catch (error) {
    console.error('Ошибка обновления статуса:', error)
    alert('Ошибка при обновлении статуса')
  }
}
</script>

<style scoped>
.admin-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.admin-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  text-align: left;
}

.card-image-box {
  position: relative;
  width: 100%;
  height: 180px;
  background: #f5f5f5;
}

.card-image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-image-box img[src*="placeholder"] {
  object-fit: contain;
  padding: 20px;
}

.status-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  z-index: 10;
}

.status-badge.checking { background: #e09943; }
.status-badge.in-progress { background: #2f80ed; }
.status-badge.resolved { background: #27ae60; }
.status-badge.rejected { background: #e74c3c; }

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-meta {
  font-size: 12px;
  color: #90a08d;
  margin-bottom: 8px;
}

.card-content h3 {
  margin: 0 0 10px 0;
  font-size: 17px;
  color: #2c3e29;
  font-weight: 600;
}

.description {
  margin: 0 0 20px 0;
  font-size: 13px;
  color: #7a8a77;
  line-height: 1.5;
  flex-grow: 1;
}

.admin-actions {
  border-top: 1px solid #f0f4ef;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-label {
  font-size: 12px;
  font-weight: 600;
  color: #556352;
}

.status-select {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #e2e8e1;
  background-color: #fcfdfc;
  color: #2c3e29;
  font-size: 13px;
  outline: none;
  cursor: pointer;
}

.loading-state {
  text-align: center;
  padding: 40px;
  font-family: 'Montserrat', sans-serif;
  color: #7a8a77;
}

.no-reports {
  text-align: center;
  padding: 50px;
  background: white;
  border-radius: 20px;
  color: #7a8a77;
  font-size: 16px;
}

@media (max-width: 992px) {
  .admin-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .admin-grid { grid-template-columns: 1fr; }
}
</style>