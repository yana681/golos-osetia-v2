<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminTabs from '../components/admin/AdminTabs.vue'
import AdminReportsList from '../components/admin/AdminReportsList.vue'
import { authService } from '../services/auth.services.js'

const router = useRouter()
const isLoading = ref(true)
const allReports = ref([])

// ✅ Базовый URL для фото
const BASE_URL = 'http://voiceossetia.local'

const loadAllReports = async () => {
  try {
    const response = await authService.getAllReports()
    console.log('📥 Ответ от сервера (админ):', response)
    
    if (response.success) {
      allReports.value = response.reports.map(report => {
        // ✅ Формируем правильный URL для фото
        let photoUrl = '/src/assets/placeholder.jpg'
        
        if (report.photo_path) {
          if (report.photo_path.startsWith('http')) {
            photoUrl = report.photo_path
          } else {
            photoUrl = BASE_URL + report.photo_path
          }
        }
        
        return {
          id: report.id,
          title: report.subtheme || report.category,
          description: report.description,
          statusText: report.status_text,
          statusClass: report.status_class,
          location: report.address,
          date: report.date,
          photo_url: photoUrl,
          user_name: report.user_name || 'Пользователь',
          // Сохраняем оригинальный путь для обновления статуса
          photo_path: report.photo_path
        }
      })
      
      console.log('📸 Заявки с фото:', allReports.value)
    }
  } catch (error) {
    console.error('Ошибка загрузки заявок:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    try {
      const userData = JSON.parse(user)
      if (userData.role !== 'admin') {
        router.push('/profile')
        return
      }
    } catch (e) {
      router.push('/login')
      return
    }
  } else {
    router.push('/login')
    return
  }
  loadAllReports()
})

const currentFilter = ref('all')
const searchQuery = ref('')

const getCountByStatus = (status) => {
  if (status === 'all') return allReports.value.length
  return allReports.value.filter(r => r.statusClass === status).length
}

const handleStatusUpdate = async ({ reportId, newStatus }) => {
  const report = allReports.value.find(r => r.id === reportId)
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
}

const refreshData = async () => {
  isLoading.value = true
  await loadAllReports()
  alert('✅ Данные успешно обновлены!')
}

const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}

const filteredReports = computed(() => {
  return allReports.value.filter(report => {
    const matchesFilter = currentFilter.value === 'all' || report.statusClass === currentFilter.value
    const searchText = `${report.title} ${report.description} ${report.location}`.toLowerCase()
    const matchesSearch = searchText.includes(searchQuery.value.toLowerCase())
    return matchesFilter && matchesSearch
  })
})
</script>

<template>
  <div v-if="!isLoading" class="admin-page">
    <div class="admin-container">
      <div class="admin-header">
        <div class="header-left">
          <div class="admin-avatar-box">🛠️</div>
          <div class="admin-info">
            <span class="admin-badge">Модератор системы</span>
            <h1>Панель администратора</h1>
            <p class="admin-subtitle">Управление заявками и обращениями граждан</p>
          </div>
        </div>
        <div class="header-right">
          <button class="btn-refresh" @click="refreshData">🔄 Обновить</button>
          <button class="btn-logout" @click="logout">🚪 Выйти</button>
        </div>
      </div>

      <div class="admin-stats">
        <div class="stat-item">
          <h2>{{ allReports.length }}</h2>
          <div class="stat-label">Всего заявок</div>
          <div class="stat-sub">Поступило за всё время</div>
        </div>
        <div class="stat-item">
          <h2 class="status-checking">{{ getCountByStatus('checking') }}</h2>
          <div class="stat-label">На проверке</div>
          <div class="stat-sub">Ожидают модерации</div>
        </div>
        <div class="stat-item">
          <h2 class="status-progress">{{ getCountByStatus('in-progress') }}</h2>
          <div class="stat-label">В работе</div>
          <div class="stat-sub">У городских служб</div>
        </div>
        <div class="stat-item">
          <h2 class="status-resolved">{{ getCountByStatus('resolved') }}</h2>
          <div class="stat-label">Решено</div>
          <div class="stat-sub">Успешно закрыто</div>
        </div>
      </div>

      <AdminTabs 
        :currentFilter="currentFilter"
        :searchQuery="searchQuery"
        @update:currentFilter="currentFilter = $event"
        @update:searchQuery="searchQuery = $event"
      />

      <AdminReportsList 
        :reports="filteredReports" 
        @update-status="handleStatusUpdate"
      />
    </div>
  </div>
</template>

<style scoped>
.admin-page {
  width: 100%;
  background: #F1DFCB;
  min-height: 100vh;
  padding: 40px 20px;
  box-sizing: border-box;
}

.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.admin-header {
  background: #386633;
  border-radius: 30px;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.header-left {
  display: flex;
  gap: 25px;
  align-items: center;
}

.admin-avatar-box {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.admin-info h1 {
  margin: 0 0 6px 0;
  font-size: 30px;
  font-weight: 500;
}

.admin-badge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 11px;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.admin-subtitle {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
}

.header-right {
  display: flex;
  gap: 12px;
}

.btn-refresh {
  background: white;
  color: #3d5a35;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn-refresh:hover {
  background: #f0f2f0;
}

.btn-logout {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn-logout:hover {
  background: rgba(255, 255, 255, 0.25);
}

.admin-stats {
  background: white;
  border-radius: 24px;
  padding: 30px 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  text-align: left;
}

.stat-item {
  padding: 0 40px;
  border-right: 1px solid #edf2ec;
}

.stat-item:last-child {
  border-right: none;
}

.stat-item h2 {
  margin: 0 0 6px 0;
  font-size: 36px;
  font-weight: 600;
  color: #2c3e29;
}

.stat-item h2.status-checking { color: #e09943; }
.stat-item h2.status-progress { color: #2f80ed; }
.stat-item h2.status-resolved { color: #27ae60; }

.stat-label {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e29;
  margin-bottom: 4px;
}

.stat-sub {
  font-size: 12px;
  color: #90a08d;
}

@media (max-width: 992px) {
  .admin-stats { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .stat-item { border-right: none; }
  .admin-header {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
  }
  .header-right {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .admin-stats { grid-template-columns: 1fr; }
  .admin-header {
    padding: 24px;
  }
  .header-left {
    flex-direction: column;
    text-align: center;
  }
  .header-right {
    flex-direction: column;
  }
}
</style>