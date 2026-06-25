<template>
  <div class="user-reports">
    <div class="reports-header">
      <h3 class="reports-title">Мои сообщения</h3>
      <span class="reports-count">{{ filteredReports.length }}</span>
      <button class="refresh-btn" @click="loadReports" :disabled="isLoading">
        {{ isLoading ? '⏳' : '🔄' }}
      </button>
    </div>
    
    <div class="filter-bar">
      <div class="filter-tags">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          class="filter-tag" 
          :class="{ active: currentFilter === filter.value }" 
          @click="currentFilter = filter.value"
        >
          {{ filter.label }}
          <span class="filter-count">{{ getCountByStatus(filter.value) }}</span>
        </button>
      </div>
      
      <div class="search-wrapper">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Поиск по сообщениям..." 
          class="search-input" 
        />
      </div>
    </div>

    <div v-if="isLoading" class="loading-state">
      <p>Загрузка заявок...</p>
    </div>

    <div v-else-if="filteredReports.length > 0" class="reports-grid">
      <ReportCard 
        v-for="report in filteredReports" 
        :key="report.id"
        :title="report.subtheme || report.category"
        :description="report.description"
        :statusText="report.status_text"
        :statusClass="report.status_class"
        :location="report.address"
        :date="report.date"
        :likes="0"
        :imgSrc="report.photo_url || '/src/assets/placeholder.jpg'"
        @view-details="openDetails(report)"
      />
    </div>
    
    <div v-else class="empty-state">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c5d2c3" stroke-width="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <line x1="9" y1="10" x2="15" y2="10"/>
      </svg>
      <p class="empty-text">У вас пока нет заявок</p>
      <p class="empty-hint">Создайте новую заявку, чтобы начать</p>
    </div>

    <!-- ✅ Модальное окно с деталями - вынесено на самый верхний уровень -->
    <ReportDetailModal 
      :visible="modalVisible"
      :report="selectedReport"
      @close="modalVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { authService } from '../../services/auth.services.js'
import ReportCard from './ReportCard.vue'
import ReportDetailModal from './ReportDetailModal.vue'

const currentFilter = ref('all')
const searchQuery = ref('')
const reports = ref([])
const isLoading = ref(false)

// Состояние модального окна
const modalVisible = ref(false)
const selectedReport = ref(null)

const filters = [
  { label: 'Все', value: 'all' },
  { label: 'На проверке', value: 'checking' },
  { label: 'В работе', value: 'in-progress' },
  { label: 'Решено', value: 'resolved' },
  { label: 'Отклонено', value: 'rejected' }
]

const openDetails = (report) => {
  console.log('📋 Открытие деталей заявки:', report.id)
  selectedReport.value = report
  modalVisible.value = true
}

const loadReports = async () => {
  isLoading.value = true
  try {
    const response = await authService.getUserReports()
    
    if (response.success) {
      reports.value = response.reports.map(report => {
        let photoUrl = null
        if (report.photo_path) {
          if (report.photo_path.startsWith('http')) {
            photoUrl = report.photo_path
          } else {
            photoUrl = `http://voiceossetia.local${report.photo_path}`
          }
        }
        
        return {
          ...report,
          photo_url: photoUrl
        }
      })
    }
  } catch (error) {
    console.error('Ошибка загрузки заявок:', error)
  } finally {
    isLoading.value = false
  }
}

const getCountByStatus = (status) => {
  if (status === 'all') return reports.value.length
  return reports.value.filter(r => r.status === status).length
}

const filteredReports = computed(() => {
  return reports.value.filter(report => {
    const matchesFilter = currentFilter.value === 'all' || report.status === currentFilter.value
    const searchText = `${report.category} ${report.subtheme} ${report.description} ${report.address}`.toLowerCase()
    const matchesSearch = searchText.includes(searchQuery.value.toLowerCase())
    return matchesFilter && matchesSearch
  })
})

onMounted(() => {
  loadReports()
})
</script>

<style scoped>
.user-reports {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 28px 30px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  position: relative;
}

.reports-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.reports-title {
  margin: 0;
  font-family: 'Podkova', serif;
  font-size: 22px;
  font-weight: 700;
  color: #2c3e29;
}

.reports-count {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #7a8a77;
  background: rgba(0, 0, 0, 0.04);
  padding: 2px 12px;
  border-radius: 50px;
}

.refresh-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.05);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-tag {
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 50px;
  padding: 8px 16px;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #6a7a67;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.filter-tag:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(74, 107, 65, 0.2);
}

.filter-tag.active {
  background: #4a6b41;
  color: white;
  border-color: #4a6b41;
  box-shadow: 0 4px 12px rgba(74, 107, 65, 0.25);
}

.filter-count {
  font-size: 11px;
  background: rgba(0, 0, 0, 0.06);
  padding: 0 8px;
  border-radius: 50px;
  font-weight: 600;
}

.filter-tag.active .filter-count {
  background: rgba(255, 255, 255, 0.2);
}

.search-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 50px;
  padding: 0 16px;
  transition: all 0.3s ease;
}

.search-wrapper:focus-within {
  background: white;
  border-color: #4a6b41;
  box-shadow: 0 4px 12px rgba(74, 107, 65, 0.1);
}

.search-icon {
  color: #90a08d;
  flex-shrink: 0;
}

.search-input {
  border: none;
  background: transparent;
  padding: 10px 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  outline: none;
  width: 220px;
  color: #2c3e29;
}

.search-input::placeholder {
  color: #b0c0ad;
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 4px;
}

.loading-state {
  text-align: center;
  padding: 40px 20px;
  font-family: 'Montserrat', sans-serif;
  color: #7a8a77;
}

.empty-state {
  text-align: center;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.empty-state svg {
  opacity: 0.4;
}

.empty-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  color: #7a8a77;
  margin: 0;
}

.empty-hint {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  color: #b0c0ad;
  margin: 0;
}

@media (max-width: 992px) {
  .reports-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .search-wrapper {
    width: 100%;
  }
  .search-input {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .user-reports {
    padding: 20px 16px;
  }
  .reports-grid {
    grid-template-columns: 1fr;
  }
  .filter-tags {
    gap: 6px;
  }
  .filter-tag {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>