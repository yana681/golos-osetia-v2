<template>
  <div class="news-page">
    <div class="container">
      <div class="news-controls">
        <h1 class="news-title">Новости</h1>
        
        <div class="search-wrap">
          <img src="/src/assets/icons/search-header.png" alt="search" class="search-icon" />
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Поиск новостей Владикавказа..." 
            class="search-input" 
          />
        </div>
      </div>

      <div class="news-grid">
        <div v-for="article in filteredNews" :key="article.id" class="news-card">
          <div class="card-image-wrap">
            <img :src="article.image" :alt="article.title" class="card-img" />
            <button class="save-btn" @click="toggleSave(article.id)">
              <img src="/src/assets/icons/save-header.png" alt="save" class="save-icon" />
            </button>
          </div>

          <div class="card-content">
            <span class="publish-date">Опубликовано {{ article.date }}</span>
            <h3 class="card-headline">
              {{ article.title }}
            </h3>
            
            <div class="card-footer">
              <button class="read-more" @click="openNews(article.sourceUrl)">
                Читать полностью
                <span class="arrow-linear">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="filteredNews.length === 0" class="empty-news">
        По вашему запросу новостей не найдено
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const newsList = ref([
  {
    id: 1,
    image: '/src/assets/prospect.png',
    date: '16.03.2026',
    title: 'Перекрытие движения во Владикавказе 29 марта: ограничения на проспекте Мира и улице Джанаева',
    sourceUrl: '#'
  },
  {
    id: 2,
    image: '/src/assets/prospect.png',
    date: '15.03.2026',
    title: 'Реконструкция центрального парка им. К. Хетагурова вступила в финальную стадию: установят новые арт-объекты',
    sourceUrl: '#'
  },
  {
    id: 3,
    image: '/src/assets/prospect.png',
    date: '14.03.2026',
    title: 'На дорогах республики запустили обновленную интеллектуальную систему фиксации нарушений и мониторинга трафика',
    sourceUrl: '#'
  },
  {
    id: 4,
    image: '/src/assets/prospect.png',
    date: '12.03.2026',
    title: 'Благоустройство набережной реки Терек: городские урбанисты представили план новой прогулочной зоны',
    sourceUrl: '#'
  },
  {
    id: 5,
    image: '/src/assets/prospect.png',
    date: '10.03.2026',
    title: 'Во Владикавказе стартовал ежегодный весенний экологический марафон по озеленению придомовых территорий',
    sourceUrl: '#'
  },
  {
    id: 6,
    image: '/src/assets/prospect.png',
    date: '08.03.2026',
    title: 'Обновление трамвайного парка: на городские маршруты вышли еще три современных низкопольных вагона',
    sourceUrl: '#'
  }
])

const filteredNews = computed(() => {
  return newsList.value.filter(article => 
    article.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const toggleSave = (id) => {
  console.log(`Добавлено в закладки: ${id}`)
}

const openNews = (url) => {
  console.log(`Открытие полной новости: ${url}`)
}
</script>

<style scoped>
.news-page {
  background-color: #efe3d6;
  min-height: 100vh;
  padding-bottom: 100px;
}

.container {
  max-width: 1330px;
  margin: 0 auto;
  padding: 0 20px;
}

.news-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 0 35px 0;
  gap: 30px;
}

.news-title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 38px;
  letter-spacing: -0.5px;
  color: #1a1a1a;
  margin: 0;
  flex-shrink: 0;
}
.search-wrap {
  flex-grow: 1;
  max-width: 900px;
  height: 52px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
}

.search-wrap:focus-within {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(130, 89, 64, 0.4);
  box-shadow: 0 10px 30px rgba(130, 89, 64, 0.06);
}

.search-icon {
  width: 18px;
  height: 18px;
  opacity: 0.7;
}

.search-input {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
}

.search-input::placeholder {
  color: #7a7d85;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.news-card {
  background: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 24px; 
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.news-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 25px 45px rgba(130, 89, 64, 0.12);
}

.card-image-wrap {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.news-card:hover .card-img {
  transform: scale(1.04);
}

.save-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.save-btn:hover {
  transform: scale(1.08);
  background: #ffffff;
}

.save-icon {
  width: 13px;
  height: 16px;
}

.card-content {
  padding: 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.publish-date {
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #a0a4b5;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-headline {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 19px;
  line-height: 1.4;
  color: #1c1e21; 
  margin: 0 0 16px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: auto;
  border-top: 1px solid #f1f3f7;
  padding-top: 16px;
  display: flex;
  justify-content: flex-start; 
}
.read-more {
  background: none;
  border: none;
  color: #825940; 
  font-family: sans-serif;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  padding: 4px 0;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.arrow-linear {
  transition: transform 0.2s ease;
}

.read-more:hover {
  color: #5c3b27;
}

.read-more:hover .arrow-linear {
  transform: translateX(4px);
}

.empty-news {
  text-align: center;
  padding: 50px 0;
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  color: #7a7d85;
}

@media (max-width: 1200px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .news-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 30px 0 20px 0;
  }
  
  .search-wrap {
    width: 100%;
    max-width: 100%;
  }

  .news-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .news-title {
    font-size: 32px;
  }
}
</style>