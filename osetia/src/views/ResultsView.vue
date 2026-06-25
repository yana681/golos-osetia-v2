<template>
  <div class="results-wrapper">
    <div class="container">
      <header class="results-header">
        <h2 class="main-title">Результаты работы портала</h2>
        
        <div class="stats-container">
          <div class="icon-pulse-wrapper">
            <img src="/src/assets/icons/check.png" alt="check" class="check-icon" />
          </div>
          <div class="stats-text">
            <span class="count">{{ totalResults }}</span>
            <span class="subtext">проблем решено и в работе</span>
          </div>
        </div>

        <div class="info-tags">
          <div class="info-label-wrapper">
            <span class="info-label">Самая популярная тема:</span>
            <span class="info-value">{{ topCategory || 'Дороги' }}</span>
          </div>
          <div class="info-label-wrapper">
            <span class="info-label">Самый активный район:</span>
            <span class="info-value">{{ topDistrict || 'Центральный' }}</span>
          </div>
        </div>
      </header>

      <!-- ✅ Статистика по статусам -->
      <div class="status-stats">
        <div class="status-stat-item">
          <div>
            <span class="status-stat-count">{{ resolvedCount }}</span>
            <span class="status-stat-label">Решено</span>
          </div>
        </div>
        <div class="status-stat-divider"></div>
        <div class="status-stat-item">
          <div>
            <span class="status-stat-count">{{ inProgressCount }}</span>
            <span class="status-stat-label">В работе</span>
          </div>
        </div>
      </div>

      <!-- ✅ Сетка с карточками -->
      <div v-if="!isLoading && results.length > 0" class="results-grid">
        <div v-for="card in results" :key="card.id" class="result-card">
          <div class="card-image-wrapper">
            <img :src="card.photo_url || '/src/assets/placeholder.jpg'" :alt="card.category" class="card-img" />
            <div class="card-overlay">
              <span class="view-details" @click="openDetails(card)">Подробнее</span>
            </div>
            <span class="card-status-badge" :class="card.status_class">
              {{ card.status_text }}
            </span>
          </div>
          <div class="card-body">
            <div class="card-category-tag">{{ getCategoryLabel(card.category) }}</div>
            <p class="card-address">{{ card.address }}</p>
            <div class="card-footer">
              <span class="card-user">👤 {{ card.user_name }}</span>
              <span class="card-date">📅 {{ card.date }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ✅ Загрузка -->
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Загрузка результатов...</p>
      </div>

      <!-- ✅ Пустое состояние -->
      <div v-if="!isLoading && results.length === 0" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c5d2c3" stroke-width="1.5">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <line x1="9" y1="10" x2="15" y2="10"/>
        </svg>
        <p class="empty-text">Нет результатов</p>
        <p class="empty-hint">Пока нет решённых или активных заявок</p>
      </div>

      <!-- ✅ Кнопка "Показать ещё" (пагинация) -->
      <div v-if="!isLoading && results.length > 0 && hasMore" class="footer-action">
        <button class="btn-all" @click="loadMore" :disabled="isLoadingMore">
          {{ isLoadingMore ? 'Загрузка...' : 'Показать ещё' }}
        </button>
      </div>
    </div>

    <!-- ✅ Модальное окно с деталями -->
    <ReportDetailModal 
      :visible="modalVisible"
      :report="selectedReport"
      @close="modalVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { authService } from '../services/auth.services.js'
import ReportDetailModal from '../components/profile/ReportDetailModal.vue'

const results = ref([])
const isLoading = ref(false)
const isLoadingMore = ref(false)
const modalVisible = ref(false)
const selectedReport = ref(null)

// Пагинация
const currentPage = ref(1)
const perPage = 6
const totalItems = ref(0)
const totalPages = ref(0)

// Статистика
const resolvedCount = ref(0)
const inProgressCount = ref(0)
const topCategory = ref('')
const topDistrict = ref('')

// Вычисляемые свойства
const totalResults = computed(() => totalItems.value)
const hasMore = computed(() => currentPage.value < totalPages.value)

// Загрузка результатов
const loadResults = async (page = 1, append = false) => {
  try {
    const response = await authService.getResults(page, perPage)
    
    if (response.success) {
      if (append) {
        results.value = [...results.value, ...response.reports]
      } else {
        results.value = response.reports
      }
      
      currentPage.value = response.pagination.current_page
      totalItems.value = response.pagination.total
      totalPages.value = response.pagination.total_pages
      
      // Подсчитываем статистику
      resolvedCount.value = results.value.filter(r => r.status === 'resolved').length
      inProgressCount.value = results.value.filter(r => r.status === 'in-progress').length
      
      // Определяем самую популярную тему
      const categoryCount = {}
      results.value.forEach(r => {
        const cat = r.category || 'Неизвестно'
        categoryCount[cat] = (categoryCount[cat] || 0) + 1
      })
      let maxCount = 0
      let maxCategory = 'Дороги'
      for (const [cat, count] of Object.entries(categoryCount)) {
        if (count > maxCount) {
          maxCount = count
          maxCategory = cat
        }
      }
      topCategory.value = getCategoryLabel(maxCategory)
    }
  } catch (error) {
    console.error('Ошибка загрузки результатов:', error)
  }
}

// Загрузить ещё
const loadMore = async () => {
  if (isLoadingMore.value || !hasMore.value) return
  
  isLoadingMore.value = true
  await loadResults(currentPage.value + 1, true)
  isLoadingMore.value = false
}

// Открыть детали
const openDetails = (report) => {
  selectedReport.value = report
  modalVisible.value = true
}

// Загрузка при монтировании
onMounted(() => {
  isLoading.value = true
  loadResults()
    .finally(() => {
      isLoading.value = false
    })
})
</script>

<style scoped>
.results-wrapper {
  background-color: #f1dfcb;
  padding-bottom: 100px;
  min-height: 100vh;
}

.container {
  max-width: 1330px;
  margin: 0 auto;
  padding: 0 20px;
}

.results-header {
  display: flex;
  align-items: center;
  padding: 50px 0 30px 0;
  gap: 40px;
  flex-wrap: wrap;
}

.main-title {
  width: 420px;
  font-family: 'Podkova', serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 1.2;
  letter-spacing: -0.5px;
  color: #111111;
  position: relative;
  padding-left: 24px;
}

.main-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  height: calc(100% - 8px);
  width: 5px;
  background-color: #386633;
  border-radius: 4px;
}

.stats-container {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 12px 24px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 24px rgba(56, 102, 51, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stats-container:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.65);
  box-shadow: 0 12px 30px rgba(56, 102, 51, 0.08);
}

.icon-pulse-wrapper {
  background: rgba(56, 102, 51, 0.1);
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-icon {
  width: 24px;
  height: 24px;
}

.stats-text {
  display: flex;
  flex-direction: column;
}

.count {
  font-family: 'Podkova', serif;
  font-weight: 700;
  font-size: 32px;
  color: #783f1c;
  line-height: 1.1;
}

.subtext {
  font-family: 'Montserrat';
  margin-top: -10px;
  font-size: 13px;
  font-weight: 500;
  color: #444;
}

.info-tags {
  display: flex;
  gap: 20px;
  font-family: "Montserrat";
  margin-left: auto;
}

.info-label-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.info-label-wrapper:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}

.info-label {
  font-family: sans-serif;
  font-size: 11px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-family: 'Podkova', serif;
  font-size: 18px;
  font-weight: 700;
  color: #386633;
}

/* ✅ Статистика по статусам */
.status-stats {
  display: flex;
  align-items: center;
  gap: 40px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 16px 32px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.status-stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-stat-icon {
  font-size: 24px;
}

.status-stat-count {
  font-family: 'Podkova', serif;
  font-size: 28px;
  font-weight: 700;
  color: #2c3e29;
  display: block;
}

.status-stat-label {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  color: #7a8a77;
  display: block;
  margin-top: -4px;
}

.status-stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(0, 0, 0, 0.08);
}

/* ✅ Сетка карточек */
.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 25px;
}

.result-card {
  background: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.result-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(52, 103, 53, 0.12);
}

.card-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 220px;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.result-card:hover .card-img {
  transform: scale(1.04);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(52, 103, 53, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.result-card:hover .card-overlay {
  opacity: 1;
}

.view-details {
  color: white;
  font-family: "Montserrat";
  font-size: 14px;
  font-weight: 500;
  padding: 10px 24px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50px;
  backdrop-filter: blur(5px);
  transform: translateY(15px);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.result-card:hover .view-details {
  transform: translateY(0);
}

.card-status-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.card-status-badge.in-progress { background: #2f80ed; }
.card-status-badge.resolved { background: #27ae60; }

.card-body {
  padding: 20px;
}

.card-category-tag {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(56, 102, 51, 0.08);
  border-radius: 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #4a6b41;
  margin-bottom: 10px;
}

.card-address {
  font-family: "Montserrat";
  font-weight: 500;
  font-size: 15px;
  line-height: 1.5;
  color: #2c3e50;
  margin: 0 0 15px 0;
  min-height: 44px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f0f4ef;
  padding-top: 12px;
}

.card-user {
  font-family: "Montserrat";
  font-size: 12px;
  color: #7a8a77;
}

.card-date {
  font-family: "Montserrat";
  font-size: 12px;
  color: #90a08d;
}

/* ✅ Загрузка */
.loading-state {
  text-align: center;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #386633;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  font-family: 'Montserrat', sans-serif;
  color: #7a8a77;
  margin: 0;
}

/* ✅ Пустое состояние */
.empty-state {
  text-align: center;
  padding: 60px 20px;
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
  font-size: 18px;
  color: #7a8a77;
  margin: 0;
}

.empty-hint {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #b0c0ad;
  margin: 0;
}

/* ✅ Кнопка "Показать ещё" */
.footer-action {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.btn-all {
  width: 280px;
  height: 54px;
  background: #825940;
  color: #FFF;
  border: none;
  border-radius: 100px;
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.btn-all:hover:not(:disabled) {
  transform: scale(1.05);
}

.btn-all:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ✅ Адаптивность */
@media (max-width: 1200px) {
  .results-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  .results-header {
    gap: 24px;
  }
  
  .info-tags {
    margin-left: 0;
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .main-title {
    width: 100%;
    font-size: 30px;
  }
  
  .stats-container {
    width: 100%;
    box-sizing: border-box;
  }
  
  .info-tags {
    flex-direction: column;
    gap: 12px;
  }
  
  .btn-all {
    width: 100%;
  }

  .status-stats {
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }

  .status-stat-divider {
    width: 80%;
    height: 1px;
  }
}
</style>