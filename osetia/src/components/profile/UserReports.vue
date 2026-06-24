<template>
  <div class="controls-and-grid">
    <div class="main-tabs">
      <button class="tab-btn active">Мои сообщения</button>
    </div>

    <div class="filter-row">
      <div class="tags">
        <button 
          class="tag-btn" 
          :class="{ active: currentFilter === 'all' }" 
          @click="currentFilter = 'all'"
        >Все</button>
        
        <button 
          class="tag-btn" 
          :class="{ active: currentFilter === 'checking' }" 
          @click="currentFilter = 'checking'"
        >На проверке</button>
        
        <button 
          class="tag-btn" 
          :class="{ active: currentFilter === 'in-progress' }" 
          @click="currentFilter = 'in-progress'"
        >В работе</button>
        
        <button 
          class="tag-btn" 
          :class="{ active: currentFilter === 'resolved' }" 
          @click="currentFilter = 'resolved'"
        >Решено</button>
        
        <button 
          class="tag-btn" 
          :class="{ active: currentFilter === 'rejected' }" 
          @click="currentFilter = 'rejected'"
        >Отклонено</button>
      </div>
      
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Поиск по сообщениям..." 
          class="search-input" 
        />
        <button class="filter-settings-btn">👇</button>
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
    
    <div class="no-reports" v-else>
      📭 Нет сообщений с выбранным статусом или текстом.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ReportCard from './ReportCard.vue'

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

const filteredReports = computed(() => {
  return allReports.value.filter(report => {
    // по кнопке-статусу
    const matchesFilter = currentFilter.value === 'all' || report.statusClass === currentFilter.value
    
    // совпадение по тексту в поиске 
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          report.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    return matchesFilter && matchesSearch
  })
})
</script>

<style scoped>
.controls-and-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-tabs {
  display: flex;
  gap: 30px;
  border-bottom: 2px solid #e2e8e1;
}

.tab-btn {
  background: none;
  border: none;
  padding: 5px 5px;
  font-size: 16px;
  font-weight: 600;
  font-family: "Montserrat";
  position: relative;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 3px;
  background: #4a6b41;
}

.filter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tags {
  display: flex;
  gap: 10px;
}

.tag-btn {
  background: white;
  border: 1px solid #e2e8e1;
  border-radius: 20px;
  padding: 5px 15px;
  font-size: 14px;
  color: #556352;
  cursor: pointer;
  font-family: "montserrat";
  transition: 0.2s;
}

.tag-btn.active {
  background: #4a6b41;
  color: white;
  border-color: #4a6b41;
  font-family: "montserrat";
}

.search-box {
  display: flex;
  gap: 10px;
}

.search-input {
  background: white;
  border: 1px solid #e2e8e1;
  border-radius: 20px;
  padding: 5px 20px;
  font-size: 14px;
  outline: none;
  width: 240px;
  font-family: "Montserrat";
}

.filter-settings-btn {
  background: white;
  border: 1px solid #e2e8e1;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-top: 5px;
}

.no-reports {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 20px;
  color: #7a8a77;
  font-size: 16px;
}

@media (max-width: 992px) {
  .reports-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .reports-grid { grid-template-columns: 1fr; }
}
</style>