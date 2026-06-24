<template>
  <div class="user-reports">
    <div class="reports-header">
      <h3 class="reports-title">Мои сообщения</h3>
      <span class="reports-count">{{ filteredReports.length }}</span>
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

    <div class="reports-grid" v-if="filteredReports.length > 0">
      <ReportCard 
        v-for="(report, index) in filteredReports" 
        :key="index"
        :title="report.title"
        :description="report.description"
        :statusText="report.statusText"
        :statusClass="report.statusClass"
        :location="report.location"
        :date="report.date"
        :likes="report.likes"
        :imgSrc="report.imgSrc"
      />
    </div>
    
    <div class="empty-state" v-else>
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c5d2c3" stroke-width="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <line x1="9" y1="10" x2="15" y2="10"/>
      </svg>
      <p class="empty-text">Нет сообщений с выбранным статусом</p>
      <p class="empty-hint">Измените фильтр или создайте новое сообщение</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ReportCard from './ReportCard.vue'  // ✅ правильный импорт

const currentFilter = ref('all')
const searchQuery = ref('')

const filters = [
  { label: 'Все', value: 'all' },
  { label: 'На проверке', value: 'checking' },
  { label: 'В работе', value: 'in-progress' },
  { label: 'Решено', value: 'resolved' },
  { label: 'Отклонено', value: 'rejected' }
]

const allReports = ref([
  { 
    title: "Яма на тротуаре по ул. Ленина, 23",
    description: "Глубокая яма мешает проходу, особенно в дождливую погоду.",
    statusText: "На проверке",
    statusClass: "checking", 
    location: "ул. Ленина, 23",
    date: "12.05.2025",
    likes: 12,
    imgSrc: "https://tengrinews.kz/userdata/news/2021/news_431422/thumb_m/photo_354714.jpeg"
  },
  { 
    title: "Переполненные мусорные баки",
    description: "Контейнеры переполнены, мусор разносится ветром по всей улице.",
    statusText: "В работе",
    statusClass: "in-progress",
    location: "ул. Пушкина, 15",
    date: "10.05.2025",
    likes: 8,
    imgSrc: "https://avatars.mds.yandex.net/i?id=050510a0a5a0b09979698ad5e1d435af-5362606-images-thumbs&n=13"
  },
  { 
    title: "Не работает уличный фонарь",
    description: "Фонарь не горит уже неделю, темно по вечерам.",
    statusText: "Решено",
    statusClass: "resolved",
    location: "ул. Мира, 7",
    date: "05.05.2025",
    likes: 15,
    imgSrc: "https://kaliningradtoday.ru/wp-content/uploads/2026/02/1771229582-ee54208942d314d6678d844e470f397e.jpg"
  },
  { 
    title: "Сломанная детская площадка",
    description: "Качели сломаны, опасно для маленьких детей.",
    statusText: "Решено",
    statusClass: "resolved",
    location: "ул. Гагарина, 10",
    date: "28.04.2025",
    likes: 21,
    imgSrc: "https://pristalica.by/app/uploads/2023/06/ploshh-1024x768.jpg"
  },
  { 
    title: "Граффити на стене дома",
    description: "Надписи портят внешний вид исторического здания.",
    statusText: "Отклонено",
    statusClass: "rejected",
    location: "ул. Кирова, 34",
    date: "01.05.2025",
    likes: 3,
    imgSrc: "https://s12.stc.yc.kpcdn.net/share/i/12/13483182/wr-960.webp"
  }
])

const getCountByStatus = (status) => {
  if (status === 'all') return allReports.value.length
  return allReports.value.filter(r => r.statusClass === status).length
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Podkova:wght@400;600;700;800&family=Montserrat:wght@200;300;400;500;600;700&display=swap');

.user-reports {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 28px 30px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
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