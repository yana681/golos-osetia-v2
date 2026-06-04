<script setup>
import { ref, computed } from 'vue'
import AdminTabs from '../components/admin/AdminTabs.vue'
import AdminReportsList from '../components/admin/AdminReportsList.vue'

const currentFilter = ref('all')
const searchQuery = ref('')

const allReports = ref([
  { 
    title: "Яма на тротуаре по ул. Ленина, 23",
    description: "Глубокая яма мешает проходу, особенно в дождливую погоду.",
    statusText: "На проверке",
    statusClass: "checking",
    location: "ул. Ленина, 23",
    date: "12.05.2025",
    imgSrc: "https://tengrinews.kz/userdata/news/2021/news_431422/thumb_m/photo_354714.jpeg"
  },
  { 
    title: "Переполненные мусорные баки",
    description: "Контейнеры переполнены, мусор разносится ветром по всей улице.",
    statusText: "В работе",
    statusClass: "in-progress",
    location: "ул. Пушкина, 15",
    date: "10.05.2025",
    imgSrc: "https://avatars.mds.yandex.net/i?id=050510a0a5a0b09979698ad5e1d435af-5362606-images-thumbs&n=13"
  },
  { 
    title: "Не работает уличный фонарь",
    description: "Фонарь не горит уже неделю, темно по вечерам.",
    statusText: "Решено",
    statusClass: "resolved",
    location: "ул. Мира, 7",
    date: "05.05.2025",
    imgSrc: "https://kaliningradtoday.ru/wp-content/uploads/2026/02/1771229582-ee54208942d314d6678d844e470f397e.jpg"
  }
])

const getCountByStatus = (status) => {
  return allReports.value.filter(r => r.statusClass === status).length
}

const handleStatusUpdate = ({ report, newStatus }) => {
  report.statusClass = newStatus
  if (newStatus === 'checking') report.statusText = 'На проверке'
  if (newStatus === 'in-progress') report.statusText = 'В работе'
  if (newStatus === 'resolved') report.statusText = 'Решено'
}

const refreshData = () => {
  alert('Данные успешно обновлены!')
}

const filteredReports = computed(() => {
  return allReports.value.filter(report => {
    const matchesFilter = currentFilter.value === 'all' || report.statusClass === currentFilter.value
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          report.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesFilter && matchesSearch
  })
})
</script>

<template>
  <div class="admin-page">
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
          <button class="btn-refresh" @click="refreshData">🔄 Обновить данные</button>
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
  background: #f4f6f3;
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
  background: #3d5a35;
  border-radius: 30px;
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  text-align: left;
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
}

@media (max-width: 600px) {
  .admin-stats { grid-template-columns: 1fr; }
}
</style>